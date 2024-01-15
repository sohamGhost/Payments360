import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBillerData() { return this.http.get("http://localhost:3000/biller") }
  getSenderData() { return this.http.get("http://localhost:3000/sender") }
  getRequestorData() { return this.http.get("http://localhost:3000/Requestor") }
  getOnboardingData() { return this.http.get("http://localhost:3000/onboarding") }
  getZelleOnboardingData() { return this.http.get("http://localhost:3000/zelleonboarding") }
  getTodoData() { return this.http.get("http://localhost:3000/todo") }
  // getPermissionsData() { return this.http.get("http://localhost:3000/permissions") }
  getPermisionsDataBillPay() { return this.http.get("http://localhost:9080/content-management?type=bill-pay-tc")}
  getPermissionsDataZelle() { return this.http.get("http://localhost:9080/content-management?type=zelle-tc")}
  getPermissionsDataUserConsent() { return this.http.get("http://localhost:9080/content-management?type=user-consent")}
  getZellePermissionsUserConsent() { return this.http.get("http://localhost:9080/content-management?type=user-consent-zelle")}
  getOtpData() { return this.http.get("http://localhost:9080/auth/otp/1")}
  getUserData() { return this.http.get("http://localhost:9080/userProfile/details/1") }
  getBackendTodoData() { return this.http.get("http://localhost:9080/api/todoinformation/1")}
  getUserDataZelleHelp() { return this.http.get("http://localhost:9080/content-management?type=zelle-help-text")}
  getZelleSetuppaymentData() { return this.http.get("http://localhost:3000/zellesetuppayment") }
  getSelectAddBillsData() { return this.http.get("http://localhost:3000/selectaddbills") }
  // getSuccessFailureData() { return this.http.get("http://localhost:3000/successfailure") }
  getDashboardData() { return this.http.get("http://localhost:3000/dashboard") }
  getSuccessScreenData() { return this.http.get("http://localhost:3000/successScreenData") }
  getRecentActivityData() { return this.http.get("http://localhost:3000/recentActivityData") }
  getAmountToSplitData() { return this.http.get("http://localhost:3000/amountToSplitData") }
  getSplitData(){return this.http.get("http://localhost:3000/splitData")}
  // getBillPayAuthenticate(){ return this.http.post("http://localhost:9080/auth/otpVerification",)}

  getBillerHeaderData() { return this.http.get("http://localhost:2000/billerheader") }
  getSenderHeaderData() { return this.http.get("http://localhost:2000/senderheader") }
  getRequestorHeaderData() { return this.http.get("http://localhost:2000/requestorheader") }
  getOnboardingHeaderData() { return this.http.get("http://localhost:2000/onboardingheader") }
  getZelleOnboardingHeaderData() { return this.http.get("http://localhost:2000/zelleonboardingheader") }
  getTodoHeaderData() { return this.http.get("http://localhost:2000/todoheader") }
  getzellepermissionsheaderData() { return this.http.get("http://localhost:2000/zellepermissionsheader") }
  getPermissionsHeaderData() { return this.http.get("http://localhost:2000/permissionsheader") }
  getUserHeaderData() { return this.http.get("http://localhost:2000/userheader") }
  getZelleSetuppaymentHeaderData() { return this.http.get("http://localhost:2000/zellesetuppaymentheader") }
  getFindMoreBillsHeaderData() { return this.http.get("http://localhost:2000/findmorebillsheader") }
  getSelectAddBillsHeaderData() { return this.http.get("http://localhost:2000/selectaddbillsheader") }
  getDashboardHeaderData() { return this.http.get("http://localhost:2000/dashboardheader") }
  getSuccessScreenHeaderData() { return this.http.get("http://localhost:2000/successScreenHeader") }
  getBillerConfirmationHeaderData() { return this.http.get("http://localhost:2000/billerConfirmationHeader") }
  getRecentActivityHeaderData() { return this.http.get("http://localhost:2000/recentActivityHeader") }
  getAmountToSplitHeaderData() { return this.http.get("http://localhost:2000/amountToSplitHeader") }


  getBillerLiteralData() { return this.http.get("http://localhost:1000/billerliterals") }
  getSenderLiteralData() { return this.http.get("http://localhost:1000/senderliterals") }
  getRequestorLiteralData() { return this.http.get("http://localhost:1000/requestorliterals") }
  getOnboardingLiteralData() { return this.http.get("http://localhost:1000/onboardingliterals") }
  getZelleOnboardingLiteralData() { return this.http.get("http://localhost:1000/zelleonboardingliterals") }
  getTodoLiteralData() { return this.http.get("http://localhost:1000/todoliterals") }
  getPermissionsLiteralData() { return this.http.get("http://localhost:1000/permissionsliterals") }
  getzellepermissionsliteralData() { return this.http.get("http://localhost:1000/zellepermissionsliterals") }
  getStartScreenLiteralData() { return this.http.get("http://localhost:1000/startscreenliterals") }
  getZelleStartScreenLiteralData() { return this.http.get("http://localhost:1000/zellestartscreenliterals") }
  getUserLiteralData() { return this.http.get("http://localhost:1000/userliterals") }
  getZelleSetuppaymentLiteralData() { return this.http.get("http://localhost:1000/zellesetuppaymentliterals") }
  getFindMoreBillsLiteralData() { return this.http.get("http://localhost:1000/findmorebillsliterals") }
  getSelectAddBillsLiteralData() { return this.http.get("http://localhost:1000/selectAddbillsLiteral") }
  getSuccessFailureLiteralData() { return this.http.get("http://localhost:1000/successfailure") }
  getDashboardLiteralData() { return this.http.get("http://localhost:1000/dashboardLiterals") }
  getSuccessScreenLiteralData() { return this.http.get("http://localhost:1000/successScreenLiterals") }
  getBillerConfirmationLiteralData() { return this.http.get("http://localhost:1000/billerConfirmationLiteral") }
  getAmountToSplitLiteralData() { return this.http.get("http://localhost:1000/amountToPayLiteral") }
  // getSplitPaymentConfirmationLiteralData() { return this.http.get("http://localhost:1000/splitPaymentconfirmationLiteral") }
  // getSplitLiteralData(){return this.http.get("http://localhost:1000/")}
}
