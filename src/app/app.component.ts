import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'paymentp360';

  constructor(
    private router: Router,
    private cdref: ChangeDetectorRef) {}
    
  ngOnInit():void {
    this.cdref.detectChanges()
    this.router.navigate(['home'])
  }
}
