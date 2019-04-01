import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  /**
   * Metodo para crear una solicitud de amistad de la app
   * @param request 
   */
  createRequest(request) {
    /**
     * Se reemplazan los "." por las "," en el campo emal. 
     * Esto para que firebase no ponga problema ya que no tolera "." 
     */
    const cleanEmal = request.receiver_email.replace(".", ",");
    return this.angularFireDatabase.object('requests/' + cleanEmal + '/' + request.sender).set(request);
  }

  /**
   * Metodo para fijar el estado de una solicitud de amistad
   * (aceptar solictud, rechazar, pendiente)
   */

  setRequestStatus(request, status) {
    const cleanEmal = request.receiver_email.replace(".", ",");
    return this.angularFireDatabase.object('requests/' + cleanEmal + '/' + 
      request.sender + '/status').set(status);
  }

  /**
   * Metodo para verificar si tiene pendientes solicitudes de amistad
   */
  getRequestForEmail(email){
    const cleanEmal = email.replace(".", ",");
    return this.angularFireDatabase.list('requests/' + cleanEmal);
  }
}
