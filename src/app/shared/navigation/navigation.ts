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
  permissions?: [];
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
    permissions: [''],
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
    permissions: ['AddGroup','UpdateGroup','DeleteGroup','ViewGroup',
      'UpdateUser','ViewUser','AddUser','DeleteUser' ],
    children: [
      {
        id: 'basic',
        title: 'الإعدادات الرئيسية',
        type: 'collapse',
        icon: 'feather icon-box',
        permissions: ['AddGroup','UpdateGroup','DeleteGroup','ViewGroup',
          'UpdateUser','ViewUser','AddUser','DeleteUser'],
        children: [
          {
            id: 'button',
            title: 'الصلاحيات',
            type: 'item',
            url: '/Permission',
            permissions: ['AddGroup','UpdateGroup','DeleteGroup','ViewGroup'],

          },
          {
            id: 'badges',
            title: 'المستخدمين',
            type: 'item',
            url: '/Users',
            permissions: ['UpdateUser','ViewUser','AddUser','DeleteUser'],
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
    permissions: ['AddBank','ViewBank','DeleteBank','UpdateBank',
      'DeleteBranch','ViewBranch','UpdateBranch','AddBranch',
      'AddBankClass','UpdateBankClass','ViewBankClass','DeleteBankClass',
      'AddBonusType','DeleteBonusType','UpdateBonusType','ViewBonusType',
      'ViewDocumentType','UpdateDocumentType','DeleteDocumentType','AddDocumentType',
      'ViewReward','DeleteReward','UpdateReward','AddReward',
      'UpdateVacationType','DeleteVacationType','AddVacationType','ViewVacationType',
      'UpdateScientificQualifications','DeleteScientificQualifications','AddScientificQualification','ViewScientificQualification',
      'AddCourt','UpdateCourt','DeleteCourt','ViewCourt',
      'DeleteNationality','ViewNationality','AddNationality','UpdateNationality',
      'DeletePenalty','AddPenalty','UpdatePenalty','ViewPenalty',
      'DeleteEvaluationType','AddEvaluationType','ViewEvaluationType','DeleteEmployeeEvaluation',
      'ViewEvaluationType'
    ],
    icon: 'icon-ui',
    children: [
      {
        id: 'basic',
        title: 'التعريفات',
        type: 'collapse',
        icon: 'feather icon-file-text',
        permissions: ['AddBank','ViewBank','DeleteBank','UpdateBank',
          'DeleteBranch','ViewBranch','UpdateBranch','AddBranch',
          'AddBankClass','UpdateBankClass','ViewBankClass','DeleteBankClass',
          'AddBonusType','DeleteBonusType','UpdateBonusType','ViewBonusType',
          'ViewDocumentType','UpdateDocumentType','DeleteDocumentType','AddDocumentType',
          'ViewReward','DeleteReward','UpdateReward','AddReward',
          'UpdateVacationType','DeleteVacationType','AddVacationType','ViewVacationType',
          'UpdateScientificQualifications','DeleteScientificQualifications','AddScientificQualification','ViewScientificQualification',
          'AddCourt','UpdateCourt','DeleteCourt','ViewCourt',
          'DeleteNationality','ViewNationality','AddNationality','UpdateNationality',
          'DeletePenalty','AddPenalty','UpdatePenalty','ViewPenalty',
          'DeleteEvaluationType','AddEvaluationType','ViewEvaluationType','DeleteEmployeeEvaluation',
          'ViewEvaluationType'

        ],
        children: [
          {
            id: 'button',
            title: 'المصارف',
            type: 'item',
            url: '/bank',
            permissions: ['AddBank','ViewBank','DeleteBank','UpdateBank'],
          },
          {
            id: 'badges',
            title: 'فروع المصارف',
            type: 'item',
            url: '/BankBranches',
            permissions: ['DeleteBranch','ViewBranch','UpdateBranch','AddBranch'],

          },
          {
            id: 'breadcrumb-pagination',
            title: 'تصنيف فروع المصارف ',
            type: 'item',
            url: '/ClassificationBankBranches',
            permissions: ['AddBankClass','UpdateBankClass','ViewBankClass','DeleteBankClass'],
          },
          {
            id: 'collapse',
            title: 'أنواع العلاوات',
            type: 'item',
            url: '/BonusesTypes',
            permissions: ['AddBonusType','DeleteBonusType','UpdateBonusType','ViewBonusType'],

          },
          {
            id: 'collapse',
            title: 'أنواع المستندات',
            type: 'item',
            url: '/DocumentTypes',
            permissions: ['ViewDocumentType','UpdateDocumentType','DeleteDocumentType','AddDocumentType'],
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
            permissions: ['ViewReward','DeleteReward','UpdateReward','AddReward'],
          },
          {
            id: 'collapse',
            title: 'أنواع الإجازات',
            type: 'item',
            url: '/VacationsTypes',
            permissions: ['UpdateVacationType','DeleteVacationType','AddVacationType','ViewVacationType'],

          },
          {
            id: 'collapse',
            title: 'المؤهلات العلمية',
            type: 'item',
            url: '/ScientificQualifications',
            permissions: ['UpdateScientificQualifications','DeleteScientificQualifications','AddScientificQualification','ViewScientificQualification'],

          },
          {
            id: 'collapse',
            title: 'المحاكم',
            type: 'item',
            url: '/Courts',
            permissions: ['AddCourt','UpdateCourt','DeleteCourt','ViewCourt'],

          },
          {
            id: 'collapse',
            title: 'الجنسيات',
            type: 'item',
            url: '/Nationalities',
            permissions: ['DeleteNationality','ViewNationality','AddNationality','UpdateNationality'],

          },
          {
            id: 'collapse',
            title: 'الجزاءات',
            type: 'item',
            url: '/Penalties',
            permissions: ['DeletePenalty','AddPenalty','UpdatePenalty','ViewPenalty'],

          },
          {
            id: 'AddEmployeeEvaluationType',
            title: 'إضافة تقييم جديد',
            type: 'item',
            // icon: 'feather',
            url: '/AddEmployeeEvaluationType',
            permissions: ['DeleteEvaluationType','AddEvaluationType','ViewEvaluationType','DeleteEmployeeEvaluation'],

          },
          {
            id: 'ShowEmployeeEvaluationType',
            title: 'قائمة أنواع التقييمات',
            type: 'item',
            // icon: 'feather',
            url: '/ShowEmployeeEvaluationType',
            permissions: ['ViewEvaluationType'],

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
    permissions: ['','DeleteOrganizationalUnit','ViewOrganizationalUnit','UpdateOrganizationalUnit','AddOrganizationalUnit',
      'UpdateClass','ViewClass','DeleteClass','AddClass',
      'ViewJobTitle','DeleteJobTitle','UpdateJobTitle','AddJobTitle',
      'ViewPosition','AddPosition','UpdatePosition','DeletePosition'],
    children: [
      {
        id: 'basic',
        title: 'الشؤون الإدارية',
        type: 'collapse',
        icon: 'feather icon-users',
        permissions: ['','DeleteOrganizationalUnit','ViewOrganizationalUnit','UpdateOrganizationalUnit','AddOrganizationalUnit',
          'UpdateClass','ViewClass','DeleteClass','AddClass',
          'ViewJobTitle','DeleteJobTitle','UpdateJobTitle','AddJobTitle',
          'ViewPosition','AddPosition','UpdatePosition','DeletePosition'
        ],
        children: [
          {
            id: 'button',
            title: 'الهيكلية الإدارية',
            type: 'item',
            url: '/OrganizationalUnit',
            permissions: ['DeleteOrganizationalUnit','ViewOrganizationalUnit','UpdateOrganizationalUnit','AddOrganizationalUnit'],
          },
          {
            id: 'badges',
            title: 'تصنيفات الوظيفية',
            type: 'item',
            url: '/ClassificationBranches',
            permissions: ['UpdateClass','ViewClass','DeleteClass','AddClass'],
          },
          {
            id: 'breadcrumb-pagination',
            title: 'تعريف وظيفة',
            type: 'item',
            url: '/DefinitionPosition',
            permissions: ['ViewPosition','AddPosition','UpdatePosition','DeletePosition'],
          },{
            id: 'breadcrumb-pagination',
            title: 'المسميات الوظيفية',
            type: 'item',
            url: '/JobTitle',
            permissions: ['ViewJobTitle','DeleteJobTitle','UpdateJobTitle','AddJobTitle'],
          },

          {
            id: 'breadcrumb-pagination',
            title: 'إدارة مسؤولي الجهات التنظيمية',
            type: 'item',
            url: '/AddEditEmployeeEvaluationRolesManage',
            permissions: [''],
          },
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
    permissions: ['UpdateEmployee','ViewEmployee','DeleteEmployee',''],
    children: [
      {
        id: 'basic',
        title: 'التعويض والمزايا',
        type: 'collapse',
        icon: 'feather icon-star',
        permissions: ['UpdateEmployeee','ViewEmployeee','DeleteEmployeee',''],
        children: [
          {
            id: 'collapse',
            title: 'المستخدمين',
            type: 'item',
            url: '/Employee',
            permissions: ['ViewEmployee'],
          },
          {
            id: 'collapse',
            title: 'علاوات المستخدمين',
            type: 'item',
            url: '/EmployeeBonuses',
            permissions: [''],
          },
          {
            id: 'collapse',
            title: 'المصحات',
            type: 'item',
            url: '/Clinics',
            permissions: [''],
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
            permissions: [''],

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
    permissions: ['AddEmployee','AddEmployee',''],
    children: [
      {
        id: 'basic',
        title: 'الإستخدام',
        type: 'collapse',
        icon: 'feather icon-user',
        permissions: ['AddEmployee','AddEmployee',''],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'إضافة مستخدم',
            type: 'item',
            url: '/AddEmployee',
            permissions: ['AddEmployee'],
          },
          {
            id: 'collapse',
            title: '02 - إعادة تعيين',
            type: 'item',
            url: '/ReHire',
            permissions: [''],

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
            permissions: [''],

          },
          {
            id: 'collapse',
            title: '05 - تخفيض الدرجة',
            type: 'item',
            url: '/Demotion',
            permissions: [''],

          },
          {
            id: 'collapse',
            title: 'الخدمة المتصلة',
            type: 'item',
            url: '/ConnectedService',
            permissions: [''],

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
    permissions: ['','IsApprovedEmployeeEvaluationAffairs','ViewEmployeeEvaluation','AddEmployeeEvaluation','DeleteEmployeeEvaluation','UpdateEmployeeEvaluation'],
    children: [
      {
        id: 'basic',
        title: 'إدارة التقييمات',
        type: 'collapse',
        icon: 'feather icon-activity',
        permissions: ['','IsApprovedEmployeeEvaluationAffairs','ViewEmployeeEvaluation','AddEmployeeEvaluation','DeleteEmployeeEvaluation','UpdateEmployeeEvaluation'],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'إدارة التقييمات',
            type: 'item',
            url: '/EmployeeEvaluationManagement',
            permissions: ['ViewEmployeeEvaluation','AddEmployeeEvaluation','DeleteEmployeeEvaluation','UpdateEmployeeEvaluation'],
          },
          // {
          //   id: 'breadcrumb-pagination',
          //   title: 'إدارة الإعتمادات',
          //   type: 'item',
          //   url: '/EmployeeEvaluationManagementConfirmation'
          // },

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
            permissions: [''],
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
    permissions: [''],
    children: [
      {
        id: 'basic',
        title: ' الإجازات',
        type: 'collapse',
        icon: 'feather icon-server',
        permissions: [''],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'طلب إجازة',
            type: 'item',
            url: '/TimeOffRequest',
            permissions: [''],
          },
          {
            id: 'breadcrumb-pagination',
            title: 'طلبات إجازات المستخدمين ',
            type: 'item',
            url: '/TimeOffRequestsView',
            permissions: [''],
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
    permissions: [''],
    children: [
      {
        id: 'basic',
        title: 'الحضور والإنصراف',
        type: 'collapse',
        icon: 'feather icon-server',
        permissions: [''],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'عرض الحضور والإنصراف',
            type: 'item',
            url: '/ShowAttendance',
            permissions: [''],
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
