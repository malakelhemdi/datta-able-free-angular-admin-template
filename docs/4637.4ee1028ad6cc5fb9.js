"use strict";(self.webpackChunkdatta_able_free_angular_admin_template=self.webpackChunkdatta_able_free_angular_admin_template||[]).push([[4637],{4637:($,r,s)=>{s.r(r),s.d(r,{EmployeeEvaluationUsersManagementModule:()=>S});var h=s(177),c=s(8498),n=s(3953),l=s(9417),d=s(3197),u=s(2016),v=s(2702);const f=[{path:"",component:(()=>{class t{constructor(a,e,i){this.fb=a,this.sharedFacade=e,this.cdr=i}ngOnInit(){}static#t=this.\u0275fac=function(e){return new(e||t)(n.rXU(l.ok),n.rXU(d.I),n.rXU(n.gRc))};static#a=this.\u0275cmp=n.VBU({type:t,selectors:[["app-employee-evaluation-users-management"]],decls:3,vars:0,consts:[[1,"row"]],template:function(e,i){1&e&&(n.j41(0,"div",0),n.nrm(1,"app-loading")(2,"app-messages"),n.k0s())},dependencies:[u.q,v.y]})}return t})(),data:{breadcrumb:"\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646"}}];let g=(()=>{class t{static#t=this.\u0275fac=function(e){return new(e||t)};static#a=this.\u0275mod=n.$C({type:t});static#e=this.\u0275inj=n.G2t({imports:[c.iI.forChild(f),c.iI]})}return t})();var y=s(1626),B=s(1441);let m=(()=>{class t{constructor(a,e){this.http=a,this.appConfig=e,this.url=this.appConfig.defaultUrl}AddBank(a){}UpdateBank(a){}DeleteBank(a){}GetBanks(a){}static#t=this.\u0275fac=function(e){return new(e||t)(n.KVO(y.Qq),n.KVO(B.o))};static#a=this.\u0275prov=n.jDH({token:t,factory:t.\u0275fac})}return t})();var U=s(7591),E=s(9947),M=s(4823),C=s(9631),F=s(8834),k=s(4412),o=s(6496),p=s(8141);let j=(()=>{class t{constructor(a,e){this.sharedFacade=a,this.employeeEvaluationUsersManagementServices=e,this.BanksSubject$=new k.t([]),this.Banks$=this.BanksSubject$.asObservable()}deleteBank(a){}GetBanks(){const a=this.employeeEvaluationUsersManagementServices.GetBanks(1).pipe((0,p.M)(e=>{}),(0,o.t)());this.sharedFacade.showLoaderUntilCompleted(a).pipe().subscribe()}AddBank(a){const e=this.employeeEvaluationUsersManagementServices.AddBank(a).pipe((0,p.M)(i=>{}),(0,o.t)());this.sharedFacade.showLoaderUntilCompleted(e).pipe().subscribe()}UpdateBank(a){const e=this.employeeEvaluationUsersManagementServices.UpdateBank(a).pipe((0,o.t)());this.sharedFacade.showLoaderUntilCompleted(e).pipe().subscribe()}static#t=this.\u0275fac=function(e){return new(e||t)(n.KVO(d.I),n.KVO(m))};static#a=this.\u0275prov=n.jDH({token:t,factory:t.\u0275fac})}return t})(),S=(()=>{class t{static#t=this.\u0275fac=function(e){return new(e||t)};static#a=this.\u0275mod=n.$C({type:t});static#e=this.\u0275inj=n.G2t({providers:[m,j],imports:[h.MD,g,l.X1,U.G,E.i,M.uc,C.fS,F.Hl]})}return t})()}}]);