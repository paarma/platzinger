import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  //Metodo de login
  loginWithEmail(email: string, password: string){

    //Se invoca este metodo que ya tiene la librería de Firebase
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  //Metodo para registrar usuario con email y password
  registerWithEmail(email: string, password: string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  //Metodo que retorna el estado de la session del usuario
  getStatus(){
    return this.angularFireAuth.authState;
  }

  //Metodo para cerrar session
  logOut(){
    return this.angularFireAuth.auth.signOut();
  }

}
