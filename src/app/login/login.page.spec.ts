import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when fields are filled correctly', () => {
    const form = component.loginForm; // Asegúrate de que el formulario se llame loginForm
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('123456');
    expect(form.valid).toBeTrue(); // El formulario debe ser válido
  });

  it('should have an invalid form when fields are empty', () => {
    const form = component.loginForm;
    form.controls['email'].setValue('');
    form.controls['password'].setValue('');
    expect(form.invalid).toBeTrue(); // El formulario debe ser inválido
  });

  it('should disable the submit button when the form is invalid', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('ion-button');
    component.loginForm.controls['email'].setValue('');
    fixture.detectChanges();
    expect(button.disabled).toBeTrue(); // El botón debe estar deshabilitado cuando el formulario es inválido
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit'); // Espiar el método onSubmit
    const form = component.loginForm;
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('123456');
    fixture.detectChanges();

    const formElement: HTMLFormElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit')); // Simula el envío del formulario

    expect(component.onSubmit).toHaveBeenCalled(); // Verifica que onSubmit fue llamado
  });

  // Validaciones adicionales para los campos
  it('should mark email as invalid if it is empty', () => {
    const form = component.loginForm;
    form.controls['email'].setValue('');
    expect(form.controls['email'].invalid).toBeTrue(); // Verifica que el campo email es inválido si está vacío
  });

  it('should mark password as invalid if it is too short', () => {
    const form = component.loginForm;
    form.controls['password'].setValue('123');
    expect(form.controls['password'].invalid).toBeTrue(); // Verifica que el campo password es inválido si tiene menos de 6 caracteres
  });  

});
