import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../state/user.reducer';
import * as UserActions from '../state/user.actions';
import { LoginModel } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private store = inject(Store<State>);
  loginForm: FormGroup;
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submitForm() {
    if(this.loginForm.invalid)
      return;
    const login = this.loginForm.value as LoginModel;
    this.store.dispatch(UserActions.loginUser({login}));
  }
}
