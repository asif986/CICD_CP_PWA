import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APIClient } from "./APIClient";
import { BehaviorSubject } from "rxjs";
import { CPFeed } from "../models/CPFeed";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import Swal from "sweetalert2";
import { ToastController } from "@ionic/angular";
import { WebServer } from "./WebServer";

@Injectable({
  providedIn: "root",
})
export class APIService {
  // tslint:disable-next-line:max-line-length
  constructor(
    public http: HttpClient,
    private router: Router,
    public toastController: ToastController,
    private storage: Storage,
    public apiClient: APIClient,
    public webServer: WebServer
  ) {}

  /*CP Login*/
  postCpLogin(psdata) {
    return this.apiClient.post(this.webServer.PostCPLogin, psdata);
  }
  /*CP validation*/
  getCardValidation(psdata) {
    return this.apiClient.get(this.webServer.getValidationCard + psdata);
  }
  /*CP Login*/
  getCpLogin(user_id: string, password: string) {
    return this.apiClient.get(
      this.webServer.GETCPLogin +
        "?user_id=" +
        user_id +
        "&password=" +
        password
    );
  }

  // Post_CPForgotPasswordSendOTP
  forgotPasswordSendOTP(psdata: any) {
    return this.apiClient.post(
      this.webServer.POSTForgotPasswordSendOTP,
      psdata
    );
  }

  // Post_CPUpdatePassword
  updatePassword(psdata: any) {
    return this.apiClient.post(this.webServer.POSTUpdatePassword, psdata);
  }

  // Post_CPRegistration
  newRegistration(psdata: any) {
    return this.apiClient.post(this.webServer.PostCPRegistration, psdata);
  }

  /*Get CP Leads*/
  getLeadFormData(api_token: any) {
    return this.apiClient.get(
      this.webServer.GetLeadFormData + "?api_token=" + api_token
    );
  }

  /*Get CP Registration*/
  getRegistrationFormData() {
    return this.apiClient.get(
      this.webServer.GetRegistrationFormData +
        "?api_token=" +
        this.webServer.API_TOKEN_EXTERNAL
    );
  }

  /*Post CP Lead*/
  postCPLead(psdata: any) {
    return this.apiClient.post(this.webServer.PostCPLead, psdata);
  }

  /*Post Lead KYC Upload*/
  postCPLeadKYC(psdata: any) {
    return this.apiClient.post(this.webServer.POSTKYCDocument, psdata);
  }

  /*Post Registration KYC Upload*/
  postCPRegistrationKYC(psdata: any) {
    return this.apiClient.post(this.webServer.POSTREGKYCDocument, psdata);
  }

  /*Get CP Feed */
  getCPFeed(
    cp_entity_id: any,
    fos_id: any,
    login_type: any,
    apitoken: any,
    skip_count: any,
    last_lead_updated_at: any
  ) {
    console.log(cp_entity_id);
    // tslint:disable-next-line:max-line-length
    return this.apiClient.get(
      this.webServer.GetCPFeed +
        `${
          login_type == 1
            ? "?cp_entity_id=" + cp_entity_id
            : "?cp_fos_id=" + fos_id
        }` +
        "&api_token=" +
        apitoken +
        "&limit=8&skip=" +
        skip_count +
        "&last_lead_updated_at=" +
        last_lead_updated_at
    );
    /*return this.apiClient.get(this.webServer.GetCPFeed + '?' + cpfee);*/
  }

  /*Get CP Feed */
  getCPFeedSeach(
    cp_entity_id: any,
    fos_id: any,
    login_type: any,
    apitoken: any,
    Site: any,
    skip_count: any,
    last_lead_updated_at: any
  ) {
    // tslint:disable-next-line:max-line-length
    return this.apiClient.get(
      this.webServer.GetCPFeed +
        "?api_token=" +
        apitoken +
        `${
          login_type == 1
            ? "&cp_entity_id=" + cp_entity_id
            : "&cp_fos_id=" + fos_id
        }` +
        "&filter_text=" +
        Site +
        "&limit=8&skip=" +
        skip_count +
        "&last_lead_updated_at=" +
        last_lead_updated_at
    );
  }
  /*Get CP Feed */
  getCPFeedFilter(
    cp_entity_id: any,
    fos_id: any,
    login_type: any,
    apitoken: any,
    param,
    skip_count: any,
    last_lead_updated_at: any
  ) {
    // tslint:disable-next-line:max-line-length
    return this.apiClient.get(
      this.webServer.GetCPFeed +
        "?api_token=" +
        apitoken +
        `${
          login_type == 1
            ? "&cp_entity_id=" + cp_entity_id
            : "&cp_fos_id=" + fos_id
        }` +
        "&filter_text=" +
        " " +
        "&other_ids=" +
        param +
        "&limit=8&skip=" +
        skip_count +
        "&last_lead_updated_at=" +
        last_lead_updated_at
    );
  }

  /*VerifyOTP*/
  PostverifysendOTP(psdata: any) {
    return this.apiClient.post(this.webServer.PostVerifyOTP, psdata);
  }

  /*VerifyStatus*/
  PostLoginVerification(cp_entity_id: any) {
    return this.apiClient.get(
      this.webServer.PostLoginVerifyStatus + "?cp_entity_id=" + cp_entity_id
    );
  }

  /*PostReminder*/
  PostReminder(psdata: any) {
    return this.apiClient.post(this.webServer.PostReminder, psdata);
  }

  /*Mark As Done Reminder*/
  markasDone(psdata: any) {
    return this.apiClient.post(this.webServer.markAsDone, psdata);
  }
  /*Delete Reminder*/
  DeleteReminder(psdata: any) {
    return this.apiClient.post(this.webServer.deleteReminder, psdata);
  }

  /*Update Reminder*/
  UpdateReminder(psdata: any) {
    return this.apiClient.post(this.webServer.PostUpReminder, psdata);
  }

  /*Get Reminder */
  getCPReminder(cpUserID: any, apitoken: any, currentPage: number) {
    // tslint:disable-next-line:max-line-length
    return this.apiClient.get(
      this.webServer.GetReminder +
        "?api_token=" +
        apitoken +
        "&user_id=" +
        cpUserID +
        "&page=" +
        currentPage
    );
    /*return this.apiClient.get(this.webServer.GetCPFeed + '?' + cpfee);*/
  }

  /*Post FOS*/
  Postfos(psdata: any) {
    return this.apiClient.post(this.webServer.PostFOS, psdata);
  }

  CpFosList(cpUserID: any, apitoken: any, cpTeamLeadId: any) {
    // tslint:disable-next-line:max-line-length
    return this.apiClient.get(
      this.webServer.CpFosList +
        "?api_token=" +
        apitoken +
        "&cp_id=" +
        cpUserID +
        "&cp_team_lead_id=" +
        cpTeamLeadId
    );
    /*return this.apiClient.get(this.webServer.GetCPFeed + '?' + cpfee);*/
  }

  DeleteFos(psdata: any) {
    return this.apiClient.post(this.webServer.DeleteFos, psdata);
  }

  updateCpFOS(psdata: any) {
    return this.apiClient.post(this.webServer.updateCpFOS, psdata);
  }

  /*My Performance*/
  getMyPerformance(
    cpUserID: any,
    apitoken: any,
    from_date: any,
    to_date: any,
    project_id
  ) {
    return this.apiClient.get(
      this.webServer.performanceNewOfChannelPartner +
        "?api_token=" +
        apitoken +
        "&cp_executive_id=" +
        cpUserID +
        "&from_date=" +
        from_date +
        "&to_date=" +
        to_date +
        "&project_id" +
        project_id
    );
  }

  getBenefits(apitoken: any, cp_entity_id) {
    return this.apiClient.get(
      this.webServer.getCPBenefits_current +
        "?api_token=" +
        apitoken +
        "&cp_entity_id=" +
        cp_entity_id
    );
  }
  addBenefits(apitoken: any, cp_entity_id, cp_benefit_id: any, accepted) {
    let postData = {
      api_token: apitoken,
      cp_entity_id,
      cp_benefit_id,
      is_accepted: accepted,
    };
    return this.apiClient.post(this.webServer.getCPBenefits_current, postData);
  }

  // getAllProjects
  getAllProjects(apitoken: any) {
    return this.apiClient.get(
      this.webServer.getAllProjectName + "?api_token=" + apitoken
    );
  }

  /*Team Stats*/
  getCpTeamStats(cpUserID: any, apitoken: any, from_date: any, to_date: any) {
    return this.apiClient.get(
      this.webServer.getCpTeamStats +
        "?api_token=" +
        apitoken +
        "&cp_team_lead_id=" +
        cpUserID +
        "&from_date=" +
        from_date +
        "&to_date=" +
        to_date
    );
  }

  /*Get CP GHP*/
  getcpGHP(apitoken: any) {
    return this.apiClient.get(
      this.webServer.getcpGHP + "?api_token=" + apitoken
    );
  }

  /*Post TOken*/
  PostToken(psdata: any) {
    return this.apiClient.post(this.webServer.PostGenerateToken, psdata);
  }
  getCUID(cpUserID: any, apitoken: any, ForID: any, currentPage: number) {
    // tslint:disable-next-line:max-line-length
    return this.apiClient.get(
      this.webServer.getCUID +
        "?api_token=" +
        apitoken +
        "&cp_executive_id=" +
        cpUserID +
        "&for=" +
        ForID +
        "&page=" +
        currentPage
    );
  }

  searchCUID(
    cpUserID: any,
    apitoken: any,
    ForID: any,
    currentPage: number,
    title: any
  ) {
    // tslint:disable-next-line:max-line-length
    return this.apiClient.get(
      this.webServer.getCUID +
        "?api_token=" +
        apitoken +
        "&cp_executive_id=" +
        cpUserID +
        "&for=" +
        ForID +
        "&page=" +
        currentPage +
        "&filter_text=" +
        title
    );
  }

  /*Get CP GHP*/
  getTokenGHPInfo(apitoken: any, event_id: any, token_no: any) {
    return this.apiClient.get(
      this.webServer.getTokenGHPInfo +
        "?api_token=" +
        apitoken +
        "&event_id=" +
        event_id +
        "&token_id=" +
        token_no
    );
  }

  /*Post Upgrade Token*/
  PostUpgradeToken(psdata: any) {
    return this.apiClient.post(this.webServer.PostGenerateUpgradeToken, psdata);
  }

  getCpTeamLeads(apitoken: any, cp_id: any) {
    return this.apiClient.get(
      this.webServer.getCpTeamLeads +
        "?api_token=" +
        apitoken +
        "&cp_id=" +
        cp_id
    );
  }

  getCpTeamMembers(apitoken: any, cp_team_lead_id: any) {
    return this.apiClient.get(
      this.webServer.getCpTeamMembers +
        "?api_token=" +
        apitoken +
        "&cp_team_lead_id=" +
        cp_team_lead_id
    );
  }

  removeCpTeamMember(Teamdata: any) {
    return this.apiClient.post(this.webServer.removeCpTeamMember, Teamdata);
  }

  addCpTeamMember(TeamData: any) {
    return this.apiClient.post(this.webServer.addCpTeamMember, TeamData);
  }
  getCpFosList(
    apitoken: any,
    cp_id: any,
    cp_team_lead_id: any,
    is_team_lead: any
  ) {
    return this.apiClient.get(
      this.webServer.getCpFosList +
        "?api_token=" +
        apitoken +
        "&cp_id=" +
        cp_id +
        "&cp_team_lead_id=" +
        cp_team_lead_id +
        "&is_team_lead=" +
        is_team_lead
    );
  }

  /*Team Lead Stats*/
  getCpTeamAllStats(apitoken: any, cp_id: any, from_date: any, to_date: any) {
    return this.apiClient.get(
      this.webServer.getCpTeamAllStats +
        "?api_token=" +
        apitoken +
        "&cp_id=" +
        cp_id +
        "&from_date=" +
        from_date +
        "&to_date=" +
        to_date
    );
  }

  getCpTeamLeaderorNot(apitoken: any, cp_executive_id: any) {
    return this.apiClient.get(
      this.webServer.getCpTeamLeaderNotify +
        "?api_token=" +
        apitoken +
        "&cp_executive_id=" +
        cp_executive_id
    );
  }

  /* GetAllProjectBanners*/
  GetAllProjectBanners(api_token: any) {
    return this.apiClient.get(
      this.webServer.getAllProjectBanners + "?api_token=" + api_token
    );
  }

  /* GetAllProjectBanners*/
  GetAllProjectBrouchersNew(api_token: any) {
    return this.apiClient.get(
      this.webServer.getAllBrochureByProject + "?api_token=" + api_token
    );
  }

  //FROM SHUBHAM22-04-2020
  //   getBookingDataDetails(apitoken: any, project_id:any, fromDate:any, toDate:any,  cp_executive_id:any, cp_id:any ) {
  //     return this.apiClient.get(this.webServer.getBookingDataDetails + '?api_token=' + apitoken + '&project_id=' + project_id + '&fromDate=' + fromDate+ '&toDate=' + toDate+  '&cp_executive_id=' + cp_executive_id+ '&cp_id=' + cp_id);
  // }

  // getLeadDataDetails(apitoken: any, project_id:any, fromDate:any, toDate:any, cp_executive_id:any, cp_id:any) {
  //   return this.apiClient.get(this.webServer.getLeadDataDetails + '?api_token=' + apitoken + '&project_id=' + project_id + '&fromDate=' + fromDate+ '&toDate=' + toDate+ '&cp_executive_id=' +  cp_executive_id+ '&cp_id=' + cp_id);
  // }

  // getSiteVisitsDetails(apitoken: any, project_id:any, start_date:any, end_date:any,  cp_executive_id:any, cp_id:any ) {
  //   return this.apiClient.get(this.webServer.getSiteVisitsDetails + '?api_token=' + apitoken + '&project_id=' + project_id + '&start_date=' + start_date+ '&end_date=' + end_date+  '&cp_executive_id=' + cp_executive_id+ '&cp_id=' + cp_id );
  // }

  // getLeadTokensDetails(apitoken: any, project_id:any, start_date:any, end_date:any,  cp_executive_id:any, cp_id:any,token_type_id:any ) {
  //   return this.apiClient.get(this.webServer.getLeadTokensDetails + '?api_token=' + apitoken + '&project_id=' + project_id + '&start_date=' + start_date+ '&end_date=' + end_date+  '&cp_executive_id=' + cp_executive_id+ '&cp_id=' + cp_id+ '&token_type_id=' + token_type_id);
  // }

  getBookingDataDetails(
    apitoken: any,
    project_id: any,
    fromDate: any,
    toDate: any,
    cp_executive_id: any,
    cp_id: any,
    page: any
  ) {
    return this.apiClient.get(
      this.webServer.getBookingDataDetails +
        "?api_token=" +
        apitoken +
        "&project_id=" +
        project_id +
        "&fromDate=" +
        fromDate +
        "&toDate=" +
        toDate +
        "&cp_executive_id=" +
        cp_executive_id +
        "&cp_id=" +
        cp_id +
        "&page=" +
        page
    );
  }

  getLeadDataDetails(
    apitoken: any,
    project_id: any,
    fromDate: any,
    toDate: any,
    cp_executive_id: any,
    cp_id: any,
    page: any
  ) {
    return this.apiClient.get(
      this.webServer.getLeadDataDetails +
        "?api_token=" +
        apitoken +
        "&project_id=" +
        project_id +
        "&fromDate=" +
        fromDate +
        "&toDate=" +
        toDate +
        "&cp_executive_id=" +
        cp_executive_id +
        "&cp_id=" +
        cp_id +
        "&page=" +
        page
    );
  }

  getSiteVisitsDetails(
    apitoken: any,
    project_id: any,
    start_date: any,
    end_date: any,
    cp_executive_id: any,
    cp_id: any,
    page: any
  ) {
    return this.apiClient.get(
      this.webServer.getSiteVisitsDetails +
        "?api_token=" +
        apitoken +
        "&project_id=" +
        project_id +
        "&start_date=" +
        start_date +
        "&end_date=" +
        end_date +
        "&cp_executive_id=" +
        cp_executive_id +
        "&cp_id=" +
        cp_id +
        "&page=" +
        page
    );
  }

  getLeadTokensDetails(
    apitoken: any,
    project_id: any,
    start_date: any,
    end_date: any,
    cp_executive_id: any,
    cp_id: any,
    token_type_id: any,
    page: any
  ) {
    return this.apiClient.get(
      this.webServer.getLeadTokensDetails +
        "?api_token=" +
        apitoken +
        "&project_id=" +
        project_id +
        "&start_date=" +
        start_date +
        "&end_date=" +
        end_date +
        "&cp_executive_id=" +
        cp_executive_id +
        "&cp_id=" +
        cp_id +
        "&token_type_id=" +
        token_type_id +
        "&page=" +
        page
    );
  }

  // From Search

  getLeadDataDetailsSearch(
    apitoken: any,
    project_id: any,
    fromDate: any,
    toDate: any,
    cp_executive_id: any,
    cp_id: any,
    page: any,
    title: any
  ) {
    return this.apiClient.get(
      this.webServer.getLeadDataDetails +
        "?api_token=" +
        apitoken +
        "&project_id=" +
        project_id +
        "&fromDate=" +
        fromDate +
        "&toDate=" +
        toDate +
        "&cp_executive_id=" +
        cp_executive_id +
        "&cp_id=" +
        cp_id +
        "&page=" +
        page +
        "&filter_text=" +
        title
    );
  }
  getSiteVisitsDetailsSearch(
    apitoken: any,
    project_id: any,
    fromDate: any,
    toDate: any,
    cp_executive_id: any,
    cp_id: any,
    page: any,
    title: any
  ) {
    return this.apiClient.get(
      this.webServer.getSiteVisitsDetails +
        "?api_token=" +
        apitoken +
        "&project_id=" +
        project_id +
        "&fromDate=" +
        fromDate +
        "&toDate=" +
        toDate +
        "&cp_executive_id=" +
        cp_executive_id +
        "&cp_id=" +
        cp_id +
        "&page=" +
        page +
        "&filter_text=" +
        title
    );
  }

  getBookingDataDetailsSearch(
    apitoken: any,
    project_id: any,
    fromDate: any,
    toDate: any,
    cp_executive_id: any,
    cp_id: any,
    page: any,
    title: any
  ) {
    return this.apiClient.get(
      this.webServer.getBookingDataDetails +
        "?api_token=" +
        apitoken +
        "&project_id=" +
        project_id +
        "&fromDate=" +
        fromDate +
        "&toDate=" +
        toDate +
        "&cp_executive_id=" +
        cp_executive_id +
        "&cp_id=" +
        cp_id +
        "&page=" +
        page +
        "&filter_text=" +
        title
    );
  }

  getLeadTokensDetailsSearch(
    apitoken: any,
    project_id: any,
    fromDate: any,
    toDate: any,
    cp_executive_id: any,
    cp_id: any,
    token_type_id: any,
    page: any,
    title: any
  ) {
    return this.apiClient.get(
      this.webServer.getLeadTokensDetails +
        "?api_token=" +
        apitoken +
        "&project_id=" +
        project_id +
        "&fromDate=" +
        fromDate +
        "&toDate=" +
        toDate +
        "&cp_executive_id=" +
        cp_executive_id +
        "&cp_id=" +
        cp_id +
        "&token_type_id=" +
        token_type_id +
        "&page=" +
        page +
        "&filter_text=" +
        title
    );
  }

  getCPAgreementList(cp_executive_id: any) {
    return this.apiClient.get(
      this.webServer.getAgreementList + "?cp_executive_id=" + cp_executive_id
    );
  }

  postRaiseBill(psdata: any) {
    return this.apiClient.post(this.webServer.postBill, psdata);
  }

  getCPAgreementSubmittedList(cp_id: any, page: any) {
    return this.apiClient.get(
      this.webServer.getSubmittedList + "?cp_id=" + cp_id + "&page=" + page
    );
  }
  getCPAgreementSubmittedListSearch(cp_id: any, page: any, title: any) {
    return this.apiClient.get(
      this.webServer.getSubmittedList +
        "?cp_id=" +
        cp_id +
        "&page=" +
        page +
        "&filter_text=" +
        title
    );
  }

  // Get CP Awards
  GetCpAwards(
    apitoken: any,
    count: number,
    cp_id: any,
    cp_executive_id: number
  ) {
    return this.apiClient.get(
      this.webServer.GetCpAwards +
        "?api_token=" +
        apitoken +
        "&count=" +
        count +
        "&cp_id=" +
        cp_id +
        "&cp_executive_id=" +
        cp_executive_id
    );
  }

  // Claim Awards
  claimAward(awardData: any) {
    return this.apiClient.post(this.webServer.ClaimAward, awardData);
  }

  // Get CP Claim Awards
  GetCpClaimAwards(cp_id: any, cp_executive_id: number, count: number) {
    return this.apiClient.get(
      this.webServer.GetCpClaimAwards +
        "?cp_id=" +
        cp_id +
        "&cp_executive_id=" +
        cp_executive_id +
        "&count=" +
        count
    );
  }

  getAOPBills(cp_id: any) {
    return this.apiClient.get(this.webServer.getAOPBills + "?cp_id=" + cp_id);
  }
  getAOPBillsSearch(cp_id: any, title: any) {
    return this.apiClient.get(
      this.webServer.getAOPBillsSearch +
        "?cp_id=" +
        cp_id +
        "&filter_text=" +
        title
    );
  }

  getAgreementAferAOP(cp_id: any, page: any) {
    return this.apiClient.get(
      this.webServer.getAgreementAferAOP +
        "?cp_executive_id=" +
        cp_id +
        "&page=" +
        page
    );
  }
  getAgreementAferAOPSearch(cp_id: any, page: any, title: any) {
    return this.apiClient.get(
      this.webServer.getAgreementAferAOPSearch +
        "?cp_executive_id=" +
        cp_id +
        "&page=" +
        page +
        "&filter_text=" +
        title
    );
  }

  //APP UPDATE
  appUpdateAvailable(platformVer: any, version: any) {
    return this.apiClient.get(
      this.webServer.appUpdateAvailable +
        "?platform=" +
        platformVer +
        "&appVersion=" +
        version
    );
  }
  cpRegistration(psData: any) {
    return this.apiClient.post(this.webServer.cpRegistration, psData);
  }
  // KYC Verification
  kycVerifications(url, id_number) {
    let TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NzEwNDcxNCwianRpIjoiOWNhMDViZTAtZTMwYS00NTc5LTk5MzEtYWY3MmVmYzg1ZGFhIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmphdmRla2Fyc0BhYWRoYWFyYXBpLmlvIiwibmJmIjoxNjQ3MTA0NzE0LCJleHAiOjE5NjI0NjQ3MTQsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJyZWFkIl19fQ.cGYIaxfNm0BDCol5_7I1DaJFZE-jXSel2E63EHl2A4A";
    const headers = new HttpHeaders().set(
      "Authorization",
      `${"Bearer" + " " + TOKEN}`
    );
    console.log(headers);
    return this.http.post(url, { id_number }, { headers });
  }

  getcpEntitySearch(name: any) {
    return this.apiClient.get(this.webServer.cpEntitySearch + "?name=" + name);
  }
  checkTagging(fos_id) {
    return this.apiClient.get(
      this.webServer.checkTagging + "?fos_id=" + fos_id
    );
  }
  cpEntityTaggingRequest(psData) {
    return this.apiClient.post(this.webServer.cpEntityTaggingRequest, psData);
  }
  cpEntityTaggingRequestList(cp_fos_id, cp_entity_id, login_type) {
    return this.apiClient.get(
      this.webServer.cpEntityTaggingRequestList +
        `${
          login_type == 1
            ? "?cp_entity_id=" + cp_entity_id
            : "?cp_fos_id=" + cp_fos_id
        }`
    );
  }

  cpEntityTaggingCancel(tagging_id) {
    return this.apiClient.post(this.webServer.cpEntityCancelTagging, {
      tagging_id,
    });
  }

  kycVerifications_registration(id, id_number) {
    let TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NzEwNDcxNCwianRpIjoiOWNhMDViZTAtZTMwYS00NTc5LTk5MzEtYWY3MmVmYzg1ZGFhIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmphdmRla2Fyc0BhYWRoYWFyYXBpLmlvIiwibmJmIjoxNjQ3MTA0NzE0LCJleHAiOjE5NjI0NjQ3MTQsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJyZWFkIl19fQ.cGYIaxfNm0BDCol5_7I1DaJFZE-jXSel2E63EHl2A4A";
    const headers = new HttpHeaders().set(
      "Authorization",
      `${"Bearer" + " " + TOKEN}`
    );
    console.log(headers);
    let url = "";
    switch (id) {
      case 1:
        url = this.webServer.verifyPan;
        break;
      case 2:
        url = this.webServer.verifyaadhar;
        break;
      case 3:
        url = this.webServer.verifyrera;
        break;
      case 4:
        url = this.webServer.verifyGST;
        break;
    }
    return this.http.post(url, { id_number }, { headers });
  }
}
