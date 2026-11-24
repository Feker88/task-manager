import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_config } from '../api-config';

@Injectable({
    providedIn: 'root'
})
export class ApiIdentification {

    

    constructor(private http: HttpClient) { 

    }
    public login(data: {email: string, password: string})
    {
        return this.post('login', data);
    }

    public register(data: {email: string, password: string})
    {
        return this.post('register', data);
    }

    private post(action: string , data: any)
    {
        return this.http.post(`${api_config.baseUrl}${action}`, data);
    }

}



