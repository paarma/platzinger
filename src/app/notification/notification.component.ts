import { Component, OnInit, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class NotificationComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }

  success(msg: string){
    this.toastrService.success(msg, 'Exito');
  }

  error(msg: string){
    this.toastrService.error(msg,'Error');
  }

  info(msg: string){
    this.toastrService.info(msg, 'Información');
  }

  warnig(msg: string){
    this.toastrService.warning(msg, 'Advertencia');
  }

}
