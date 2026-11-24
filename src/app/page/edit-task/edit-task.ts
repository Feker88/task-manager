import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiTask } from '../../services/api-task';


@Component({
  selector: 'app-edit-task',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css',
})
export class EditTask {          

  public taskForm: FormGroup;
  public id!: string |null;
  constructor(private route: ActivatedRoute,private router: Router,private apitask: ApiTask) {

    this.id = this.route.snapshot.paramMap.get('id') ;
    console.log("id",this.id)

    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });

    this.apitask.getTask(this.id).subscribe({
      next: response => {
        //patch vs setValue, patchValue allows partial updates, setValue requires all fields to be present.
        //this.taskForm.patchValue(response as {description: string; }); 
        this.taskForm.setValue(response);
      
      },
      error: (error) => {
        console.error('Error fetching task:', error);
      }
    }); 
  }
  public EditTask() {

    if (this.taskForm.valid) {
        const taskData = this.taskForm.value;
        
       this.apitask.updateTask(taskData).subscribe
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
