export type User = {
  id: string;

  email: string;

  createdAt: string;

  updatedAt: string;
  role?: string;

  [key: string]: unknown;
};

export interface CreateUserInput {
  email: string;
  name: string;
  id: string;
}
