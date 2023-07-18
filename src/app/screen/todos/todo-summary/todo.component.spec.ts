import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ButtonComponent } from 'src/app/common/button/button.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { ApiService } from 'src/app/service/api.service';
import { SelectedItemsService } from 'src/app/service/selected-items.service';

import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let apiService: ApiService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent, HeaderComponent, ButtonComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ApiService, SelectedItemsService ],
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    component.selectedItemsService = TestBed.inject(SelectedItemsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the header and literal objects', () => {
    const mockHeaderResponse = { "screen1": "To-Do"};
    const apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getTodoHeaderData').and.returnValue(of(mockHeaderResponse));

    const mockLiteralResponse = {"addNewBiller": "Add New Biller",
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
  };
  spyOn(apiService, 'getTodoLiteralData').and.returnValue(of(mockLiteralResponse));
  component.ngOnInit();
  expect(component.header).toEqual(mockHeaderResponse);
  expect(component.literal).toEqual(mockLiteralResponse);

  });

 it('should navigate to the specified router link when onSubmit is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');

    // Call the onSubmit method
    component.onSubmit('/dashboard');

    // Verify that the router navigate method is called with the correct router link
    expect(routerSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should fetch todoBillsList and populate the object', () => {
    const mockDataResponse = {
      "todoSummmary": {
          "billPay": [
            {
              "recipient": "AT&T",
              "userLogo": "billerlogo.png",
              "amount": "$542.00",
              "dueTime": 2,
              "todoDue": true,
              "zelleLimit": false,
              "paymentAvenue": false
            },
          ]
        }
      }
    const apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getTodoData').and.returnValue(of(mockDataResponse));
    component.ngOnInit();

    expect(component.todoBillsList).toEqual(mockDataResponse.todoSummmary.billPay);
  })

  it('should fetch selectedItems and assign it', () => {
    const selectedItemsService = TestBed.inject(SelectedItemsService);
    const mockSelectedItems = [
      {
        recipient: 'Recipient 1',
        userLogo: 'logo1.png',
        amount: '$100.00',
        dueTime: 1,
        todoDue: true,
        zelleLimit: false,
        paymentAvenue: false,
      },
      {
        recipient: 'Recipient 2',
        userLogo: 'logo2.png',
        amount: '$200.00',
        dueTime: 2,
        todoDue: false,
        zelleLimit: false,
        paymentAvenue: false,
      },
    ];

    // Set the mock selected items
    selectedItemsService.setSelectedItems(mockSelectedItems);

    // Trigger change detection
    fixture.detectChanges();

    // Expect the component's selectedItems to be equal to the mock selected items
    expect(component.selectedItems).toEqual(mockSelectedItems);
  });

  it('should update the active tab when selectTab is called', () => {
    const tab = 3;

    component.selectTab(tab);

    expect(component.activeTab).toBe(tab);
  });

  it('should toggle the showButtons property when toggleRadioButtons is called', () => {
    const initialShowButtons = component.showButtons;

    component.toggleRadioButtons();

    expect(component.showButtons).toBe(!initialShowButtons);
  });

});
