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
  getBillerHeaderData(){ return this.http.get("http://localhost:2000/billerheader") }
  getSenderHeaderData(){ return this.http.get("http://localhost:2000/senderheader") }
  getRequestorHeaderData(){ return this.http.get("http://localhost:2000/requestorheader") }
  getOnboardingHeaderData(){ return this.http.get("http://localhost:2000/onboardingheader")}
  getZelleOnboardingHeaderData(){return this.http.get("http://localhost:2000/zelleonboardingheader")}
  getTodoHeaderData(){return this.http.get("http://localhost:2000/todoheader")}
  getBillerLiteralData(){ return this.http.get("http://localhost:1000/billerliterals") }
  getSenderLiteralData(){ return this.http.get("http://localhost:1000/senderliterals") }
  getRequestorLiteralData(){ return this.http.get("http://localhost:1000/requestorliterals") }
  getOnboardingLiteralData() { return this.http.get("http://localhost:1000/onboardingliterals")}
  getZelleOnboardingLiteralData() { return this.http.get("http://localhost:1000/zelleonboardingliterals")}
  getTodoLiteralData() { return this.http.get("http://localhost:1000/todoliterals")}
}
