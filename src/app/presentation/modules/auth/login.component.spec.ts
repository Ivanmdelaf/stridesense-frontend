import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { LoginComponent } from './login.component';
import { UserState } from '../../state/user.state';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository';

const mockRepo = {
  login: vi.fn(),
  register: vi.fn(),
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
};

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideStore([UserState]),
        provideRouter([]),
        { provide: USER_REPOSITORY, useValue: mockRepo },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty email and password', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
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

  it('should render email and password inputs', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toBe(2);
  });

  it('should render submit button', () => {
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Entrar');
  });

  it('should render link to register', () => {
    const link = fixture.nativeElement.querySelector('a[href="/auth/register"]');
    expect(link).toBeTruthy();
  });
});
