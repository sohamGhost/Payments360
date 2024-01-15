import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ApiService } from 'src/app/service/api.service';

import { DataService } from 'src/app/service/data.service';

import { ButtonType } from 'src/app/common/constant/constant';

import { ZellepermissionsComponent } from './zellepermissions.component';

 

describe('ZellepermissionsComponent', () => {

  let component: ZellepermissionsComponent;

  let fixture: ComponentFixture<ZellepermissionsComponent>;

 

  beforeEach(() => {

    const apiServiceStub = () => ({

      getzellepermissionsheaderData: () => ({ subscribe: f => f({}) }),

      getzellepermissionsliteralData: () => ({ subscribe: f => f({}) })

    });

    const dataServiceStub = () => ({});

    TestBed.configureTestingModule({

      schemas: [NO_ERRORS_SCHEMA],

      declarations: [ZellepermissionsComponent],

      providers: [

        { provide: ApiService, useFactory: apiServiceStub },

        { provide: DataService, useFactory: dataServiceStub }

      ]

    });

    fixture = TestBed.createComponent(ZellepermissionsComponent);

    component = fixture.componentInstance;

  });

 

  it('can load instance', () => {

    expect(component).toBeTruthy();

  });

 

  it(`header has default value`, () => {

    expect(component.header).toEqual([]);

  });

 

  it(`literal has default value`, () => {

    expect(component.literal).toEqual([]);

  });

 

  it(`checkbox has default value`, () => {

    expect(component.checkbox).toEqual(false);

  });

 

  it(`buttonType has default value`, () => {

    expect(component.buttonType).toEqual(ButtonType);

  });

 

  it(`continueButtonDisabled has default value`, () => {

    expect(component.continueButtonDisabled).toEqual(true);

  });

  it('should navigate to the specified route when onSubmit method is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');
    const routerLink = 'zellesetuppayment';

    component.onSubmit(routerLink);

    expect(routerSpy).toHaveBeenCalledWith([routerLink]);
  });

  

});