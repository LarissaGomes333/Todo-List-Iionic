import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.model';
import { User } from '../models/user.module'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
// import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  post = {} as Post;
  posts: any;
  user: firebase.User | null = null;
  userData: User | null = null;
  check: boolean = true;
  

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    
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
    // this.getUser();
  }

  async getPosts() {
    let loader = await this.loadingCtrl.create({
      message: "Aguarde..."
    });
    loader.present();
  
    try {
      const user = await this.afAuth.currentUser; // Obtém o usuário logado
      
      if (user) {
        // Agora podemos acessar user.uid corretamente
        this.firestore.collection("posts", ref => ref.where('idUser', '==', user.uid))
          .snapshotChanges()
          .subscribe((data) => {
            this.posts = data.map((e) => {
              const dados = e.payload.doc.data() as Post;
              return {
                id: e.payload.doc.id,
                title: dados.title,
                status: dados.status
              };
            });
            loader.dismiss();
          });
      } else {
        loader.dismiss();
      }
    } catch (e: any) {
      this.showToast("Erro ao buscar posts: " + e);
      loader.dismiss();
    }
  }
  
  

// Função para obter o usuário logado
// async getUser() {
//   const firebaseUser = await this.afAuth.currentUser;
//   if (firebaseUser) {
//     console.log("UID do usuário logado:", firebaseUser.uid); // Verifique o UID
    
//     // Acessando o documento do usuário na coleção 'users' (ou 'user' se for o nome correto da sua coleção)
//     this.firestore.collection('users').doc(firebaseUser.uid).get().subscribe(doc => {
//       if (doc.exists) {
//         const userData = doc.data() as User;
//         this.userData = userData;
//         console.log("Dados do usuário carregados:", this.userData); // Verifique os dados
        
//         // Se você tiver um campo 'name' no Firestore, você pode acessar assim:
//         console.log("Nome do usuário:", userData.name); // Exibe o nome do usuário
//       } else {
//         console.log("Documento não encontrado."); // Documento não existe no Firestore
//         this.showToast("Dados do usuário não encontrados.");
//       }
//     }, error => {
//       console.log("Erro ao buscar dados do usuário:", error); // Verifique o erro no console
//       this.showToast("Erro ao buscar dados do usuário.");
//     });
//   } else {
//     this.showToast("Usuário não está logado.");
//   }
// }






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
