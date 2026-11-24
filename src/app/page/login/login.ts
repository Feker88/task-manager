import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Router} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ApiIdentification } from '../../services/api-identification';
import { api_config } from '../../api-config';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
//Pourquoi FromGroup est utilisé ici ?
//formGroup est utilisé pour créer un formulaire réactif dans Angular. Il permet de regrouper plusieurs contrôles de formulaire (comme des champs de saisie) en une seule entité, facilitant ainsi la gestion des valeurs et des validations du formulaire. Cela permet également de suivre l'état du formulaire (valide, invalide, modifié, etc.) et de réagir aux changements de manière plus efficace.
  public loginForm : FormGroup;
  public error = signal('');

  constructor(private apiIdentification: ApiIdentification, private router: Router) {

      this.loginForm = new FormGroup({
        email : new FormControl('',[Validators.required]),
        password : new FormControl('',[Validators.required]),
  });
}
onSubmit() {
  if(this.loginForm.valid) {

    //post return an observable, so we need to subscribe to it to actually send the request and handle the response.
//next and error are a call back functions that will be executed when the observable emits a value or an error, respectively.

this.apiIdentification.login(this.loginForm.value).subscribe({        
      next:(response : any)=>{
        console.log("success",response)
        localStorage.setItem('token', (response.accessToken));
         this.router.navigate([api_config.defaultEndPoint]);
      },
      error:(error)=>{
        console.error("Erreur lors de la soumission du formulaire",error);
        this.error.set('Email ou mot de pass erroné');
      }

      });
      
  
    } else {
    this.loginForm.markAllAsTouched();
  }
}
}
