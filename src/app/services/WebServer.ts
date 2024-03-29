import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIService } from "./APIService";
import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebServer {
  constructor(public http: HttpClient) {}

  //public BASE_URL = 'http://vjpartners.co.in/ongoing/v6/vj-sales-modules/public/api/';
  //public BASE_URL = 'http://vjpartners.co.in/ongoing/v3/vj-sales-modules/public/api/';
  //public BASE_URL = 'http://192.168.1.59:8000/api/';
  //public BASE_URL = 'http://vjpartners.co.in/ongoing/v11/vj-sales-modules/public/api/';
  // public BASE_URL = 'http://vjpartners.co.in/ongoing/v7_new/vj-sales-modules/public/api/';

  //public BASE_URL = "http://vjpartners.co.in/ongoing/v7_new_merge/public/api/"; //Live Test Version Without CORS
  // public BASE_URL = " https://vjpartners.co.in/ongoing/v7_new_clone/vj-sales-modules/public/api/"; //Live Test Version Without CORS
  public BASE_URL = environment.BASE_URL; //Live Test Version Without CORS

  /*Web External Token*/
  public API_TOKEN_EXTERNAL =
    "WeweSJdhbbgfuysfgbkjnfakjsndfkajsdnlaksdadZASCXADA";

  /*API Token*/
  public API_TOKEN =
    "cfnggmgrrfaokzbbpdsrfcaxrznqvuwklgrhpzxfhqxdqqcshqroyiyttmkv";

  /*Verify Token*/
  public API_VERIFY_TOKEN =
    "HGFTYFCGHAVSJHASASASASSdfdfcsefrwefazsfdaefZASCXADA";

  // POST CP Login
  public PostCPLogin = this.BASE_URL + "cpNewLogin";

  // get CP Login
  public getValidationCard = this.BASE_URL + "docNoExists";

  // POST CP Login
  public GETCPLogin = this.BASE_URL + "cpNewLogin";

  // Forgot Password
  public POSTForgotPasswordSendOTP = this.BASE_URL + "validateCPMobile";

  // Change Password
  public POSTUpdatePassword = this.BASE_URL + "updateCPPassword";

  // POST CP Registration
  public PostCPRegistration = this.BASE_URL + "cpRegister";

  // Get CP LeadForm Data[is used for all dropdown]
  public GetLeadFormData = this.BASE_URL + "getLeadFormData";

  public cpReraDocUpload = this.BASE_URL + "cpReraDocUpload";

  // Get CP RegistrationForm Data
  public GetRegistrationFormData = this.BASE_URL + "getCpRegistrationFormData";

  // Post CP Lead Data
  public PostCPLead = this.BASE_URL + "addNewCpLead";

  // CPLead Add kyc docs
  public POSTKYCDocument = this.BASE_URL + "addUploadKycCp";

  // CPRegistration Add kyc docs
  public POSTREGKYCDocument = this.BASE_URL + "addUploadRegDocs";

  //get all sales person
  public salesPersons = this.BASE_URL + "getAllSalesPersons";
  //get approve-fosrequest
  public approve_fos_requests = this.BASE_URL + "cpEntityTaggingRequestList";
  //reject fos
  public rejectFosRequest = this.BASE_URL + "cancelTagging";
  //accept fos
  public acceptFosRequest = this.BASE_URL + "cpEntityTaggingRequestUpdate";
  public verifyPan = "https://kyc-api.aadhaarkyc.io/api/v1/pan/pan";
  public verifyrera = "https://kyc-api.aadhaarkyc.io/api/v1/pan/pan";
  public verifyGST = "https://kyc-api.aadhaarkyc.io/api/v1/corporate/gstin";
  public verifyBank = "https://kyc-api.aadhaarkyc.io/api/v1/bank-verification/";
  public verifyaadhar =
    "https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-validation/aadhaar-validation";
  // Get CP LeadForm Data
  public GetCPFeed = this.BASE_URL + "getNewCpFeed";

  // Post CP Lead Data
  public PostVerifyOTP = this.BASE_URL + "sendOtp";

  // Post tVerification
  public PostLoginVerifyStatus = this.BASE_URL + "checkNewCpVerificationStatus";

  // Post CP Reminde
  public PostReminder = this.BASE_URL + "addReminder";

  // Mark As Done
  public markAsDone = this.BASE_URL + "markAsDone";

  // Delete Reminder
  public deleteReminder = this.BASE_URL + "deleteReminder";

  // Post CP Reminde
  public PostUpReminder = this.BASE_URL + "updateReminder";

  //Reminder List
  public GetReminder = this.BASE_URL + "getAllReminders";

  // Post CP FOS
  public PostFOS = this.BASE_URL + "addCpFos";

  public CpFosList = this.BASE_URL + "getAllFos";

  public DeleteFos = this.BASE_URL + "deleteFos";

  public updateCpFOS = this.BASE_URL + "updateCpFOS";

  // Get CP performanceOfChannelPartner
  // public performanceNewOfChannelPartner = this.BASE_URL + "getCpStats";

  // Get CP performanceOfChannelPartner
  public performanceNewOfChannelPartner = this.BASE_URL + "cpNewPerformance";

  // Get CP performanceOfChannelPartner
  public getCpTeamStats = this.BASE_URL + "getCpTeamStats";

  // Get CP GHP
  public getcpGHP = this.BASE_URL + "getTokenData";

  // Post CP Token
  public PostGenerateToken = this.BASE_URL + "addCPToken";

  public getCUID = this.BASE_URL + "getCPCUID";

  public getTokenGHPInfo = this.BASE_URL + "getTokenGHPInfo";

  // Post CP Token
  public PostGenerateUpgradeToken = this.BASE_URL + "updateCPToken";

  public getCpEntityTeamLeads = this.BASE_URL + "getCpEntityTeamLeads";

  public getCpTeamMembers = this.BASE_URL + "getCpTeamMembers";

  public removeCpTeamMember = this.BASE_URL + "removeCpTLMember";

  public addCpTeamMember = this.BASE_URL + "addCpTLMember";

  public getCpEntityFosList = this.BASE_URL + "getCpEntityFosList";

  public getCpTeamAllStats = this.BASE_URL + "getCpTeamAllStats";

  // public getCpTeamAllStats = 'http://localhost/getCpTeamAllStats.json';

  public getCpTeamLeaderNotify = this.BASE_URL + "getCpExcutiveDeatail";

  public getAllProjectBanners = this.BASE_URL + "getAllProjectBanners";

  public getAllBrochureByProject = this.BASE_URL + "getAllBrochureByProject";

  //FROM SHUBHAM FOR TEAM LEADER COUNTS GO TO LIST
  public getBookingDataDetails = this.BASE_URL + "getBookingDataDetails";

  public getLeadDataDetails = this.BASE_URL + "getLeadDataDetails";

  public getSiteVisitsDetails = this.BASE_URL + "getSiteVisitsDetails";

  public getLeadTokensDetails = this.BASE_URL + "getLeadTokensDetails";

  // For Agreement List(Get)
  public getAgreementList = this.BASE_URL + "agreements/list";

  // Post Bill
  public postBill = this.BASE_URL + "cpbills/add";

  // For Submitted List(Get)
  public getSubmittedList = this.BASE_URL + "cpbills/getAllSubmittedBills";

  //For get cp Entity search
  public cpEntitySearch = this.BASE_URL + "cpEntitySearch";

  // for check tagging
  public checkTagging = this.BASE_URL + "checkTagging";

  // For  add tagging
  public cpEntityTaggingRequest = this.BASE_URL + "cpEntityTaggingRequest";

  // For  get tagging list
  public cpEntityTaggingRequestList =
    this.BASE_URL + "cpEntityTaggingRequestList";

  public cpEntityCancelTagging = this.BASE_URL + "cancelTagging";

  public cpFosCheckEntity = this.BASE_URL + "cpFosCheckEntity";

  // For Submitted List(Get)
  public getAOPBills = this.BASE_URL + "cpbills/getAllAOPForCP";

  // For Submitted List(Get)
  public getAOPBillsSearch = this.BASE_URL + "cpbills/getAllAOPForCP";

  // For Submitted List(Get)
  public getAgreementAferAOP = this.BASE_URL + "agreements/getAllForAOP";

  // For Submitted List(Get)
  public getAgreementAferAOPSearch = this.BASE_URL + "agreements/getAllForAOP";

  // GetCpAwards
  public GetCpAwards = this.BASE_URL + "getCpAwards";

  // Claim Awards
  public ClaimAward = this.BASE_URL + "addAwardClaimRequest";

  // Get Cp Claim Awards
  public GetCpClaimAwards = this.BASE_URL + "getAwardClaimList";

  //For App Update
  public appUpdateAvailable = this.BASE_URL + "appUpdateForCpPWA";

  //new cp app 2.0
  public getAllProjectName = this.BASE_URL + "getAllProjectNames";

  public getCPBenefits_current = this.BASE_URL + "getCPBenefits/current";
  //cp Registration
  public cpRegistration = this.BASE_URL + "cpRegistration";
  //cp bank with validation
  public bankValidation =
    "https://kyc-api.aadhaarkyc.io/api/v1/bank-verification/";

  public setFosTeamLead = this.BASE_URL + "setFosTeamLead";
}
