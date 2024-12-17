import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [provideHttpClient()]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when fields are filled correctly', () => {
    const form = component.registerForm;
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('123456');
    expect(form.valid).toBeTrue();
  });

  it('should have an invalid form when fields are empty', () => {
    const form = component.registerForm;
    form.controls['email'].setValue('');
    form.controls['password'].setValue('');
    expect(form.invalid).toBeTrue();
  });

  it('should disable the submit button when the form is invalid', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('ion-button');
    component.registerForm.controls['email'].setValue('');
    fixture.detectChanges();
    expect(button.disabled).toBeTrue();
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = component.registerForm;
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('123456');
    fixture.detectChanges();

    const formElement: HTMLFormElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should mark email as invalid if it is empty', () => {
    const form = component.registerForm;
    form.controls['email'].setValue('');
    expect(form.controls['email'].invalid).toBeTrue();
  });
  
  it('should mark password as invalid if it is too short', () => {
    const form = component.registerForm;
    form.controls['password'].setValue('123');
    expect(form.controls['password'].invalid).toBeTrue();
  });

});
