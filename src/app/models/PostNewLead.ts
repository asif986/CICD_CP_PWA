import {Projects} from './AddNewLead';

export class PostNewLead {
    api_token: any;
    prefix: any;
    first_name: any;
    middle_name: any;
    last_name: any;
    full_name: any;
    country_code = '';
    mobile_number: any;
    email: any;
    dob = '';
    cp_executive_id = '';
    site_visit_from = '';
    site_visit_to = '';
    project_id: any;
    unit_category_id: any;
    income_range_id: any;
    buying_in_duration_id: any;
    buying_for_reason_id: any;
    address_line_1: any;
    lead_profession: any;
    buying_for = 0;

    /*KYC Documents Upload*/
    kyc_documents_path: KYCDocumentsUpload[];
}
export class KYCDocumentsUpload {
    'doc_id': any;
    'docs_url': string ;
}


