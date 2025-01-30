import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    permissions: ['MerchantsMap'],
    children: [
      // {
      //   id: 'dashboard',
      //   title: 'Dashboard',
      //   type: 'item',
      //   url: '/dashboard',
      //   icon: 'feather icon-home',
      //   classes: 'nav-item'
      // }
    ]
  },
  // {
  //   id: 'ui-element',
  //   title: 'UI ELEMENT',
  //   type: 'group',
  //   icon: 'icon-ui',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'Component',
  //       type: 'collapse',
  //       icon: 'feather icon-box',
  //       children: [
  //         {
  //           id: 'button',
  //           title: 'Button',
  //           type: 'item',
  //           url: '/basic/button'
  //         },
  //         {
  //           id: 'badges',
  //           title: 'Badges',
  //           type: 'item',
  //           url: '/basic/badges'
  //         },
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'Breadcrumb & Pagination',
  //           type: 'item',
  //           url: '/basic/breadcrumb-paging'
  //         },
  //         {
  //           id: 'collapse',
  //           title: 'Collapse',
  //           type: 'item',
  //           url: '/basic/collapse'
  //         },
  //         {
  //           id: 'tabs-pills',
  //           title: 'Tabs & Pills',
  //           type: 'item',
  //           url: '/basic/tabs-pills'
  //         },
  //         {
  //           id: 'typography',
  //           title: 'Typography',
  //           type: 'item',
  //           url: '/basic/typography'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 'forms',
  //   title: 'Forms & Tables',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'forms-element',
  //       title: 'Form Elements',
  //       type: 'item',
  //       url: '/forms/basic',
  //       classes: 'nav-item',
  //       icon: 'feather icon-file-text'
  //     },
  //     {
  //       id: 'tables',
  //       title: 'Tables',
  //       type: 'item',
  //       url: '/tables/bootstrap',
  //       classes: 'nav-item',
  //       icon: 'feather icon-server'
  //     }
  //   ]
  // },
  // {
  //   id: 'chart-maps',
  //   title: 'Chart',
  //   type: 'group',
  //   icon: 'icon-charts',
  //   children: [
  //     {
  //       id: 'apexChart',
  //       title: 'ApexChart',
  //       type: 'item',
  //       url: 'apexchart',
  //       classes: 'nav-item',
  //       icon: 'feather icon-pie-chart'
  //     }
  //   ]
  // },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-pages',
  //   children: [
  //     {
  //       id: 'auth',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/auth/signup',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/auth/signin',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar'
  //     },
  //     // {
  //     //   id: 'disabled-menu',
  //     //   title: 'Disabled Menu',
  //     //   type: 'item',
  //     //   url: 'javascript:',
  //     //   classes: 'nav-item disabled',
  //     //   icon: 'feather icon-power',
  //     //   external: true
  //     // },
  //     // {
  //     //   id: 'buy_now',
  //     //   title: 'Buy Now',
  //     //   type: 'item',
  //     //   icon: 'feather icon-book',
  //     //   classes: 'nav-item',
  //     //   url: 'https://codedthemes.com/item/datta-able-angular/',
  //     //   target: true,
  //     //   external: true
  //     // }
  //   ]
  // },

  {
    id: 'user-management',
    title: 'الإعدادات الرئيسية',
    type: 'group',
    icon: 'icon-ui',
    permissions: ['MerchantsMap'],
    children: [
      {
        id: 'basic',
        title: 'الإعدادات الرئيسية',
        type: 'collapse',
        icon: 'feather icon-box',
        permissions: ['MerchantsMap'],
        children: [
          {
            id: 'button',
            title: 'الصلاحيات',
            type: 'item',
            url: '/Permission',
            permissions: ['MerchantsMap'],

          },
          {
            id: 'badges',
            title: 'المستخدمين',
            type: 'item',
            url: '/Users'
          }
          // ,{
          //   id: 'breadcrumb-pagination',
          //   title: 'أنشطة المستخدمين',
          //   type: 'item',
          //   url: '/basic/breadcrumb-paging'
          // },
          // {
          //   id: 'collapse',
          //   title: 'إعدادات النظام',
          //   type: 'item',
          //   url: '/basic/collapse'
          // }
        ]
      }
    ]
  },

  {
    id: 'user-management',
    title: 'التعريفات',
    type: 'group',
    icon: 'icon-ui',
    permissions: ['MerchantsMap'],
    children: [
      {
        id: 'basic',
        title: 'التعريفات',
        type: 'collapse',
        icon: 'feather icon-file-text',
        permissions: ['MerchantsMap'],
        children: [
          {
            id: 'button',
            title: 'المصارف',
            type: 'item',
            url: '/bank',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'badges',
            title: 'فروع المصارف',
            type: 'item',
            url: '/BankBranches',
            permissions: ['MerchantsMap'],

          },
          {
            id: 'breadcrumb-pagination',
            title: 'تصنيف فروع المصارف ',
            type: 'item',
            url: '/ClassificationBankBranches',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'collapse',
            title: 'أنواع العلاوات',
            type: 'item',
            url: '/BonusesTypes',
            permissions: ['MerchantsMap'],

          },
          {
            id: 'collapse',
            title: 'أنواع المستندات',
            type: 'item',
            url: '/DocumentTypes',
            permissions: ['MerchantsMap'],
          },
          // {
          //   id: 'collapse',
          //   title: 'أنواع التقييمات',
          //   type: 'item',
          //   url: '/EvaluationsTypes'
          // },
          {
            id: 'collapse',
            title: 'أنواع المكافاّت',
            type: 'item',
            url: '/RewardsTypes',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'collapse',
            title: 'أنواع الإجازات',
            type: 'item',
            url: '/VacationsTypes',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'collapse',
            title: 'المؤهلات العلمية',
            type: 'item',
            url: '/ScientificQualifications',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'collapse',
            title: 'المحاكم',
            type: 'item',
            url: '/Courts',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'collapse',
            title: 'الجنسيات',
            type: 'item',
            url: '/Nationalities',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'collapse',
            title: 'الجزاءات',
            type: 'item',
            url: '/Penalties',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'AddEmployeeEvaluationType',
            title: 'إضافة تقييم جديد',
            type: 'item',
            // icon: 'feather',
            url: '/AddEmployeeEvaluationType',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'ShowEmployeeEvaluationType',
            title: 'قائمة أنواع التقييمات',
            type: 'item',
            // icon: 'feather',
            url: '/ShowEmployeeEvaluationType',
            permissions: ['MerchantsMap'],
          }
          // {
          //   id: 'EvaluationTypes',
          //   title: 'أنواع التقييمات',
          //   type: 'collapse',
          //   // icon: 'feather icon-activity',
          //   children: [
          //     {
          //       id: 'AddEmployeeEvaluationType',
          //       title: 'إضافة تقييم جديد',
          //       type: 'item',
          //       // icon: 'feather',
          //       url: '/AddEmployeeEvaluationType'
          //     },
          //     {
          //       id: 'ShowEmployeeEvaluationType',
          //       title: 'قائمة أنواع التقييمات',
          //       type: 'item',
          //       // icon: 'feather',
          //       url: '/ShowEmployeeEvaluationType'
          //     }
          //   ]
          // }
        ]
      }
    ]
  },
  {
    id: 'user-management',
    title: 'الشؤون الإدارية',
    type: 'group',
    icon: 'icon-ui',
    permissions: ['MerchantsMap'],
    children: [
      {
        id: 'basic',
        title: 'الشؤون الإدارية',
        type: 'collapse',
        icon: 'feather icon-users',
        permissions: ['MerchantsMap'],
        children: [
          {
            id: 'button',
            title: 'الهيكلية الإدارية',
            type: 'item',
            url: '/OrganizationalUnit',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'badges',
            title: 'تصنيفات الوظيفية',
            type: 'item',
            url: '/ClassificationBranches',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'breadcrumb-pagination',
            title: 'المسميات الوظيفية',
            type: 'item',
            url: '/JobTitle',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'breadcrumb-pagination',
            title: 'تعريف وظيفة',
            type: 'item',
            url: '/DefinitionPosition',
            permissions: ['MerchantsMap'],
          }

          // },
          // {
          //   id: 'collapse',
          //   title: 'تقييمات المستخدم',
          //   type: 'item',
          //   url: '/EmployeeEvaluation'
          // }
          // ,
          // {
          //   id: 'collapse',
          //   title: 'تقارير المستخدمين',
          //   type: 'item',
          //   url: '/basic/collapse'
          // },
          // {
          //   id: 'collapse',
          //   title: 'انتهاء الخدمة',
          //   type: 'item',
          //   url: '/basic/collapse'
          // },
          // {
          //   id: 'collapse',
          //   title: 'الدرجات والعلاوات',
          //   type: 'item',
          //   url: '/basic/collapse'
          // },
          // {
          //   id: 'collapse',
          //   title: 'حركات المستخدمين',
          //   type: 'item',
          //   url: '/basic/collapse'
          // },
          // {
          //   id: 'collapse',
          //   title: 'حركات ترقيات المستخدمين',
          //   type: 'item',
          //   url: '/basic/collapse'
          // }
        ]
      }
    ]
  },
  {
    id: 'compensation-benefits ',
    title: 'التعويض والمزايا',
    type: 'group',
    icon: 'icon-ui',
    permissions: ['MerchantsMap'],
    children: [
      {
        id: 'basic',
        title: 'التعويض والمزايا',
        type: 'collapse',
        icon: 'feather icon-star',
        permissions: ['MerchantsMap'],
        children: [
          {
            id: 'collapse',
            title: 'المستخدمين',
            type: 'item',
            url: '/Employee',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'collapse',
            title: 'علاوات المستخدمين',
            type: 'item',
            url: '/EmployeeBonuses',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'collapse',
            title: 'المصحات',
            type: 'item',
            url: '/Clinics',
            permissions: ['MerchantsMap'],
          },
          // {
          //   id: 'collapse',
          //   title: ' 07 - إعادة تصنيف',
          //   type: 'item',
          //   url: '/ReClassification'
          // },
          // {
          //   id: 'collapse',
          //   title: ' 15 - انتداب على وظيفة',
          //   type: 'item',
          //   url: '/SecondmentToOtherPosition'
          // },
          // {
          //   id: 'collapse',
          //   title: '10 - ترقية مستخدم',
          //   type: 'item',
          //   url: '/Promotion'
          // },
          // {
          //   id: 'collapse',
          //   title: '06 - ترقية بدون زيادة',
          //   type: 'item',
          //   url: '/UpgradeWithoutIncrease'
          // },
          // {
          //   id: 'collapse',
          //   title: '05 - تخفيض الدرجة',
          //   type: 'item',
          //   url: '/Demotion'
          // },
          // , {
          //   id: 'collapse',
          //   title: 'إنهاء خدمة',
          //   type: 'item',
          //   url: '/TerminationService'
          // }
          {
            id: 'collapse',
            title: 'إجراءات المستخدمين',
            type: 'item',
            url: '/functionalProcedures',
            permissions: ['MerchantsMap'],

          }
        ]
      }
    ]
  },
  {
    id: 'Usage',
    title: 'الإستخدام',
    type: 'group',
    icon: 'icon-ui',
    permissions: ['MerchantsMap'],
    children: [
      {
        id: 'basic',
        title: 'الإستخدام',
        type: 'collapse',
        icon: 'feather icon-user',
        permissions: ['MerchantsMap'],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'إضافة مستخدم',
            type: 'item',
            url: '/AddEmployee',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'collapse',
            title: '02 - إعادة تعيين',
            type: 'item',
            url: '/ReHire',
            permissions: ['MerchantsMap'],

          },
          // {
          //   id: 'collapse',
          //   title: '03 - نقل',
          //   type: 'item',
          //   url: '/Demotion'
          // },
          {
            id: 'collapse',
            title: '04 - تغيير تاريخ التعيين',
            type: 'item',
            url: '/ChangeDateOfHire',
            permissions: ['MerchantsMap'],

          },
          {
            id: 'collapse',
            title: '05 - تخفيض الدرجة',
            type: 'item',
            url: '/Demotion',
            permissions: ['MerchantsMap'],

          },
          {
            id: 'collapse',
            title: 'الخدمة المتصلة',
            type: 'item',
            url: '/ConnectedService',
            permissions: ['MerchantsMap'],

          }
        ]
      }
    ]
  },
  {
    id: 'employeeEvaluationManagementGroup',
    title: 'إدارة التقييمات',
    type: 'group',
    icon: 'icon-ui',
    permissions: ['MerchantsMap'],
    children: [
      {
        id: 'basic',
        title: 'إدارة التقييمات',
        type: 'collapse',
        icon: 'feather icon-activity',
        permissions: ['MerchantsMap'],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'إدارة التقييمات',
            type: 'item',
            url: '/EmployeeEvaluationManagement',
            permissions: ['MerchantsMap'],
          },
          // {
          //   id: 'breadcrumb-pagination',
          //   title: 'إدارة الإعتمادات',
          //   type: 'item',
          //   url: '/EmployeeEvaluationManagementConfirmation'
          // },
          {
            id: 'breadcrumb-pagination',
            title: 'إدارة مسؤولي الجهات التنظيمية',
            type: 'item',
            url: '/AddEditEmployeeEvaluationRolesManage',
            permissions: ['MerchantsMap'],
          },
          // {
          //   id: 'breadcrumb-pagination',
          //   title: 'إدارة التقارير',
          //   type: 'item',
          //   url: '/EmployeeEvaluationManagementReportsManagement'
          // },
          {
            id: 'breadcrumb-pagination',
            title: 'إعتماد شؤون الموظفيين',
            type: 'item',
            url: '/EmployeeEvaluationPersonnelAffairsConfirmation',
            permissions: ['MerchantsMap'],
          }
        ]
      }
    ]
  },
  {
    id: 'timeOffManagement',
    title: ' الإجازات ',
    type: 'group',
    icon: 'icon-ui',
    permissions: ['MerchantsMap'],
    children: [
      {
        id: 'basic',
        title: ' الإجازات',
        type: 'collapse',
        icon: 'feather icon-server',
        permissions: ['MerchantsMap'],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'طلب إجازة',
            type: 'item',
            url: '/TimeOffRequest',
            permissions: ['MerchantsMap'],
          },
          {
            id: 'breadcrumb-pagination',
            title: 'طلبات إجازات المستخدمين ',
            type: 'item',
            url: '/TimeOffRequestsView',
            permissions: ['MerchantsMap'],
          }
        ]
      }
    ]
  },
  // {
  //   id: '',
  //   title: 'ادارة الصحة والسلامة',
  //   type: 'collapse',
  //   icon: 'feather icon-thermometer',
  //   children: [
  //     // {
  //     //   id: '',
  //     //   title: 'الأدوية',
  //     //   type: 'collapse',
  //     //   // icon: 'feather icon-activity',
  //     //   children: [
  //     //     {
  //     //       id: 'MedicineForms',
  //     //       title: 'عرض الأدوية',
  //     //       type: 'item',
  //     //       // icon: 'feather',
  //     //       url: '/MedicineForms'
  //     //     },
  //     //     {
  //     //       id: 'addMedicineForms',
  //     //       title: 'إضافة دواء',
  //     //       type: 'item',
  //     //       // icon: 'feather',
  //     //       url: '/AddMedicine'
  //     //     }
  //     //   ]
  //     // },
  //     {
  //       id: 'MedicineForms',
  //       title: 'عرض الأدوية',
  //       type: 'item',
  //       // icon: 'feather',
  //       url: '/MedicineForms'
  //     },
  //     {
  //       id: 'addMedicineForms',
  //       title: 'إضافة دواء',
  //       type: 'item',
  //       // icon: 'feather',
  //       url: '/AddMedicine'
  //     },
  //     {
  //       id: 'patientVisit',
  //       title: 'زيارة مريض',
  //       type: 'item',
  //       // icon: 'feather',
  //       url: '/PatientVisit'
  //     },
  //     {
  //       id: 'visitPatient',
  //       title: 'عرض زيارات المرضى',
  //       type: 'item',
  //       // icon: 'feather',
  //       url: '/ShowPatientVisit'
  //     },
  //     {
  //       id: 'medicineList',
  //       title: 'قائمة الأدوية',
  //       type: 'item',
  //       // icon: 'feather',
  //       url: '/MedicineList'
  //     },
  //     {
  //       id: 'healthHistory',
  //       title: 'السجل الصحي',
  //       type: 'item',
  //       // icon: 'feather',
  //       url: '/HealthHistory'
  //     }
  //     // {
  //     //   id: 'maternityLeave',
  //     //   title: 'إجازات الأمومة',
  //     //   type: 'item',
  //     //   icon: 'feather',
  //     //   url: '/MaternityLeave'
  //     // },
  //     // {
  //     //   id: 'sickLeave',
  //     //   title: 'إجازات المرضية',
  //     //   type: 'item',
  //     //   icon: 'feather',
  //     //   url: '/SickLeave'
  //     // },
  //     // {
  //     //   id: 'workUnderAccident',
  //     //   title: 'العمل في حالة إصابة',
  //     //   type: 'item',
  //     //   icon: 'feather',
  //     //   url: '/WorkUnderAccident'
  //     // },
  //     // {
  //     //   id: 'employeeSearch',
  //     //   title: 'بحث عن موظف',
  //     //   type: 'item',
  //     //   icon: 'feather',
  //     //   url: '/EmployeeSearch'
  //     // },
  //     // {
  //     //   id: 'healthInsuranceHistory',
  //     //   title: 'تاريخ التأمين الصحي',
  //     //   type: 'item',
  //     //   icon: 'feather',
  //     //   url: '/HealthInsuranceHistory'
  //     // }
  //   ]
  // },

  {
    id: '',
    title: 'الحضور والإنصراف',
    type: 'group',
    icon: 'icon-ui',
    permissions: ['MerchantsMap'],
    children: [
      {
        id: 'basic',
        title: 'الحضور والإنصراف',
        type: 'collapse',
        icon: 'feather icon-server',
        permissions: ['MerchantsMap'],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'عرض الحضور والإنصراف',
            type: 'item',
            url: '/ShowAttendance',
            permissions: ['MerchantsMap'],
          }
        ]
      }
    ]
  }

  // {
  //   id: '',
  //   title: 'إدارة الأدوار',
  //   type: 'group',
  //   icon: 'icon-ui',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'إدارة الأدوار',
  //       type: 'collapse',
  //       icon: 'feather icon-server',
  //       children: [
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'عرض إدارة الأدوار',
  //           type: 'item',
  //           url: '/ShowManageRoles'
  //         }
  //       ]
  //     }
  //   ]
  // }
];
@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
