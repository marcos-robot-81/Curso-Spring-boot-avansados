import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  private http = inject(HttpClient);

  usuario = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),

    senha: new FormControl(''),
    confimaSenha2: new FormControl(''),

    cep : new FormControl(''),
    numero: new FormControl(''),
    complemento: new FormControl(''),
    perfil: new FormControl(''),
    Especialidade: new FormControl(''),
  });

  mesagem = "";

  

  cadastrar() {


    if(this.validarSenha(this.usuario.value.senha!, this.usuario.value.confimaSenha2!)) {

      const { confimaSenha2, perfil, Especialidade, ...dadosParaEnviar } = this.usuario.value;
          console.log(dadosParaEnviar);

      this.http.post('/api/auth/cadastro', dadosParaEnviar).subscribe({
        next: (resposta) => {

          this.mesagem = "Cadastro realizado com sucesso!";
          console.log(resposta);
        },
        error: (erro) => {
          console.error(erro);
          this.mesagem = "Erro ao realizar cadastro.";
        }
      });

    }else{
      this.mesagem = "As senhas não conferem!";
    }

  }

  boscarEndereco(cep: string) {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');

    // Só busca se tiver 8 dígitos para evitar erro 400
    if (cepLimpo.length !== 8) return;

    this.http.get(`/ws/${cepLimpo}/json/`).subscribe((dados: any) => {
      // Aqui você pode preencher o formulário automaticamente com os dados do endereço
    });
  }
  private validarSenha(senha: string, confirmaSenha: string): boolean {
    return senha === confirmaSenha;
  }

}
