import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Router} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ApiIdentification } from '../../services/api-identification';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  
//Pourquoi FromGroup est utilisé ici ?
//formGroup est utilisé pour créer un formulaire réactif dans Angular. Il permet de regrouper plusieurs contrôles de formulaire (comme des champs de saisie) en une seule entité, facilitant ainsi la gestion des valeurs et des validations du formulaire. Cela permet également de suivre l'état du formulaire (valide, invalide, modifié, etc.) et de réagir aux changements de manière plus efficace.
  public registerForm : FormGroup;
  public error = signal('');

  constructor(  private apiIdentification: ApiIdentification, private router: Router) {

      this.registerForm = new FormGroup({
        email : new FormControl('',[Validators.required, Validators.email]),
        password : new FormControl('',[Validators.required, Validators. minLength(6)]),
  });
}
onSubmit() {
  if(this.registerForm.valid) {
//post return an observable, so we need to subscribe to it to actually send the request and handle the response.
//next and error are a call back functions that will be executed when the observable emits a value or an error, respectively.
      this.apiIdentification.register(this.registerForm.value).subscribe({
      next:(response)=>{
        console.log("success",response)
        this.router.navigate(['/login']);
      },
      error:(error)=>{
        console.error("Erreur lors de la soumission du formulaire",error);
        this.error.set('Erreur lors de l\'inscription de l\'utilisateur');
      }

      });
      
  
    } else {
    this.registerForm.markAllAsTouched();
  }
}
}
