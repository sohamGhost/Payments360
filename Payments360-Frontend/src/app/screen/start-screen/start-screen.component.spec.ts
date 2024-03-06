import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StartScreenComponent } from './start-screen.component';
import { ApiService } from 'src/app/service/api.service';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { ButtonComponent } from 'src/app/common/button/button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

describe('StartScreenComponent', () => {
  let component: StartScreenComponent;
  let fixture: ComponentFixture<StartScreenComponent>;
  let apiService: ApiService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartScreenComponent, HeaderComponent, ButtonComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartScreenComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch start screen literal data and populate the literal object and slide images', () => {
    const literalData = {
      "ftitle": "Good News!",
    "ftext": "A new payments experience has landed!",
    "pay": "Pay people and pay bills",
    "send": "send money with Zelle®,and manage and pay your bills from here",
    "stitle": "Pay Bills",
    "schedule": "Schedule your bill payments",
    "payall": "Pay all of your bills right from the app,and never go to the billes's site again",
    "ttitle": "Zelle®",
    "move": "Move Money in the Movement",
    "simple": "Simply and securely - with lots of people you know",
    "started": "Get Started",
    "user": "Accounts",
    "payment": "Payments",
    "explore": "Explore",
    "more": "More",
    "slideImage1": "slide1.jpg",
    "slideImage2": "slide2.jpg",
    "slideImage3": "slide3.jpg",
    "slideImage4": "slide4.jpg",
    };

    spyOn(apiService, 'getStartScreenLiteralData').and.returnValue(of(literalData));
    fixture.detectChanges();

    expect(component.literal).toEqual(literalData);
    expect(component.slideImage).toEqual([
      environment.imagePath + literalData.slideImage1,
      environment.imagePath + literalData.slideImage2,
      environment.imagePath + literalData.slideImage3,
      environment.imagePath + literalData.slideImage4,
    ]);
  });

  it('should navigate to the specified route when onsubmit method is called', () => {
    const routerSpy = spyOn(component['_router'],'navigate');
    const routerLink = 'permissions';

    component.onSubmit(routerLink);

    expect(routerSpy).toHaveBeenCalledWith([routerLink]);
  })
});

