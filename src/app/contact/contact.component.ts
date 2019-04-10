import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //Se usa para recibir parametros de un componente externo.
  @Input() contact: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
