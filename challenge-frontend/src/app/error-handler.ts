import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }
    // handle server's errors
    handleError(error) {
        if (error.status === 400 || error.status === 404) {
            this.router.navigate(['404']);
        }
        if (error.status === 500 || error.status === 503 || error.status === 0) {
            this.router.navigate(['500']);
        }
    }

    public get router(): Router { // creates router property
        return this.injector.get(Router);
    }

}