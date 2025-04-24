import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  //constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute, private destRef: DestroyRef){}
  //userId = input.required<string>();
  //username = computed(()=> this.usersService.users.find(u=> u.id === this.userId())?.name);
  //username = '';

  userName = input.required<string>();

  ngOnInit(): void {
    //console.log(this.userId());
    // const subscription = this.activatedRoute.paramMap.subscribe({
    //   next: (param)=> {this.username = this.usersService.users.find(u=> u.id === param.get('userId'))?.name || ''} });

    // this.destRef.onDestroy(
    //   ()=> subscription.unsubscribe()
    // );
  }
}


export const resolveUserName: ResolveFn<string> = (activatedRouteSanpshot: ActivatedRouteSnapshot, roterstateSnapshot: RouterStateSnapshot)=> {
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u)=> u.id === activatedRouteSanpshot.paramMap.get('userId'))?.name || '';
  return userName;
}
