(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{hFjH:function(n,l,t){"use strict";t.r(l);var e=t("8Y7J"),o=t("mrSG"),i=t("ZZ/e");class r{}var a=t("xoVG"),s=t("VuIw"),u=t("a5m1"),c=t("fpjg"),p=t("bLnU");class g{constructor(n,l,t,e,o,i,a){this.storage=n,this.apiservice=l,this.helper=t,this.network=e,this.alertController=o,this.navCtrl=i,this.modalController=a,this.verifyStatus=new r,this.postloginresponce=new c.a}ngOnInit(){}ionViewDidEnter(){this.storage.get("cp_executive_id").then(n=>{this.cpExecutiveID=n,console.log(this.cpExecutiveID),this.storage.get("cp_id").then(n=>{this.cpID=n,this.storage.get("apiToken").then(n=>{this.apiToken=n,this.VerficationStatus()})})})}VerficationStatus(){"none"===this.network.type||"unknown"===this.network.type?this.helper.presentToast("Please on Internet Connection!"):(this.verifyStatus.api_token=this.apiToken,this.verifyStatus.cp_id=this.cpID,this.verifyStatus.cp_executive_id=this.cpExecutiveID,this.helper.showLoader("Processing"),this.apiservice.PostLoginVerification(this.verifyStatus).subscribe(n=>(console.log("responseBody",n.body),this.successvalue=n.body,1===this.successvalue.success?(this.helper.showLoader("Verified Successfully"),this.helper.presentToast("Verified Successful!"),this.storage.set("cpLoginData",this.successvalue.data),this.storeData(this.successvalue.data),this.navCtrl.navigateRoot(["/home/"]),this.helper.hideLoader()):this.helper.presentToast("Your account does not verified yet!"),n),n=>{this.helper.presentToast("Something went wrong!")}))}doRefresh(n){console.log("Begin async operation"),setTimeout(()=>{this.VerficationStatus(),console.log("Async operation has ended"),n.target.complete()},500)}presentAlertConfirm(){return o.__awaiter(this,void 0,void 0,(function*(){const n=yield this.alertController.create({message:"Do you want to Logout?",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:n=>{}},{text:"Logout",handler:()=>{this.storage.remove("data"),this.storage.remove("cpLoginData"),this.storage.remove("cp_executive_id"),this.storage.remove("apiToken"),this.storage.remove("cp_id"),this.storage.remove("verification_status_id"),this.storage.remove("fullname"),this.helper.presentToast("Logout Successfully"),this.navCtrl.navigateRoot("login"),this.alertController.dismiss(),this.modalController.dismiss()}}]});yield n.present()}))}logout(){this.presentAlertConfirm()}storeData(n){const l=this;console.log("inside storeData"),l.postloginresponce=new c.a;const t=n.user_details;l.postloginresponce.first_name=t.first_name,l.postloginresponce.last_name=t.last_name,l.postloginresponce.api_token=t.api_token,l.postloginresponce.full_name=t.full_name,l.postloginresponce.cp_executive_id=n.cp_executive_id,l.postloginresponce.verification_status_id=n.verification_status_id,l.postloginresponce.cp_id=n.cp_id,console.log(l.postloginresponce.cp_executive_id),console.log(l.postloginresponce.cp_id),l.storage.set("cp_id",l.postloginresponce.cp_id),l.storage.set("cp_executive_id",l.postloginresponce.cp_executive_id),l.storage.get("cp_executive_id").then(n=>{console.log("1",n),console.log("cp_executive_id1 =>>",l.postloginresponce.cp_executive_id)}),l.storage.set("apiToken",l.postloginresponce.api_token),console.log("apiToken =>>",l.postloginresponce.api_token),l.storage.set("verification_status_id",l.postloginresponce.verification_status_id),console.log("verification_status_id =>>",l.postloginresponce.verification_status_id),l.storage.set("fullname",l.postloginresponce.full_name),console.log("fullname =>>",l.postloginresponce.full_name),console.log("data =>",l.successvalue.data),console.log("user first name =>>",t.first_name),console.log("user first name =>>",l.postloginresponce.first_name)}sideNavMenu(){return o.__awaiter(this,void 0,void 0,(function*(){const n=yield this.modalController.create({component:p.a,componentProps:{value:123},cssClass:"my-custom-modal-css"});return yield n.present()}))}}class b{}var d=t("pMnS"),m=t("oBZk"),h=t("xgBC"),_=e.rb({encapsulation:0,styles:[['.circle[_ngcontent-%COMP%]{display:block;height:50px;width:50px;border-radius:50%;border:1px var(--ion-color-light_grey);text-align:center;-webkit-box-pack:center;justify-content:center;padding-top:15px;margin:20% auto auto;background-color:var(--ion-color-light_grey)}.title[_ngcontent-%COMP%]{padding-top:5px;alignment:center;color:var(--ion-color-medium_grey);font-family:"Metropolis Medium";margin-top:5%;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;font-size:18px}.circlenew[_ngcontent-%COMP%]{display:block;height:50px;width:50px;border-radius:50%;border:1px solid #000;text-align:center;-webkit-box-pack:center;justify-content:center;padding-top:15px;margin:20% auto auto;background-color:var(--ion-color-secondary)}.titlenew[_ngcontent-%COMP%]{padding-top:5px;alignment:center;color:var(--ion-color-primary);font-family:"Metropolis Medium";margin-top:5%;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;font-size:18px}.titletextmessage[_ngcontent-%COMP%]{padding:2px;alignment:center;color:var(--ion-color-primary);font-family:"Metropolis Light";margin-right:3%;-webkit-box-pack:center;justify-content:center;-webkit-box-align:baseline;align-items:baseline;font-size:14px}.titletextmessage2[_ngcontent-%COMP%], .titletextmessage3[_ngcontent-%COMP%]{padding:2px;alignment:center;color:var(--ion-color-primary);font-family:"Metropolis Medium";margin-right:3%;-webkit-box-pack:center;justify-content:center;-webkit-box-align:baseline;align-items:baseline;font-size:16px}.toolbar-text[_ngcontent-%COMP%]{color:var(--ion-color-secondary);font-family:"Metropolis Medium";font-size:medium;background-color:var(--ion-color-primary)}.toolbar-title[_ngcontent-%COMP%]{color:var(--ion-color-secondary);font-family:"Metropolis Medium";font-size:20px}.buttons[_ngcontent-%COMP%]{margin-top:10%;width:50%;padding-top:5px;padding-bottom:5px;border-radius:25px;background-color:var(--ion-color-primary);color:var(--ion-color-secondary);font-size:16px!important;font-family:"Metropolis Medium"}.appbar[_ngcontent-%COMP%]{width:100%;min-height:3.5rem}.appbar__bottom[_ngcontent-%COMP%]{position:fixed;bottom:0;display:grid;width:100%;color:#fff;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.appbar__bottom--normal[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;background-color:var(--ion-color-main-white)}.appbar__bottom--normal[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{will-change:color;-webkit-transition:color 170ms ease-out;transition:color 170ms ease-out;display:inline-block;margin:0 .25rem;padding:0;color:var(--ion-color-primary);font-size:0;text-decoration:none}.appbar__bottom--normal[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus, .appbar__bottom--normal[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--ion-color-primary)}.appbar__bottom--spacer[_ngcontent-%COMP%]{background-color:var(--primary)}.appbar__bottom--cutout[_ngcontent-%COMP%]{width:4.5rem;max-width:4.5rem;background:var(--ion-color-main-white);-webkit-clip-path:url(#appbar__cutout);clip-path:url(#appbar__cutout)}.appbar__bottom--fab[_ngcontent-%COMP%]{will-change:box-shadow,transform;-webkit-transform:box-shadow 170ms ease-out;transform:box-shadow 170ms ease-out;position:absolute;top:-50%;left:50%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;width:3.5rem;height:3.5rem;padding:0;background-color:var(--ion-color-primary);color:var(--ion-color-secondary);border-radius:50%;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);-webkit-transform:translateX(-50%);transform:translateX(-50%);z-index:99999}.appbar__bottom--fab-primary[_ngcontent-%COMP%]{background-color:var(--ion-color-primary);color:var(--ion-color-secondary)}.appbar__bottom--fab-primary[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px}.appbar__bottom--fab-end[_ngcontent-%COMP%]{left:auto;right:1rem;-webkit-transform:translateX(0);transform:translateX(0)}.appbar__bottom--fab[_ngcontent-%COMP%]:focus, .appbar__bottom--fab[_ngcontent-%COMP%]:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.appbar__bottom--no-cut[_ngcontent-%COMP%]{grid-template:auto/1fr 1fr}.appbar__bottom--end-no-cut[_ngcontent-%COMP%]{grid-template:auto/1fr}.appbar__bottom--end-cut[_ngcontent-%COMP%]{grid-template:auto/1fr 4.5rem .5rem}.appbar__bottom--no-fab[_ngcontent-%COMP%]{grid-template:auto/1fr 1fr}.appbar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}.fabmargin[_ngcontent-%COMP%]{margin-right:2%!important;margin-bottom:20%!important}.badgeDiv[_ngcontent-%COMP%]{position:relative;display:inline-block;width:40px}.badgeDiv[_ngcontent-%COMP%]   .p2[_ngcontent-%COMP%], .badgeDiv[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:35px;height:35px}.badgeDiv[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{position:absolute;right:0;padding:8px 5px;border-radius:50%;background:var(--ion-color-primary);color:#fff;border:1px solid #fff;font-size:10px;width:19px;height:19px;line-height:0;text-align:center}.flex--right[_ngcontent-%COMP%]{-webkit-box-pack:end;justify-content:flex-end;border-top-left-radius:5px;border-top-right-radius:0}.gradient_background[_ngcontent-%COMP%]{background:conic-gradient(#fff)}']],data:{}});function f(n){return e.Ob(0,[(n()(),e.tb(0,0,null,null,19,"ion-header",[],null,null,null,m.Y,m.q)),e.sb(1,49152,null,0,i.C,[e.h,e.k,e.y],null,null),(n()(),e.tb(2,0,null,0,17,"ion-toolbar",[["color","color_d"]],null,null,null,m.pb,m.H)),e.sb(3,49152,null,0,i.Db,[e.h,e.k,e.y],{color:[0,"color"]},null),(n()(),e.tb(4,0,null,0,15,"ion-row",[],null,null,null,m.kb,m.C)),e.sb(5,49152,null,0,i.kb,[e.h,e.k,e.y],null,null),(n()(),e.tb(6,0,null,0,4,"ion-col",[],null,null,null,m.R,m.j)),e.sb(7,49152,null,0,i.u,[e.h,e.k,e.y],null,null),(n()(),e.tb(8,0,null,0,2,"div",[],null,null,null,null,null)),(n()(),e.tb(9,0,null,null,1,"ion-buttons",[["slot","start"],["style","margin-left: 3%"]],null,null,null,m.L,m.d)),e.sb(10,49152,null,0,i.m,[e.h,e.k,e.y],null,null),(n()(),e.tb(11,0,null,0,5,"ion-col",[["style","text-align: start;margin-left: 20px!important;"]],null,null,null,m.R,m.j)),e.sb(12,49152,null,0,i.u,[e.h,e.k,e.y],null,null),(n()(),e.tb(13,0,null,0,3,"div",[],null,null,null,null,null)),(n()(),e.tb(14,0,null,null,2,"ion-title",[["class","TITLETOOLBAR"],["style","margin-left:20px!important;"]],null,null,null,m.ob,m.G)),e.sb(15,49152,null,0,i.Bb,[e.h,e.k,e.y],null,null),(n()(),e.Mb(-1,0,["Verification Pending"])),(n()(),e.tb(17,0,null,0,2,"ion-col",[["style","text-align: end;margin-right: 10px;"]],null,null,null,m.R,m.j)),e.sb(18,49152,null,0,i.u,[e.h,e.k,e.y],null,null),(n()(),e.tb(19,0,null,0,0,"img",[["class","srcIMGLOGO"],["src","assets/channelPartner_Icons/vjd_Logos/vj_logo.svg"],["style","text-align: right;width: 100%!important;"]],null,null,null,null,null)),(n()(),e.tb(20,0,null,null,33,"ion-content",[["class","ion-text-center"]],null,null,null,m.S,m.k)),e.sb(21,49152,null,0,i.v,[e.h,e.k,e.y],null,null),(n()(),e.tb(22,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(n,l,t){var e=!0;return"ionRefresh"===l&&(e=!1!==n.component.doRefresh(t)&&e),e}),m.ib,m.z)),e.sb(23,49152,null,0,i.eb,[e.h,e.k,e.y],null,null),(n()(),e.tb(24,0,null,0,1,"ion-refresher-content",[["pullingIcon","arrow-dropdown"],["pullingText","Pull to refresh"],["refreshingSpinner","circles"],["refreshingText","Refreshing Data"]],null,null,null,m.hb,m.A)),e.sb(25,49152,null,0,i.fb,[e.h,e.k,e.y],{pullingIcon:[0,"pullingIcon"],pullingText:[1,"pullingText"],refreshingSpinner:[2,"refreshingSpinner"],refreshingText:[3,"refreshingText"]},null),(n()(),e.tb(26,0,null,0,9,"div",[["style","margin-top: 40%!important;"]],null,null,null,null,null)),(n()(),e.tb(27,0,null,null,3,"div",[],null,null,null,null,null)),(n()(),e.tb(28,0,null,null,2,"ion-label",[["class","circle"]],null,null,null,m.fb,m.x)),e.sb(29,49152,null,0,i.O,[e.h,e.k,e.y],null,null),(n()(),e.Mb(-1,0,["1"])),(n()(),e.tb(31,0,null,null,4,"div",[["style","margin-top: 6%!important;"]],null,null,null,null,null)),(n()(),e.tb(32,0,null,null,3,"ion-label",[["class","titletextmessage"],["margin-top","10%"]],null,null,null,m.fb,m.x)),e.sb(33,49152,null,0,i.O,[e.h,e.k,e.y],null,null),e.sb(34,16384,null,0,i.e,[e.k],null,null),(n()(),e.Mb(-1,0,["You have successfully registered with us!"])),(n()(),e.tb(36,0,null,0,9,"div",[["style","margin-top: 10%!important;"]],null,null,null,null,null)),(n()(),e.tb(37,0,null,null,3,"div",[["style","margin-top: 10%!important;"]],null,null,null,null,null)),(n()(),e.tb(38,0,null,null,2,"ion-label",[["class","circlenew"]],null,null,null,m.fb,m.x)),e.sb(39,49152,null,0,i.O,[e.h,e.k,e.y],null,null),(n()(),e.Mb(-1,0,["2"])),(n()(),e.tb(41,0,null,null,4,"div",[["style","margin-top: 6%!important;"]],null,null,null,null,null)),(n()(),e.tb(42,0,null,null,3,"ion-label",[["class","titletextmessage3"],["margin-top","10%"],["style","margin-top: 20%"]],null,null,null,m.fb,m.x)),e.sb(43,49152,null,0,i.O,[e.h,e.k,e.y],null,null),e.sb(44,16384,null,0,i.e,[e.k],null,null),(n()(),e.Mb(-1,0,["Pending Verification From VJ Team!"])),(n()(),e.tb(46,0,null,0,7,"ion-card-title",[["style","margin-top: 30%!important;"]],null,null,null,m.P,m.i)),e.sb(47,49152,null,0,i.r,[e.h,e.k,e.y],null,null),(n()(),e.tb(48,0,null,0,5,"div",[["class","titletextmessage2"],["padding-start","40px"]],null,null,null,null,null)),e.sb(49,16384,null,0,i.e,[e.k],null,null),(n()(),e.tb(50,0,null,null,2,"strong",[["class","titletextmessage2"],["padding-horizontal","10px"],["padding-start","40px"]],null,null,null,null,null)),e.sb(51,16384,null,0,i.e,[e.k],null,null),(n()(),e.Mb(-1,null,["Note:"])),(n()(),e.Mb(-1,null,["For any query contact VJ Team "])),(n()(),e.tb(54,0,null,null,8,"ion-footer",[["class","footerNav"],["style","position: fixed"]],null,null,null,m.W,m.o)),e.sb(55,49152,null,0,i.A,[e.h,e.k,e.y],null,null),(n()(),e.tb(56,0,null,0,0,"div",[["class","toolbar-background"]],null,null,null,null,null)),(n()(),e.tb(57,0,null,0,5,"div",[["class","appbar appbar__bottom appbar__bottom--center-cut "]],null,null,null,null,null)),(n()(),e.tb(58,0,null,null,3,"div",[["class","appbar__bottom--normal"],["style","background: #F5A22C !important"]],null,null,null,null,null)),(n()(),e.tb(59,0,null,null,2,"a",[["style","padding: 15px;width: 80%;"]],null,[[null,"click"]],(function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.sideNavMenu()&&e),e}),null,null)),(n()(),e.tb(60,0,null,null,1,":svg:svg",[["fill","currentColor"],["height","30"],["viewBox","0 0 24 24"],["width","30"]],null,null,null,null,null)),(n()(),e.tb(61,0,null,null,0,":svg:path",[["d","M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"]],null,null,null,null,null)),(n()(),e.tb(62,0,null,null,0,"div",[["class","appbar__bottom--cutout"]],null,null,null,null,null)),(n()(),e.tb(63,0,null,null,2,":svg:svg",[["height","0"],["id","appbar"],["viewBox","0 0 72 36"],["width","0"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(n()(),e.tb(64,0,null,null,1,":svg:clipPath",[["id","appbar__cutout"]],null,null,null,null,null)),(n()(),e.tb(65,0,null,null,0,":svg:path",[["d","M36 36C55.8823 36 72 19.8823 72 0V112H0V0C0 19.8823 16.1177 36 36 36Z"],["fill","none"]],null,null,null,null,null))],(function(n,l){n(l,3,0,"color_d"),n(l,25,0,"arrow-dropdown","Pull to refresh","circles","Refreshing Data")}),null)}function x(n){return e.Ob(0,[(n()(),e.tb(0,0,null,null,1,"app-verificationpending",[],null,null,null,f,_)),e.sb(1,114688,null,0,g,[h.b,u.a,s.a,a.a,i.b,i.Kb,i.Jb],null,null)],(function(n,l){n(l,1,0)}),null)}var v=e.pb("app-verificationpending",g,x,{},{},[]),y=t("SVse"),k=t("s7LF"),w=t("iInd");t.d(l,"VerificationpendingPageModuleNgFactory",(function(){return M}));var M=e.qb(b,[],(function(n){return e.Cb([e.Db(512,e.j,e.bb,[[8,[d.a,v]],[3,e.j],e.w]),e.Db(4608,y.n,y.m,[e.t,[2,y.C]]),e.Db(4608,k.w,k.w,[]),e.Db(4608,i.c,i.c,[e.y,e.g]),e.Db(4608,i.Jb,i.Jb,[i.c,e.j,e.q]),e.Db(4608,i.Mb,i.Mb,[i.c,e.j,e.q]),e.Db(1073742336,y.c,y.c,[]),e.Db(1073742336,k.v,k.v,[]),e.Db(1073742336,k.h,k.h,[]),e.Db(1073742336,i.Fb,i.Fb,[]),e.Db(1073742336,w.n,w.n,[[2,w.s],[2,w.m]]),e.Db(1073742336,b,b,[]),e.Db(1024,w.k,(function(){return[[{path:"",component:g}]]}),[])])}))}}]);