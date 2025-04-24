import { Component, computed, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  order = input<'asc' | 'desc'>();

  // constructor(private taskService: TasksService){}

  // userTasks = computed(()=> this.taskService.allTasks().filter(x=> x.userId === this.userId())
  //                     .sort((a, b)=> {
  //                       if(this.order() === 'desc')
  //                         return a.id > b.id ? -1 : 1
  //                       else{
  //                         return a.id > b.id ? 1 : -1
  //                       }
  //                     }));
  userTasks = input.required<Task[]>();
  ngOnInit(): void {
    
  }
}

export const resolveUserTasks: ResolveFn<Task[]> = (aRS: ActivatedRouteSnapshot, rSS: RouterStateSnapshot)=> {
  const taskService = inject(TasksService);
  const order = aRS.queryParams['order'];
  const userTasks = taskService.allTasks().filter(x=> x.userId === aRS.paramMap.get('userId'));

  
    if(order && order === 'asc')
       userTasks.sort((a, b)=> a.id > b.id ? 1 : -1)
    else
      userTasks.sort((a, b)=> a.id > b.id ? -1 : 1)

  return userTasks.length > 0 ? userTasks : [];
}
