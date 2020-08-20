import { AuthclientsService } from './../../services/authclients.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Route } from '@angular/compiler/src/core';
import { Client } from './../../Model/Client';
import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:Client[];
  _total:number;
  tableCLient:Client[];

  constructor(private client: ClientsService, private auth: AuthclientsService, private flash : FlashMessagesService) { 

  }

  ngOnInit(): void {
    this.auth.getAuth().subscribe(user=>{
      this.client.client(user.uid).subscribe(data => {
        this.tableCLient=this.clients = data;
        this.getTotal();
      })
    })
  }

  getTotal(){
    this._total=0;
    this.clients.forEach((client)=>{
      this._total+=client.balance;
    })
   /* return this.clients.reduce((t,c)=>{
      return t+=c.balance;
    },0)*/
  }

  deleteClient(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.client.delete(id);
        this.flash.show('Client is deleted successfully', { cssClass: 'alert alert-warning', timeout: 5000 });

        Swal.fire(
          'Deleted!',
          'This client is deleted.',
          'success'
        )
      }
    })

  }

  search(f:string){
    let list: any = [];
    if(f){
      this.clients.forEach(
        data => {
          if (data.firstName.toLowerCase().includes(f.toLowerCase()) || data.lastName.toLowerCase().includes(f.toLowerCase()))
            list.push(data);
        });
      this.tableCLient = list;
    }
    else
      this.tableCLient=this.clients
  }

}
