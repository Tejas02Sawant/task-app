import { CanDeactivateFn, CanMatchFn, RedirectCommand, Route, Router, Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { routes as userRoutes } from './users/users.routes'
import { NotFoundComponent } from "./not-found/not-found.component";
import { Component, inject } from "@angular/core";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";

export const routes: Routes = [{
        path: '',
        component: NoTaskComponent
    },
    {
        path: 'tasks',
        component: TasksComponent
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        loadChildren: ()=> import ('./users/users.routes').then(u => u.routes),
        //children: userRoutes,
        resolve: {
            userName: resolveUserName
        },
        canMatch: []
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]


export const canURLMatch : CanMatchFn = (route, segmenst)=>{
    const router = inject(Router)
    const shouldGetAccess = Math.random();
    if(shouldGetAccess){
        return true;
    }

    return new RedirectCommand(router.parseUrl('/unauthorizesd'));
}