/**
 * Generates no minimum age message.
 * @param { Number } age
 * @returns { String }
 */
var noMinimumAgeMessage = function (age) {
    return 'The minimum age of ' + age + ' has not been passed!'
}

module.exports = {
    noMinimumAgeMessage
}