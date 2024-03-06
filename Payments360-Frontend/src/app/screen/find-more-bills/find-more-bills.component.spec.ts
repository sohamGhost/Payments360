import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FindMoreBillsComponent } from './find-more-bills.component';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { of } from 'rxjs';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { ButtonComponent } from 'src/app/common/button/button.component';

describe('FindMoreBillsComponent', () => {
  let component: FindMoreBillsComponent;
  let fixture: ComponentFixture<FindMoreBillsComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindMoreBillsComponent, HeaderComponent, ButtonComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ApiService, DataService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindMoreBillsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);

    spyOn(apiService, 'getFindMoreBillsHeaderData').and.returnValue(
      of({ screen1: 'Find more bills' })
    );

    spyOn(apiService, 'getFindMoreBillsLiteralData').and.returnValue(
      of({
        pay: "We'll find your current bill. Pick the ones you want to pay.",
        biller: 'Bills from our biller network',
        profiles: 'If you select the box, we\'ll see if your profile matches any bills we already have.',
        service: 'You\'ll choose bills from companies in our service provider\'s network',
        easier: 'We\'ll use the bill info to make it easier for you to add them',
        credit: 'Your credit report',
        report: 'You\'re consenting to our service provider accessing your consumer credit report from a credit bureau to help you add bills.',
        creditscore: 'The report won\'t have your credit score',
        score: 'Accessing it won\'t impact your score',
        shared: 'Your info won\'t be shared and will only be used to find the bills you pay',
        btnBills: 'Find My Bills',
        btnCancel: 'Cancel'
      })
    );

    fixture.detectChanges();
  });

  it('should fetch header data from API and populate the header object', () => {
    expect(apiService.getFindMoreBillsHeaderData).toHaveBeenCalled();
    expect(component.header).toEqual({ screen1: 'Find more bills' });
  });

  it('should fetch literal data from API and populate the literal object', () => {
    expect(apiService.getFindMoreBillsLiteralData).toHaveBeenCalled();
    expect(component.literal).toEqual({
      pay: "We'll find your current bill. Pick the ones you want to pay.",
      biller: 'Bills from our biller network',
      profiles: 'If you select the box, we\'ll see if your profile matches any bills we already have.',
      service: 'You\'ll choose bills from companies in our service provider\'s network',
      easier: 'We\'ll use the bill info to make it easier for you to add them',
      credit: 'Your credit report',
      report: 'You\'re consenting to our service provider accessing your consumer credit report from a credit bureau to help you add bills.',
      creditscore: 'The report won\'t have your credit score',
      score: 'Accessing it won\'t impact your score',
      shared: 'Your info won\'t be shared and will only be used to find the bills you pay',
      btnBills: 'Find My Bills',
      btnCancel: 'Cancel'
    });
  });

  it('should initialize checkbox values to false and isButtonDisabled to true', () => {
    expect(component.checkbox1).toBeFalse();
    expect(component.checkbox2).toBeFalse();
    expect(component.isButtonDisabled).toBeTrue();
  });

  it('should toggle checkbox1 value when onCheckbox1Change is called', () => {
    component.onCheckbox1Change();
    expect(component.checkbox1).toBeTrue();
    component.onCheckbox1Change();
    expect(component.checkbox1).toBeFalse();
  });

  it('should toggle checkbox2 value when onCheckbox2Change is called', () => {
    component.onCheckbox2Change();
    expect(component.checkbox2).toBeTrue();
    component.onCheckbox2Change();
    expect(component.checkbox2).toBeFalse();
  });

  it('should reset checkbox values and isButtonDisabled to true when cancelSelection is called', () => {
    component.checkbox1 = true;
    component.checkbox2 = true;
    component.isButtonDisabled = false;

    component.cancelSelection();

    expect(component.checkbox1).toBeFalse();
    expect(component.checkbox2).toBeFalse();
    expect(component.isButtonDisabled).toBeTrue();
  });


  it('should navigate to the specified route with query parameters when onSubmit is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');
    const routerLink = 'selectaddbills';

    component.checkbox1 = true;
    component.checkbox2 = false;

    component.onSubmit(routerLink);

    expect(routerSpy).toHaveBeenCalledWith([routerLink], {
      queryParams: { checkbox1: 'true', checkbox2: 'false' }
    });
  });
});
