import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation: string = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;

  constructor(private authenticationService: AuthenticationService, 
    private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password).then(
      (data) => {
        console.log(data);
        this.router.navigate(['home']);
      }).catch((error) => {
        alert("login error");
        console.log(error);
      });
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password).then(
      (data) => {

        const user = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick,
          status: 'offline' //Por defecto al registrarse un nuevo usuario fijamos "offline" para mostrar el icono de status al ingrear al home
        };

        this.userService.createUser(user).then( (data2) => {
          alert("registro exitoso");
          console.log(data2);

          //Redifigimos a la pantalla de home
          this.router.navigate(['home']);

        }).catch((error) => {
          alert("registro errado");
          console.log(error);
        });


      }).catch((error2) => {
        alert("registro errado");
        console.log(error2);
      });
  }

}
