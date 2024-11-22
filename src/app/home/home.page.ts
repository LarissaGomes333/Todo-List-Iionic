import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.model';
import { User } from '../models/user.module'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  post = {} as Post;
  posts: any;
  user: any;
  id: any;
  check: boolean = true;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore
  ) { }

  updateFeito(id: string) {
    this.firestore.doc("posts/" + id).update({
      status: this.check
    })
    this.check = !this.check
  }

  criarLista() {
    this.router.navigate(['cria-lista'])
  }

  ionViewWillEnter() {
    this.getPosts();
    this.getUser();
  }

  async getPosts() {
    let loader = await this.loadingCtrl.create({
      message: "Aguarde..."
    });
    loader.present();
    try {
      this.firestore.collection("posts")
        .snapshotChanges()
        .subscribe((data) => {
          this.posts = data.map((e) => {
            //Como não foi identificado a tipagem dos atributos, associei
            //o dados ao Model Post que identificou o tipo deles
            const dados = e.payload.doc.data() as Post;
            return {
              id: e.payload.doc.id,
              title: dados.title,
              status: dados.status
            };
          });
          loader.dismiss();
        });
    }
    catch (e: any) {
      this.showToast(e);
    }
  }

  async getUser() {
    let loader = await this.loadingCtrl.create({
      message: "Aguarde..."
    });
    loader.present();
    try {
      this.firestore.collection("user")
        .snapshotChanges()
        .subscribe((data) => {
          this.user = data.map((e) => {
            const dadosUser = e.payload.doc.data() as User;
            return {
              id: e.payload.doc.id,
              name: dadosUser.name,
            };
          });
          loader.dismiss();
        });
    }
    catch (e: any) {
      this.showToast(e);
    }
  }

  async deletePost(id: string) {
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    await this.firestore.doc("posts/" + id).delete();
    (await loader).dismiss();
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }


}
