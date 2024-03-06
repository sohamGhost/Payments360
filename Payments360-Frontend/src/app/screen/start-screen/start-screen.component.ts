import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import { RoutingLinks } from 'src/app/screen-name';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  header: any = {};
  literal: any = {};
  data: any = {};
  buttonType = ButtonType;
  slideImage: Array<string> = [];
  imagePath = '';
  route = RoutingLinks;



  constructor(
    private _api: ApiService,
    private _router: Router,
    // private _changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this._api
    .getStartScreenLiteralData()
    .subscribe((data: any) => {
      this.literal = data;
      this.slideImage[0]=environment.imagePath+data.slideImage1;
      this.slideImage[1]=environment.imagePath+data.slideImage2;
      this.slideImage[2]=environment.imagePath+data.slideImage3;
      this.slideImage[3]=environment.imagePath+data.slideImage4;
    });
  }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }
}

