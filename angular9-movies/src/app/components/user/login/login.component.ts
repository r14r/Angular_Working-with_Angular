import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';

import { AuthenticationService } from '../../../services/authentication.service';
import { BaseComponent } from '../../base/base.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {
  form: FormGroup;

  constructor(private authService: AuthenticationService, private toastService: ToastService,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  isFieldInvalid(field: string) {
    return (this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched));
  }

  onSubmit() {
    this.authService.login(this.form.value.email, this.form.value.password)
      .pipe(first()).pipe(takeUntil(this.unsubscribe)).subscribe(loginResult => {
        if (loginResult && loginResult.message) {
          this.toastService.openSnackBar(loginResult.message, '', 'error-snackbar');
          return;
        }
        this.router.navigate(['recent-movies']);
      },
        err => {
          this.toastService.openSnackBar('Invalid Credentials!', '', 'error-snackbar');
        });
  }

  signup() {
    this.router.navigate(['register']);
  }
}
