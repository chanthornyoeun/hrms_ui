export enum ApiEndPointEnum {
    POSITION = '/api/position',
    EMPLOYEE = '/api/employee',
    DEPARTMENT = '/api/department',
    LEAVE_TYPE = '/api/leave-type',
    DEPENDENT_TYPE = '/api/dependent-type',
    WORKING_CALENDAR = '/api/working-calendar',
    HOLIDAY_GROUP = '/api/holiday-group',
    HOLIDAY = '/api/holiday',
    LOGIN = '/api/auth/login',
    LOGOUT = '/api/auth/logout',
    RESET_PASSWORD = '/api/auth/reset-user-authentication',
    DEVICE_TOKEN = '/api/auth/current-user-device-token',
    LEAVE_REQUEST = '/api/leave-request',
    CURRENT_USER = '/api/auth/current-user',
    CANCEL_LEAVE_REQUEST = '/api/leave-request-cancel',
    CALCULATE_LEAVE_DAY = '/api/calculate-leave-days',
    REJECT_LEAVE_REQUEST = '/api/leave-request-reject',
    APPROVE_LEAVE_REQUEST = '/api/leave-request-approve',
    ROLE = '/api/role',
    USER = '/api/user',
    USER_ROLE = '/api/user-role',
    FILE_UPLOAD = '/api/file-storage/upload',
    LEAVE_SUMMARY = '/api/leave-summary',
    EXPERIENCE = '/api/experience',
    EDUCATION = '/api/education',
    TRAINING = '/api/employee-training',
    DEPENDENT = '/api/dependent',
    ATTENDANCE = '/api/attendant',
    ATTENDANT_AS_CALENDAR = '/api/attendant-as-calendar',
    ATTENDANT_EXPORT = '/api/attendant-export',
    CHECK_IN = '/api/attendant-check-in',
    CHECK_OUT = '/api/attendant-check-out',
    EMAIL_CONFIGURE = '/api/email-configure',
    EMAIL_TESTER = '/api/sent-email-test',
    PAGE = '/api/page',
    CURRENT_USER_PAGE = '/api/role-page-current-account',
    ROLE_PAGE = '/api/role-page',
    CALENDAR = '/api/calendar',
    NOTIFICATION = '/api/notification',
    NOTIFICATION_BADGE_COUNT = '/api/user-badge-count',
    CLEAR_BADGE_COUNT = '/api/notification-clear-badge-count',
    MARK_AS_READ = '/api/notification-mark-as-read',
    MARK_ALL_AS_READ = '/api/notification-mark-all-as-read',
    MARK_AS_UNREAD = '/api/notification-mark-as-unread',
    MARK_ALL_AS_UNREAD = '/api/notification-mark-all-as-unread',
    REMOVE_ALL_NOTIFICATION = '/api/notification-remove-all',
    DASHBOARD_CARD = '/api/dashboard-data',
    QR_CODE_ATTENDENT = '/api/qr-code/attendant',
    ANNOUNCEMENT = '/api/holiday-announcement',
    PENDING_LEAVE = '/api/leave-request-pending',
    TODAY_LEAVE = '/api/leave-request-today'
}
