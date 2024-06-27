import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  // return authService.hasToken()? true : false;

  if (authService.hasToken()) {
    if (state.url === '/login') {
      router.navigateByUrl('/product');
      return false;
    }
  } else {
    if (state.url === '/product' || state.url === "/user") {
      router.navigateByUrl('/login');
      return false;
    }
  }

  return true;
};
