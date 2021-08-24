import { Injectable } from '@angular/core';
import { AngularFireAuth } from  '@angular/fire/auth';
import {Observable,of, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login(email:string, password: string) {
    return new Promise((resolve, rejects) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => resolve(result.user),
      err => rejects(err))
    });
  }

   // Sign up with email/password
   registerUser(email:string, password:string) {
    return new Promise((resolve, rejects) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => resolve(result.user),
      err => rejects(err))
    });
  }

  getAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  // Sign out 
  logOut() {
    this.afAuth.signOut();
  }
}
