import { Client } from './../Model/Client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  clientsColl:AngularFirestoreCollection<Client>;
  clientsDoc: AngularFirestoreDocument<Client>;

  constructor(private afs: AngularFirestore) { 
    this.clientsColl=this.afs.collection('clients');
    //this.clientsColl.valueChanges();
  }

  client(id):Observable<Client[]>{
    return this.afs.collection('clients',ref=> ref.where('user','==',id)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }
      )
      )
    )
  }

  newClient(client){
    this.clientsColl.add(client);
  }

  showClient(id:string):Observable<Client>{
    return this.clientsColl.doc(id).valueChanges();
  }
  
  update(client:Client){
    this.clientsColl.doc(client.id).update(client);
  }

  delete(id:string){
    this.clientsColl.doc(id).delete();
  }
}
