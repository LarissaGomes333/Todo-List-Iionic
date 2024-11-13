import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cria-lista',
  templateUrl: './cria-lista.page.html',
  styleUrls: ['./cria-lista.page.scss'],
})
export class CriaListaPage implements OnInit {

  constructor(private router: Router, public navCtrl: NavController) { }

  ngOnInit() {}


  voltar(){
    this.router.navigate(['home'])
  }

  cancelar(){
    this.router.navigate(['home'])
  }

}
