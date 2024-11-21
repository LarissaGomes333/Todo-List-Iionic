import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from '../models/user.module';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  user = {} as User;
  ngOnInit() {}

  cadastrar(){
    this.router.navigate(['cadastro'])
  }
  async login(user: User) {
    if (this.formValidation()) {
      let loader = this.loadingCtrl.create({
        message: "Aguarde..."
      });
      (await loader).present();

      try {
        await this.afAuth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(data =>{
          console.log(data)

          this.navCtrl.navigateRoot("home");
        })
      } catch (e: any) {
        this.showToast(e);
      }

      (await loader).dismiss();
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
    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }


}
