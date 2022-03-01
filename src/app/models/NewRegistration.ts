export class NewRegistration {
    'api_token' = '';
    'name' = '';
    'rera_no' = '';
    'gst_no' =  '';
    'pan_no' = '';
    'billing_name' = '';
    'bank_name' = '';
    'prefix' = '';
    // 'channel_partner_name' = '';
    'bank_branch_name' = '';
    'account_number' = '';
    'iffc_code' = '';
    'verification_status_id' = 0;
    'first_name' = '';
    'last_name' = '';
    'middle_name' = '';
    'email' = '';
    'country_code' = '';
    'password' = '';
    'confirm_password' = '';
    'is_org' = 0;
    'cp_executive_id' = 0;
    'mobile_number' = '';
    'login_provider_id' = 1;
    'provider_id' = 1;
    'person_name_prefix': PersonPrefix[];
    'kyc_doc_types': KYCRegDocuments[];
}

export class KYCRegDocuments {
    'doc_type_id': any = 0;
    'docs_type': string ;
    'doc_path': any;
}
export class PersonPrefix {
    'name_prefix_id': any = 0;
    'name_prefix': string ;
}

