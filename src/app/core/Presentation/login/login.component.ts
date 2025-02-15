import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CoreFacade } from '../../core.facade';
import { SharedFacade } from '../../../shared/shared.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    UserName: ['', [Validators.required]],
    Password: ['', Validators.required]
  });

  userNameErrorMessage = '';
  passwordErrorMessage = '';

  visibility_off = true;

  private subscriptions: Subscription[] = [];

  private validationMessages: { [char: string]: string } = {
    required: 'الرجاء ادخال  قيمة',
    email: 'البريد الالكتروني غير صحيح'
  };

  constructor(
    private fb: FormBuilder,
    private coreFacade: CoreFacade
    // public sharedFacade: SharedFacade,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    // this.SharedFacade.messages$.subscribe(res =>{

    //   console.log('بيانات تجربة');
    //   console.log(res);
    // });
    const emailControl = this.loginForm.get('UserName');
    const passwordControl = this.loginForm.get('Password');

    this.subscriptions.push(emailControl?.valueChanges.subscribe((value) => this.setMessage(emailControl)));

    this.subscriptions.push(
      passwordControl?.valueChanges.subscribe((value) => {
        this.passwordErrorMessage = '';
        if ((passwordControl.touched || passwordControl.dirty) && passwordControl.errors) {
          this.passwordErrorMessage = Object.keys(passwordControl.errors)
            .map((key) => this.validationMessages[key])
            .join(' ');
        }
      })
    );
  }

  // forgotPass() {
  //   this.router.navigate([Pages.ForgotPassword]);
  // }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.coreFacade.login(this.loginForm?.value);
    } else {
    }
  }

  getErrorMessage() {
    if (this.loginForm.controls.UserName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.UserName.hasError('email') ? 'Not a valid email' : '';
  }

  setMessage(c: AbstractControl): void {
    this.userNameErrorMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.userNameErrorMessage = Object.keys(c.errors)
        .map((key) => this.validationMessages[key])
        .join(' ');
    }
  }

  visibilityOffToggle() {
    this.visibility_off = !this.visibility_off;
  }

  protected readonly SharedFacade = SharedFacade;
}
