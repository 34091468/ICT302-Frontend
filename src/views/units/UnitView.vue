<template>
    <div class='base'>
        <AppHeader></AppHeader>
        <div class='content'>
            <div class='header'> Unit Information </div>
            <template v-if='unitInfo.status === 200'>
                <div class='info'>
                    <div> {{ unitInfo.data.unit_code }} </div>
                    <div> {{ unitInfo.data.unit_name }} </div>
                    <div> {{ unitInfo.data.trimester }} </div>
                    <div> {{ unitInfo.data.year }} </div>
                </div>
                <div class='view-tabs'>
                    <div class='tabs' :class='[ { mobile: isMobileApp() } ]' >
                        <template v-for='tab in TABS_OPTIONS'>
                            <div 
                            class='tab'
                            :class='[ { selected: tab.selected, mobile: isMobileApp() } ]'
                            :key='tab.key'
                            @click='changeTabView(tab.key)'>
                                {{ tab.label }}
                            </div>
                        </template>
                    </div>
                </div>

                <transition name='fade' mode='out-in'>
                    
                    <template v-if='selectedTab === "UNIT"'>
                        <template v-if='!TABS_OPTIONS[selectedTab].onEdit'>
                            <div class='unit-card'>
                                <div class='view-controls'>
                                    <FButton
                                    label='Edit'
                                    icon='common/edit-white.png'
                                    color='warning'
                                    @clicked='TABS_OPTIONS[selectedTab].onEdit = true'
                                    ></FButton>
                                </div>
                                <div class='unit-info'>
                                    <div class='key'>
                                        Date of Commencement
                                    </div>
                                    <div class='value'>
                                        {{ unitInfo.data.start_date }}
                                    </div>
                                </div>

                                <div class='unit-info'>
                                    <div class='key'>
                                        Date of Completion
                                    </div>
                                    <div class='value'>
                                        {{ unitInfo.data.end_date }}
                                    </div>
                                </div>

                                <div class='unit-info'>
                                    <div class='key'>
                                        Status
                                    </div>
                                    <div class='value'>
                                        {{ unitInfo.data.status }}
                                    </div>
                                </div>

                                <div class='unit-info'>
                                    <div class='key'>
                                        Unit Coordinator Id
                                    </div>
                                    <div class='value'>
                                        {{ unitInfo.data.uc.user_id }}
                                    </div>
                                </div>

                                <div class='unit-info'>
                                    <div class='key'>
                                        Unit Coordinator Name
                                    </div>
                                    <div class='value'>
                                        {{ unitInfo.data.uc.user_name }}
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <UnitEdit :unit='unitInfo.data'
                            @return='refresh'></UnitEdit>
                        </template>
                    </template>
                    <template v-else-if='selectedTab === "ENROLMENT"'>
                        <Enrolments :unit_id='unitInfo.data.unit_id'></Enrolments>
                    </template>
                    <template v-else-if='selectedTab === "TEACHING_STAFF"'>
                        <TeachingStaffs
                        :unit_id='unitInfo.data.unit_id'></TeachingStaffs>
                    </template>
                    <template v-else-if='selectedTab === "CLASSES"'>
                        <EnrolmentClass
                        :unit_id='unitInfo.data.unit_id'></EnrolmentClass>
                    </template>
                </transition>
            </template>
            <template v-else>
                <FStatusResponses
                :code='unitInfo.status'
                :message='unitInfo.message'
                ></FStatusResponses>
            </template>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/common/AppMenu.vue'
import UnitEdit from '@/views/units/UnitEdit.vue'
import Enrolments from '@/views/enrolment/Enrolments.vue'
import TeachingStaffs from '@/views/teaching-staffs/TeachingStaffs.vue'
import EnrolmentClass from '@/views/classes/EnrolmentClass.vue'
import FButton from '@/components/common/FButton.vue'
import FStatusResponses from '@/components/status/FStatusResponses.vue'
import { convertDate } from '@/utilities/date.utility.js'
import { AInstance } from '@/toolbox/TAxios.js'

export default {
    name: 'UnitView',
    props: {
        unit_id: {
            type: String,
            default: ''
        }
    },
    components: {
        AppHeader,
        UnitEdit,
        Enrolments,
        TeachingStaffs,
        EnrolmentClass,
        FButton,
        FStatusResponses
    },

    mounted() {
        this.getUnitInfo()
    },

    data() {

        var unitInfo = {
            data: null,
            status: 0,
            message: ''
        }

        const TABS_OPTIONS = {

            'UNIT': {
                label: 'Unit',
                key: 'UNIT',
                slug: 'unit',
                selected: true,
                onEdit: false
            },

            'ENROLMENT': {
                label: 'Enrolment',
                key: 'ENROLMENT',
                slug: 'enrolment',
                selected: false,
            },

            'TEACHING_STAFF': {
                label: 'Teaching Staffs',
                key: 'TEACHING_STAFF',
                slug: 'teaching staff',
                selected: false,
            },

            'CLASSES': {
                label: 'Classes',
                key: 'CLASSES',
                slug: 'classes',
                selected: false,
            }
        }

        var selectedTab = 'UNIT'

        return {
            unitInfo,
            TABS_OPTIONS,
            selectedTab
        }
    },

    methods: {

        getUnitInfo() {
            AInstance.get('/api/units/one', {
                params: {
                    unit_id: this.unit_id
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    this.unitInfo.data = response.data.data
                    this.unitInfo.status = response.status
                    this.unitInfo.message = response.message

                    this.unitInfo.data.start_date = convertDate(this.unitInfo.data.start_date)
                    this.unitInfo.data.end_date = convertDate(this.unitInfo.data.end_date)
                }
            })
            .catch((error) => {
                this.unitInfo.status = error.response.data.code
                this.unitInfo.message = error.response.data.message
            })
        },

        refresh(value) {
            if (value.refresh) this.getUnitInfo()
            this.TABS_OPTIONS[value.tab].onEdit = false
        },

        /**
         * Changes the view of tab.
         */
        changeTabView(tabOption) {
            if (tabOption === this.selectedTab) return
            this.TABS_OPTIONS[this.selectedTab].selected = false
            this.TABS_OPTIONS[tabOption].selected = true
            this.selectedTab = this.TABS_OPTIONS[tabOption].key
        },
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

.content .info {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    height: 50px;
}

.content .info div {
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: 700;
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

    .content .info {
        position: relative;
        display: flex;
        align-items: center;
        gap: 20px;
        width: 100%;
        height: 50px;
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

.content .view-tabs .tabs .tab.selected {
    font-size: $font-size-list-item-selected;
    border-bottom: 2px solid $color-scheme-primary-active;
}

.content .unit-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
}

.content .unit-card .view-controls {
    position: relative;
    display: block;
    width: 100%;
}

.content .unit-card .unit-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
}

.content .unit-card .unit-info .key {
    position: relative;
    font-weight: 700;
    font-size: 0.925rem;
    flex-grow: 5;
}

.content .unit-card .unit-info .value {
    position: relative;
    font-size: 0.85rem;
}

@media only screen and (min-width:1280px) {
    .content .unit-card .view-controls {
        position: relative;
        display: block;
        width: 100px;
    }

    .content .unit-card .unit-info .key {
        position: relative;
        font-weight: 700;
        font-size: 1.05rem;
        max-width: 300px;
    }

    .content .unit-card .unit-info .value {
        position: relative;
    }
}

</style>