import { User } from './../../Model/User';
import { AuthclientsService } from './../../services/authclients.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Client } from './../../Model/Client';
import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client:Client={
    firstName:"",
    lastName:"",
    phone:"", email:"",
    balance:0,
    user:""
  }

  constructor(private clientserv: ClientsService, private auth: AuthclientsService, private route: Router, private flash: FlashMessagesService) { }

  ngOnInit(): void {
    this.auth.getAuth().subscribe(user=>{
      this.client.user=user.uid;
    })
  }

  add(){
    this.clientserv.newClient(this.client);
    this.flash.show('Client is added successfully', { cssClass:'alert alert-success',timeout:5000});
    return this.route.navigate(['/']);
  }
}
