
export interface UserViewModel {
  id: string;
  wallet: string;
  email?: string;
  password: string;
  name?: string;
}

export interface LoginViewModel {
  wallet: string;
  password: string;
}

export interface CreateUserViewModel {
  wallet: string;
  password: string;
  name?: string;
}
export interface UserAuthenticated {
  id: string;
  email: string;
  name: string;
  scopes: string[];
}
