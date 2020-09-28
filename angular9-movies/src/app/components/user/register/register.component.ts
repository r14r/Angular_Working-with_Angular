import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from '../../../services/user.service';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent {
  form: FormGroup;
  isNewForm: Observable<boolean>;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    super();
    this.registerNewUser();
  }

  private registerNewUser() {
    this.isNewForm = observableOf(true);
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      isActive: [true]
    });
  }

  isFieldInvalid(field: string) {
    return (this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched));
  }

  onSubmit() {
    this.userService.register(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.isNewForm = observableOf(false);
    });
  }

  signin() {
    this.router.navigate(['login']);
  }
}
