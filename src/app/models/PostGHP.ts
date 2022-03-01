
export class PostGHP {
    'api_token': any;
    'cuid': any;
    'name': any;
    'cp_executive_id'  = 0;
    'lead_id' = 0;
    'event_id' = 0;
    'token_type_id' = 0;
     'project_id' = 0;
    'payment_mode_id': any;
    'payment_mode_details': any = [ ];
    'sales_person_id' : any;
    'amount' : any;

    
    /*KYC Documents Upload*/
    kyc_documents_path: KYCDocumentsUpload[];
}

export class KYCDocumentsUpload {
    'doc_id': any;
    'docs_url': string ;
}

















