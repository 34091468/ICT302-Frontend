//  ================================================================================
//  FILE                :
//  TAccounts.js
//
//  AUTHOR              :
//  NG JUN GUO
//
//  SINCE               :
//  25 JUN 2022
//
//  VERSION             :
//  1.0
//
//  TYPE                :
//  Consts
//
//  SUMMARY             :
//  A list of constants declared for the purpose
//  of assisting with any functionalities related to
//  Accounts.
//  ================================================================================

/**
 * Account Group Type to be assigned when creating an account.
 * @type { object.string }
 */
const ACCOUNT_GROUP_TYPE = {
    1: {
        type: 'SUPER_ADMIN',
        label: 'Super Administrator'
    },
    2: {
        type: 'ADMINISTRATOR',
        label: 'Administrator'
    },
    3: {
        type: 'UNIT_COORDINATOR',
        label: 'Unit Coordinator'
    },
    4: {
        type: 'TEACHER',
        label: 'Teacher'
    },
    5: {
        type: 'STUDENT',
        label: 'Student'
    }
}

module.exports = {
    ACCOUNT_GROUP_TYPE
}