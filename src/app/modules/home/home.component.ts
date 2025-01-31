import { ParseSourceFile } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  onSubmitLoginForm(): void {

  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              alert('Usuário teste cadastrado com sucesso!');
            }
          },
          error: (err) => console.log(err),
        });
    }
  }
}
