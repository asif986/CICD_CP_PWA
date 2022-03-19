export class Login {
    'login_provider_id' = 1;
    'provider_id' = 1;
    'username' =  '';
    'password' = '';
    'api_token' = '';
    'otp' = '';
    'confirmotp' = '';
    'confirmpassword' = '';
    'user_id'='';
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
}

export interface responsefromlogin {
    success: number;
    data: Data;
    login_type: number;
}

