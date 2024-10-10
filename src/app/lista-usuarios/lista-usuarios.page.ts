import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {

  //Declara array vazio que armazenará os usuários recuperados do storage
  usuarios: any[] = []; 

  constructor(private storage: Storage) { }

  //Método chamado quando o componente é inicializado
  ngOnInit() {
    //Executa o método para buscar os usuários no storage
    this.carregarUsuarios();
  }

  async carregarUsuarios() {
    // Pegando todos os usuários armazenados no Storage
    const usuariosArmazenados = await this.storage.get('usuarios');
    
    // Se houver dados, atribuí-los ao array de usuários
    if (usuariosArmazenados) {
      this.usuarios = usuariosArmazenados;
    }
  }

}
