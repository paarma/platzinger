import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { UserService } from '../../services/user.service';
import { RequestsService } from '../../services/requests.service';

//Se define una interfaz llamada PrompModel
export interface PrompModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends DialogComponent<PrompModel, any> implements PrompModel {

  scope: any; //Tiene los datos del usuario logueado y demas info
  currentRequest: any; //Tiene la informacion del usuario que envía la solicitud de amistad
  shouldAdd: string = 'yes';

  constructor(public dialogService: DialogService, private userService: UserService,
    private requestsService: RequestsService) {
    //"transforma este componente en su forma de modal"
    super(dialogService);
  }

  accept(){
    if(this.shouldAdd == 'yes'){
      this.requestsService.setRequestStatus(this.currentRequest, 'accepted').then(
        (data) => {
          console.log(data);
          this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then(
            () => {
              alert('Solicitud aceptada exitosamente');
            }
          ).catch( (error) => {
            console.log(error);
          });
        }
      ).catch( 
        (error2) => {
          console.log(error2);
      });
    } else if(this.shouldAdd == 'no'){
      this.requestsService.setRequestStatus(this.currentRequest, 'rejected').then(
        (data) => {
          console.log(data);
        }
      ).catch( 
        (error) => {
          console.log(error);
      });
    } else if(this.shouldAdd == 'later'){
      this.requestsService.setRequestStatus(this.currentRequest, 'decide_later').then(
        (data) => {
          console.log(data);
        }
      ).catch( 
        (error) => {
          console.log(error);
      });
    }
  }

}
