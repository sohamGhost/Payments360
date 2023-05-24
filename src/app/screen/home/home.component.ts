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
}