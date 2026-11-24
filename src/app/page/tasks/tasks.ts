import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task, TaskType } from '../../components/task/task';
import { ApiTask } from '../../services/api-task';

//pouquoi interface et non un class ?
//Une interface en TypeScript est utilisée pour définir la structure d'un objet, c'est-à-dire les propriétés et leurs types, sans fournir d'implémentation concrète. 
// Elle sert de contrat que les objets doivent respecter. En revanche, une classe peut contenir des implémentations concrètes, des méthodes et des constructeurs. 
// Dans ce cas, l'interface Task est utilisée pour définir la forme des objets représentant les tâches,
//  tandis qu'une classe ne serait pas nécessaire car nous n'avons pas besoin de méthodes ou de logique associée à ces objets. 


@Component({
  selector: 'app-tasks',
  imports: [RouterLink, Task],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {

  public tasks = signal(<TaskType[]>[]);
  constructor(private apitask:ApiTask) {

    this.RefreshTask();
  }

  public RefreshTask()
  {
    
    this.apitask.getTasks().subscribe({
      next:(response) =>{

        this.tasks.set(response);
        console.log("success",response)
      },
      error:(error) => {}
    
    })
  }

}
