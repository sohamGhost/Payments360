import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(
    private service: DataService,
    private router: Router) { }

  onPaymentClick(val: string) {
    this.service.user = val;
    this.router.navigate(['/amountToPay']);
  }

  onClick1(val: string) {
    this.service.user = val;
    this.router.navigate(['/addbills']);
  }
  onClick2(val: string) {
    this.service.user = val;
    this.router.navigate(['/selectprimaryaccount']);
  }
  onClick3(val: string) {
    this.service.user = val;
    this.router.navigate(['/todo']);
  }
  onClick4(val: string) {
    this.service.user = val;
    this.router.navigate(['/startscreen']);
  }

  onClick5(val: string) {
    this.service.user = val;
    this.router.navigate(['/zellestartscreen']);
  }

  onClick6(val: string) {
    this.service.user = val;
    this.router.navigate(['/dashboard']);
  }

  onSuccessScreenClick(val: string) {
    this.service.user = val;
    this.router.navigate(['/successscreen']);
  }

  onGeneralOnboardingSuccessScreenClick(val: string) {
    this.service.user = val;
    this.router.navigate(['/generalonboardingsuccessscreen']);
  }

  // onfind(val:string) {
  //   this.service.user = val;
  //   this.router.navigate(['/findmorebills'])
  // }


  // onSelectAddBills(val:string) {
  //   this.service.user = val;
  //   this.router.navigate(['/selectaddbills'])
  // }

  // onSuccessFailure(val:string) {
  //   this.service.user = val;
  //   this.router.navigate(['/successfailure'])
  // }

  // onClick(val: string) {
  //   this.service.user = val;
  //   this.router.navigate(['/permissions']);

  // }
  // onclick(val: string) {
  //   this.service.user = val;
  //   this.router.navigate(['/zellepermissions']);

  // }

  // onclk(val: string) {
  //   this.service.user = val;
  //   this.router.navigate(['/startscreen']);
  // }

  // oncl(val: string) {
  //   this.service.user = val;
  //   this.router.navigate(['/zellestartscreen']);
  // }

  // onClick4(val: string) {
  //   this.service.user = val;
  //   this.router.navigate(['/setuppayment']);
  // }
  // onclick5(val: string) {
  //   this.service.user = val;
  //   this.router.navigate(['/zellesetuppayment']);
  // }


}
