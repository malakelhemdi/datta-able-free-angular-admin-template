export interface Messages {
  type: MessageType;
  title: string;
  text: string;
}

export enum MessageType {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning'
}

export interface BaseResponse<T> {
  type: ResponseType;
  messages: string[];
  content: T;
}

export interface BaseResponsePagination<T> {
  type: ResponseType;
  messages: string[];
  content: PaginatedData<T>;
}
export interface PaginatedData<T> {
  currentPage: number;
  items: T;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export enum ResponseType {
  blank,
  Success,
  Failure,
  Ex
}

export enum Pages {
  LogIn = 'login',
  ChangePassword = 'ChangePasswod',
  Otp = 'Otp',
  ForgotPassword = 'ForgotPassword'
}
export interface CustomerByPhoneNumberContent {
  userName: string;
  customerName: string;
  customerTypeName: string;
  customerType: number;
  customerId: string;
  userId: string;
}
