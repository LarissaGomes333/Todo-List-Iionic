import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cria-lista',
  templateUrl: './cria-lista.page.html',
  styleUrls: ['./cria-lista.page.scss'],
})
export class CriaListaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  voltar(){
    this.router.navigate(['home'])
  }

}
