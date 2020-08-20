import { Observable } from 'rxjs';
import { Client } from './../../Model/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {

  id:string;
  cl:Client;
  balanceShow:boolean=false;

  constructor(private client:ClientsService, private route:ActivatedRoute, private router:Router, private flash:FlashMessagesService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.client.showClient(this.id).subscribe(data=>{
      this.cl=data;
    });
  }

  updateBalance(){
    this.cl.id=this.id;
    this.client.update(this.cl);
    this.balanceShow=!this.balanceShow;  
    this.flash.show('Client is updated successfully', { cssClass: 'alert alert-success', timeout: 5000 });
  }

  deleteClient(){

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

        this.client.delete(this.id);
        this.flash.show('Client is deleted successfully', { cssClass: 'alert alert-warning', timeout: 5000 });
        return this.router.navigate(['/']);

        Swal.fire(
          'Deleted!',
          'This client is deleted.',
          'success'
        )
      }
    })
    
  }

}
