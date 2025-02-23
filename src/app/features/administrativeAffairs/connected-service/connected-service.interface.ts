export interface AddNewConnectedServiceData {
    employeeId: string
    company: Company[]
    totalDays: number
    totalYears: number
    totalMonths: number
    numberOfHolidays: number
  }
  
  export interface Company {
    companyName: string
    startDate: string
    endDate: string
    workTimeInTheDesert: number
  }
  