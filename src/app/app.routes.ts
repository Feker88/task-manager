import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Login } from './page/login/login';
import { Register } from './page/register/register';
import { Tasks } from './page/tasks/tasks';
import { EditTask } from './page/edit-task/edit-task';
import { CreateTask } from './page/create-task/create-task';

export const routes: Routes = [
    {path: '',component: Home},
    {path: 'login',component: Login},
    {path: 'register',component: Register},
    {path: 'tasks',component: Tasks},
    {path: 'task/new',component: CreateTask},
    {path: 'task/:id',component: EditTask},
];
