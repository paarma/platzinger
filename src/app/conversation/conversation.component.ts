import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friend: User;
  user: User; //Usuario logueado
  conversation_id: string;
  textMessage: string;
  conversation: any[];
  shake: boolean = false; //Bandera para aplicar animación de movimiento

  //Se define una variable de tipo "ActivatedRoute" para capturar los parametros enviados por URL
  constructor(private activatedRoute: ActivatedRoute, 
              private userService: UserService,
              private conversationService: ConversationService,
              private authenticationService: AuthenticationService) { 
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    
    //Se obtiene el objeto de la lista buscandolo por id;
    /*this.friend = this.friends.find((record) => {
      return record.uid == this.friendId
    });*/

    this.authenticationService.getStatus().subscribe(
      (session) => {
        //Se obtiene el usuario logueado
        this.userService.getUserByUid(session.uid).valueChanges().subscribe(
          (user: User) =>{
            this.user = user;

            //Se obtiene el amigo de la conversación
            this.userService.getUserByUid(this.friendId).valueChanges().subscribe(
              (data: User) => {
                this.friend = data;

                /**
                 * Se obtienen los ids de las personas de la conversasion y se ordean con .shor() 
                 * para que siempre el orden de los ids no altere el id como tal de la conversacion
                 */
                const ids = [this.user.uid, this.friend.uid].sort();

                //Se concatenan los valores del array "ids" separandolos por un caracter específico
                this.conversation_id = ids.join('|');

                //Se llama el metodo que muestra el historico de la conversación
                this.getConversation();
              },
              (error) => {
                console.log(error);
              });
          });
      });
  }

  ngOnInit() {
  }

  sendMessage(){
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid, //Quien envía el mensaje
      receiver: this.friend.uid, //Quien recibe el mensaje
      type: 'text'
    }

    //Al enviar el mensaje se limpia la caja de texto del mensaje enviado
    this.conversationService.createConversation(message).then(
      () => {
        this.textMessage = '';
      }
    );
  }

  sendZumbido(){
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid, //Quien envía el mensaje
      receiver: this.friend.uid, //Quien recibe el mensaje
      type: 'zumbido'
    }

    //Al enviar el mensaje se limpia la caja de texto del mensaje enviado
    this.conversationService.createConversation(message).then(
      () => {});

    this.doZumbido();
  }

  doZumbido(){
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;

    /**
     * Se espera un segundo para cambiar la bandera de la animacion nuevamente a false
     * En este caso espera 1 segundo
     */
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  getConversation(){
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe(
      (data) => {
        this.conversation = data;

        this.conversation.forEach(
          (message) => {
            if(!message.seen){ //Si el mensaje no ha sido visto
              message.seen = true;
              this.conversationService.editConversation(message); //Se actualiza el mensaje

              if(message.type == 'text'){
                //Se ejecuta sonido de nuevo mensaje
                const audio = new Audio('assets/sound/new_message.m4a'); //Funcionalidad de html5
                audio.play();
              }else if(message.type == 'zumbido') {
                this.doZumbido();
              }

            }
          }
        );

        console.log(data);
      }, (error => {
        console.log(error);
      })
    );
  }

  getUserNickById(id){
    if(id === this.friend.uid){
      return this.friend.nick
    }else{
      return this.user.nick;
    }
  }

}
