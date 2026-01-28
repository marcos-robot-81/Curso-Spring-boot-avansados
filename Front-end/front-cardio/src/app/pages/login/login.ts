import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });

  mensagem = '';

  logar() {
    if (this.loginForm.invalid) {
      this.mensagem = 'Por favor, preencha os campos corretamente.';
      return;
    }

    // Assumindo que o endpoint de login seja /api/auth/login
    this.http.post('/api/auth/login', this.loginForm.value).subscribe({
      next: (resposta: any) => {
        this.mensagem = 'Login realizado com sucesso!';
        console.log('Token recebido:', resposta);
        
        // Redireciona para a home após 1 segundo
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error: (erro) => {
        console.error(erro);
        this.mensagem = 'Erro: E-mail ou senha inválidos.';
      }
    });
  }
}