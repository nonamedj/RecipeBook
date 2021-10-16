import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;	
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
       return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYc5iwwZU2mxDReDwc1DDZl0o-d0pfeYQ",
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handeError), tap(res => {
           this.handeAuth(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYc5iwwZU2mxDReDwc1DDZl0o-d0pfeYQ",
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handeError), tap(res => {
            this.handeAuth(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }

    private handeAuth(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

    private handeError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch(errorRes.error.error.message) {
           case 'EMAIL_EXISTS': errorMessage = "This email exists already!";
           break;
           case 'EMAIL_NOT_FOUND': errorMessage = "This email not registered yet!";
           break;
           case 'INVALID_PASSWORD': errorMessage = "Invalid password!";
           break;
        }
        return throwError(errorMessage);
    }
}