import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { State } from '../../../features/user/state/user.reducer';
import { getCurrentUser } from '../../../features/user/state/user.reducer';
import * as UserActions from '../../../features/user/state/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private store = inject(Store<State>);
  user$ = this.store.select(getCurrentUser);

  logout() {
    this.store.dispatch(UserActions.logoutUser());
  }
}
