import {Injectable} from '@angular/core';
import {kii} from './config';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()

export class AuthManager implements CanActivate {
    constructor(private router: Router) {
        
    }
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let isLoggedIn : boolean = kii.KiiUser.getCurrentUser() != null
        
        if(isLoggedIn)
        return true;
        
        console.log('You must be logged in');
        this.router.navigate(['/login']);
        return false;
    }
}