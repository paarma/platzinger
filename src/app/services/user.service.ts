import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) {

  }

  /**
   * users: Hace referencia a un nodo de la base de datos de firebase donde estan los usuarios
   * Si el nodo users no existe, firebase lo crea automáticamente
   */
  getUsers() {
    return this.angularFireDatabase.list('/users');
  }

  getUserByUid(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }

  /**
   * Este metodo inserta un nuevo usuario en la base de datos.
   * (Referencia el nodo de user/id en la base de datos y a ese nodo le fija el nuevo usuario. 
   * COMO NO EXISTE ENTONCES CREA EL NUEVO USUARIO EN LA BD) 
   * @param user 
   */
  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

    /**
   * Este metodo edita un usuario en la base de datos.
   * (Referencia el nodo de user/id en la base de datos y como ya existe lo actualiza en bd.
   * (El método a nivel de sintaxis es el mismo que el metodo de crear.)
   * @param user 
   */
  editUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  setAvatar(avatar, uid){
    return this.angularFireDatabase.object('/users/' + uid + '/avatar').set(avatar);
  }

  /**
   * Se crean los amigos en la bd en los dos sentidos tanto para el usuario como para el amigo
   * @param userId 
   * @param friendId 
   */
  addFriend(userId, friendId) {
    this.angularFireDatabase.object('/users/' + userId + '/friends/' + friendId).set(friendId);
    return this.angularFireDatabase.object('/users/' + friendId + '/friends/' + userId).set(userId);
  }

}
