export interface CatergoryResponse {
  message: string;
  success: boolean;
  data?: Category[];
}

export interface Category {
  name: string;
}
