/**
 * Information of an Account Group Type.
 * @type { Object }
 */
const ACCOUNT_GROUP_TYPE = {
    SUPER_ADMIN: {
        label: 'Super Administrator',
        key: 'SUPER_ADMIN',
        slug: 'super_administrator',
        group_num: 1
    },
    ADMINISTRATOR: {
        label: 'Administrator',
        key: 'ADMINISTRATOR',
        slug: 'administrator',
        group_num: 2
    },
    UNIT_COORDINATOR: {
        label: 'Unit Coordinator',
        key: 'UNIT_COORDINATOR',
        slug: 'unit_coordinator',
        group_num: 3
    },
    TEACHER: {
        label: 'Teacher',
        key: 'TEACHER',
        slug: 'teacher',
        group_num: 4
    },
    STUDENT: {
        label: 'Student',
        key: 'STUDENT',
        slug: 'student',
        group_num: 5
    }
}

/**
 * Information of Gender Type
 * @type { Object }
 */
const GENDER_TYPE = {
    FEMALE: {
        index: 0,
        value: 'Female'
    },
    MALE: {
        index: 1,
        value: 'Male'
    }
}

/**
 * Information of Gender Type Index
 * @type { Object }
 */
const GENDER_TYPE_INDEX = {
    0: 'Female',
    1: 'Male'
}

/**
 * Minimum age of registration.
 * @type { Number }
 */
const MINIMUM_AGE = 18

/**
 * Status of an account.
 * @type { Array }
 */
const ACCOUNT_STATUS = [
    {
        index: 1,
        status: 'ACTIVE',
    },
    {
        index: 2,
        status: 'SUSPENDED',
    },
    {
        index: 3,
        status: 'INACTIVE',
    },
    {
        index: 4,
        status: 'DELETED',
    }
]

module.exports = {
    ACCOUNT_GROUP_TYPE,
    GENDER_TYPE,
    GENDER_TYPE_INDEX,
    MINIMUM_AGE,
    ACCOUNT_STATUS
}