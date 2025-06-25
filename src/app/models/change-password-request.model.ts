export interface ChangePasswordRequest {
  login: string;
  newPassword: string;
  passwordRegex?: string; // optional
}
