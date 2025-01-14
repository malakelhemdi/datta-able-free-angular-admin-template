
export interface GetEmployeesDetailsCommand {
  employeeCode: string,
  name: string,
  nid: string,
  nocNumber: string,
  email: string,
  nameEn: string,
  birthDate: string,
  gender: number,
  phoneNumber: string
}
export interface GetAttendancesCommand {
  date: string,
  checkInTime: string,
  ckeckOutTime: string

}
