import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-zelle-startscreen',
  templateUrl: './zelle-startscreen.component.html',
  styleUrls: ['./zelle-startscreen.component.scss']
})
export class ZelleStartscreenComponent implements OnInit {
  header: any = {};
  literal: any = {};
  buttonType = ButtonType;
  slideImage: Array<string> = [];
  imagePath = '';
  route = RoutingLinks;

  constructor(
    private _api: ApiService,
    private _router: Router,
  ) {

  }
  ngOnInit(): void {
    this._api

      .getZelleStartScreenLiteralData()
      .subscribe((data: any) => {
        this.literal = data;
        this.slideImage[0] = environment.imagePath + data.slideImage1;
        this.slideImage[1] = environment.imagePath + data.slideImage2;
        this.slideImage[2] = environment.imagePath + data.slideImage3;
        this.slideImage[3] = environment.imagePath + data.slideImage4;
      });
  }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }

}
