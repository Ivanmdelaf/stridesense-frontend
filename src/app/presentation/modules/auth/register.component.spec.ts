import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { RegisterComponent } from './register.component';
import { UserState } from '../../state/user.state';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository';

const mockRepo = {
  login: vi.fn(),
  register: vi.fn(),
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
};

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideStore([UserState]),
        provideRouter([]),
        { provide: USER_REPOSITORY, useValue: mockRepo },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty fields', () => {
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
  });

  it('should start with loading false', () => {
    expect(component.loading()).toBe(false);
  });

  it('should start with null error', () => {
    expect(component.error()).toBeNull();
  });

  it('should render the form', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should render 4 inputs (name, email, password, confirmPassword)', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toBe(4);
  });

  it('should render submit button with text "Registrarse"', () => {
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Registrarse');
  });

  it('should render link to login', () => {
    const link = fixture.nativeElement.querySelector('a[href="/auth/login"]');
    expect(link).toBeTruthy();
    expect(link.textContent.trim()).toBe('Inicia sesión');
  });

  it('should detect password mismatch', () => {
    component.password = '123456';
    component.confirmPassword = '654321';
    expect(component.passwordMismatch).toBe(true);
  });

  it('should not detect mismatch when passwords match', () => {
    component.password = '123456';
    component.confirmPassword = '123456';
    expect(component.passwordMismatch).toBe(false);
  });

  it('should not detect mismatch when confirmPassword is empty', () => {
    component.password = '123456';
    component.confirmPassword = '';
    expect(component.passwordMismatch).toBe(false);
  });
});
