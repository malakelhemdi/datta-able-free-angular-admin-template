export default function getManagerName(status: number): string {
    const managerMap: { [key: number]: string } = {
        4: 'شؤون الموظفين',
        3: 'مدير القسم',
        2: 'المدير الأعلى',
        1: 'المدير المباشر',
        0: 'لا يوجد'
    };

    return managerMap[status] || 'غير معروف';
}