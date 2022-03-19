export class CPFeed {
    api_token: any;
    cp_id: any;
    skip: any;
    limit: any;
}

export interface Data {
    date_created: string;
    name: string;
    billing_name: string;
    mobile: string;
    email: string;
    rera_no: string;
    pan_no: string;
    gst_no: string;
    is_org: number;
    bank_name: string;
    branch_name: string;
    account_number: string;
    ifsc_code: string;
    verification_status_id: number;
    api_token: string;
    status_id: number;
    entity_id: number;
    cpuid: string;
}

export interface responsefromserver {
    success: number;
    data: Data;
}
