<template>
    <div class='base'>
        <AppHeader></AppHeader>
        <div class='content'>
            <div class='header'> Accounts </div>
                <div class='view-tabs'>
                    <div class='tabs' :class='[ { mobile: isMobileApp() } ]' >
                        <template v-for='option in Object.keys(TABS_OPTIONS)'>
                            <div class='tab' 
                            :class='[ {selectedTab: TABS_OPTIONS[option].selectedTab, mobile: isMobileApp() } ]' 
                            :key='TABS_OPTIONS[option].key'
                            @click='changeTabView(TABS_OPTIONS[option].key)'>
                                {{ TABS_OPTIONS[option].label }}
                            </div>
                        </template>
                    </div>
                </div>

                <div class='view-controls'>
                    <div class='view-options'>
                        <div class='option'>
                            <FButton
                            label='Create'
                            icon='common/add-white.png'
                            color='success'
                            @clicked='routeByName("Register", {
                                account_type: TABS_OPTIONS[selectedTab].slug
                            })'></FButton>
                        </div>
                        <div class='option'>
                            <FButton
                            label='Edit'
                            icon='common/edit-white.png'
                            color='warning'
                            :disabled='selectedTableField === null'
                            @clicked='routeByName("EditAccount", {
                                accountId: selectedTableField.account_id
                            })'></FButton>
                        </div>
                    </div>
                </div>
            <transition name='fade' mode='out-in'>
                <template v-for='option in Object.keys(TABS_OPTIONS)'>
                    
                    <div
                    v-if='TABS_OPTIONS[option].selectedTab' 
                    :key='TABS_OPTIONS[option].key'>

                        <template v-if='TABS_OPTIONS[option].status === 200'>
                            <b-table 
                            :data="TABS_OPTIONS[option].data" 
                            :columns="TABLE_COLUMNS"
                            :selected.sync='selectedTableField'

                            :paginated='true'
                            :per-page='TABS_OPTIONS[option].perPage'
                            :total='TABS_OPTIONS[option].data.length'
                            aria-next-label="Next"
                            aria-previos-label="Previous"
                            aria-page-label="Page"
                            aria-current-label="Current" ></b-table>

                            <div v-if='option ==="STUDENT"'> 
                                
                                <b-button
                                type='is-info'
                                @click='downloadStudentReport()'>
                                    Download Student Account Report
                                </b-button>
                            </div>
                        </template>
                        
                        <template v-else>
                            <FStatusResponses
                            :code='TABS_OPTIONS[option].status'
                            :message='TABS_OPTIONS[option].message'
                            ></FStatusResponses>
                        </template>


                    </div>

                </template>
            </transition>
        </div>
    </div>
</template>

<script>

import AppHeader from '@/components/common/AppMenu.vue'
import FButton from '@/components/common/FButton.vue'
import FStatusResponses from '@/components/status/FStatusResponses.vue'
import axios from 'axios'
import { ACCOUNT_GROUP_TYPE, GENDER_TYPE_INDEX } from '@/utilities/account.utility.js'
import { convertDate } from '@/utilities/date.utility.js'
import { AInstance } from '@/toolbox/TAxios.js'
import fileDownload from 'js-file-download'

export default {
    name: 'Accounts',

    components: {
        AppHeader,
        FButton,
        FStatusResponses
    },

    mounted() {
        this.selectedTab = 'ADMINISTRATOR'
        this.getAccounts()
    },

    data() {

        const TABS_OPTIONS = {

            'ADMINISTRATOR': {
                label: 'Administrator',
                key: 'ADMINISTRATOR',
                icon: '',
                slug: 'administrator',
                selectedTab: true,
                data: [],
                status: 0,
                message: '',
                perPage: 10,
                total: 0
            },

            'UNIT_COORDINATOR': {
                label: 'Unit Coordinator',
                key: 'UNIT_COORDINATOR',
                slug: 'unit_coordinator',
                selectedTab: false,
                data: [],
                status: 0,
                message: '',
                perPage: 10,
                total: 0
            },

            'TEACHER': {
                label: 'Teacher',
                key: 'TEACHER',
                slug: 'teacher',
                selectedTab: false,
                data: [],
                status: 0,
                message: '',
                perPage: 10,
                total: 0
            },

            'STUDENT': {
                label: 'Student',
                key: 'STUDENT',
                slug: 'student',
                selectedTab: false,
                data: [],
                status: 0,
                message: '',
                perPage: 10,
                total: 0
            }
        }

        /**
         * Selected Tab View in string. Holds the key to the options
         * @type { String }
         */
        let selectedTab = 'ADMINISTRATOR'
        let selectedTableField = null

        const TABLE_COLUMNS = [
            {
                field: 'user_id',
                label: 'User ID',
                searchable: true
            },
            {
                field: 'first_name',
                label: 'First Name',
                searchable: true
            },
            {
                field: 'last_name',
                label: 'Last Name',
                searchable: true
            },
            {
                field: 'dob',
                label: 'Date of Birth',
                centered: true,
            },
            {
                field: 'gender',
                label: 'Gender'
            },
            {
                field: 'status',
                label: 'Status',
                searchable: true
            }
        ]

        return {
            TABS_OPTIONS,
            selectedTab,
            selectedTableField,
            TABLE_COLUMNS
        }
    },

    methods: {

        print() {
            console.log(this.selectedTableField)
        },

        /**
         * Changes the view of tab.
         */
        changeTabView(key) {
            if (key === this.selectedTab) return
            this.TABS_OPTIONS[this.selectedTab].selectedTab = false
            this.TABS_OPTIONS[key].selectedTab = true
            this.selectedTab = key
            this.selectedTableField = null
        },

        /**
         * Retrieve all accounts.
         */
        getAccounts() {
            let getAdministratorRequest = AInstance.get('/api/accounts', {
                params: {
                    group_type: ACCOUNT_GROUP_TYPE.ADMINISTRATOR.group_num
                }
            })

            let getUnitCoordinatorRequest = AInstance.get('/api/accounts', {
                params: {
                    group_type: ACCOUNT_GROUP_TYPE.UNIT_COORDINATOR.group_num
                }
            })

            let getTeacherRequest = AInstance.get('/api/accounts', {
                params: {
                    group_type: ACCOUNT_GROUP_TYPE.TEACHER.group_num
                }
            })

            let getStudentRequest = AInstance.get('/api/accounts', {
                params: {
                    group_type: ACCOUNT_GROUP_TYPE.STUDENT.group_num
                }
            })

            axios.all([getAdministratorRequest, getUnitCoordinatorRequest, getTeacherRequest, getStudentRequest])
            .then(axios.spread((...responses) => {
                const administratorResponse = responses[ 0 ]
                const unitCoordinatorResponse = responses[ 1 ]
                const teacherResponse = responses[ 2 ]
                const studentResponse = responses[ 3 ]

                if (administratorResponse.status === 200) {
                    this.TABS_OPTIONS.ADMINISTRATOR.data = [...administratorResponse.data.data]
                    this.TABS_OPTIONS.ADMINISTRATOR.message = administratorResponse.data.message
                }
                else if (administratorResponse.status === 204) this.TABS_OPTIONS.ADMINISTRATOR.message = 'There are no accounts in this group!'
                this.TABS_OPTIONS.ADMINISTRATOR.status = administratorResponse.status
        
                if (unitCoordinatorResponse.status === 200) {
                    this.TABS_OPTIONS.UNIT_COORDINATOR.data = [...unitCoordinatorResponse.data.data]
                    this.TABS_OPTIONS.UNIT_COORDINATOR.message = unitCoordinatorResponse.data.message
                }
                else if (unitCoordinatorResponse.status === 204) this.TABS_OPTIONS.UNIT_COORDINATOR.message = 'There are no accounts in this group!'
                this.TABS_OPTIONS.UNIT_COORDINATOR.status = unitCoordinatorResponse.status

                if (teacherResponse.status === 200) {
                    this.TABS_OPTIONS.TEACHER.data = [...teacherResponse.data.data]
                    this.TABS_OPTIONS.TEACHER.message = teacherResponse.data.message
                }
                else if (teacherResponse.status === 204) this.TABS_OPTIONS.TEACHER.message = 'There are no accounts in this group!'
                this.TABS_OPTIONS.TEACHER.status = teacherResponse.status

                if (studentResponse.status === 200) {
                    this.TABS_OPTIONS.STUDENT.data = [...studentResponse.data.data]
                    this.TABS_OPTIONS.STUDENT.message = studentResponse.data.message
                }
                else if (studentResponse.status === 204) this.TABS_OPTIONS.STUDENT.message = 'There are no accounts in this group!'
                this.TABS_OPTIONS.STUDENT.status = studentResponse.status
            }))
            .then(() => {
                this.accountDataConversion()
            })
        },

        accountDataConversion() {

            Object.keys(this.TABS_OPTIONS).forEach(key => {
                if (this.TABS_OPTIONS[ key ].status === 200) {
                    this.TABS_OPTIONS[ key ].data.forEach(item => {
                        item.gender = GENDER_TYPE_INDEX[ item.gender ]
                        item.dob = convertDate(item.dob, true)
                    })
                }
            })
        },

        downloadStudentReport() {

            AInstance.get( '/api/download/all-students', {
                responseType: 'blob'
            } )
            .then( response => {
                fileDownload(response.data, 'report.csv')
            })
        }
    }
}
</script>

<style scoped lang='scss'>

.content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px 25px;
    gap: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

@media only screen and (min-width:1280px) {
    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 25px 50px;
        gap: 25px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
}

.content .view-tabs {
    position: relative;
    display: block;
    width: 100%;
}

.content .view-tabs .tabs {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #DBDBDB;
}

.content .view-tabs .tabs.mobile {
    overflow-x: auto !important;
}

.content .view-tabs .tabs.mobile::-webkit-scrollbar {
    display: none;
}

.content .view-tabs .tabs .tab {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    min-width: 150px;
    height: 100%;
    font-size: $font-size-list-item;
    font-weight: 700;
    border-bottom: 2px solid transparent;
    transition: font-size 0.25s ease, border-bottom 0.25s ease;
}

.content .view-tabs .tabs .tab.selectedTab {
    font-size: $font-size-list-item-selected;
    border-bottom: 2px solid $color-scheme-primary-active;
}

.content .view-controls {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 25px;
    width: 100%;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.content .view-controls .view-options {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    gap: 10px;
}

@media only screen and (min-width:1280px) {
    .content .view-controls {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 25px;
        width: 100%;
        padding: 0 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .content .view-controls .view-options {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 50px;
        gap: 10px;
    }
}

.content .view-controls .option {
    position: relative;
    display: block;
    border: 0;
    margin: 0;
    padding: 0;
    width: 100px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

</style>