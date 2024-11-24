import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.module';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  user = {} as User;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  logar() {
    this.router.navigate(['login'])
  }

  async register(user: User) {
    if (this.formValidation()) {
      let loader = this.loadingCtrl.create({
        message: "Aguarde..."
      });
      (await loader).present();
      try {
        await this.afAuth
          .createUserWithEmailAndPassword(user.email, user.password)
          .then(
            data => {
              console.log(data);
              this.navCtrl.navigateRoot("home");
            })
        this.createUser(user);
      } catch (e: any) {
        this.showToast(e);
      }
      (await loader).dismiss();
    }
  }

  async createUser(user: User) {
    try {
      await this.firestore.collection("user").add(user);
    } catch (e: any) {
      this.showToast(e);

    }

  }

  formValidation() {
    if (!this.user.password) {
      this.showToast("Insira a senha");
      return false;
    }

    if (!this.user.email) {
      this.showToast("Insira o e-mail");
      return false;
    }
    if (!this.user.name) {
      this.showToast("Insira seu nome");
      return false;
    }
    // if (!this.user.phone) {
    //   this.showToast("Insira seu número");
    //   return false;
    // }
    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}
