import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthclientsService {

  constructor(private authent: AngularFireAuth) { 

  }

  login(email:string, password:string):any{
    return new Promise((resolve,reject)=>{
      this.authent.auth.signInWithEmailAndPassword(email, password).then((data) => resolve(data), (error) => reject(error));
    });
  }

  register(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.authent.auth.createUserWithEmailAndPassword(email, password).then((data) => resolve(data), (error) => reject(error));
    });
  }

  loginWithGoogle(email: string, password: string): any {
    return new Promise((resolve, reject) => {
      this.authent.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((data) => resolve(data), (error) => reject(error));
    });
  }

  getAuth(){
    return this.authent.authState.pipe(map(auth=> auth));
  }

  getLogout(){
    return this.authent.auth.signOut();
  }
}
