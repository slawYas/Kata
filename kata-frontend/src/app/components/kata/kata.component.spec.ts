import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { KataComponent } from './kata.component';
import { KataService } from '../../services/kata.service';

describe('KataComponent', () => {
  let component: KataComponent;
  let fixture: ComponentFixture<KataComponent>;
  let kataService: jasmine.SpyObj<KataService>;

  beforeEach(async () => {
    const kataServiceSpy = jasmine.createSpyObj('KataService', ['getTransformedValue']);

    await TestBed.configureTestingModule({
      imports: [KataComponent, ReactiveFormsModule], // KataComponent est importé ici
      providers: [
        { provide: KataService, useValue: kataServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(KataComponent);
    component = fixture.componentInstance;
    kataService = TestBed.inject(KataService) as jasmine.SpyObj<KataService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when number is empty', () => {
    expect(component.kataForm.valid).toBeFalse();
  });

  it('should have a valid form when number is between 0 and 100', () => {
    component.kataForm.get('number')?.setValue(10);
    expect(component.kataForm.valid).toBeTrue();
  });

  it('should return the correct error message for a required field', () => {
    component.kataForm.get('number')?.setValue(null);
    expect(component.getErrorMessage('number')).toBe('Ce champ est obligatoire');
  });

  it('should return the correct error message for a min value', () => {
    component.kataForm.get('number')?.setValue(-1);
    expect(component.getErrorMessage('number')).toBe('Le nombre doit être supérieur ou égal à 0');
  });

  it('should return the correct error message for a max value', () => {
    component.kataForm.get('number')?.setValue(101);
    expect(component.getErrorMessage('number')).toBe('Le nombre doit être inférieur ou égal à 100');
  });

  it('should call kataService.getTransformedValue with the correct number', () => {
    const mockResponse = { transformedNumber: 'foo' };
    kataService.getTransformedValue.and.returnValue(of(mockResponse));

    component.kataForm.get('number')?.setValue(10);
    component.submit();

    expect(kataService.getTransformedValue).toHaveBeenCalledWith(10);
  });

  it('should update result$ with the response from kataService', (done: DoneFn) => {
    const mockResponse = { transformedNumber: 'foo' };
    kataService.getTransformedValue.and.returnValue(of(mockResponse));

    component.kataForm.get('number')?.setValue(10);
    component.submit();

    component.result$?.subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });
});
