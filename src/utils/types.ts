export type CreateUserType = {
  id: number;
  username: string;
  email: string;
};

export type CreateFailureGoParams = {
  failure_go_id: number;
  failure_go_title: string;
  failure_go_description: string;
};

export type CreateFailureSoParams = {
  failure_so_id: number;
  failure_so_title: string;
  failure_so_description: string;
};

export type UpdateFailureParams = {
  failure_id: number;
  failure_title: string;
  failure_description: string;
};
