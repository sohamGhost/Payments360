import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';




import { SuccessFailureScreenComponent } from './success-failure-screen.component';

import { ApiService } from 'src/app/service/api.service';

import { HttpClient } from '@angular/common/http';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';




describe('SuccessFailureScreenComponent', () => {  //callback




  let component: SuccessFailureScreenComponent;

  let fixture: ComponentFixture<SuccessFailureScreenComponent>;

  let httpClient: HttpClientTestingModule;

  let apiService: ApiService;

  let router: Router;

  beforeEach(async () => {




    await TestBed.configureTestingModule({

      providers: [ApiService],

      imports: [HttpClientTestingModule, RouterTestingModule],

      declarations: [SuccessFailureScreenComponent]

    })

      .compileComponents();

  });





  beforeEach(() => {

    apiService = TestBed.inject(ApiService);




    spyOn(apiService, 'getSuccessFailureData') //spyOn(declared variable,method name)

      .and.returnValue(of({

        mobile: '718-555-1234'

      }));





    spyOn(apiService, 'getSuccessFailureLiteralData').and.returnValue(of({

      complete: 'Your Payments 360 set up is complete!',

      contact: 'Contact method',

      text1: 'Next, we found 7 bills you can add',

      para: 'Instantly add bills found in your transaction history',

      confirmationbutton: 'Review and Add Bills',

      skipbutton: 'Skip Bills and Close'

    }));





    spyOn(apiService, 'getOnboardingData').and.returnValue(of(

      {

        onboardingAddBills: {

          bills: [

            {

              recipient: 'AT&T',

              userLogo: 'billerlogo.png',

              billerAmount: 10,

              isSelected: false

            },

            {

              recipient: 'Geico',

              userLogo: 'geico.jpg',

              billerAmount: 20,

              isSelected: false

            },

            {

              recipient: 'SoFi',

              userLogo: 'sofi.png',

              billerAmount: 30,

              isSelected: false

            },

            {

              recipient: 'Verizon',

              userLogo: 'verizon.png',

              billerAmount: 40.1,

              isSelected: false

            },

            {

              recipient: 'Navient',

              userLogo: 'navient.png',

              billerAmount: 50.23,

              isSelected: false

            },

            {

              recipient: 'RCN',

              userLogo: 'rcn.png',

              billerAmount: 25,

              isSelected: false

            },

            {

              recipient: 'Waste Management',

              userLogo: 'Waste-Management-Logo.png',

              billerAmount: 14,

              isSelected: false

            },

          ],




          moreBills: [

            {

              recipient: 'Hello Fresh',

              userLogo: 'hellofresh.png',

              billerAmount: 60,

              isSelected: false

            },

            {

              recipient: 'State Farm',

              userLogo: 'statefarm.png',

              billerAmount: 70,

              isSelected: false

            },

          ],

        }

      }));

    fixture = TestBed.createComponent(SuccessFailureScreenComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

    httpClient = TestBed.inject(HttpClient);




  });




//==========================================================




  //literal

  it('should fetch literal data from API and populate the literal object', async () => {

    expect(apiService.getSuccessFailureLiteralData).toHaveBeenCalled(); //expect(declared variable.method name)




    const successfailureliteral = {

      complete: 'Your Payments 360 set up is complete!',

      contact: 'Contact method',

      text1: 'Next, we found 7 bills you can add',

      para: 'Instantly add bills found in your transaction history',

      confirmationbutton: 'Review and Add Bills',

      skipbutton: 'Skip Bills and Close'

    };

    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.literal).toEqual(successfailureliteral);

  });




  //=============================================================




  //data

  it('should fetch account list from API and populate the accountList array', async () => {

    expect(apiService.getSuccessFailureData).toHaveBeenCalled();

    const successfailuredata = {

      mobile: '718-555-1234'

    };

    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.data).toEqual(successfailuredata);

  });




//===============================================================




  //onboarding data

  it('should initialize billerlist from API', async () => {

    expect(apiService.getOnboardingData).toHaveBeenCalled();

    const billerLists = {

      onboardingAddBills: {

        bills: [

          {

            recipient: 'AT&T',

            userLogo: 'billerlogo.png',

            billerAmount: 10,

            isSelected: false

          },

          {

            recipient: 'Geico',

            userLogo: 'geico.jpg',

            billerAmount: 20,

            isSelected: false

          },

          {

            recipient: 'SoFi',

            userLogo: 'sofi.png',

            billerAmount: 30,

            isSelected: false

          },

          {

            recipient: 'Verizon',

            userLogo: 'verizon.png',

            billerAmount: 40.1,

            isSelected: false

          },

          {

            recipient: 'Navient',

            userLogo: 'navient.png',

            billerAmount: 50.23,

            isSelected: false

          },

          {

            recipient: 'RCN',

            userLogo: 'rcn.png',

            billerAmount: 25,

            isSelected: false

          },

          {

            recipient: 'Waste Management',

            userLogo: 'Waste-Management-Logo.png',

            billerAmount: 14,

            isSelected: false

          }],




        moreBills: [

          {

            recipient: 'Hello Fresh',

            userLogo: 'hellofresh.png',

            billerAmount: 60,

            isSelected: false

          },

          {

            recipient: 'State Farm',

            userLogo: 'statefarm.png',

            billerAmount: 70,

            isSelected: false

          }

        ]




      }

    };




    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.billerList).toEqual(billerLists.onboardingAddBills.bills);

    expect(component.billerList).toEqual(billerLists.onboardingAddBills.moreBills);






  });





  //====================================================================




  //for onsubmit method

  it('should navigate to routerLink on submit', () => {

    const routerLink = ['/home'];

    component.onSubmit(routerLink);

    expect(router.navigate).toHaveBeenCalledWith(routerLink);

  });




  //=====================================================================




  //for toggle method

  it('should disable the button when checked is true', () => {

    const event = {

      target: { checked: true } as HTMLInputElement

    } as unknown as Event;

    component.toggle(event);

    expect(component.isButtonDisabled).toBeFalse();

  });




  it('should enable the button when checked is false', () => {

    const event = { target: { checked: false } as HTMLInputElement } as unknown as Event;

    component.toggle(event);

    expect(component.isButtonDisabled).toBeTrue();

  });





  //===========================================================================






  //for cancel method

  it('should navigate to setuppayment on cancel confirmation', async () => {

    spyOn(window, 'confirm').and.returnValue(true);

    const navigateSpy = spyOn(component.router, 'navigate');

    component.Cancel();

    expect(navigateSpy).toHaveBeenCalledWith(['/setuppayment']);

    const swaldialog = {

      title: 'Are you sure you want to cancel?',

      text: 'You have not finished setting up your Payments 360 profile.',

      icon: 'warning',

      showCancelButton: true,

      cancelButtonText: 'Yes, cancel',

      confirmButtonText: 'Finish set up',

    };

    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.data).toEqual(swaldialog);





  });




  it('should navigate to dashboard on cancel confirmation', async () => {

    spyOn(window, 'confirm').and.returnValue(false);

    const navigateSpy = spyOn(component.router, 'navigate');

    component.Cancel();

    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);

    const swaldialog1 = {

      title: 'Are you sure you want to cancel?',

      text: 'You have not finished setting up your Payments 360 profile.',

      icon: 'warning',

      showCancelButton: true,

      cancelButtonText: 'Yes, cancel',

      confirmButtonText: 'Finish set up',

    };

    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.data).toEqual(swaldialog1);
  });

});