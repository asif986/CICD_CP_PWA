export class AddNewLead {

    'person_name_prefix': PersonPrefix[];
    'kyc_doc_types': KYCDocuments[];
    'income_ranges': IncomingRanges[];
    'lead_buying_in_duration': LeadBuyingDuration[];
    'lead_buying_for': LeadBuyingFor[];
    'projects': Projects[];
    'lead_professions': LeadProfessions[];
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
export class IncomingRanges {
    'income_range_id': any = 0;
    'income_range': string ;
}
export class LeadBuyingDuration {
    'buying_in_duration_id': any = 0;
    'buying_in_duration': string ;
}
export class LeadBuyingFor {
    'buying_for_reason_id': any = 0;
    'buying_for_reason': string ;
}
export class Projects {
    'project_id': any = 0;
    'project_name': string ;
    'unit_categories': Unitcategories[];
}

export class Unitcategories {
    'unit_category_id': any = 0;
    'unit_category': string ;
}
export class LeadProfessions {
    'lead_professions_id': any = 0;
    'lead_profession': string ;
}
