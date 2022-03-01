import {Unitcategories} from './AddNewLead';

export class GetGHPCUIDData {

    'events': Events[];
    'bank_account_types': BankAccountType[];
    'kyc_doc_types': KYCDocuments[];
    'payment_modes': PaymentModes[];
    'projects': Projects[];
    'person_name_prefix': PersonPrefix[];
}

export class PersonPrefix {
    'name_prefix_id': any = 0;
    'name_prefix': string ;
}
export class KYCDocuments {
    'doc_type_id': any = 0;
    'docs_type': string ;
    'doc_path': any;
}
export class BankAccountType {
    'bank_account_type_id': any = 0;
    'bank_account_type': string ;
}
export class PaymentModes {
    'payment_modes_id': any = 0;
    'payment_mode': string ;
}
export class Events {
    'event_id': any = 0;
    'event_title': string ;
    'tokens': Tokens[];
}
export class Projects {
    'project_id': any = 0;
    'project_name': string ;
    /*'unit_categories': Unitcategories[];*/
}

export class Tokens {
    'token_type_id': any = 0;
    'token_type': string ;
}

