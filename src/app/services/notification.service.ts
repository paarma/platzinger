import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService) { }

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
