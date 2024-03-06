import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AddBillsComponent } from './add-bills.component';
import { ApiService } from 'src/app/service/api.service';
import { SelectedBillerService } from 'src/app/service/selected-biller.service';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { ButtonComponent } from 'src/app/common/button/button.component';
import { SearchBarComponent } from 'src/app/common/search-bar/search-bar.component';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('AddBillsComponent', () => {
  let component: AddBillsComponent;
  let fixture: ComponentFixture<AddBillsComponent>;
  let apiService: ApiService;

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBillsComponent, HeaderComponent, ButtonComponent, SearchBarComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ApiService, SelectedBillerService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    component.selectedBillerService = TestBed.inject(SelectedBillerService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the selectedBillerDetails and moreRecipientList arrays', () => {
    expect(component.selectedBillerDetails).toEqual([]);
    expect(component.moreRecipientList).toEqual([]);
  });

  // it('should fetch recipient list and update the selectedBillerDetails array', () => {
  //   // Mock API response
  //   const mockApiResponse = {
  //     onboardingAddBills: {
  //       bills: [
  //         {
  //           recipient: 'AT&T',
  //           userLogo: 'billerlogo.png',
  //           billerAmount: 10,
  //           isSelected: false,
  //         },
  //         // ... other bill objects
  //       ],
  //     },
  //   };

  //   // Spy on the API service method and mock the response
  //   spyOn(apiService, 'getOnboardingData').and.returnValue(of(mockApiResponse));

  //   // Call the method that fetches the recipient list
  //   component.fetchRecipientList();

  //   // Verify that the selectedBillerDetails array is updated
  //   expect(component.selectedBillerDetails).toEqual(mockApiResponse.onboardingAddBills.bills);
  // });

  it('should update the isSelected property of a bill when onSelectedItems is called', () => {
    const mockBill = {
      recipient: 'AT&T',
      userLogo: 'billerlogo.png',
      billerAmount: 10,
      isSelected: false,
    };

    component.activeTab = 1;
    component.selectedBillerService = jasmine.createSpyObj('SelectedBillerService', [
      'addSelectedBiller',
      'removeSelectedBiller',
    ]);

    // Call the onSelectedItems method
    component.onSelectedItems(new Event('click'), mockBill);

    // Verify that the isSelected property is updated and the selectedBillerService methods are called
    expect(mockBill.isSelected).toBeTrue();
    expect(component.selectedBillerService.addSelectedBiller).toHaveBeenCalledWith(mockBill);
  });

  // it('should clear the selectedBillerDetails array and reset isSelected property when cancelSelection is called', () => {
  //   const mockBill = {
  //     recipient: 'AT&T',
  //     userLogo: 'billerlogo.png',
  //     billerAmount: 10,
  //     isSelected: true,
  //   };

  //   component.selectedBillerDetails = [mockBill];
  //   component.recipientList = [mockBill];
  //   component.selectedBillerService = jasmine.createSpyObj('SelectedBillerService', ['removeSelectedBiller']);

  //   // Call the cancelSelection method
  //   component.cancelSelection();

  //   // Verify that the selectedBillerDetails array is cleared and isSelected property is reset
  //   expect(component.selectedBillerDetails).toEqual([]);
  //   expect(mockBill.isSelected).toBeFalse();
  //   expect(component.selectedBillerService.removeSelectedBiller).toHaveBeenCalledWith(mockBill);
  // });

  it('should navigate to the specified router link when onSubmit is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');

    // Call the onSubmit method
    component.onSubmit('/dashboard');

    // Verify that the router navigate method is called with the correct router link
    expect(routerSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should initialize the header and literal objects', () => {
    // Mock API response for header data
    const mockHeaderResponse = { "screen1": "Add Bills" };
    const apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getOnboardingHeaderData').and.returnValue(of(mockHeaderResponse));

    // Mock API response for literal data
    const mockLiteralResponse = { "addBillsButton": "Add Bills",
    "btnCancel": "Cancel",
    "findMoreBills": "Find more bills",
    "paidRecently": "PAID RECENTLY",
    "nearYou": "NEAR YOU"
   };
    spyOn(apiService, 'getOnboardingLiteralData').and.returnValue(of(mockLiteralResponse));

    // Trigger ngOnInit to initialize the header and literal objects
    component.ngOnInit();

    // Verify that the header and literal objects are initialized with the mocked data
    expect(component.header).toEqual(mockHeaderResponse);
    expect(component.literal).toEqual(mockLiteralResponse);
  });

  it('should fetch more recipient list and update the moreRecipientList array', () => {
    // Mock API response
    const mockApiResponse = {
      onboardingAddBills: {
        moreBills: [
          {
            recipient: 'Verizon',
            userLogo: 'verizonlogo.png',
            billerAmount: 20,
            isSelected: false
          },
          // ... other more bill objects
        ]
      }
    };

    // Mock the API service and its response
    const apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getOnboardingData').and.returnValue(of(mockApiResponse));

    // Call the method that fetches the more recipient list
    component.fetchMoreRecipientList();

    // Verify that the moreRecipientList array is updated
    expect(component.moreRecipientList).toEqual(mockApiResponse.onboardingAddBills.moreBills);
  });

  it('should clear the selectedMoreBillerDetails array, moreRecipientList array, and fetch their data again', () => {
    const mockMoreBill = {
      recipient: 'Verizon',
      userLogo: 'verizonlogo.png',
      billerAmount: 20,
      isSelected: true
    };

    // Set up initial values
    component.selectedMoreBillerDetails = [mockMoreBill];
    component.moreRecipientList = [mockMoreBill];

    // Mock the necessary methods
    const spyOnFetchRecipientList = spyOn(component, 'fetchRecipientList');
    const spyOnFetchMoreRecipientList = spyOn(component, 'fetchMoreRecipientList');

    // Call the clearSelectedData method
    component.clearSelectedData();

    // Verify that the arrays are cleared and methods are called
    expect(component.selectedMoreBillerDetails).toEqual([]);
    expect(component.moreRecipientList).toEqual([]);
    expect(spyOnFetchRecipientList).toHaveBeenCalled();
    expect(spyOnFetchMoreRecipientList).toHaveBeenCalled();
  });

  // it('should update the bills with the selectedItems and fetch recipient list', async () => {
  //   // Mock API response
  //   const mockApiResponse = {
  //     onboardingAddBills: {
  //       bills: [
  //         // ... mocked bill objects
  //       ],
  //     },
  //   };

  //   // Spy on the API service method and mock the response
  //   spyOn(apiService, 'getOnboardingData').and.returnValue(of(mockApiResponse));

  //   // Set up selectedItems
  //   const selectedItems = [
  //     // ... selected items
  //   ];

  //   // Set up queryParams with selectedItems
  //   const queryParams = {
  //     selectedItems: JSON.stringify(selectedItems),
  //   };

  //   // Update the bills with selectedItems and fetch recipient list
  //   component['parseSelectedItemsFromQueryParams'](queryParams);
  //   await component.updateBillsWithSelectedItems();
  //   component.fetchRecipientList();

  //   // Assert the updated bills and recipient list
  //   expect(component.selectedBillerDetails).toEqual(mockApiResponse.onboardingAddBills.bills);
  //   // Add more assertions as needed
  // });


  // it('should update the bills array with existing selectedItems', async () => {
  //   const mockOnboardingData = {
  //     onboardingAddBills: {
  //       bills: [
  //         {
  //           recipient: 'AT&T',
  //           userLogo: 'billerlogo.png',
  //           billerAmount: 10,
  //           isSelected: false,
  //         },
  //         {
  //           recipient: 'Verizon',
  //           userLogo: 'verizonlogo.png',
  //           billerAmount: 20,
  //           isSelected: false,
  //         },
  //         // ... other bill objects
  //       ],
  //     },
  //   };

  //   // Set up the mock API response
  //   spyOn(apiService, 'getOnboardingData').and.returnValue(of(mockOnboardingData));

  //   // Set the selectedItems
  //   component.selectedItems = [
  //     {
  //       recipient: 'AT&T',
  //       userLogo: 'billerlogo.png',
  //       billerAmount: 10,
  //       isSelected: false,
  //     },
  //     // ... other selected items
  //   ];

  //   // Call the method that updates the bills with selectedItems
  //   await component.updateBillsWithSelectedItems();

  //   // Verify that the bills array is correctly updated
  //   expect(component.selectedBillerDetails[0].isSelected).toBeTrue();
  //   expect(component.selectedBillerDetails[1].isSelected).toBeFalse(); // Existing bill that wasn't selected
  // });

  it('should remove the selected biller from the selectedBillerDetails array and call removeSelectedBiller method', () => {
    const mockBill = {
      recipient: 'AT&T',
      userLogo: 'billerlogo.png',
      billerAmount: 10,
      isSelected: true,
    };

    component.activeTab = 1;
    component.selectedBillerService = jasmine.createSpyObj('SelectedBillerService', [
      'addSelectedBiller',
      'removeSelectedBiller',
    ]);

    // Add the mock bill to the selectedBillerDetails array
    component.selectedBillerDetails.push(mockBill);

    // Call the onSelectedItems method to deselect the biller
    component.onSelectedItems(new Event('click'), mockBill);

    // Verify that the biller is removed from the selectedBillerDetails array
    expect(component.selectedBillerDetails.length).toBe(0);

    // Verify that the removeSelectedBiller method is called
    expect(component.selectedBillerService.removeSelectedBiller).toHaveBeenCalledWith(mockBill);
  });

  // it('should add the selected biller to the selectedMoreBillerDetails array and call addSelectedBiller method', () => {
  //   const mockBill = {
  //     recipient: 'Verizon',
  //     userLogo: 'verizonlogo.png',
  //     billerAmount: 20,
  //     isSelected: true,
  //   };

  //   component.activeTab = 2;
  //   spyOn(component.selectedBillerService, 'addSelectedBiller');

  //   // Call the onSelectedItems method to select the biller
  //   component.onSelectedItems(new Event('click'), mockBill);

  //   // Verify that the biller is added to the selectedMoreBillerDetails array
  //   expect(component.selectedMoreBillerDetails.length).toBe(1);
  //   expect(component.selectedMoreBillerDetails[0]).toEqual(mockBill);

  //   // Verify that the addSelectedBiller method is called with the correct biller object
  //   expect(component.selectedBillerService.addSelectedBiller).toHaveBeenCalledWith(mockBill);
  // });



});
