export interface Page {
  name: string;
  url?: string;
  type: 'Dropdown' | 'Link';
  children?: Page[];
}

const USER_PAGES: Array<Page> = [
  {
    name: 'PUBLIC HOLIDAY',
    type: 'Dropdown',
    children: [
      {
        name: 'Holiday Group',
        url: 'holiday-groups',
        type: "Link"
      },
      {
        name: 'Holiday',
        url: 'holidays',
        type: "Link"
      }
    ]
  },
  {
    name: 'EMPLOYEE MANAGEMENT',
    type: 'Dropdown',
    children: [
      {
        name: 'Employee',
        url: 'employees',
        type: "Link"
      },
      {
        name: 'Leave Request',
        url: 'leave-request',
        type: "Link"
      },
      {
        name: 'Daily Attendant',
        url: 'daily-attendant',
        type: 'Link'
      }
    ]
  }
];

const HR_PAGES: Array<Page> = [
  {
    name: 'Master Setup',
    type: 'Dropdown',
    children: [
      {
        name: 'Position',
        url: 'positions',
        type: "Link"
      },
      {
        name: 'Department',
        url: 'departments',
        type: "Link"
      },
      {
        name: 'Dependent Type',
        url: 'dependent-types',
        type: "Link"
      },
      {
        name: 'Leave Type',
        url: 'leave-types',
        type: "Link"
      },
      {
        name: 'Working Calendar',
        url: 'working-calendar',
        type: "Link"
      }
    ]
  },
  {
    name: 'PUBLIC HOLIDAY',
    type: 'Dropdown',
    children: [
      {
        name: 'Holiday Group',
        url: 'holiday-groups',
        type: "Link"
      },
      {
        name: 'Holiday',
        url: 'holidays',
        type: "Link"
      }
    ]
  },
  {
    name: 'Employee Management',
    type: 'Dropdown',
    children: [
      {
        name: 'Employee',
        url: 'employees',
        type: "Link"
      },
      {
        name: 'Leave Request',
        url: 'leave-request',
        type: "Link"
      },
      {
        name: 'Employee Leave',
        url: 'employee-leave',
        type: "Link"
      },
      {
        name: 'Daily Attendant',
        url: 'daily-attendant',
        type: 'Link'
      }
    ]
  }
];

const MANAGER_PAGES: Array<Page> = [
  {
    name: 'PUBLIC HOLIDAY',
    type: 'Dropdown',
    children: [
      {
        name: 'Holiday Group',
        url: 'holiday-groups',
        type: "Link"
      },
      {
        name: 'Holiday',
        url: 'holidays',
        type: "Link"
      }
    ]
  },
  {
    name: 'EMPLOYEE MANAGEMENT',
    type: 'Dropdown',
    children: [
      {
        name: 'Employee',
        url: 'employees',
        type: "Link"
      },
      {
        name: 'Leave Request',
        url: 'leave-request',
        type: "Link"
      },
      {
        name: 'Employee Leave',
        url: 'employee-leave',
        type: "Link"
      },
      {
        name: 'Daily Attendant',
        url: 'daily-attendant',
        type: 'Link'
      }
    ]
  }
];

const ADMIN_PAGES: Array<Page> = [
  {
    name: 'Master Setup',
    type: 'Dropdown',
    children: [
      {
        name: 'Position',
        url: 'positions',
        type: "Link"
      },
      {
        name: 'Department',
        url: 'departments',
        type: "Link"
      },
      {
        name: 'Dependent Type',
        url: 'dependent-types',
        type: "Link"
      },
      {
        name: 'Leave Type',
        url: 'leave-types',
        type: "Link"
      },
      {
        name: 'Working Calendar',
        url: 'working-calendar',
        type: "Link"
      }
    ]
  },
  {
    name: 'PUBLIC HOLIDAY',
    type: 'Dropdown',
    children: [
      {
        name: 'Holiday Group',
        url: 'holiday-groups',
        type: "Link"
      },
      {
        name: 'Holiday',
        url: 'holidays',
        type: "Link"
      }
    ]
  },
  {
    name: 'EMPLOYEE MANAGEMENT',
    type: 'Dropdown',
    children: [
      {
        name: 'Employee',
        url: 'employees',
        type: "Link"
      },
      {
        name: 'Leave Request',
        url: 'leave-request',
        type: "Link"
      },
      {
        name: 'Employee Leave',
        url: 'employee-leave',
        type: "Link"
      },
      {
        name: 'Daily Attendant',
        url: 'daily-attendant',
        type: 'Link'
      }
    ]
  },
  {
    name: 'USER MANAGEMENT',
    type: 'Dropdown',
    children: [
      {
        name: 'Roles',
        type: 'Link',
        url: 'roles'
      },
      {
        name: 'Users',
        type: 'Link',
        url: 'users'
      }
    ]
  }
];

export const pagePermission = new Map();
pagePermission.set('User', USER_PAGES);
pagePermission.set('HR', HR_PAGES);
pagePermission.set('MANAGER', MANAGER_PAGES);
pagePermission.set('ADMIN', ADMIN_PAGES);
