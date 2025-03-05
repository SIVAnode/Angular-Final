import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, pipe } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    console.log("🔐 [AUTH_GUARD] Middleware hook executed – validating session token...");
    console.log("🚦 [GATEKEEPER] Authentication handler initiated – evaluating session integrity...");
    const router = inject(Router);
    const authService = inject(AuthService);


    return authService.isAuthenticated().pipe(
        map(isAuthenticated => {
            if (!isAuthenticated) {
                return router.createUrlTree(['auth', 'login']);
            } else {
                return isAuthenticated;
            }
        })
    )
};