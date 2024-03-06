
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { async, of } from 'rxjs';

import { ApiService } from 'src/app/service/api.service';

import { SelectedItemsService } from 'src/app/service/selected-items.service';

import { TodoDueSoonComponent } from './todo-due-soon.component';




describe('TodoDueSoonComponent', () => {

  let component: TodoDueSoonComponent;

  let fixture: ComponentFixture<TodoDueSoonComponent>;

  let apiService: ApiService;

  let selectedItemsService: SelectedItemsService;




  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [TodoDueSoonComponent],

      imports: [RouterTestingModule, HttpClientTestingModule],

      providers: [ApiService, SelectedItemsService],

    }).compileComponents();

  });





  beforeEach(() => {

    fixture = TestBed.createComponent(TodoDueSoonComponent);

    component = fixture.componentInstance;

    apiService = TestBed.inject(ApiService);

    selectedItemsService = TestBed.inject(SelectedItemsService);

    fixture.detectChanges();

  });





  beforeEach(() => {

    apiService = TestBed.inject(ApiService);

    spyOn(apiService, 'getTodoLiteralData').and.returnValue(of({

      "addNewBiller": "Add New Biller",

      "dueSoon": "Due Soon",

      "payNow": "Pay Now",

      "upcoming": "Upcoming",

      "payTodos": "Pay To-Do's",

      "accounts": "ACCOUNTS",

      "payments": "PAYMENTS",

      "explore": "EXPLORE",

      "more": "MORE",

      "zelleLimit": "Zelle limit reached",

      "zelleDueMsg": "Requested via",

      "reviewTodos": "Review and Pay Selected"

    }));





    fixture = TestBed.createComponent(TodoDueSoonComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });




  afterEach(() => {

    fixture.destroy();

  })




  it('should tetch literal data from API and populate the literal object', async () => {

    expect(apiService.getTodoLiteralData).toHaveBeenCalled();




    const literalData = {

      "addNewBiller": "Add New Biller",

      "dueSoon": "Due Soon",

      "payNow": "Pay Now",

      "upcoming": "Upcoming",

      "payTodos": "Pay To-Do's",

      "accounts": "ACCOUNTS",

      "payments": "PAYMENTS",

      "explore": "EXPLORE",

      "more": "MORE",

      "zelleLimit": "Zelle limit reached",

      "zelleDueMsg": "Requested via",

      "reviewTodos": "Review and Pay Selected"

    }




    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.literal).toEqual(literalData);

  });





  it('should update selected items when onSelectionChange is called', () => {

    const mockSelectedItem = {

      recipient: 'AT&T',

      userLogo: 'billerlogo.png',

      amount: '$542.00',

      dueTime: 2,

      todoDue: true,

      zelleLimit: false,

      paymentAvenue: false,

      isSelected: false,

    };

    spyOn(selectedItemsService, 'updateSelectedItemsDueSoon');

    component.onSelectionChange(mockSelectedItem);

    expect(mockSelectedItem.isSelected).toBe(true);

    expect(selectedItemsService.updateSelectedItemsDueSoon).toHaveBeenCalledWith(mockSelectedItem);

  });





  it('should fetch todoBillsList and populate the object', () => {

    const mockDataResponse = {

      todoSummmary: {

        billPay: [

          {

            recipient: 'AT&T',

            userLogo: 'billerlogo.png',

            amount: '$542.00',

            dueTime: 2,

            todoDue: true,

            zelleLimit: false,

            paymentAvenue: false,

          },

        ],

      },

    };

    spyOn(apiService, 'getTodoData').and.returnValue(of(mockDataResponse));

    component.ngOnInit(); expect(component.todoBillsList).toEqual(mockDataResponse.todoSummmary.billPay);

  });






  it('should create', () => {

    expect(component).toBeTruthy();

  });





  it('should navigate to the specified router link when onSubmit2 is called', () => {

    const routerSpy = spyOn(component['_router'], 'navigate');

    const route = 'dashboard'; const paymentMode = 'credit';

    component.onSubmit2(route, paymentMode);

    expect(routerSpy).toHaveBeenCalledWith([route, paymentMode]);

  });


  

  it('should navigate to the specified router link and show buttons when onSubmit is called', () => {

    const routerLink = '/dashboard';

    const routerSpy = spyOn(component['_router'], 'navigate');

    component.onSubmit(routerLink); expect(routerSpy).toHaveBeenCalledWith([routerLink]);

    expect(component.showButtons).toBe(true);

  });


});


