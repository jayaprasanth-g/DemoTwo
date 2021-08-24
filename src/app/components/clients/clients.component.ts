import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';

import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwed : number ;
  constructor(public clientService: ClientService) { 
  }

  ngOnInit() {
    console.log(this.clientService);
    this.clientService.getClients().subscribe((clients) =>{
      console.log(clients);
      this.clients  = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = 0;
    console.log(this.clients);
    this.totalOwed = this.clients.reduce((accumulator : any, client : any) => {
      console.log(typeof(client.balance));
    return accumulator + parseFloat(client.balance);
    }, 0);
    console.log(this.totalOwed);
  }

}