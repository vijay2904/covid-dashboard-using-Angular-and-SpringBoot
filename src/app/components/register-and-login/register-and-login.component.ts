import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicAuthSeviceService } from '../../service/http/basic-auth-sevice.service';
import { RegisterPayLoad } from '../payloadsFolder/registerPayLoad';
import { LoginPayload } from '../payloadsFolder/loginPayLoad';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-register-and-login',
  templateUrl: './register-and-login.component.html',
  styleUrls: ['./register-and-login.component.css']
})
export class RegisterAndLoginComponent implements OnInit {
  isLoggedIn:boolean = false
  LoginMessage:string = ''
  RegisterMessage:string = ''
  errorMessageActivated:boolean = false;

  registerForm: FormGroup;
  registerPayLoad: RegisterPayLoad;

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  invalid =false
  isUserLoggedIn: boolean = false
  user: SocialUser;
  showR:boolean = true;
  showL:boolean = false
  showForm:boolean = true
  otpForm:FormGroup
  otpreq:OTPreq
  otpreq1:OTPreq
  otperror:boolean = false
  OTPMessage:string
  otpsuccess:boolean = false
  body:Body
  forgotPass:boolean = false
  forgotPassForm:FormGroup
  updatePasswordForm:FormGroup
  forgot:forgotPassReq
  errorInForgotPass:string = ''
  forgotErrorActivated:boolean = false
  
  constructor(private socialAuthService: SocialAuthService,private formBuilder: FormBuilder, private localStorageService: LocalStorageService,private authService: BasicAuthSeviceService ,private basicAuthService:BasicAuthSeviceService,private route:Router) { 
    this.registerForm = this.formBuilder.group({
      username: '',
      email:  '',
      password: '',
      confirmPassword: ''
    });

    this.registerPayLoad = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    this.loginForm = this.formBuilder.group({
      usernamelogin: '',
      passwordlogin: '',
    });

    this.loginPayload = {
      username: '',
      password: '',
    }

    this.otpForm = this.formBuilder.group({
      OTPentered: ''
    })

    this.otpreq = {
      email: '',
      number: ''
    }
    this.otpreq1 = {
      email: '',
      number: ''
    }

    this.body = {
      email: ''
    }

    this.forgot = {
      email: '',
      password:''
    }


    this.forgotPassForm = this.formBuilder.group({
      forgotEmail:[null,Validators.required],
      Newpassword:[null,Validators.required],
      NewCpassword:[null,Validators.required]
    })

  }

  ngOnInit(): void {
     this.isUserLoggedIn = this.basicAuthService.isUserLoggedIn();
  }
  // handlelogin()
  // {
  //   if(this.basicAuthService.isUserLoggedIn())
  //   {
  //     //redirect to welcome page
  //     this.route.navigate([''])
  //     this.invalid=false;
  //   }
  //   else
  //   {
  //     this.invalid=true;
  //   }
  // }

  onSubmit() {
    this.registerPayLoad.username =  this.registerForm.get('username').value;
    this.registerPayLoad.email = this.registerForm.get('email').value;
    this.registerPayLoad.password = this.registerForm.get('password').value;
    this.registerPayLoad.confirmPassword = this.registerForm.get('confirmPassword').value;


    this.authService.register(this.registerPayLoad).subscribe(data => {
        this.errorMessageActivated = true;
        this.RegisterMessage = data.string
        if(this.RegisterMessage.indexOf("under process") > -1) {
          this.RegisterMessage = "Please wait"
          this.showForm = false
        }
    },
      
    );
  }

  onSubmitlogin() {
    this.loginPayload.username = this.loginForm.get('usernamelogin').value;
    this.loginPayload.password =  this.loginForm.get('passwordlogin').value;
   
    this.authService.login(this.loginPayload).subscribe(data => {
      if(data.userName != null) {
        this.isUserLoggedIn = true
          //this.route.navigate([''])
          this.route.navigate([''])
            .then(() => {
              window.location.reload();
            });
        
        
      } else {
        this.errorMessageActivated = true
        this.LoginMessage = "invalid Credentials";
      }
    });
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      if(user) {
        console.log(user);
        this.isUserLoggedIn = true;
        this.localStorageService.store('authenticationToken', user.authToken)
        this.route.navigate([''])
            .then(() => {
              window.location.reload();
        });
        
      } else {
        console.log("Login failed")
      }
    });
  }

  showLogin() {
    this.showL = true;
    this.showR = false;
    
  }

  showRegister() {
    this.showL  = false;
    this.showR = true;
  }


  backToReg() {


    this.body.email = this.registerForm.get('email').value
    
    

    

    this.basicAuthService.deleteUser(this.body).subscribe(data => {
      console.log(data);
      
    });

    this.showForm = true;
    this.errorMessageActivated = false;
  }


  OTPverification() {
    this.otpreq.email = this.registerForm.get('email').value
    this.otpreq.number = this.otpForm.get('OTPentered').value
    

    if(this.otpreq.number === null || this.otpreq.number === undefined || this.otpreq.number === "") {
        this.otperror = true
        this.otpsuccess = false
        this.OTPMessage = "Please enter OTP"
    } 
    else if(this.otpreq.number.length < 6 || this.otpreq.number.length > 6)  {
      this.otperror = true
      this.otpsuccess = false
      this.OTPMessage = "Please enter 6 digits of OTP"
    }
    
    else {
    this.basicAuthService.verifyOTP(this.otpreq).subscribe(data => {
      if(data.string.indexOf("Invalid") > -1) {
        this.otperror = true
        this.otpsuccess = false
        this.OTPMessage = data.string
      } else {
        this.showL = true;
        this.showR = false; 
      }
    })
  }
    
  }

  forgotPassword() {
    this.forgotPass = true
  }

  updatePassword() {
    

    if(this.forgotPassForm.get('forgotEmail').value === null || this.forgotPassForm.get('forgotEmail').value === "") {
      this.forgotErrorActivated = true
      this.errorInForgotPass = "email can't be empty"
    } else if(this.forgotPassForm.get('Newpassword').value === null || this.forgotPassForm.get('Newpassword').value.length < 8) {
      this.forgotErrorActivated = true
      this.errorInForgotPass = "Password must be 8 characters"
    } 
    else if(this.forgotPassForm.get('NewCpassword').value === null || this.forgotPassForm.get('NewCpassword').value.length < 8) {
      this.forgotErrorActivated = true
      this.errorInForgotPass = "Password must be 8 characters"
    } 
    
    else if(this.forgotPassForm.get('Newpassword').value != this.forgotPassForm.get('NewCpassword').value) {
      this.forgotErrorActivated = true
      this.errorInForgotPass = "Passwords don't match"
    }else {
      let email = this.forgotPassForm.get('forgotEmail').value
    let password = this.forgotPassForm.get('Newpassword').value
    let cpass = this.forgotPassForm.get('NewCpassword').value
      this.forgotErrorActivated = false
      this.forgot.email = email
      this.forgot.password = password
      this.basicAuthService.updatePass(this.forgot).subscribe(data => {
        if(data.string.indexOf('Updated') > -1) {
          this.forgotPass = false
        } else {
          this.forgotErrorActivated = true
          this.errorInForgotPass = data.string
        }
      })
    }
  }
}


export class OTPreq {
  email:string
  number:string
}

export class Body {
  email:string
}

export class forgotPassReq {
  email:string
  password:string
}