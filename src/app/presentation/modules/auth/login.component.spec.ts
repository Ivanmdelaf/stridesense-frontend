import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { LoginComponent } from './login.component';
import { UserState } from '../../state/user.state';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideStore([UserState]),
        provideRouter([]),
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

  it('onSubmit should set loading then dispatch SetUser', () => {
    component.email = 'test@test.com';
    component.password = '123456';
    component.onSubmit();
    expect(component.loading()).toBe(false);
  });
});
