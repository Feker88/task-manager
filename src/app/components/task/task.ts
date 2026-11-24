import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiTask } from '../../services/api-task';

export interface TaskType {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
}

@Component({
  imports: [RouterLink],
  selector: 'app-task',
  styleUrl: './task.css',
  templateUrl: './task.html',
})


export class Task {
  //Pourquoi @Input est utilisé ici ?
  // @Input est utilisé pour permettre à un composant enfant (ici, le composant Task) de recevoir des données d'un composant parent (ici, le composant Tasks). 
  // Cela permet de passer des informations spécifiques à chaque tâche (comme l'id, le titre, la description et le statut) depuis le composant parent vers le composant enfant, 
  // facilitant ainsi la réutilisation et la modularité du code.

  //pourquoi le ! apres task ?
  // Le point d'exclamation après task est un opérateur de non-null assertion en TypeScript. Il indique au compilateur que la propriété task sera initialisée avant d'être utilisée, 
  // même si elle n'est pas initialisée dans le constructeur ou à la déclaration. Cela permet d'éviter les erreurs de compilation liées à l'utilisation de propriétés potentiellement nulles ou indéfinies.
  
  @Input() task!: TaskType;

  // coud we use the same output for all Crud  task ? 
  @Output() updatedTask = new EventEmitter<boolean>();
  

  constructor(private apitask: ApiTask) {
        
  }


  public deleteTask() {
    this.apitask.deleteTask(this.task.id)
      .subscribe({
      next: () => {
        this.updatedTask.emit(true);
        console.log("Tâche supprimée avec succès");
      }      
    })  

  }

  FinishTask() {
    this.apitask.updateTask({ status: 'done' }, this.task.id).subscribe({  
      next: () => {
        this.updatedTask.emit(true); 
        console.log("Tâche terminée avec succès");
      }
  })
    }
        
}
