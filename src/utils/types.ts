export type CreateUserType = {
  id: number;
  username: string;
  email: string;
};

export type CreateFailureParams = {
  failure_id: number;
  failure_title: string;
  failure_description: string;
};

export type UpdateFailureParams = {
  failure_id: number;
  failure_title: string;
  failure_description: string;
};
