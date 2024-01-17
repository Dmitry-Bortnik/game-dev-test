import { Injectable } from '@angular/core';
import { UserInfoI } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData: UserInfoI[] = [];

  setUserData(data: any): void {
    this.userData = data;
    localStorage.setItem('userData', JSON.stringify(data));
  }

  getUserData(): any {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = storedData ? JSON.parse(storedData) : null;
      return this.userData;
    }
  }

  clearUserData(): void {
    this.userData = [];
    localStorage.removeItem('userData')
  }

  constructor() { }
}
