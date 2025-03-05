import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { Observable } from 'rxjs';
import { selectUsers } from './store/user.selectors';
import { Store } from '@ngrx/store';
import { User } from './models';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users$:Observable<User[]>
  constructor(private usersService: UsersService, private store:Store) {
        this.users$ = this.store.select(selectUsers)
  }

  ngOnDestroy(): void {
    this.usersService.resetUserState();
  }

  ngOnInit(): void {
    this.usersService.loadUsers()
  }

  deleteUserById(id: string) {
    this.usersService.deleteUserById(id);
  }
}