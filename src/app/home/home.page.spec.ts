import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';



describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
    
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const comp = fixture.nativeElement as HTMLElement
    expect(comp.querySelector('ion-title')?.textContent).toContain('Login de Acceso')
  })

  it('should render the title', () => {
    const comp = fixture.nativeElement as HTMLElement;
    expect(comp.querySelector('ion-title')?.textContent).toContain('Login de Acceso');
  });

  it('should contain a button with text "Login"', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('ion-button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Login');
  });

  it('should call a method when the button is clicked', () => {
    spyOn(component, 'onLoginClick'); // Espiar el método onLoginClick (si lo tienes)
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('ion-button');
    button.click(); // Simula el clic en el botón
    expect(component.onLoginClick).toHaveBeenCalled(); // Verifica si el método fue llamado
  });

  it('should change title when a method is called', () => {
    component.changeTitle(); // Asumimos que tienes un método changeTitle()
    fixture.detectChanges(); // Detecta los cambios en el DOM después de la llamada al método
    const comp = fixture.nativeElement as HTMLElement;
    expect(comp.querySelector('ion-title')?.textContent).toContain('Nuevo Título');
  });
});
