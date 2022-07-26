<template>
    <div class='base'>
        <div class='content'>
            <template v-for='form in formData'>
                <div class='content' :key='form.label'>

                    <!-- Input Field Form Component -->
                    <template v-if='form.type === "input-field"'>
                        <b-field :label='form.label' :type='form.color' :message='form.message'>
                            <b-input 
                            v-model='form.value'
                            expanded
                            :has-counter='false'
                            :maxlength='form.maxlength'
                            :type='form.input_type'></b-input>
                        </b-field>
                    </template>
                    <!-- Input Field Form Component -->
                    <!-- END -->

                    <template v-else-if='form.type === "drop-down"'>
                        <b-field :label='form.label' :type='form.color' :message='form.message'>
                            <b-dropdown aria-role='list' expanded v-model='form.value'>
                                <template #trigger='{ active }'>
                                    <b-button
                                    :label='form.value'
                                    :type='form.color'
                                    :icon-right='active ? "menu-up" : "menu-down"'
                                    outlined
                                    expanded/>
                                </template>

                                
                                <template v-for='listitem in form.selection'>
                                    <b-dropdown-item :key='listitem' :value='listitem' aria-role="listitem"> {{ listitem }} </b-dropdown-item>
                                </template>
                                
                                
                            </b-dropdown>
                        </b-field>
                    </template>

                </div>
            </template>
            <div class='controls'>
                <FButton
                label='Register'
                color='success'
                @clicked='validate()'></FButton>
            </div>
        </div>
    </div>
</template>

<script>
import FButton from '@/components/common/FButton.vue'
import { AInstance } from '@/toolbox/TAxios.js'
import { emptyInputMessage, noMinimumLengthMessage, onlyNumericMessage } from '@/utilities/field.messages.js'
import { NUMERIC_ONLY_REGEX } from '@/utilities/regex.utility.js'
export default {
    name: 'TeachingSpaceForm',
    components: {
        FButton
    },

    data() {
        var formData = {

            building_number: {
                label: 'Building Number',
                placeholder: 'Enter building number...',
                type: 'input-field',
                input_type: 'text',
                minlength: 1,
                maxlength: 10,
                value: '',
                color: '',
                message: ''
            },

            floor_number: {
                label: 'Floor Number',
                placeholder: 'Enter floor number...',
                type: 'input-field',
                input_type: 'text',
                minLength: 2,
                maxlength: 3,
                value: '',
                color: '',
                message: ''
            },

            room_number: {
                label: 'Room Number',
                placeholder: 'Enter room number...',
                type: 'input-field',
                input_type: 'text',
                minlength: 1,
                maxlength: 4,
                value: '',
                color: '',
                message: ''
            },

            capacity: {
                label: 'Capacity',
                placeholder: 'Space capacity...',
                type: 'input-field',
                input_type: 'text',
                minlength: 1,
                maxlength: 4,
                value: '',
                color: '',
                message: ''
            },

            type: {
                label: 'Space Type',
                type: 'drop-down',
                drop_type: 'full',
                selection: [
                    'Class',
                    'Lecture Hall',
                    'Threatre'
                ],
                value: 'Class',
                color: '',
                message: ''
            },
        }

        return {
            formData
        }
    },

    methods: {
        validate() {
            let success = true

            // Building Number
            if (this.formData.building_number.value === '' ||
                this.formData.building_number.value === null ||
                this.formData.building_number.value === undefined) {
                
                this.formData.building_number.color = 'is-danger'
                this.formData.building_number.message = emptyInputMessage('Building Number')
                success = false
            }

            else if (this.formData.building_number.value.length < this.formData.building_number.minlength) {
                this.formData.building_number.color = 'is-danger'
                this.formData.building_number.message = noMinimumLengthMessage(this.formData.building_number.minlength)
                success = false
            }

            else {
                this.formData.building_number.color = 'is-success'
                this.formData.building_number.message = ''
            }

            // Floor Number
            if (this.formData.floor_number.value === '' ||
                this.formData.floor_number.value === null ||
                this.formData.floor_number.value === undefined) {
                
                this.formData.floor_number.color = 'is-danger'
                this.formData.floor_number.message = emptyInputMessage('Floor Number')
                success = false
            }

            else if (this.formData.floor_number.value.length < this.formData.floor_number.minlength) {
                this.formData.floor_number.color = 'is-danger'
                this.formData.floor_number.message = noMinimumLengthMessage(this.formData.floor_number.minlength)
                success = false
            }

            else if (!this.formData.floor_number.value.match(NUMERIC_ONLY_REGEX)) {
                this.formData.floor_number.color = 'is-danger'
                this.formData.floor_number.message = onlyNumericMessage('Floor Number')
                success = false
            }

            else {
                this.formData.floor_number.color = 'is-success'
                this.formData.floor_number.message = ''
            }

            // Room Number
            if (this.formData.room_number.value === '' ||
                this.formData.room_number.value === null ||
                this.formData.room_number.value === undefined) {
                
                this.formData.room_number.color = 'is-danger'
                this.formData.room_number.message = emptyInputMessage('Room Number')
                success = false
            }

            else if (this.formData.room_number.value.length < this.formData.room_number.minlength) {
                this.formData.room_number.color = 'is-danger'
                this.formData.room_number.message = noMinimumLengthMessage(this.formData.room_number.minlength)
                success = false
            }

            else {
                this.formData.room_number.color = 'is-success'
                this.formData.room_number.message = ''
            }

            // Capacity
            if (this.formData.capacity.value === '' ||
                this.formData.capacity.value === null ||
                this.formData.capacity.value === undefined) {
                
                this.formData.capacity.color = 'is-danger'
                this.formData.capacity.message = emptyInputMessage('Capacity')
                success = false
            }

            else if (this.formData.capacity.value.length < this.formData.capacity.minlength) {
                this.formData.capacity.color = 'is-danger'
                this.formData.capacity.message = noMinimumLengthMessage(this.formData.capacity.minlength)
                success = false
            }

            else if (!this.formData.capacity.value.match(NUMERIC_ONLY_REGEX)) {
                this.formData.capacity.color = 'is-danger'
                this.formData.capacity.message = onlyNumericMessage('Capacity')
                success = false
            }

            else {
                this.formData.capacity.color = 'is-success'
                this.formData.capacity.message = ''
            }

            if ( success ) {
                AInstance.post('/api/teaching-spaces/create', {
                    building_number: this.formData.building_number.value,
                    floor_number: this.formData.floor_number.value,
                    room_number: this.formData.room_number.value,
                    capacity: this.formData.capacity.value,
                    type: this.formData.type.value,
                })
                .then((response) => {
                    if (response.data.code === 201) {
                        this.$buefy.toast.open({
                            duration: 3000,
                            type: 'is-success',
                            message: response.data.message
                        })

                        this.$emit('created')
                    }
                })
                .catch((error) => {
                    this.$buefy.toast.open({
                        duration: 3000,
                        type: 'is-danger',
                        message: error.response.data.message
                    })
                })
            }
        }
    }
}
</script>

<style scoped lang='scss'>

.form {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 25px;
    padding: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.form .content {
    position: relative;
    width: 90%;
    margin: 0;
    padding: 0;
    border: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.form .controls {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    gap: 25px;
    margin: 0;
    padding: 0;
    border: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

@media only screen and (min-width:1280px) {
    .form .content {
        position: relative;
        width: 40%;
        margin: 0;
        padding: 0;
        border: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .form .controls {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 40%;
        gap: 25px;
        margin: 0;
        padding: 0;
        border: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
}

</style>