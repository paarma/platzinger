import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private firebaseStorage: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserByUid(status.uid).valueChanges().subscribe(
        (data: User) => {
          this.user = data;
          console.log(this.user);
        }, (error) => {
          console.log(error);
        }
      );
    }, (error2) => {
      console.log(error2);
    });
  }

  ngOnInit() {
  }

  saveSettings() {

    //Se verifica si hay una imagen recortada
    if (this.croppedImage) {
      const currentPictureId = Date.now(); //Nombre unico para la imagen

      /**
       * Se referencia la imagen en la carpeta "pictures" y en ella se le asigna la imágen
       * convertida en binaria
       */
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + 
        '.jpg').putString(this.croppedImage, 'data_url');

      //Se obtiene la URL hacia el archivo binario subido en el paso anterior
      pictures.then((result) => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + 
        '.jpg').getDownloadURL();

      //Le agregamos la imagen obtenida en el paso anterior al usuario
        this.picture.subscribe((p) => {
          this.userService.setAvatar(p, this.user.uid).then(
            () => {
              alert('Avatar subido correctamente');
            }
          ).catch((error) => {
            alert('Error subiendo la imagen');
            console.log(error);
          });
        });

      }).catch((error2) => {
        console.log(error2);
      });

    } else {
      this.userService.editUser(this.user).then(
        () => {
          alert("Guardado exitoso");
        }
      ).catch((error) => {
        alert("error al guardar");
        console.log(error);
      });
    }

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

}
