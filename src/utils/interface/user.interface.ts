export interface GetUserById {
  user_id: number;
}

export interface CreateUser {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string
}
