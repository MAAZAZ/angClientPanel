import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthclientsService } from './../../services/authclients.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthclientsService, private route: Router, private flash: FlashMessagesService) { }

  ngOnInit(): void {
  }

  register(f){
    this.auth.register(f.value.email,f.value.password).then(data=>{
      if(data){
        this.flash.show('You are registred', { cssClass: 'alert alert-success text-center', timeout: 5000 });
        this.route.navigate(['/']);
      }
      else{
        this.flash.show('Problem with your email or your password!', { cssClass: 'alert alert-primary text-center', timeout: 5000 });
      }
    });
  }

}
