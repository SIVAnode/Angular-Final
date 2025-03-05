import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { MockProvider } from 'ng-mocks';




describe('AuthService', () => {
  let authService : AuthService;
  let router: Router;

  beforeEach( () => {
     TestBed.configureTestingModule({
      providers:[AuthService, MockProvider(Router)],
    }).compileComponents();
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)

  });

    it('Es necesario instanciar el servicio de autenticación.',()=>{
        expect(authService).toBeTruthy()
    })

    it('Se debe establecer el usuario autenticado, persistir el token de acceso en el almacenamiento local y realizar la redirección al dashboard principal.', () => {
        const spyOnNavigate = spyOn(router, 'navigate');
    
        authService.login({
          email: 'admin@coder.com',
          password: '987654',
        });
    
        authService.authUser$.subscribe({
          next: (authUser) => {
            expect(authUser).toBeTruthy();
            expect(localStorage.getItem('access_token')).toBeTruthy();
            expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
          },
        });
      });

})