import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule , FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiTask } from '../../services/api-task';


@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {

  public taskForm: FormGroup;

  constructor(private apitask: ApiTask, private router : Router)
   {
   
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  public CreateTask() {
       
    if (this.taskForm.valid) {
        const taskData = this.taskForm.value;
        taskData.status = 'todo';

       this.apitask.CreateTask(taskData).subscribe
       ({
        next: () =>{
            this.router.navigate(['tasks']);
        }
       })
       
      console.log(this.taskForm.value);

    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
