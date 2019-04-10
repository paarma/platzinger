import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User[] = [];
  query: string = '';
  friendEmail: string = '';
  user: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private router: Router, private modalService: NgbModal,
    private requestsService: RequestsService) {

    //valueChanges: Indica que cada vez que cambie el valor de getUser(),. se va ha ejecutar el contenido de valueChanges
    //data: User[]: Decimos que la data que retorna el servicio va ha ser un arreglo del tipo User.
    /*userService.getUsers().valueChanges().subscribe(
      (data: User[]) => {
        this.friends = data;
      }, (error) => {
        console.log(error);
      });*/

    this.authenticationService.getStatus().subscribe(
      (status) => {
        this.userService.getUserByUid(status.uid).valueChanges().subscribe(
          (user: User) => {
            this.user = user;
            console.log(this.user);

            //Se verifica si el usuario logueado tiene amigos
            if(this.user.friends){
              //Se "ordenan" como tipo Object los amigos
              this.user.friends = Object.values(this.user.friends);
              console.log(this.user.friends);

              //Se obienen los amigos
              this.user.friends.forEach(element => {
                this.userService.getUserByUid(element).valueChanges().subscribe(
                  (friend: User) => {
                    this.friends.push(friend);
                  }
                );
              });

            }

          }, (error) => {
            console.log(error);
          }
        )
      }, (error2) => {
        console.log(error2);
      }
    );


  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logOut().then(() => {
      alert('Sesioon Cerrada');
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //Metodo par crear una solicitud de amistad
  sendRequest(){
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    };

    this.requestsService.createRequest(request).then(
      ()  => {
        alert('Solicitud enviada');
      }
    ).catch((error) => {
      alert('Error enviando solicitud');
      console.log(error);
    });
  }

}
