import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {


    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(): Observable<User[]> {
        return this.userService.getUsers().pipe(catchError(error => {
            this.alertify.error(error);
            this.router.navigate(['/home']);
            return of(null);
        }));
    }
}