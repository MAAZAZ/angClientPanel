import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from './../../services/clients.service';
import { Client } from './../../Model/Client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {


  client: Client;
  id:string;

  constructor(private cl: ClientsService, private route: ActivatedRoute, private router:Router, private flash:FlashMessagesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.cl.showClient(this.id).subscribe(data=>{
      this.client=data;
    });
  }

  update(){
    this.cl.update(this.client);
    this.flash.show('Client is updated successfully', { cssClass: 'alert alert-success', timeout: 8000 });
    //client/show/',this.id
    return this.router.navigate(['/']);
  }

}
