import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "src/config/app-config";
import { SignInReqI, UserInfoI } from "../interfaces/auth.interface";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private token: string = '';
    private refreshToken: string = '';

    constructor(
        private http: HttpClient,
        @Inject(API_URL) private apiUrl: string,
    ) {}

    getToken() {
        if ((localStorage.getItem('token')) && (localStorage.getItem('refreshToken'))) {
            return true;
        } else {
            return false;
        }
    }

    signIn(req?: SignInReqI): Observable<UserInfoI> {
        let body = null;
        if (req) {
            body = req;
        }

        return this.http.post<UserInfoI>(`${this.apiUrl}login`, body)
    }
}