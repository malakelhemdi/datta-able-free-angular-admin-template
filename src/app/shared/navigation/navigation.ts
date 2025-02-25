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
    permissions: [
      'AddGroup',
      'UpdateGroup',
      'DeleteGroup',
      'ViewGroup',
      'UpdateUser',
      'ViewUser',
      'AddUser',
      'DeleteUser',
      'AddBank',
      'ViewBank',
      'DeleteBank',
      'UpdateBank',
      'DeleteBranch',
      'ViewBranch',
      'UpdateBranch',
      'AddBranch',
      'AddBankClass',
      'UpdateBankClass',
      'ViewBankClass',
      'DeleteBankClass',
      'AddBonusType',
      'DeleteBonusType',
      'UpdateBonusType',
      'ViewBonusType',
      'ViewDocumentType',
      'UpdateDocumentType',
      'DeleteDocumentType',
      'AddDocumentType',
      'ViewReward',
      'DeleteReward',
      'UpdateReward',
      'AddReward',
      'UpdateVacationType',
      'DeleteVacationType',
      'AddVacationType',
      'ViewVacationType',
      'UpdateScientificQualifications',
      'DeleteScientificQualifications',
      'AddScientificQualification',
      'ViewScientificQualification',
      'AddCourt',
      'UpdateCourt',
      'DeleteCourt',
      'ViewCourt',
      'DeleteNationality',
      'ViewNationality',
      'AddNationality',
      'UpdateNationality',
      'DeletePenalty',
      'AddPenalty',
      'UpdatePenalty',
      'ViewPenalty',
      'DeleteEvaluationType',
      'AddEvaluationType',
      'ViewEvaluationType',
      'DeleteEmployeeEvaluation',
      'ViewEvaluationType',
      'ActiveDeActiveBank',
      'ActiveDeActiveBranch',
      'ActiveDeActiveBankClass',
      'ActiveDeActiveBonusType',
      'ActiveDeActiveDocumentType',
      'ActiveDeActiveReward',
      'ActiveDeActiveVactionType',
      'ActiveDeActiveScientificQualification',
      'ActiveDeActiveCourts',
      'ActiveDeActiveNationality',
      'ActiveDeActivePenalty',
      'ActiveDeActiveEvaluationType',
      'UpdateEvaluationType',
      'DeleteOrganizationalUnit',
      'ViewOrganizationalUnit',
      'UpdateOrganizationalUnit',
      'AddOrganizationalUnit',
      'UpdateClass',
      'ViewClass',
      'DeleteClass',
      'AddClass',
      'ViewJobTitle',
      'DeleteJobTitle',
      'UpdateJobTitle',
      'AddJobTitle',
      'DefineManagersForTheOrganizationalUnit',
      'ViewPosition',
      'AddPosition',
      'UpdatePosition',
      'DeletePosition',
      'DeleteOrganizationalUnit',
      'ViewOrganizationalUnit',
      'UpdateOrganizationalUnit',
      'AddOrganizationalUnit',
      'UpdateClass',
      'ViewClass',
      'DeleteClass',
      'AddClass',
      'ViewJobTitle',
      'DeleteJobTitle',
      'UpdateJobTitle',
      'AddJobTitle',
      'DefineManagersForTheOrganizationalUnit',
      'ViewPosition',
      'AddPosition',
      'UpdatePosition',
      'DeletePosition',
      'UpdateEmployee',
      'ViewEmployee',
      'DeleteEmployee',
      'BonusesEmployee',
      'ViewClinics',
      'ProcedureEmployee',
      'AddEmployee',
      'ProcedureEmployee',
      'ConnectedService',
      'IsApprovedEmployeeEvaluationAffairs',
      'ViewEmployeeEvaluation',
      'AddEmployeeEvaluation',
      'DeleteEmployeeEvaluation',
      'UpdateEmployeeEvaluation',
      'ViewTimeOffRequest',
      'DeleteTimeOffRequest',
      'RejectTimeOffRequest',
      'AddTimeOffRequest',
      'ApproveTimeOffRequest',
      'CancelPersonnelApproval',
      'PersonnelAffairsApproval',
      'UpdateTimeOffRequest',
      'IsApprovalTimeOffRequest',
      'ViewAttendance',
      'TypeOrganizationalUnit'
    ],
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
    permissions: ['AddGroup', 'UpdateGroup', 'DeleteGroup', 'ViewGroup', 'UpdateUser', 'ViewUser', 'AddUser', 'DeleteUser'],
    children: [
      {
        id: 'basic',
        title: 'الإعدادات الرئيسية',
        type: 'collapse',
        icon: 'feather icon-box',
        permissions: ['AddGroup', 'UpdateGroup', 'DeleteGroup', 'ViewGroup', 'UpdateUser', 'ViewUser', 'AddUser', 'DeleteUser'],
        children: [
          {
            id: 'button',
            title: 'الصلاحيات',
            type: 'item',
            url: '/Permission',
            permissions: ['AddGroup', 'UpdateGroup', 'DeleteGroup', 'ViewGroup']
          },
          {
            id: 'badges',
            title: 'المستخدمين',
            type: 'item',
            url: '/Users',
            permissions: ['UpdateUser', 'ViewUser', 'AddUser', 'DeleteUser']
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
    permissions: [
      'AddBank',
      'ViewBank',
      'DeleteBank',
      'UpdateBank',
      'DeleteBranch',
      'ViewBranch',
      'UpdateBranch',
      'AddBranch',
      'AddBankClass',
      'UpdateBankClass',
      'ViewBankClass',
      'DeleteBankClass',
      'AddBonusType',
      'DeleteBonusType',
      'UpdateBonusType',
      'ViewBonusType',
      'ViewDocumentType',
      'UpdateDocumentType',
      'DeleteDocumentType',
      'AddDocumentType',
      'ViewReward',
      'DeleteReward',
      'UpdateReward',
      'AddReward',
      'UpdateVacationType',
      'DeleteVacationType',
      'AddVacationType',
      'ViewVacationType',
      'UpdateScientificQualifications',
      'DeleteScientificQualifications',
      'AddScientificQualification',
      'ViewScientificQualification',
      'AddCourt',
      'UpdateCourt',
      'DeleteCourt',
      'ViewCourt',
      'DeleteNationality',
      'ViewNationality',
      'AddNationality',
      'UpdateNationality',
      'DeletePenalty',
      'AddPenalty',
      'UpdatePenalty',
      'ViewPenalty',
      'DeleteEvaluationType',
      'AddEvaluationType',
      'ViewEvaluationType',
      'DeleteEmployeeEvaluation',
      'ViewEvaluationType',
      'ActiveDeActiveBank',
      'ActiveDeActiveBranch',
      'ActiveDeActiveBankClass',
      'ActiveDeActiveBonusType',
      'ActiveDeActiveDocumentType',
      'ActiveDeActiveReward',
      'ActiveDeActiveVactionType',
      'ActiveDeActiveScientificQualification',
      'ActiveDeActiveCourts',
      'ActiveDeActiveNationality',
      'ActiveDeActivePenalty',
      'ActiveDeActiveEvaluationType',
      'UpdateEvaluationType',
      'TypeOrganizationalUnit'
    ],
    icon: 'icon-ui',
    children: [
      {
        id: 'basic',
        title: 'التعريفات',
        type: 'collapse',
        icon: 'feather icon-file-text',
        permissions: [
          'AddBank',
          'ViewBank',
          'DeleteBank',
          'UpdateBank',
          'DeleteBranch',
          'ViewBranch',
          'UpdateBranch',
          'AddBranch',
          'AddBankClass',
          'UpdateBankClass',
          'ViewBankClass',
          'DeleteBankClass',
          'AddBonusType',
          'DeleteBonusType',
          'UpdateBonusType',
          'ViewBonusType',
          'ViewDocumentType',
          'UpdateDocumentType',
          'DeleteDocumentType',
          'AddDocumentType',
          'ViewReward',
          'DeleteReward',
          'UpdateReward',
          'AddReward',
          'UpdateVacationType',
          'DeleteVacationType',
          'AddVacationType',
          'ViewVacationType',
          'UpdateScientificQualifications',
          'DeleteScientificQualifications',
          'AddScientificQualification',
          'ViewScientificQualification',
          'AddCourt',
          'UpdateCourt',
          'DeleteCourt',
          'ViewCourt',
          'DeleteNationality',
          'ViewNationality',
          'AddNationality',
          'UpdateNationality',
          'DeletePenalty',
          'AddPenalty',
          'UpdatePenalty',
          'ViewPenalty',
          'DeleteEvaluationType',
          'AddEvaluationType',
          'ViewEvaluationType',
          'DeleteEmployeeEvaluation',
          'ViewEvaluationType',
          'ActiveDeActiveBank',
          'ActiveDeActiveBranch',
          'ActiveDeActiveBankClass',
          'ActiveDeActiveBonusType',
          'ActiveDeActiveDocumentType',
          'ActiveDeActiveReward',
          'ActiveDeActiveVactionType',
          'ActiveDeActiveScientificQualification',
          'ActiveDeActiveCourts',
          'ActiveDeActiveNationality',
          'ActiveDeActivePenalty',
          'ActiveDeActiveEvaluationType',
          'UpdateEvaluationType',
          'TypeOrganizationalUnit'
        ],
        children: [
          {
            id: 'button',
            title: 'المصارف',
            type: 'item',
            url: '/bank',
            permissions: ['AddBank', 'ViewBank', 'DeleteBank', 'UpdateBank', 'ActiveDeActiveBank']
          },
          {
            id: 'badges',
            title: 'فروع المصارف',
            type: 'item',
            url: '/BankBranches',
            permissions: ['DeleteBranch', 'ViewBranch', 'UpdateBranch', 'AddBranch', 'ActiveDeActiveBranch']
          },
          {
            id: 'breadcrumb-pagination',
            title: 'تصنيف فروع المصارف ',
            type: 'item',
            url: '/ClassificationBankBranches',
            permissions: ['AddBankClass', 'UpdateBankClass', 'ViewBankClass', 'DeleteBankClass', 'ActiveDeActiveBankClass']
          },
          {
            id: 'collapse',
            title: 'أنواع العلاوات',
            type: 'item',
            url: '/BonusesTypes',
            permissions: ['AddBonusType', 'DeleteBonusType', 'UpdateBonusType', 'ViewBonusType', 'ActiveDeActiveBonusType']
          },
          {
            id: 'collapse',
            title: 'أنواع المستندات',
            type: 'item',
            url: '/DocumentTypes',
            permissions: ['ViewDocumentType', 'UpdateDocumentType', 'DeleteDocumentType', 'AddDocumentType', 'ActiveDeActiveDocumentType']
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
            permissions: ['ViewReward', 'DeleteReward', 'UpdateReward', 'AddReward', 'ActiveDeActiveReward']
          },
          {
            id: 'collapse',
            title: 'أنواع الإجازات',
            type: 'item',
            url: '/VacationsTypes',
            permissions: ['UpdateVacationType', 'DeleteVacationType', 'AddVacationType', 'ViewVacationType', 'ActiveDeActiveVactionType']
          },
          {
            id: 'collapse',
            title: 'المؤهلات العلمية',
            type: 'item',
            url: '/ScientificQualifications',
            permissions: [
              'UpdateScientificQualifications',
              'DeleteScientificQualifications',
              'AddScientificQualification',
              'ViewScientificQualification',
              'ActiveDeActiveScientificQualification'
            ]
          },
          {
            id: 'collapse',
            title: 'المحاكم',
            type: 'item',
            url: '/Courts',
            permissions: ['AddCourt', 'UpdateCourt', 'DeleteCourt', 'ViewCourt', 'ActiveDeActiveCourts']
          },
          {
            id: 'collapse',
            title: 'الجنسيات',
            type: 'item',
            url: '/Nationalities',
            permissions: ['DeleteNationality', 'ViewNationality', 'AddNationality', 'UpdateNationality', 'ActiveDeActiveNationality']
          },
          {
            id: 'collapse',
            title: 'انوع الوحدة التنظيمية',
            type: 'item',
            url: '/OrganizationStructureType',
            permissions: ['DeleteNationality', 'ViewNationality', 'AddNationality', 'UpdateNationality', 'ActiveDeActiveNationality']
          },
          {
            id: 'collapse',
            title: 'الجزاءات',
            type: 'item',
            url: '/Penalties',
            permissions: ['DeletePenalty', 'AddPenalty', 'UpdatePenalty', 'ViewPenalty', 'ActiveDeActivePenalty']
          },
          {
            id: 'AddEmployeeEvaluationType',
            title: 'إضافة تقييم جديد',
            type: 'item',
            // icon: 'feather',
            url: '/AddEmployeeEvaluationType',
            permissions: ['AddEvaluationType']
            // permissions: ['DeleteEvaluationType','AddEvaluationType','ViewEvaluationType','DeleteEmployeeEvaluation','ActiveDeActiveEvaluationType'],
          },
          {
            id: 'ShowEmployeeEvaluationType',
            title: 'قائمة أنواع التقييمات',
            type: 'item',
            // icon: 'feather',
            url: '/ShowEmployeeEvaluationType',
            permissions: ['UpdateEvaluationType', 'ViewEvaluationType', 'DeleteEmployeeEvaluation', 'ActiveDeActiveEvaluationType']
          },
          {
            id: 'TypeOrganizationalUnit',
            title: 'أنواع الوحدات التنظيمية',
            type: 'item',
            // icon: 'feather',
            url: '/TypeOrganizationalUnit',
            permissions: ['AddTypeOrganizationalUnit', 'UpdateTypeOrganizationalUnit', 'ViewTypeOrganizationalUnit', 'DeleteTypeOrganizationalUnit']
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
    permissions: [
      'DeleteOrganizationalUnit',
      'ViewOrganizationalUnit',
      'UpdateOrganizationalUnit',
      'AddOrganizationalUnit',
      'UpdateClass',
      'ViewClass',
      'DeleteClass',
      'AddClass',
      'ViewJobTitle',
      'DeleteJobTitle',
      'UpdateJobTitle',
      'AddJobTitle',
      'DefineManagersForTheOrganizationalUnit',
      'ViewPosition',
      'AddPosition',
      'UpdatePosition',
      'DeletePosition'
    ],
    children: [
      {
        id: 'basic',
        title: 'الشؤون الإدارية',
        type: 'collapse',
        icon: 'feather icon-users',
        permissions: [
          'DeleteOrganizationalUnit',
          'ViewOrganizationalUnit',
          'UpdateOrganizationalUnit',
          'AddOrganizationalUnit',
          'UpdateClass',
          'ViewClass',
          'DeleteClass',
          'AddClass',
          'ViewJobTitle',
          'DeleteJobTitle',
          'UpdateJobTitle',
          'AddJobTitle',
          'DefineManagersForTheOrganizationalUnit',
          'ViewPosition',
          'AddPosition',
          'UpdatePosition',
          'DeletePosition'
        ],
        children: [
          {
            id: 'button',
            title: 'الهيكلية الإدارية',
            type: 'item',
            url: '/OrganizationalUnit',
            permissions: ['DeleteOrganizationalUnit', 'ViewOrganizationalUnit', 'UpdateOrganizationalUnit', 'AddOrganizationalUnit']
          },
          {
            id: 'badges',
            title: 'فئات الوظيفية',
            type: 'item',
            url: '/ClassificationBranches',
            permissions: ['ViewClass']
          },
          {
            id: 'breadcrumb-pagination',
            title: 'المسميات الوظيفية',
            type: 'item',
            url: '/JobTitle',
            permissions: ['ViewJobTitle', 'DeleteJobTitle', 'UpdateJobTitle', 'AddJobTitle']
          },
          {
            id: 'breadcrumb-pagination',
            title: 'فتح وظيفة',
            type: 'item',
            url: '/DefinitionPosition',
            permissions: ['ViewPosition', 'AddPosition', 'UpdatePosition', 'DeletePosition', 'DefineManagersForTheOrganizationalUnit']
          },
          {
            id: 'breadcrumb-pagination',
            title: 'إدارة مسؤولي الجهات التنظيمية',
            type: 'item',
            url: '/AddEditEmployeeEvaluationRolesManage',
            permissions: ['DefineManagersForTheOrganizationalUnit']
          },
          {
            id: 'breadcrumb-pagination',
            title: 'إدارة   الترقيم',
            type: 'item',
            url: '/SequenceManagement',
            permissions: ['ViewPosition']
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
    permissions: ['UpdateEmployee', 'ViewEmployee', 'DeleteEmployee', 'BonusesEmployee', 'ViewClinics', 'ProcedureEmployee'],
    children: [
      {
        id: 'basic',
        title: 'التعويض والمزايا',
        type: 'collapse',
        icon: 'feather icon-star',
        permissions: ['UpdateEmployee', 'ViewEmployee', 'DeleteEmployee', 'BonusesEmployee', 'ViewClinics', 'ProcedureEmployee'],
        children: [
          {
            id: 'collapse',
            title: 'المستخدمين',
            type: 'item',
            url: '/Employee',
            permissions: ['UpdateEmployee', 'ViewEmployee', 'DeleteEmployee']
          },
          {
            id: 'collapse',
            title: 'علاوات المستخدمين',
            type: 'item',
            url: '/EmployeeBonuses',
            permissions: ['BonusesEmployee']
          },
          {
            id: 'collapse',
            title: 'المصحات',
            type: 'item',
            url: '/Clinics',
            permissions: ['ViewClinics']
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
            permissions: ['ProcedureEmployee']
          },{
            id: 'collapse',
            title: '05 - تخفيض الدرجة',
            type: 'item',
            url: '/Demotion',
            permissions: ['ProcedureEmployee']
          },
        ]
      }
    ]
  },
  {
    id: 'Usage',
    title: 'الإستخدام',
    type: 'group',
    icon: 'icon-ui',
    permissions: ['AddEmployee', 'ProcedureEmployee', 'ConnectedService'],
    children: [
      {
        id: 'basic',
        title: 'الإستخدام',
        type: 'collapse',
        icon: 'feather icon-user',
        permissions: ['AddEmployee', 'ProcedureEmployee', 'ConnectedService'],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'إضافة مستخدم',
            type: 'item',
            url: '/AddEmployee',
            permissions: ['AddEmployee']
          },
          {
            id: 'collapse',
            title: '02 - إعادة تعيين',
            type: 'item',
            url: '/ReHire',
            permissions: ['ProcedureEmployee']
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
            permissions: ['ProcedureEmployee']
          },
          {
            id: 'collapse',
            title: 'الخبرات السابقة',
            type: 'item',
            url: '/ConnectedService',
            permissions: ['ConnectedService']
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
    permissions: [
      'IsApprovedEmployeeEvaluationAffairs',
      'ViewEmployeeEvaluation',
      'AddEmployeeEvaluation',
      'DeleteEmployeeEvaluation',
      'UpdateEmployeeEvaluation'
    ],
    children: [
      {
        id: 'basic',
        title: 'إدارة التقييمات',
        type: 'collapse',
        icon: 'feather icon-activity',
        permissions: [
          'IsApprovedEmployeeEvaluationAffairs',
          'ViewEmployeeEvaluation',
          'AddEmployeeEvaluation',
          'DeleteEmployeeEvaluation',
          'UpdateEmployeeEvaluation'
        ],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'إدارة التقييمات',
            type: 'item',
            url: '/EmployeeEvaluationManagement',
            permissions: ['ViewEmployeeEvaluation', 'AddEmployeeEvaluation', 'DeleteEmployeeEvaluation', 'UpdateEmployeeEvaluation']
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
            permissions: ['IsApprovedEmployeeEvaluationAffairs']
          },
          {
            id: 'breadcrumb-pagination',
            title: 'إعتماد مدير الإدارة',
            type: 'item',
            url: '/EmployeeEvaluationDepartmentManagerConfirmation',
            permissions: ['ViewEmployeeEvaluation', 'AddEmployeeEvaluation', 'DeleteEmployeeEvaluation', 'UpdateEmployeeEvaluation']
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
    permissions: [
      'ViewTimeOffRequest',
      'DeleteTimeOffRequest',
      'RejectTimeOffRequest',
      'AddTimeOffRequest',
      'ApproveTimeOffRequest',
      'CancelPersonnelApproval',
      'PersonnelAffairsApproval',
      'UpdateTimeOffRequest',
      'IsApprovalTimeOffRequest'
    ],
    children: [
      {
        id: 'basic',
        title: ' الإجازات',
        type: 'collapse',
        icon: 'feather icon-server',
        permissions: [
          'ViewTimeOffRequest',
          'DeleteTimeOffRequest',
          'RejectTimeOffRequest',
          'AddTimeOffRequest',
          'ApproveTimeOffRequest',
          'CancelPersonnelApproval',
          'PersonnelAffairsApproval',
          'UpdateTimeOffRequest',
          'IsApprovalTimeOffRequest'
        ],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'طلب إجازة',
            type: 'item',
            url: '/TimeOffRequest',
            permissions: ['DeleteTimeOffRequest', 'AddTimeOffRequest', 'UpdateTimeOffRequest', 'ViewTimeOffRequest']
          },
          {
            id: 'breadcrumb-pagination',
            title: 'طلبات إجازات المستخدمين',
            type: 'item',
            url: '/TimeOffRequestsView',
            permissions: [
              'RejectTimeOffRequest',
              'ViewTimeOffRequest',
              'ApproveTimeOffRequest',
              'IsApprovalTimeOffRequest',
              'CancelPersonnelApproval',
              'PersonnelAffairsApproval'
            ]
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
    permissions: ['ViewAttendance'],
    children: [
      {
        id: 'basic',
        title: 'الحضور والإنصراف',
        type: 'collapse',
        icon: 'feather icon-server',
        permissions: ['ViewAttendance'],
        children: [
          {
            id: 'breadcrumb-pagination',
            title: 'عرض الحضور والإنصراف',
            type: 'item',
            url: '/ShowAttendance',
            permissions: ['ViewAttendance']
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
