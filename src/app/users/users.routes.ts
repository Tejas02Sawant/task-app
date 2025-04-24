import { CanDeactivateFn, Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { checkDirty, NewTaskComponent } from "../tasks/new-task/new-task.component";

export const routes: Routes = [{
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix'
},
{
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
        userTasks: resolveUserTasks
    }
},
{
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [checkDirty]
}
]