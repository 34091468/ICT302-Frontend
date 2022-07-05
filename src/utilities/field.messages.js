/**
 * Generates empty inputfield message.
 * @param { String } field 
 * @returns { String }
 */
var emptyInputMessage = function (field = '') {
    if (field === '') return 'This field cannot be empty!'
    return field + ' cannot be empty!'
}

/**
 * Generates No Number on inputfield message.
 * @param { String } field 
 * @returns { String }
 */
var alphabetsOnlyMessage = function (field = '') {
    if (field === '') return 'This field cannot contain numbers and special characters!'
    return field + ' cannot contain numbers and special characters!'
}

/**
 * Generates Minimum Length inputfield message.
 * @param { Number } length 
 * @param { String } field 
 * @returns { String }
 */
var noMinimumLengthMessage = function (length, field = '') {
    if (field === '') return 'This field must have a minimum length of ' + length + '!'
    return field + ' must have a minimum length of ' + length + '!'
}

/**
 * Generates invalid identity number message.
 * @returns { String }
 */
var errorIdentityNumberMessage = function () {
    return 'Identity Number is incorrect!'
}

/**
 * Generates only Numeric Message.
 * @param { String } field 
 * @returns 
 */
var onlyNumericMessage = function (field = '') {
    if (field === '') return 'This field can contain only numbers!'
    return field + ' can contain only numbers!'
}

/**
 * Generates no selection on dropdown message.
 * @param { String } field 
 * @returns { String }
 */
var emptyDropdownMessage = function (field = '') {
    if (field === '') return 'Please select from the list of dropdown!'
    return 'Please select ' + field + ' from the list of dropdown!'
}


module.exports = {
    emptyInputMessage,
    noMinimumLengthMessage,
    errorIdentityNumberMessage,
    onlyNumericMessage,
    alphabetsOnlyMessage,
    emptyDropdownMessage
}