import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the enteredSearchValue to an empty string', () => {
    expect(component.EnteredSearchValue).toEqual('');
  });

  it('should update the enteredSearchValue when set', () => {
    const testValue = 'Test Value';
    component.EnteredSearchValue = testValue;
    expect(component.EnteredSearchValue).toEqual(testValue);
  });

  it('should emit the enteredSearchValue when onSearchTextChanged is called', () => {
    const testValue = 'Test Value';
    let emittedValue: string | undefined;
    component.searchTextChanged.subscribe(value => emittedValue = value);

    component.EnteredSearchValue = testValue;
    component.onSearchTextChanged();

    expect(emittedValue).toEqual(testValue);
  });
});
