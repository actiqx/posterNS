import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../model/user.model';
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggingIn = true;
  user: User;
  @ViewChild('password')
  password: ElementRef;
  @ViewChild('confirmPassword')
  confirmPassword: ElementRef;
  constructor(private page: Page, private router: Router) {}

  ngOnInit() {}
 
  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
}

submit() {
    if (!this.user.email || !this.user.password) {
        this.alert("Please provide both an email address and password.");
        return;
    }

    if (this.isLoggingIn) {
        this.login();
    } else {
        this.register();
    }
}

login() {
  this.router.navigate(["/home"]);
    // this.userService.login(this.user)
    //     .then(() => {
            
    //     })
    //     .catch(() => {
    //         this.alert("Unfortunately we could not find your account.");
    //     });
}

register() {
    if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        return;
    }
    this.alert("Your account was successfully created.");
    // this.userService.register(this.user)
    //     .then(() => {
    //         this.alert("Your account was successfully created.");
    //         this.isLoggingIn = true;
    //     })
    //     .catch(() => {
    //         this.alert("Unfortunately we were unable to create your account.");
    //     });
}

forgotPassword() {
    prompt({
        title: "Forgot Password",
        message: "Enter the email address you used to register for APP NAME to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
    }).then((data) => {
        if (data.result) {
            // this.userService.resetPassword(data.text.trim())
            //     .then(() => {
            //         this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
            //     }).catch(() => {
            //         this.alert("Unfortunately, an error occurred resetting your password.");
            //     });
        }
    });
}

focusPassword() {
    this.password.nativeElement.focus();
}
focusConfirmPassword() {
    if (!this.isLoggingIn) {
        this.confirmPassword.nativeElement.focus();
    }
}

alert(message: string) {
    return alert({
        title: "APP NAME",
        okButtonText: "OK",
        message: message
    });
}
}
