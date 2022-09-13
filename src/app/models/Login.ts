export class Login {
  "login_provider_id" = 1;
  "provider_id" = 1;
  "username" = "";
  "password" = "";
  "api_token" = "";
  "otp" = "";
  "confirmotp" = "";
  "confirmpassword" = "";
  "user_id" = "";
  "user_type_id" = 1;
}
export interface Data {
  fos_id: number;
  fosuid: string;
  date_created: string;
  cp_entity_id?: any;
  name: string;
  mobile: string;
  email: string;
  aadhar?: any;
  pan_no: string;
  is_admin: number;
  is_team_lead?: any;
  api_token: string;
  bank_name: string;
  branch_name: string;
  account_number: string;
  account_name: string;
  ifsc_code: string;
  status_id?: any;
  aop_qop_accepted?: any;
  aop_qop_type?: any;
  verification_status_id?: any;
  billing_name?: any;
}

export interface responsefromlogin {
  success: number;
  data: Data;
  login_type: number;
  is_cp_tagging_requested?: any;
}

export interface ForgotPassword {
  user_id?: any;
  otp?: any;
  user_type_id?: any;
  confirmotp?: any;
  mobile_no?: any;
}
