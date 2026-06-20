export interface ApiResponse<T> {
  title: string;
  message: string;
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | string;
  data: T;
}

