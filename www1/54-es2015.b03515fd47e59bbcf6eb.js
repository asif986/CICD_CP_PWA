(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{aZ84:function(l,n,t){"use strict";t.r(n);var i=t("8Y7J"),u=t("mrSG"),e=t("ZZ/e"),o=t("VuIw"),a=t("a5m1"),s=t("xoVG"),r=t("2uix");class b{constructor(l,n,t,i,u,e,o,a,s,r,b,c,p,m,d,g){this.storage=l,this.events=n,this.loadingController=t,this.alertCtrl=i,this.alertController=u,this.popoverController=e,this.helper=o,this.apiservice=a,this.network=s,this.webServer=r,this.cd=b,this.platform=c,this.router=p,this.matIconRegistry=m,this.navCtrl=d,this.modalController=g,this.readyToSubmitBillsArrayList=[],this.isSpinner=!0,this.storageData=[],this.platform.backButton.subscribeWithPriority(1,()=>{this.router.navigate(["/home/"]),this.storage.set("IDFromPerformance",2)})}ngOnInit(){}ionViewDidEnter(){console.log(1),this.platform.backButton.subscribeWithPriority(1,()=>{this.storage.set("IDFromPerformance",2),this.router.navigate(["/home/"])}),this.storage.get("cp_executive_id").then(l=>{this.cpExecutiveID=l,"none"===this.network.type||"unknown"===this.network.type?(this.helper.presentToastError("Please on Internet Connection"),this.isSpinner=!1):(this.isSpinner=!0,this.getAgreementList())})}getAgreementList(){this.presentLoading().then(()=>{"none"!==this.network.type&&"unknown"!==this.network.type?this.apiservice.getCPAgreementList(this.cpExecutiveID).subscribe(l=>{this.successvalue=JSON.stringify(l.body);const n=JSON.parse(this.successvalue);this.isSpinner=!1,1===n.sucess?(this.readyToSubmitBillsArrayList=n.data,console.log(this.readyToSubmitBillsArrayList),this.dismissLoading()):(this.isSpinner=!1,this.dismissLoading(),this.helper.presentToast("Something went wrong!"))},l=>{this.isSpinner=!1,this.dismissLoading(),this.helper.presentToast("Something went wrong!")}):(this.isSpinner=!1,this.dismissLoading(),console.log("Network Type :"+this.network.type),this.helper.presentToast("Please on Internet Connection!"))},l=>{this.isSpinner=!1,this.dismissLoading(),this.helper.presentToastError("Something went wrong!")})}doRefresh(l){console.log("Begin async operation"),setTimeout(()=>{this.readyToSubmitBillsArrayList=[],this.isSpinner=!0,this.getAgreementList(),console.log("Async operation has ended"),l.target.complete()},500)}searchEvent(l){const n=l.target.value;console.log(n),n?this.readyToSubmitBillsArrayList=this.readyToSubmitBillsArrayList.filter(l=>(null!=l.name?l.name.toLowerCase().indexOf(n.toLowerCase())>-1:"")||(null!=l.bsp?l.bsp.toLowerCase().indexOf(n.toLowerCase())>-1:"")||(null!=l.block_name?l.block_name.toLowerCase().indexOf(n.toLowerCase())>-1:"")||(null!=l.totalBrokerage?l.totalBrokerage.toLowerCase().indexOf(n.toLowerCase())>-1:"")||(null!=l.lead_uid?l.lead_uid.toLowerCase().indexOf(n.toLowerCase())>-1:"")):this.getAgreementList()}popupRaiseBill(l){this.storageData=[],this.storageData.push(this.readyToSubmitBillsArrayList[l].name),this.storageData.push(this.readyToSubmitBillsArrayList[l].block_name),this.storageData.push(this.readyToSubmitBillsArrayList[l].blockName),this.storageData.push(this.readyToSubmitBillsArrayList[l].unit_name),this.storageData.push(this.readyToSubmitBillsArrayList[l].totalBrokerage),this.storageData.push(this.readyToSubmitBillsArrayList[l].totalBrokerageAmount),this.storageData.push(this.readyToSubmitBillsArrayList[l].bsp),this.storageData.push(this.readyToSubmitBillsArrayList[l].agreement_id),this.storageData.push(this.readyToSubmitBillsArrayList[l].agreement_no),this.storageData.push(this.readyToSubmitBillsArrayList[l].booking_id),this.storageData.push(this.readyToSubmitBillsArrayList[l].lead_id),this.storage.set("storeRaiseBill",this.storageData),this.router.navigate(["/pop-up-raise-bill/"])}presentLoading(){return u.__awaiter(this,void 0,void 0,(function*(){this.loader=yield this.loadingController.create({translucent:!0}),yield this.loader.present()}))}dismissLoading(){return u.__awaiter(this,void 0,void 0,(function*(){yield this.loader.dismiss()}))}goback(){this.router.navigate(["/home/"]),this.storage.set("IDFromPerformance",2),console.log("Click on backpress")}}class c{}var p=t("NcP4"),m=t("t68o"),d=t("zbXB"),g=t("yWMr"),h=t("xYTU"),f=t("pMnS"),y=t("oBZk"),x=t("s7LF"),D=t("SVse"),k=t("bujt"),v=t("Fwaw"),_=t("5GAg"),w=t("omvX"),L=t("c9fC"),O=t("AyJq"),T=t("8bJo"),M=t("xgBC"),I=t("iInd"),C=t("Gi4r"),S=i.rb({encapsulation:0,styles:[['.nameOfCustomer[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-size:18px!important;font-family:"Metropolis Medium"!important;margin-top:5px;font-weight:900}.subTitleOther[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-size:16px!important;font-family:"Metropolis Light"!important;margin-top:5px;font-weight:900}.matButton[_ngcontent-%COMP%]{background-color:#f5a22c!important;color:#000!important;font-family:"Metropolis Bold"!important;font-size:15px!important;text-align:center!important;width:180px!important;height:40px!important;border-radius:19px!important;letter-spacing:.5px!important;text-transform:uppercase!important}.expandCardHeading[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-size:18px!important;font-family:"Metropolis Medium"!important;margin-top:5px;font-weight:900}.boldTitle[_ngcontent-%COMP%]{color:gray!important;font-size:14px!important;font-family:"Metropolis Medium"!important;margin-top:5px;font-weight:900}.mediumSubTitle[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-size:15px!important;font-family:"Metropolis Light"!important;margin-top:5px;font-weight:900}.matTitle[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-size:15px!important;font-family:"Metropolis Medium"!important;margin-top:5px;font-weight:900;margin-left:6px!important}.datanotfound[_ngcontent-%COMP%]{alignment:center;margin-top:30%!important}.noData[_ngcontent-%COMP%]{margin-top:3%!important;font-size:20px;font-family:"Metropolis Medium";color:#000!important}']],data:{}});function B(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,5,"ion-item-divider",[["sticky",""],["style","font-size: 15px!important;padding-top: 5px!important;padding-bottom: 5px!important;width: auto!important;lines:none!important"]],null,null,null,y.db,y.w)),i.sb(1,49152,null,0,e.J,[i.h,i.k,i.y],{sticky:[0,"sticky"]},null),(l()(),i.tb(2,0,null,0,3,"ion-searchbar",[["class","Search"],["style","font-family: Metropolis Light;font-size: 18px;margin-left: -8px!important;"]],null,[[null,"ionInput"],[null,"change"],[null,"ionClear"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,t){var u=!0,e=l.component;return"ionBlur"===n&&(u=!1!==i.Fb(l,5)._handleBlurEvent(t.target)&&u),"ionChange"===n&&(u=!1!==i.Fb(l,5)._handleInputEvent(t.target)&&u),"ionInput"===n&&(u=!1!==e.searchEvent(t)&&u),"change"===n&&(u=!1!==e.searchEvent(t)&&u),"ionClear"===n&&(u=!1!==e.getAgreementList()&&u),u}),y.lb,y.D)),i.Jb(5120,null,x.k,(function(l){return[l]}),[e.Nb]),i.sb(4,49152,null,0,e.lb,[i.h,i.k,i.y],null,null),i.sb(5,16384,null,0,e.Nb,[i.k],null,null)],(function(l,n){l(n,1,0,"")}),null)}function z(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,10,"div",[["style","padding-top: 10px!important;padding-left: 10px!important;"]],null,null,null,null,null)),(l()(),i.tb(1,0,null,null,9,"ion-row",[],null,null,null,y.kb,y.C)),i.sb(2,49152,null,0,e.kb,[i.h,i.k,i.y],null,null),(l()(),i.tb(3,0,null,0,2,"ion-col",[["size","2"]],null,null,null,y.R,y.j)),i.sb(4,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(5,0,null,0,0,"img",[["src","assets/channelPartner_Icons/user_Photo_Icon/person-circle.svg"],["style","width: 20px;height: 20px"]],null,null,null,null,null)),(l()(),i.tb(6,0,null,0,4,"ion-col",[["size","10"],["style","text-align: left;padding-top: 7px;margin-left: -25px;"]],null,null,null,y.R,y.j)),i.sb(7,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(8,0,null,0,2,"ion-label",[["class","nameOfCustomer"]],null,null,null,y.fb,y.x)),i.sb(9,49152,null,0,e.O,[i.h,i.k,i.y],null,null),(l()(),i.Mb(10,0,["",""]))],(function(l,n){l(n,4,0,"2"),l(n,7,0,"10")}),(function(l,n){l(n,10,0,n.parent.context.$implicit.name)}))}function P(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,10,"div",[["style","margin-top: -3px!important;padding-left: 10px!important;"]],null,null,null,null,null)),(l()(),i.tb(1,0,null,null,9,"ion-row",[],null,null,null,y.kb,y.C)),i.sb(2,49152,null,0,e.kb,[i.h,i.k,i.y],null,null),(l()(),i.tb(3,0,null,0,2,"ion-col",[["size","2"]],null,null,null,y.R,y.j)),i.sb(4,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(5,0,null,0,0,"img",[["src","assets/channelPartner_Icons/other_Used_CardIcons/rupee-indian.svg"],["style","width: 17px;height: 17px"]],null,null,null,null,null)),(l()(),i.tb(6,0,null,0,4,"ion-col",[["size","10"],["style","text-align: left;padding-top: 7px;margin-left: -25px;"]],null,null,null,y.R,y.j)),i.sb(7,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(8,0,null,0,2,"ion-label",[["class","subTitleOther"]],null,null,null,y.fb,y.x)),i.sb(9,49152,null,0,e.O,[i.h,i.k,i.y],null,null),(l()(),i.Mb(10,0,["",""]))],(function(l,n){l(n,4,0,"2"),l(n,7,0,"10")}),(function(l,n){l(n,10,0,n.parent.context.$implicit.bsp)}))}function A(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,10,"div",[["style","margin-top: -3px!important;padding-left: 10px!important;"]],null,null,null,null,null)),(l()(),i.tb(1,0,null,null,9,"ion-row",[],null,null,null,y.kb,y.C)),i.sb(2,49152,null,0,e.kb,[i.h,i.k,i.y],null,null),(l()(),i.tb(3,0,null,0,2,"ion-col",[["size","2"]],null,null,null,y.R,y.j)),i.sb(4,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(5,0,null,0,0,"img",[["src","assets/channelPartner_Icons/other_Used_CardIcons/percent.svg"],["style","width: 17px;height: 17px"]],null,null,null,null,null)),(l()(),i.tb(6,0,null,0,4,"ion-col",[["size","10"],["style","text-align: left;padding-top: 7px;margin-left: -25px;"]],null,null,null,y.R,y.j)),i.sb(7,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(8,0,null,0,2,"ion-label",[["class","subTitleOther"]],null,null,null,y.fb,y.x)),i.sb(9,49152,null,0,e.O,[i.h,i.k,i.y],null,null),(l()(),i.Mb(10,0,[""," Applicable"]))],(function(l,n){l(n,4,0,"2"),l(n,7,0,"10")}),(function(l,n){l(n,10,0,n.parent.context.$implicit.totalBrokerage)}))}function F(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,4,"ion-card-title",[["class","mediumSubTitle"]],null,null,null,y.P,y.i)),i.sb(1,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.tb(2,0,null,0,1,"b",[["class","boldTitle"]],null,null,null,null,null)),(l()(),i.Mb(-1,null,["Name"])),(l()(),i.Mb(4,0,["\xa0:\xa0",""]))],null,(function(l,n){l(n,4,0,n.parent.context.$implicit.name)}))}function j(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,4,"ion-card-title",[["class","mediumSubTitle"]],null,null,null,y.P,y.i)),i.sb(1,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.tb(2,0,null,0,1,"b",[["class","boldTitle"]],null,null,null,null,null)),(l()(),i.Mb(-1,null,["CUID"])),(l()(),i.Mb(4,0,["\xa0:\xa0",""]))],null,(function(l,n){l(n,4,0,n.parent.context.$implicit.lead_uid)}))}function R(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,4,"ion-card-title",[["class","mediumSubTitle"]],null,null,null,y.P,y.i)),i.sb(1,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.tb(2,0,null,0,1,"b",[["class","boldTitle"]],null,null,null,null,null)),(l()(),i.Mb(-1,null,["Unit"])),(l()(),i.Mb(4,0,["\xa0:\xa0",""]))],null,(function(l,n){l(n,4,0,n.parent.context.$implicit.unit_name)}))}function $(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,4,"ion-card-title",[["class","mediumSubTitle"]],null,null,null,y.P,y.i)),i.sb(1,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.tb(2,0,null,0,1,"b",[["class","boldTitle"]],null,null,null,null,null)),(l()(),i.Mb(-1,null,["Date"])),(l()(),i.Mb(4,0,["\xa0:\xa0",""]))],null,(function(l,n){l(n,4,0,n.parent.context.$implicit.agreement_date)}))}function H(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,4,"ion-card-title",[["class","mediumSubTitle"]],null,null,null,y.P,y.i)),i.sb(1,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.tb(2,0,null,0,1,"b",[["class","boldTitle"]],null,null,null,null,null)),(l()(),i.Mb(-1,null,["bsp"])),(l()(),i.Mb(4,0,["\xa0:\xa0",""]))],null,(function(l,n){l(n,4,0,n.parent.context.$implicit.bsp)}))}function J(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,4,"ion-card-title",[["class","mediumSubTitle"]],null,null,null,y.P,y.i)),i.sb(1,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.tb(2,0,null,0,1,"b",[["class","boldTitle"]],null,null,null,null,null)),(l()(),i.Mb(-1,null,["Percentage"])),(l()(),i.Mb(4,0,["\xa0:\xa0",""]))],null,(function(l,n){l(n,4,0,n.parent.context.$implicit.totalBrokerage)}))}function E(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,4,"ion-card-title",[["class","mediumSubTitle"]],null,null,null,y.P,y.i)),i.sb(1,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.tb(2,0,null,0,1,"b",[["class","boldTitle"]],null,null,null,null,null)),(l()(),i.Mb(-1,null,["Amount"])),(l()(),i.Mb(4,0,["\xa0:\xa0",""]))],null,(function(l,n){l(n,4,0,n.parent.context.$implicit.totalBrokerageAmount)}))}function N(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,75,"ion-card",[["style","border-radius: 10px!important;margin-top: 20px!important;"]],null,null,null,y.Q,y.e)),i.sb(1,49152,null,0,e.n,[i.h,i.k,i.y],null,null),(l()(),i.ib(16777216,null,0,1,null,z)),i.sb(3,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(l()(),i.tb(4,0,null,0,10,"div",[["style","margin-top: -5px!important;padding-left: 12px!important;"]],null,null,null,null,null)),(l()(),i.tb(5,0,null,null,9,"ion-row",[],null,null,null,y.kb,y.C)),i.sb(6,49152,null,0,e.kb,[i.h,i.k,i.y],null,null),(l()(),i.tb(7,0,null,0,2,"ion-col",[["size","2"]],null,null,null,y.R,y.j)),i.sb(8,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(9,0,null,0,0,"img",[["src","assets/channelPartner_Icons/other_Used_CardIcons/business.svg"],["style","width: 17px;height: 17px"]],null,null,null,null,null)),(l()(),i.tb(10,0,null,0,4,"ion-col",[["size","10"],["style","text-align: left;padding-top: 9px!important;margin-left: -25px;"]],null,null,null,y.R,y.j)),i.sb(11,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(12,0,null,0,2,"ion-label",[["class","subTitleOther"]],null,null,null,y.fb,y.x)),i.sb(13,49152,null,0,e.O,[i.h,i.k,i.y],null,null),(l()(),i.Mb(14,0,[""," - ",""])),(l()(),i.ib(16777216,null,0,1,null,P)),i.sb(16,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(l()(),i.ib(16777216,null,0,1,null,A)),i.sb(18,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(l()(),i.tb(19,0,null,0,3,"div",[["style","padding-top: 7px!important;margin-left: -20px!important;text-align: center!important;"]],null,null,null,null,null)),(l()(),i.tb(20,0,null,null,2,"button",[["class","matButton"],["mat-stroked-button",""],["routerDirection","forward"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(l,n,t){var i=!0;return"click"===n&&(i=!1!==l.component.popupRaiseBill(l.context.index)&&i),i}),k.b,k.a)),i.sb(21,180224,null,0,v.b,[i.k,_.g,[2,w.a]],null,null),(l()(),i.Mb(-1,0,["Raise Bill"])),(l()(),i.tb(23,0,null,0,52,"div",[["style","margin-bottom: 1%!important;margin-top: -8px!important;"]],null,null,null,null,null)),(l()(),i.tb(24,0,null,null,51,"mat-accordion",[["class","mat-accordion"]],null,null,null,null,null)),i.sb(25,1720320,null,1,L.c,[],null,null),i.Kb(603979776,1,{_headers:1}),i.Jb(2048,null,L.a,null,[L.c]),(l()(),i.tb(28,16777216,null,null,47,"mat-expansion-panel",[["class","mat-expansion-panel"],["style","box-shadow: none!important;"]],[[2,"mat-expanded",null],[2,"_mat-animation-noopable",null],[2,"mat-expansion-panel-spacing",null]],null,null,O.d,O.a)),i.sb(29,1753088,null,1,L.e,[[3,L.a],i.h,T.d,i.O,D.d,[2,w.a],[2,L.b]],null,null),i.Kb(603979776,2,{_lazyContent:0}),i.Jb(256,null,L.a,void 0,[]),(l()(),i.tb(32,0,null,0,14,"mat-expansion-panel-header",[["class","mat-expansion-panel-header"],["role","button"],["style","padding-left:0%!important;padding-right: 7%!important;padding-top: 2%!important;padding-bottom: 2%!important;background-color: transparent!important;"]],[[1,"id",0],[1,"tabindex",0],[1,"aria-controls",0],[1,"aria-expanded",0],[1,"aria-disabled",0],[2,"mat-expanded",null],[2,"mat-expansion-toggle-indicator-after",null],[2,"mat-expansion-toggle-indicator-before",null],[40,"@.disabled",0],[40,"@expansionHeight",0]],[[null,"click"],[null,"keydown"],["component","@expansionHeight.start"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==i.Fb(l,33)._toggle()&&u),"keydown"===n&&(u=!1!==i.Fb(l,33)._keydown(t)&&u),"component:@expansionHeight.start"===n&&(u=!1!==i.Fb(l,33)._animationStarted()&&u),u}),O.c,O.b)),i.sb(33,180224,[[1,4]],0,L.f,[L.e,i.k,_.g,i.h,[2,L.b]],null,null),i.Hb(34,{collapsedHeight:0,expandedHeight:1}),i.Hb(35,{value:0,params:1}),(l()(),i.tb(36,0,null,2,10,"ion-row",[["style","width: 100%!important;"]],null,null,null,y.kb,y.C)),i.sb(37,49152,null,0,e.kb,[i.h,i.k,i.y],null,null),(l()(),i.tb(38,0,null,0,1,"ion-col",[["size","3"]],null,null,null,y.R,y.j)),i.sb(39,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(40,0,null,0,1,"ion-col",[["size","4"]],null,null,null,y.R,y.j)),i.sb(41,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(42,0,null,0,4,"ion-col",[["size","5"]],null,null,null,y.R,y.j)),i.sb(43,49152,null,0,e.u,[i.h,i.k,i.y],{size:[0,"size"]},null),(l()(),i.tb(44,0,null,0,2,"mat-panel-title",[["class","matTitle mat-expansion-panel-header-title"]],null,null,null,null,null)),i.sb(45,16384,null,0,L.g,[],null,null),(l()(),i.Mb(-1,null,[" View Details"])),(l()(),i.tb(47,0,null,1,28,"div",[["style","padding-left: 6px!important;"]],null,null,null,null,null)),(l()(),i.tb(48,0,null,null,2,"ion-card-title",[["class","expandCardHeading"],["style","margin-top:-20px!important"]],null,null,null,y.P,y.i)),i.sb(49,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.Mb(-1,0,["Customer Details:"])),(l()(),i.ib(16777216,null,null,1,null,F)),i.sb(52,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(l()(),i.ib(16777216,null,null,1,null,j)),i.sb(54,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(l()(),i.tb(55,0,null,null,4,"ion-card-title",[["class","mediumSubTitle"]],null,null,null,y.P,y.i)),i.sb(56,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.tb(57,0,null,0,1,"b",[["class","boldTitle"]],null,null,null,null,null)),(l()(),i.Mb(-1,null,["Project"])),(l()(),i.Mb(59,0,["\xa0:\xa0",""])),(l()(),i.ib(16777216,null,null,1,null,R)),i.sb(61,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(l()(),i.tb(62,0,null,null,2,"ion-card-title",[["class","expandCardHeading"],["style","margin-top: 10px!important;"]],null,null,null,y.P,y.i)),i.sb(63,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.Mb(-1,0,["Agreement Details:"])),(l()(),i.ib(16777216,null,null,1,null,$)),i.sb(66,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(l()(),i.ib(16777216,null,null,1,null,H)),i.sb(68,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(l()(),i.tb(69,0,null,null,2,"ion-card-title",[["class","expandCardHeading"],["style","margin-top: 10px!important;"]],null,null,null,y.P,y.i)),i.sb(70,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.Mb(-1,0,["Brokerage Details:"])),(l()(),i.ib(16777216,null,null,1,null,J)),i.sb(73,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(l()(),i.ib(16777216,null,null,1,null,E)),i.sb(75,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,3,0,n.context.$implicit.name),l(n,8,0,"2"),l(n,11,0,"10"),l(n,16,0,n.context.$implicit.bsp),l(n,18,0,n.context.$implicit.totalBrokerage),l(n,39,0,"3"),l(n,41,0,"4"),l(n,43,0,"5"),l(n,52,0,n.context.$implicit.name),l(n,54,0,n.context.$implicit.lead_uid),l(n,61,0,n.context.$implicit.unit_name),l(n,66,0,n.context.$implicit.agreement_date),l(n,68,0,n.context.$implicit.bsp),l(n,73,0,n.context.$implicit.totalBrokerage),l(n,75,0,n.context.$implicit.totalBrokerageAmount)}),(function(l,n){l(n,14,0,n.context.$implicit.block_name,n.context.$implicit.unit_name),l(n,20,0,i.Fb(n,21).disabled||null,"NoopAnimations"===i.Fb(n,21)._animationMode),l(n,28,0,i.Fb(n,29).expanded,"NoopAnimations"===i.Fb(n,29)._animationMode,i.Fb(n,29)._hasSpacing());var t=i.Fb(n,33).panel._headerId,u=i.Fb(n,33).disabled?-1:0,e=i.Fb(n,33)._getPanelId(),o=i.Fb(n,33)._isExpanded(),a=i.Fb(n,33).panel.disabled,s=i.Fb(n,33)._isExpanded(),r="after"===i.Fb(n,33)._getTogglePosition(),b="before"===i.Fb(n,33)._getTogglePosition(),c=i.Fb(n,33)._animationsDisabled,p=l(n,35,0,i.Fb(n,33)._getExpandedState(),l(n,34,0,i.Fb(n,33).collapsedHeight,i.Fb(n,33).expandedHeight));l(n,32,0,t,u,e,o,a,s,r,b,c,p),l(n,59,0,n.context.$implicit.block_name)}))}function q(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,5,"div",[["class","ion-text-center"]],null,null,null,null,null)),(l()(),i.tb(1,0,null,null,4,"div",[["class","datanotfound"]],null,null,null,null,null)),(l()(),i.tb(2,0,null,null,0,"img",[["src","assets/channelPartner_Icons/readytoSubmitBills/ticket.svg"],["style","width: 90px;height: 90px"]],null,null,null,null,null)),(l()(),i.tb(3,0,null,null,2,"ion-card-title",[["class","noData"]],null,null,null,y.P,y.i)),i.sb(4,49152,null,0,e.r,[i.h,i.k,i.y],null,null),(l()(),i.Mb(-1,0,["Currently,No Bills Ready To Submit Available!"]))],null,null)}function V(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,11,"ion-content",[],null,null,null,y.S,y.k)),i.sb(1,49152,null,0,e.v,[i.h,i.k,i.y],null,null),(l()(),i.tb(2,0,null,0,3,"ion-refresher",[["slot","fixed"]],null,[[null,"ionRefresh"]],(function(l,n,t){var i=!0;return"ionRefresh"===n&&(i=!1!==l.component.doRefresh(t)&&i),i}),y.ib,y.z)),i.sb(3,49152,null,0,e.eb,[i.h,i.k,i.y],null,null),(l()(),i.tb(4,0,null,0,1,"ion-refresher-content",[["pullingIcon",""],["pullingText",""],["refreshingSpinner","circles"],["refreshingText",""]],null,null,null,y.hb,y.A)),i.sb(5,49152,null,0,e.fb,[i.h,i.k,i.y],{pullingIcon:[0,"pullingIcon"],pullingText:[1,"pullingText"],refreshingSpinner:[2,"refreshingSpinner"],refreshingText:[3,"refreshingText"]},null),(l()(),i.tb(6,0,null,0,3,"ion-list",[],null,null,null,y.gb,y.y)),i.sb(7,49152,null,0,e.P,[i.h,i.k,i.y],null,null),(l()(),i.ib(16777216,null,0,1,null,N)),i.sb(9,278528,null,0,D.k,[i.O,i.L,i.r],{ngForOf:[0,"ngForOf"]},null),(l()(),i.ib(16777216,null,0,1,null,q)),i.sb(11,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null)],(function(l,n){var t=n.component;l(n,5,0,"","","circles",""),l(n,9,0,t.readyToSubmitBillsArrayList),l(n,11,0,0==t.readyToSubmitBillsArrayList.length&&0==t.isSpinner)}),null)}function Z(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,19,"ion-header",[],null,null,null,y.Y,y.q)),i.sb(1,49152,null,0,e.C,[i.h,i.k,i.y],null,null),(l()(),i.tb(2,0,null,0,17,"ion-toolbar",[["color","color_d"]],null,null,null,y.pb,y.H)),i.sb(3,49152,null,0,e.Db,[i.h,i.k,i.y],{color:[0,"color"]},null),(l()(),i.tb(4,0,null,0,15,"ion-row",[],null,null,null,y.kb,y.C)),i.sb(5,49152,null,0,e.kb,[i.h,i.k,i.y],null,null),(l()(),i.tb(6,0,null,0,6,"ion-col",[],null,null,null,y.R,y.j)),i.sb(7,49152,null,0,e.u,[i.h,i.k,i.y],null,null),(l()(),i.tb(8,0,null,0,4,"div",[],null,null,null,null,null)),(l()(),i.tb(9,0,null,null,3,"ion-buttons",[["slot","start"],["style","margin-left: 3%"]],null,null,null,y.L,y.d)),i.sb(10,49152,null,0,e.m,[i.h,i.k,i.y],null,null),(l()(),i.tb(11,0,null,0,1,"i",[["class","material-icons icon"]],null,[[null,"click"]],(function(l,n,t){var i=!0;return"click"===n&&(i=!1!==l.component.goback()&&i),i}),null,null)),(l()(),i.Mb(-1,null,["arrow_back_ios"])),(l()(),i.tb(13,0,null,0,5,"ion-col",[["style","text-align: start;margin-left: -30px!important;margin-bottom: 6px!important;"]],null,null,null,y.R,y.j)),i.sb(14,49152,null,0,e.u,[i.h,i.k,i.y],null,null),(l()(),i.tb(15,0,null,0,3,"div",[],null,null,null,null,null)),(l()(),i.tb(16,0,null,null,2,"ion-title",[["class","TITLETOOLBAR"],["style","margin-left: -40px!important;margin-right: 20px!important;"]],null,null,null,y.ob,y.G)),i.sb(17,49152,null,0,e.Bb,[i.h,i.k,i.y],null,null),(l()(),i.Mb(-1,0,["Bills Ready To Submit"])),(l()(),i.tb(19,0,null,0,0,"img",[["class","srcIMGLOGO"],["src","assets/channelPartner_Icons/vjd_Logos/vj_logo.svg"],["style","text-align: right;width: 12%!important;margin-right:10px!important"]],null,null,null,null,null)),(l()(),i.ib(16777216,null,null,1,null,B)),i.sb(21,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(l()(),i.ib(16777216,null,null,1,null,V)),i.sb(23,16384,null,0,D.l,[i.O,i.L],{ngIf:[0,"ngIf"]},null)],(function(l,n){var t=n.component;l(n,3,0,"color_d"),l(n,21,0,0==t.isSpinner),l(n,23,0,0==t.isSpinner)}),null)}function U(l){return i.Ob(0,[(l()(),i.tb(0,0,null,null,1,"app-readytosubmit-bills",[],null,null,null,Z,S)),i.sb(1,114688,null,0,b,[M.b,e.f,e.Hb,e.b,e.b,e.Mb,o.a,a.a,s.a,r.a,i.h,e.Lb,I.m,C.d,e.Kb,e.Jb],null,null)],(function(l,n){l(n,1,0)}),null)}var G=i.pb("app-readytosubmit-bills",b,U,{},{},[]),W=t("qJ5m"),K=t("Xd0L"),Q=t("POq0"),X=t("QQfA"),Y=t("IP0z"),ll=t("JjoW"),nl=t("Mz6y"),tl=t("cUpR"),il=t("OIZN"),ul=t("7kcP"),el=t("s6ns"),ol=t("821u"),al=t("/HVE"),sl=t("/Co4"),rl=t("gavF"),bl=t("DkaU"),cl=t("zQui"),pl=t("8rEH"),ml=t("zMNK"),dl=t("qJ50"),gl=t("HsOI"),hl=t("oapL"),fl=t("ZwOa"),yl=t("hOhj"),xl=t("BzsH"),Dl=t("KPQW"),kl=t("lwm9"),vl=t("mkRZ"),_l=t("igqZ"),wl=t("r0V8"),Ll=t("kNGD"),Ol=t("02hT"),Tl=t("5Bek"),Ml=t("FVPZ"),Il=t("Q+lL"),Cl=t("8P0U"),Sl=t("W5yJ"),Bl=t("elxJ"),zl=t("BV1i"),Pl=t("lT8R"),Al=t("pBi1"),Fl=t("dFDH"),jl=t("rWV4"),Rl=t("AaDx"),$l=t("vvyD"),Hl=t("dvZr");t.d(n,"ReadytosubmitBillsPageModuleNgFactory",(function(){return Jl}));var Jl=i.qb(c,[],(function(l){return i.Cb([i.Db(512,i.j,i.bb,[[8,[p.a,m.a,d.b,d.a,g.a,h.a,h.b,f.a,G]],[3,i.j],i.w]),i.Db(4608,D.n,D.m,[i.t,[2,D.C]]),i.Db(4608,x.w,x.w,[]),i.Db(4608,e.c,e.c,[i.y,i.g]),i.Db(4608,e.Jb,e.Jb,[e.c,i.j,i.q]),i.Db(4608,e.Mb,e.Mb,[e.c,i.j,i.q]),i.Db(5120,W.b,W.a,[[3,W.b]]),i.Db(4608,K.d,K.d,[]),i.Db(4608,Q.c,Q.c,[]),i.Db(4608,X.c,X.c,[X.i,X.e,i.j,X.h,X.f,i.q,i.y,D.d,Y.b,[2,D.h]]),i.Db(5120,X.j,X.k,[X.c]),i.Db(5120,ll.a,ll.b,[X.c]),i.Db(5120,nl.a,nl.b,[X.c]),i.Db(4608,tl.e,K.e,[[2,K.i],[2,K.n]]),i.Db(5120,il.b,il.a,[[3,il.b]]),i.Db(5120,ul.b,ul.a,[[3,ul.b]]),i.Db(5120,el.b,el.c,[X.c]),i.Db(135680,el.d,el.d,[X.c,i.q,[2,D.h],[2,el.a],el.b,[3,el.d],X.e]),i.Db(4608,ol.i,ol.i,[]),i.Db(5120,ol.a,ol.b,[X.c]),i.Db(4608,K.c,K.y,[[2,K.h],al.a]),i.Db(5120,sl.a,sl.b,[X.c]),i.Db(5120,rl.c,rl.j,[X.c]),i.Db(135680,_.g,_.g,[i.y,al.a]),i.Db(4608,bl.e,bl.e,[i.L]),i.Db(1073742336,D.c,D.c,[]),i.Db(1073742336,x.v,x.v,[]),i.Db(1073742336,x.h,x.h,[]),i.Db(1073742336,e.Fb,e.Fb,[]),i.Db(1073742336,cl.o,cl.o,[]),i.Db(1073742336,Y.a,Y.a,[]),i.Db(1073742336,K.n,K.n,[[2,K.f],[2,tl.f]]),i.Db(1073742336,pl.a,pl.a,[]),i.Db(1073742336,ml.g,ml.g,[]),i.Db(1073742336,al.b,al.b,[]),i.Db(1073742336,K.x,K.x,[]),i.Db(1073742336,v.c,v.c,[]),i.Db(1073742336,dl.e,dl.e,[]),i.Db(1073742336,C.c,C.c,[]),i.Db(1073742336,W.c,W.c,[]),i.Db(1073742336,Q.d,Q.d,[]),i.Db(1073742336,gl.d,gl.d,[]),i.Db(1073742336,hl.c,hl.c,[]),i.Db(1073742336,fl.c,fl.c,[]),i.Db(1073742336,K.v,K.v,[]),i.Db(1073742336,K.s,K.s,[]),i.Db(1073742336,yl.c,yl.c,[]),i.Db(1073742336,X.g,X.g,[]),i.Db(1073742336,ll.d,ll.d,[]),i.Db(1073742336,_.a,_.a,[]),i.Db(1073742336,nl.c,nl.c,[]),i.Db(1073742336,il.c,il.c,[]),i.Db(1073742336,ul.c,ul.c,[]),i.Db(1073742336,xl.a,xl.a,[]),i.Db(1073742336,el.j,el.j,[]),i.Db(1073742336,ol.j,ol.j,[]),i.Db(1073742336,K.z,K.z,[]),i.Db(1073742336,K.p,K.p,[]),i.Db(1073742336,sl.c,sl.c,[]),i.Db(1073742336,Dl.a,Dl.a,[]),i.Db(1073742336,kl.c,kl.c,[]),i.Db(1073742336,vl.a,vl.a,[]),i.Db(1073742336,_l.a,_l.a,[]),i.Db(1073742336,wl.d,wl.d,[]),i.Db(1073742336,wl.c,wl.c,[]),i.Db(1073742336,Ll.d,Ll.d,[]),i.Db(1073742336,Ol.b,Ol.b,[]),i.Db(1073742336,Tl.c,Tl.c,[]),i.Db(1073742336,L.d,L.d,[]),i.Db(1073742336,K.o,K.o,[]),i.Db(1073742336,Ml.a,Ml.a,[]),i.Db(1073742336,Il.a,Il.a,[]),i.Db(1073742336,rl.i,rl.i,[]),i.Db(1073742336,rl.f,rl.f,[]),i.Db(1073742336,Cl.a,Cl.a,[]),i.Db(1073742336,Sl.a,Sl.a,[]),i.Db(1073742336,Bl.d,Bl.d,[]),i.Db(1073742336,zl.a,zl.a,[]),i.Db(1073742336,Pl.a,Pl.a,[]),i.Db(1073742336,Al.b,Al.b,[]),i.Db(1073742336,Al.a,Al.a,[]),i.Db(1073742336,Fl.d,Fl.d,[]),i.Db(1073742336,jl.a,jl.a,[]),i.Db(1073742336,bl.c,bl.c,[]),i.Db(1073742336,Rl.a,Rl.a,[]),i.Db(1073742336,$l.a,$l.a,[]),i.Db(1073742336,I.n,I.n,[[2,I.s],[2,I.m]]),i.Db(1073742336,c,c,[]),i.Db(256,K.g,K.k,[]),i.Db(256,Ll.a,{separatorKeyCodes:[Hl.f]},[]),i.Db(1024,I.k,(function(){return[[{path:"",component:b}]]}),[])])}))}}]);