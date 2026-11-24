import { Injectable } from '@angular/core';
import { TaskType } from '../components/task/task';
import { HttpClient} from '@angular/common/http';
import { api_config } from '../api-config';

@Injectable({
    providedIn: 'root'
})
export class ApiTask {

    constructor( private http: HttpClient) {
    }

    private get(action: string)
    {
        return this.http.get<TaskType[]>(`${api_config.baseUrl}${action}`,api_config.headers);
    }

    private post(action: string, data:any)
    {
        return this.http.post(`${api_config.baseUrl}${action}`,data,api_config.headers);
    }

    private patch(action: string, data:any)
    {
        return this.http.patch(`${api_config.baseUrl}${action}`,data,api_config.headers);
    }
    private delete(action: string)
    {
        return this.http.delete(`${api_config.baseUrl}${action}`,api_config.headers);
    }
    
    
    public getTask(id:string|null)
    {
        return this.get('tasks/'+ id);
    }
    public getTasks()
    {    
        return this.get('tasks');        
    }
    public CreateTask(data:TaskType)
    {
        return this.post('tasks',data);
    }
  
    public updateTask(data:TaskType, id?:number)
    {
        return this.patch('tasks/'+ id,data);
    }
    public deleteTask(id?:number)
    {
        return this.delete('tasks/'+ id);
    }

}
