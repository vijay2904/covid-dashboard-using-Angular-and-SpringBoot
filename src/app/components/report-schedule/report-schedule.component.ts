import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicAuthSeviceService } from '../../service/http/basic-auth-sevice.service';
import { CeiboShare } from 'ng2-social-share';


@Component({
  
  selector: 'app-report-schedule',
  templateUrl: './report-schedule.component.html',
  styleUrls: ['./report-schedule.component.css'],
})
export class ReportScheduleComponent implements OnInit {

public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
public imageUrl = 'https://avatars2.githubusercontent.com/u/10674541?v=3&s=200';


  enteredEmail:string
  date:string
  time:string
  emailForm:FormGroup
  errorMessage = ""
  errorActivated:boolean=false
  successActivated:boolean = false
  sendFormat:sendEmailFormat
  scheduleMailForm:FormGroup
  format:scheduleEmailFormat
  constructor(private formBuilder: FormBuilder,public basicAuthService:BasicAuthSeviceService) { 
    this.emailForm = this.formBuilder.group({
        enteredEmail:[null, Validators.required]
    })
    this.sendFormat = {
      toEmail : ""
    }
    this.scheduleMailForm = this.formBuilder.group({
      enteredEmail :[null, Validators.required],
      time:[null, Validators.required],
      date:[null, Validators.required],
    })

    this.format = {
      email:"",
      date:""
    }

  }

  ngOnInit(): void {
  }


  scheduleEmail() {
    console.log(this.enteredEmail)
    console.log(this.date);
    console.log(this.time);

    if(this.enteredEmail === undefined || this.enteredEmail.indexOf("@") == -1 || this.enteredEmail.indexOf(".com") == -1) {
        this.successActivated = false;
        this.errorActivated = true
        this.errorMessage = "Please enter a valid mail id"
    }
    else if(this.date === undefined || this.date === "") {
      this.successActivated = false;
      this.errorActivated = true
      this.errorMessage = "Please enter a valid date"
  }
  else if(this.time === undefined || this.time === "") {
    this.successActivated = false;
    this.errorActivated = true
    this.errorMessage = "Please enter a valid time"
}
     else {
        this.format.date = this.date+"T"+ this.time
        this.format.email = this.enteredEmail
        this.basicAuthService.scheduleMail(this.format).subscribe(data => {
          console.log(data)
          if(data.message.indexOf("Please") > -1) {
            this.successActivated = false;
            this.errorActivated = true
            this.errorMessage = "Please enter a valid day and time"
          } else {
            this.errorActivated = false
            this.successActivated = true;
          }
        })
    }
    
    
  }

}


export class sendEmailFormat {
  toEmail:string
}

export declare class FacebookParams {
    u: string;
}

export class scheduleEmailFormat {
  email:string
  date:string
}
