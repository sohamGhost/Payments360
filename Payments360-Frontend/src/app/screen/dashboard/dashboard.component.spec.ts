import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { SelectedBillerService } from 'src/app/service/selected-biller.service';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { ButtonComponent } from 'src/app/common/button/button.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let apiService: ApiService;
  let selectedBillerService: SelectedBillerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeaderComponent, ButtonComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        ApiService,
        DataService,
        SelectedBillerService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    selectedBillerService = TestBed.inject(SelectedBillerService);
    component.selectedBillerService = selectedBillerService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch dashboard header data and populate the header object', () => {
    const headerData = { "screen1": "Payments" };
    spyOn(apiService, 'getDashboardHeaderData').and.returnValue(of(headerData));

    component.ngOnInit();

    expect(component.header).toEqual(headerData);
  });

  it('should fetch dashboard literal data and populate the literal object', () => {
    const literalData = { "todo": "To-Do",
    "viewAll": "View All",
    "recentActivity": "Recent Activity",
    "recentActivityTxt": "Your recent payment activity will appear here",
    "autoPayments": "Auto Payments",
    "manage": "Manage",
    "autoPaymentsDuration": "Next 30 Days",
    "autoPaymentsBtnTxt": "Include external payment sources",
    "billsAndUtilities": "Bills & Utilities",
    "subscriptions": "Subscriptions",
    "transfers": "Transfers",
    "insights": "Insights",
    "insightsExplore": "Explore",
    "insightsTxt": "Keep checking back for insights on your payment activity",
    "requestBtn": "Request",
    "payBtn": "Pay",
    "accounts": "ACCOUNTS",
    "payments": "PAYMENTS",
    "explore": "EXPLORE",
    "more": "MORE" };
    spyOn(apiService, 'getDashboardLiteralData').and.returnValue(of(literalData));

    component.ngOnInit();

    expect(component.literal).toEqual(literalData);
  });

  it('should fetch the favourites list and populate the favouritesList array', () => {
    const favouritesData = { "favourites": [
      {
        "userLogo": "katsimmons.png",
        "paymentAvenue": true
      },
      {
        "userLogo": "billerlogo.png",
        "paymentAvenue": false
      },
      {
        "userLogo": "hellofresh.png",
        "paymentAvenue": false
      },
      {
        "userLogo": "amex.png",
        "paymentAvenue": false
      },
      {
        "userLogo": "verizon.png",
        "paymentAvenue": false
      },
      {
        "userLogo": "sofi.png",
        "paymentAvenue": false
      },
      {
        "userLogo": "statefarm.png",
        "paymentAvenue": false
      },
      {
        "userLogo": "Waste-Management-Logo.png",
        "paymentAvenue": false
      }
    ] };
    spyOn(apiService, 'getDashboardData').and.returnValue(of(favouritesData));

    component.ngOnInit();

    expect(component.favouritesList).toEqual(favouritesData.favourites);
  });

  it('should navigate to the specified router link when onSubmit is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');

    component.onSubmit('some-router-link');

    expect(routerSpy).toHaveBeenCalledWith(['some-router-link']);
  });

  it('should navigate to the specified route with the payment mode when onClick is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');

    component.onClick('some-route', 'some-payment-mode');

    expect(routerSpy).toHaveBeenCalledWith(['some-route', 'some-payment-mode']);
  });

  it('should update the active tab when selectTab is called', () => {
    const tab = 3;

    component.selectTab(tab);

    expect(component.activeTab).toBe(tab);
  });

  it('should fetch the todo data and set the todoListLength', () => {
    const todoData = {
      todoSummmary: {
        billPay: [{
          "recipient": "AT&T",
          "userLogo": "billerlogo.png",
          "amount": "$542.00",
          "dueTime": 2,
          "todoDue": true,
          "zelleLimit": false,
          "paymentAvenue": false
        },
        {
          "recipient": "Kat Simmons",
          "userLogo": "katsimmons.png",
          "amount": "$88",
          "dueTime": 4,
          "zelleLimit": true,
          "todoDue": true,
          "paymentAvenue": true
        },
        {
          "recipient": "American Express Credit Card",
          "userLogo": "amex.png",
          "amount": "$612.00",
          "dueTime": 5,
          "todoDue": true,
          "zelleLimit": false,
          "paymentAvenue": false
        },
        {
          "recipient": "Geico",
          "userLogo": "geico.jpg",
          "amount": "$542.00",
          "dueTime": 5,
          "todoDue": false,
          "zelleLimit": false,
          "paymentAvenue": false
        },
        {
          "recipient": "Schedulemyrent.com",
          "userLogo": "schedulemyrent.png",
          "amount": "$65.80",
          "dueTime": 10,
          "zelleLimit": true,
          "todoDue": false,
          "paymentAvenue": true
        }]
      }
    };
    spyOn(apiService, 'getTodoData').and.returnValue(of(todoData));

    component.ngOnInit();

    expect(component.todoListLength).toBe(todoData.todoSummmary.billPay.length);
  });

  it('should calculate the biller amount correctly', () => {
    const selectedBillerDetails: { billerAmount: number }[] = [
      { billerAmount: 100 },
      { billerAmount: 200 },
      { billerAmount: 50 }
    ];

    component.selectedBillerService.selectedBillerDetails = selectedBillerDetails;

    component.ngOnInit();

    let expectedBillerAmount = 0;
    selectedBillerDetails.forEach(item => {
      expectedBillerAmount += item.billerAmount;
    });
    expectedBillerAmount = parseFloat(expectedBillerAmount.toFixed(2));

    expect(component.billerAmount).toBe(expectedBillerAmount);
  });


});
