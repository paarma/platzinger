import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { RequestsService } from './services/requests.service';
import { User } from './interfaces/user';
import { DialogService } from 'ng2-bootstrap-modal';
import { RequestComponent } from './modals/request/request.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzinger';

  user: User; //Usuario logueado
  requests: any[] = [] //listado de solicitudes
  mailsShown: any[] = [] //listado de solicitudes que ya mostró la aplicación

  constructor(public router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private requestService: RequestsService,
    private dialogService: DialogService) {
    
      //Se obtiene el usuario logueado
      this.authenticationService.getStatus().subscribe(
        (status) => {
          this.userService.getUserByUid(status.uid).valueChanges().subscribe(
            (data: User) => {
              this.user = data;

              //Se obtienen la solicitudes por el email del usario logueado
              this.requestService.getRequestForEmail(this.user.email).valueChanges().subscribe(
                (request: any) => {
                  this.requests = request;

                  //Se filtran las solicitudes para no mostrar las ya aceptadas o rechazadas
                  this.requests = this.requests.filter( (r) => {
                    return r.status !== 'accepted' && r.status !== 'rejected';
                  });

                  //Se recorren las solicitudes que pasaron el filtro anterior. "las activas"
                  this.requests.forEach( (r) => {
                    if(this.mailsShown.indexOf(r.sender) === -1){
                      this.mailsShown.push(r.sender);

                      //Se hace el llamado a la ventana modal
                      this.dialogService.addDialog(RequestComponent, {scope: this, currentRequest: r});
                    }
                  });

                }, (error) => {
                  console.log(error);
                }
              );

            }
          );
        }
      );

  }
}
