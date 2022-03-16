import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  /*Very Important*/
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  {
    path: "new-registration",
    loadChildren:
      "./new-registration/new-registration.module#NewRegistrationPageModule",
  },
  // tslint:disable-next-line:max-line-length
  {
    path: "enter-mobile-screen",
    loadChildren:
      "./forgotpassword/enter-mobile-screen/enter-email-screen.module#EnterEmailScreenPageModule",
  },
  {
    path: "verify-otp-screen",
    loadChildren:
      "./forgotpassword/verify-otp-screen/verify-otp-screen.module#VerifyOtpScreenPageModule",
  },
  {
    path: "verify-otp-screen/:otp",
    loadChildren:
      "./forgotpassword/verify-otp-screen/verify-otp-screen.module#VerifyOtpScreenPageModule",
  },
  {
    path: "change-password",
    loadChildren:
      "./forgotpassword/change-password/change-password.module#ChangePasswordPageModule",
  },
  {
    path: "addnewlead",
    loadChildren: "./addnewlead/addnewlead.module#AddnewleadPageModule",
  },
  {
    path: "addnewlead/:countryCode",
    loadChildren: "./addnewlead/addnewlead.module#AddnewleadPageModule",
  },
  {
    path: "countrycodelist",
    loadChildren:
      "./countrycodelist/countrycodelist.module#CountrycodelistPageModule",
  },
  {
    path: "countrycodelist",
    loadChildren:
      "./countrycodelist/countrycodelist.module#CountrycodelistPageModule",
  },
  {
    path: "verificationpending",
    loadChildren:
      "./verificationpending/verificationpending.module#VerificationpendingPageModule",
  },
  {
    path: "notification",
    loadChildren: "./notification/notification.module#NotificationPageModule",
  },
  {
    path: "reminder",
    loadChildren: "./reminder/reminder.module#ReminderPageModule",
  },
  {
    path: "addreminder",
    loadChildren: "./addreminder/addreminder.module#AddreminderPageModule",
  },
  //{ path: 'addreminder/:this.USERNEWID', loadChildren: './addreminder/addreminder.module#AddreminderPageModule' },
 // { path: 'blank', loadChildren: './blank/blank.module#BlankPageModule' },
  { path: 'bottom-nav', loadChildren: './bottom-nav/bottom-nav.module#BottomNavPageModule' },
  { path: 'foslist', loadChildren: './foslist/foslist.module#FOSListPageModule' },
  { path: 'add-fos-list', loadChildren: './add-fos-list/add-fos-list.module#AddFosListPageModule' },
  { path: 'myperformance', loadChildren: './myperformance/myperformance.module#MyperformancePageModule' },
  { path: 'team-stats', loadChildren: './team-stats/team-stats.module#TeamStatsPageModule' },
  { path: 'generate-ghp', loadChildren: './generate-ghp/generate-ghp.module#GenerateGHPPageModule' },
  { path: 'customer-unique-id', loadChildren: './customer-unique-id/customer-unique-id.module#CustomerUniqueIdPageModule' },
 // { path: 'ghp-plus-details', loadChildren: './ghp-plus-details/ghp-plus-details.module#GhpPlusDetailsPageModule' },
  { path: 'ghpdetails', loadChildren: './ghpdetails/ghpdetails.module#GHPDetailsPageModule' },
  { path: 'upgrade-to-ghp', loadChildren: './upgrade-to-ghp/upgrade-to-ghp.module#UpgradeToGHPPageModule' },
    { path: 'teamlist', loadChildren: './team-list/team-list.module#TeamListPageModule' },
  { path: 'teamperson', loadChildren: './teamperson/teamperson.module#TeampersonPageModule' },
    { path: 'add-team-person', loadChildren: './add-team-person/add-team-person.module#AddTeamPersonPageModule' },
  { path: 'team-lead-stat', loadChildren: './team-lead-stat/team-lead-stat.module#TeamLeadStatPageModule' },
 // { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'ghp-request', loadChildren: './ghp-request/ghp-request.module#GhpRequestPageModule' },
  { path: 'popupalert', loadChildren: './popupalert/popupalert.module#PopupalertPageModule' },
  { path: 'new-reaminder/:this.cpReminder.user_id', loadChildren: './new-reaminder/new-reaminder.module#NewReaminderPageModule' },
  { path: 'ghp-plus-request', loadChildren: './ghp-plus-request/ghp-plus-request.module#GhpPlusRequestPageModule' },
  { path: 'projectbrochures', loadChildren: './projectbrochures/projectbrochures.module#ProjectbrochuresPageModule' },
  { path: 'leadslist-data', loadChildren: './leadslist-data/leadslist-data.module#LeadslistDataPageModule' },
//{ path: 'lead-data-from-stats', loadChildren: './lead-data-from-stats/lead-data-from-stats.module#LeadDataFromStatsPageModule' },
  { path: 'myperformancefilter', loadChildren: './myperformancefilter/myperformancefilter.module#MyperformancefilterPageModule' },
  { path: 'readytosubmit-bills', loadChildren: './readytosubmit-bills/readytosubmit-bills.module#ReadytosubmitBillsPageModule' },
  { path: 'pop-up-raise-bill', loadChildren: './pop-up-raise-bill/pop-up-raise-bill.module#PopUpRaiseBillPageModule' },
  { path: 'submitted-bill-page', loadChildren: './submitted-bill-page/submitted-bill-page.module#SubmittedBillPagePageModule' },
  { path: 'incentive-bills', loadChildren: './incentive-bills/incentive-bills.module#IncentiveBillsPageModule' },
  { path: 'agreement-list', loadChildren: './agreement-list/agreement-list.module#AgreementListPageModule' },
  { path: 'popup-incentive-raise-bill', loadChildren: './popup-incentive-raise-bill/popup-incentive-raise-bill.module#PopupIncentiveRaiseBillPageModule' },
  { path: 'cpawards', loadChildren: './cpawards/cpawards.module#CpawardsPageModule' },
  { path: 'claim-awards', loadChildren: './claim-awards/claim-awards.module#ClaimAwardsPageModule' },
  { path: 'show-logs', loadChildren: './show-logs/show-logs.module#ShowLogsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'sales-performance', loadChildren: './sales-performance/sales-performance.module#SalesPerformancePageModule' },
  { path: 'aop-approval-benefit', loadChildren: './aop-approval-benefit/aop-approval-benefit.module#AopApprovalBenefitPageModule' },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes)
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
