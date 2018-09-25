import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';

@Injectable()
export class MemberEditResolver implements Resolve<User> {


    constructor(private userService: UserService, private auth: AuthService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.auth.decodedToken.nameid).pipe(catchError(error => {
            this.alertify.error(error);
            this.router.navigate(['/members']);
            return of(null);
        }));
    }
}