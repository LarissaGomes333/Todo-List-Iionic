import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edita-lista',
  templateUrl: './edita-lista.page.html',
  styleUrls: ['./edita-lista.page.scss'],
})
export class EditaListaPage implements OnInit {
  post = {} as Post;
  id: any;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController) { this.id = this.actRoute.snapshot.paramMap.get("id"); }

  ngOnInit() {
    this.getPostById(this.id);
  }

  async getPostById(id: string) {
    let loader = this.loadingCtrl.create({
      message: "Aguarde..."
    });
    (await loader).present();

    this.firestore.doc("posts/" + id)
      .valueChanges()
      .subscribe(data => {
        const dados = data as Post;
        this.post.title = dados.title;
        this.post.date = dados.date;
        this.post.details = dados.details;

      });
    (await loader).dismiss();

  }

  async updatePost(post: Post) {
    if (this.formValidation()) {
      let loader = this.loadingCtrl.create({
        message: "Aguarde..."
      });
      (await loader).present();

      try {
        await this.firestore.doc("posts/" + this.id).update(post);
      } catch (e: any) {
        this.showToast(e);
      }

      (await loader).dismiss();

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

  voltar() {
    this.router.navigate(['home'])
  }

  cancelar() {
    this.router.navigate(['home'])
  }
}
