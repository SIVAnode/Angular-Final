import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { HelpersModule } from '../../../helpers/helpers.module';
import { Validators } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HelpersModule
      ],
      declarations: [
        LoginComponent
      ],
    }).compileComponents();
  });

   it('Debe instanciar el login component', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const login = fixture.componentInstance;
      expect(login).toBeTruthy();
    });

    it('Debe ser requerido en loginForm email y password', () => {
        const componentInstance = TestBed.createComponent(LoginComponent).componentInstance;
        expect(componentInstance.loginForm.get('email')?.hasValidator(Validators.required)).toBe(true);
        expect(componentInstance.loginForm.get('password')?.hasValidator(Validators.required)).toBe(true);
      });

      it('Si el formulario es invalido debe marcar los campos como tocados', () => {
        const componentInstance = TestBed.createComponent(LoginComponent).componentInstance;
        expect(componentInstance.loginForm.setValue({
            email:'',
            password:''
      }))
      const spyOnAllasTouched = spyOn(componentInstance.loginForm, 'markAllAsTouched')
      componentInstance.onSubmit();
      expect(spyOnAllasTouched).toHaveBeenCalledTimes(1)
      });
})