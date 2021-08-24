import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable,of, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../models/client';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection :  AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client:Observable<Client>; 
  

  constructor(private afs: AngularFirestore) {
      this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
   }

   getClients() : Observable<Client[]> {
     this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
       data.id = action.payload.doc.id;
       console.log(data);
       return data;})
     }));
     console.log(this.clients);
     return this.clients;

   }
   newClient(client: Client) {
    this.clientsCollection.add(client);
   }

   getClient(id: DOMStringList): Observable<Client> {
     this.clientDoc = this.afs.doc<Client>(`clients/${id}`);

    //  this.client = this.clientDoc.snapshotChanges().map(action  => {
      
    //   if(action.payload.exists === false) {
    //      return null;
    //    }
    //    else {
    //      const data = action.payload.data() as Client;
    //      data.id = action.payload.id;
    //      return data;
    //    }

    //  });

    this.client= this.clientDoc.snapshotChanges().pipe(map(dt => {
      if(dt.payload.exists === false) {
        return null;
      }
      else {
        const data = dt.payload.data() as Client;
        data.id = dt.payload.id;
        return data;
      }
     }));
    //  console.log(this.client);
     return this.client;
   }

   updateClient(client: Client) {
     this.clientDoc= this.afs.doc(`clients/${client.id}`);
     this.clientDoc.update(client);
   }

   deleteClient(client: Client) {
    this.clientDoc= this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
   }

}