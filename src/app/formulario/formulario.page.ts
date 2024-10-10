import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  //Declaração do objeto que armazenará o nome e o email
  dados = {
    nome: '',
    email: ''
  };

  //Construtor está recebendo duas dependencias: Storage para armazenamento local e AlertController para mostrar alertas
  constructor(private storage: Storage, private alertController: AlertController) { }

  ngOnInit() {
  }

  //Função assíncrona que salva os dados quando o formulário é enviado
  async salvarDados() {
    //Verifica se ambos os campos estão preenchidos
    if(this.dados.nome && this.dados.email){
      // tenta obter a lista de usuários já armazenadas, ou caso não tenha nada cria um array vazio.
      let usuarios = await this.storage.get('usuarios') || [];
      //Adiciona os dados no array
      usuarios.push(this.dados);
      //Armazena a lista atualizada no armazenamento local
      await this.storage.set('usuarios', usuarios);

      // Reseta o formulário limpando os campos
      this.dados = {
        nome: '',
        email: ''
      };

      // Cria um alerta de sucesso para informar que os dados foram salvos
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Dados salvos com sucesso!',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      // Se os campos não estiverem preenchidos, mostra outro alerta de erro
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
