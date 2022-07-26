<template>
    <div class='base'>
        <AppHeader></AppHeader>
        <div class='content'>
            <template v-if='!addTS'>
                <div class='header'> Teaching Spaces </div>
                <div class='view-controls'>
                    <FButton 
                    label='Create'
                    icon='common/add-white.png'
                    color='success'
                    @clicked='switchView()'>
                    </FButton>
                </div>

                <template v-if='TABLE_OPTIONS.code === 200'>
                    <b-table
                    :data='TABLE_OPTIONS.data'
                    :columns='TABLE_OPTIONS.columns'
                    
                    :paginated='true'
                    :per-page='TABLE_OPTIONS.perPage'
                    :total='TABLE_OPTIONS.data.length'
                    aria-next-label="Next"
                    aria-previos-label="Previous"
                    aria-page-label="Page"
                    aria-current-label="Current">

                    </b-table>
                </template>
                <template v-else>
                    <FStatusResponses
                    :code='TABLE_OPTIONS.code'
                    :message='TABLE_OPTIONS.message'/>
                </template> 
            </template>

            <template v-else>
                <div class='header'> Create Teaching Space </div>
                <div class='view-controls'>
                    <FButton 
                    label='Return'
                    color='danger'
                    outlined
                    @clicked='switchView()'>
                    </FButton>
                </div>

                <TeachingSpaceForm @created='updateInfo()'/>
            </template>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/common/AppMenu.vue'
import FButton from '@/components/common/FButton.vue'
import FStatusResponses from '@/components/status/FStatusResponses.vue'
import { AInstance } from '@/toolbox/TAxios.js'
import TeachingSpaceForm from '@/views/teaching-space/TeachingSpaceForm.vue'

export default {
    name: 'TeachingSpaces',
    components: {
        AppHeader,
        TeachingSpaceForm,
        FButton,
        FStatusResponses
    },

    mounted() {
        this.loadInfo()
    },

    data() {
        var addTS = false
        var TABLE_OPTIONS = {
            'columns': [
                {
                    field: 'building_number',
                    label: 'Building Number',
                    searchable: true
                },
                {
                    field: 'floor_number',
                    label: 'Floor Number',
                    searchable: true
                },
                {
                    field: 'room_number',
                    label: 'Room Number',
                    searchable: true
                },
                {
                    field: 'capacity',
                    label: 'Capacity',
                    searchable: true
                },
                {
                    field: 'type',
                    label: 'Space Type',
                    searchable: true
                }
            ],
            'data': [],
            'perPage': 10,
            'selected': null,
            'code': 0,
            'message': ''
        }
        
        

        return {
            addTS,
            TABLE_OPTIONS,
        }
    },

    methods: {
        loadInfo() {
            AInstance.get('/api/teaching-spaces/')
            .then((response) => {
                if ( response.status === 200 ) {
                    this.TABLE_OPTIONS.code = response.data.code
                    this.TABLE_OPTIONS.data = response.data.data
                    this.TABLE_OPTIONS.message = response.data.message
                }

                else if ( response.status === 204 ) {
                    this.TABLE_OPTIONS.code = 204
                    this.TABLE_OPTIONS.message = 'There are no teaching spaces!'
                }
            
            })
            .catch((error) => {
                this.TABLE_OPTIONS.code = error.response.data.code
                this.TABLE_OPTIONS.message = error.response.data.message
            })
        },

        updateInfo() {
            this.loadInfo()
            this.switchView()
        },

        switchView() {
            this.addTS = !this.addTS
        },

        isTableSelected() {
            return this.selected === null
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

.content .view-controls {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
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

    .content .view-controls {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 25px;
    }
}

.content .view-controls * {
    width: 100px;
}

</style>