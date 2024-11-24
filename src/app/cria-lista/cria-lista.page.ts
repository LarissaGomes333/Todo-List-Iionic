import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Post } from '../models/post.model';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Component({
  selector: 'app-cria-lista',
  templateUrl: './cria-lista.page.html',
  styleUrls: ['./cria-lista.page.scss'],
})
export class CriaListaPage implements OnInit {
  post = {} as Post;
  constructor(
    private router: Router,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() { }


  voltar() {
    this.router.navigate(['home'])
  }

  cancelar() {
    this.router.navigate(['home'])
  }
  
  async createPost(post: Post) {
    const user = await this.afAuth.currentUser;
  
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Aguarde..."
      });
      await loader.present();
  
      try {
        if (user) {
          // Cria o post com o id do usuário
          await this.firestore.collection("posts").add({
            title: post.title,
            date: post.date,
            details: post.details,
            status: false,
            idUser: user.uid // Associando o post ao usuário logado
          });
          this.showToast("Post criado com sucesso!");
        } else {
          this.showToast("Usuário não está logado.");
        }
      } catch (e: any) {
        this.showToast("Erro ao criar o post: " + e);
      }
  
      await loader.dismiss();
      this.navCtrl.navigateRoot("home");
    }
  }
  
  


  formValidation() {
    if (!this.post.title) {
      this.showToast("Insira o Título");
      return false;
    }

    if (!this.post.date) {
      this.showToast("Insira a data");
      return false;
    }

    if (!this.post.details) {
      this.showToast("Insira a descrição");
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
