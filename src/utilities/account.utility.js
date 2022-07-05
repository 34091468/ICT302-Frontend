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

const MINIMUM_AGE = 18

module.exports = {
    ACCOUNT_GROUP_TYPE,
    GENDER_TYPE,
    MINIMUM_AGE
}