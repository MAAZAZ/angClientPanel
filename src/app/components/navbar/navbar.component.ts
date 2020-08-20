import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthclientsService } from './../../services/authclients.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth:boolean=false;
  userConnect:string;

  constructor(private auth: AuthclientsService, private route: Router, private flash: FlashMessagesService) { }

  ngOnInit(): void {
    this.auth.getAuth().subscribe(data => {
      if (data) {
        this.isAuth=true;
        this.userConnect=data.email;
      }
      else{
        this.isAuth = false;
      }
    });
  }

  logout() {
    this.auth.getLogout();
    this.flash.show('You are loggout now', { cssClass: 'alert alert-primary text-center', timeout: 5000 });
    this.isAuth=false;
    return this.route.navigate(['/login']);
  }

}
