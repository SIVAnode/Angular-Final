import { Injectable } from '@angular/core';
import { LoginPayload } from '../../modules/auth/models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const FAKE_USERS_DB: User[] = [
  {
    id: 'admin123',
    email: 'admin@coder.com',
    password: '987654',
    name: 'Administrador',
    accessToken: 'djMDFJNdfmvcJKDFdsmd23GFuedsvFGD2d32',
    role: 'ADMIN',
  },
  {
    id: 'user456',
    email: 'user@coder.com',
    password: '456789',
    name: 'Empleado',
    accessToken: 'djMDFJNd3gngh61DFd56hhgfddd23GFue232',
    role: 'EMPLOYEE',
  },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  authUser$ = this._authUser$.asObservable();

  constructor(private router: Router, private store: Store, private httpClient: HttpClient) {}

  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(map((x) => x?.role === 'ADMIN'));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this._authUser$.next(null);
    this.store.dispatch(AuthActions.unsetAuthUser());
    this.router.navigate(['auth', 'login']);
  }

  login(payload: LoginPayload): void {
    if (environment.useFakeApi) {
      const loginResult = FAKE_USERS_DB.find(
        (user) => user.email === payload.email && user.password === payload.password
      );

      if (!loginResult) {
        alert('Correo o contraseña incorrectos.');
        return;
      }

      localStorage.setItem('access_token', loginResult.accessToken);
      this._authUser$.next(loginResult);
      this.store.dispatch(AuthActions.setAuthUser({ user: loginResult }));
      this.router.navigate(['dashboard', 'home']);
    } else {

      this.httpClient.get<User[]>(`${environment.baseApiUrl}/users?email=${payload.email}&password=${payload.password}`)
        .subscribe({
          next: (usersResult) => {
            if (!usersResult[0]) {
              alert('Correo o contraseña invalidos');
              return;
            }

            localStorage.setItem('access_token', usersResult[0].accessToken);
            this._authUser$.next(usersResult[0]);
            this.store.dispatch(AuthActions.setAuthUser({ user: usersResult[0] }));
            this.router.navigate(['dashboard', 'home']);
          },
          error: (err) => {
            if (err instanceof HttpErrorResponse && err.status === 0) {
              alert('El servidor está caído en estos momentos.');
            }
          },
        });
    }
  }

  isAuthenticated(): Observable<boolean> {
    if (environment.useFakeApi) {
      
      const storedUser = FAKE_USERS_DB.find((x) => x.accessToken === localStorage.getItem('access_token'));
      this._authUser$.next(storedUser || null);
      return this.authUser$.pipe(map((x) => !!x));
    } else {
      
      return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users?accessToken=${localStorage.getItem('access_token')}`)
        .pipe(
          map((res) => {
            const userResult = res[0];
            if (userResult) {
              this._authUser$.next(userResult);
              this.store.dispatch(AuthActions.setAuthUser({ user: userResult }));
            }
            return !!userResult;
          })
        );
    }
  }
}
