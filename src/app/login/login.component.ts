import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // constructor(private authService: AuthService) { }
  formGroup: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.formGroup.valid) {
      const loginData = this.formGroup.value;
      this.onLogin(loginData);
    }
  }

  onLogin(loginData: any) {
    this.authService.login(loginData)
      .subscribe(
        item => {
          console.log(item.token)
          this.errorMessage = '';
          this.router.navigate(['/product']);
        },
        error => {
          console.error(error.error);
          this.errorMessage = error.error;
        }
      );
  }
}
