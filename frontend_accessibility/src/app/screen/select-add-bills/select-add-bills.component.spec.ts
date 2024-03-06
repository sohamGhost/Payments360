import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { SelectAddBillsComponent } from './select-add-bills.component';
import { of } from 'rxjs';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { ButtonComponent } from 'src/app/common/button/button.component';

describe('SelectAddBillsComponent', () => {
  let component: SelectAddBillsComponent;
  let fixture: ComponentFixture<SelectAddBillsComponent>;
  let apiService: ApiService;
  let dataService: DataService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectAddBillsComponent, HeaderComponent, ButtonComponent],
      providers: [
        { provide: ApiService, useValue: { getSelectAddBillsData: () => of({ addBillsList: { billerNetwork: [], creditReport: [] } }), getSelectAddBillsLiteralData: () => of({}), getSelectAddBillsHeaderData: () => of({}) } },
        { provide: DataService, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAddBillsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    dataService = TestBed.inject(DataService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data from API on component initialization', () => {
    const getSelectAddBillsDataSpy = spyOn(apiService, 'getSelectAddBillsData').and.returnValue(of({ addBillsList: { billerNetwork: [], creditReport: [] } }));
    const getSelectAddBillsLiteralDataSpy = spyOn(apiService, 'getSelectAddBillsLiteralData').and.returnValue(of({}));
    const getSelectAddBillsHeaderDataSpy = spyOn(apiService, 'getSelectAddBillsHeaderData').and.returnValue(of({}));

    component.ngOnInit();

    expect(getSelectAddBillsDataSpy).toHaveBeenCalled();
    expect(getSelectAddBillsLiteralDataSpy).toHaveBeenCalled();
    expect(getSelectAddBillsHeaderDataSpy).toHaveBeenCalled();
  });

  it('should update selected items on checkbox change', () => {
    const updateSelectedItemsSpy = spyOn(component, 'updateSelectedItems');

    component.onCheckboxChange();

    expect(updateSelectedItemsSpy).toHaveBeenCalled();
  });

  it('should update selected items correctly', () => {
    component.billerNetworkList = [
      { isSelected: true, recipient: 'RCN', billerAmount: 25, accNumber: '*9928', userLogo: 'rcn.png' },
      { isSelected: false, recipient: 'ABC', billerAmount: 10, accNumber: '*1234', userLogo: 'abc.png' }
    ];
    component.creditReportList = [
      { isSelected: true, recipient: 'Waste Management', billerAmount: 14, accNumber: '*3342', userLogo: 'Waste-Management-Logo.png' },
      { isSelected: true, recipient: 'XYZ', billerAmount: 20, accNumber: '*5678', userLogo: 'xyz.png' }
    ];

    component.updateSelectedItems();

    expect(component.selectedItems.length).toBe(3);
    expect(component.selectedItems[0]).toEqual({ isSelected: true, recipient: 'RCN', billerAmount: 25, accNumber: '*9928', userLogo: 'rcn.png' });
    expect(component.selectedItems[1]).toEqual({ isSelected: true, recipient: 'Waste Management', billerAmount: 14, accNumber: '*3342', userLogo: 'Waste-Management-Logo.png' });
    expect(component.selectedItems[2]).toEqual({ isSelected: true, recipient: 'XYZ', billerAmount: 20, accNumber: '*5678', userLogo: 'xyz.png' });
  });

  // it('should navigate to the specified route on form submission', () => {
  //   const routerSpy = spyOn(router, 'navigate');
  //   const routerLink = 'successscreen';

  //   component.onSubmit(routerLink);

  //   expect(routerSpy).toHaveBeenCalledWith([routerLink]);
  // });

  it('should reset checkbox values and isButtonDisabled to true on cancelSelection', () => {
    component.checkbox1 = false;
    component.checkbox2 = false;
    component.checkbox3 = true;
    component.isButtonDisabled = false;

    component.cancelSelection();

    expect(component.checkbox1).toBeTrue();
    expect(component.checkbox2).toBeFalse();
    expect(component.checkbox3).toBeFalse();
    expect(component.isButtonDisabled).toBeTrue();
  });
});
