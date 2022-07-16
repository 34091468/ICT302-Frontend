export const MONTH_STRING = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}

export var convertDate = function(dateString, short) {
    let date = new Date(dateString)
    let dd = date.getDate().toString( )
    if (dd.length < 2) dd = 0 + dd
    let mm = MONTH_STRING[ date.getMonth() ]
    if (short) mm = mm.substring(0, 3)
    let yyyy = date.getFullYear( ).toString( )
    return dd + ' ' + mm + ' ' + yyyy
}

export var convertYear = function(dateString) {
    let date = new Date(dateString)
    return date.getFullYear()
}

/**
 * Prints error message for date being the same.
 * @param { String } compareFrom 
 * @param { String } compareTo 
 * @returns 
 */
export var errorSameDateMessage = function (compareFrom, compareTo) {
    return compareFrom + ' and ' + compareTo + ' cannot have the same date!'
}

/**
 * Prints error message for date being bigger.
 * @param { String } compareFrom 
 * @param { String } compareTo 
 */
export var errorDateBiggerThanMessage = function (compareFrom, compareTo) {
    return compareFrom + ' cannot be later than ' + compareTo + '!'
}