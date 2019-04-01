import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  //Retorna un valor boolean para concedir el acceso a una determinara ruta
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    /**
     * En este caso se una un "pipe" para formatear la salida como tipo boolean
     * map: Se usa para mapear un resultado en este caso el "authenticationService.getStatus"
     */
      return this.authenticationService.getStatus().pipe(
      map(status => {
        if(status){
          return true;
        }else {
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }

}
