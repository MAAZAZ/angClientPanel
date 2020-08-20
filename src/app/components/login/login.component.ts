import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthclientsService } from './../../services/authclients.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthclientsService, private route: Router, private flash: FlashMessagesService) { }

  ngOnInit(): void {
    this.auth.getAuth().subscribe(data=>{
      if(data){
        return this.route.navigate(['/']);
      }
    });
  }

  login(f){
    this.auth.login(f.value.email, f.value.password).then(auth=>{
      if(auth){
        this.flash.show('You are authentified', { cssClass: 'alert alert-primary text-center', timeout: 5000 });
        this.route.navigate(['/']);
      }
    }).catch(err=>{
      this.flash.show(err.message, { cssClass: 'alert alert-danger text-center', timeout: 5000 });
    });
  }

  loginGoogle(f){
    this.auth.loginWithGoogle(f.value.email, f.value.password).then(auth => {
      if (auth) {
        this.flash.show('You are authentified', { cssClass: 'alert alert-primary text-center', timeout: 5000 });
        this.route.navigate(['/']);
      }
    }).catch(err => {
      this.flash.show(err.message, { cssClass: 'alert alert-danger text-center', timeout: 5000 });
    });
  }

}
