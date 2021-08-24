import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  // var declaration
  id: DOMStringList;
  client: Client;
  hasBalance: boolean =false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit(): void {
    // get Id from URL
    this.id = this.route.snapshot.params["id"];
    this.clientService.getClient(this.id).subscribe(client => {

      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }

      this.client = client;
      console.log(this.client);
    })
  }

  onDeleteClick() {
    if(confirm('Are you sure?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessagesService.show("Client deleted successfully", {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    console.log(this.client);
    this.flashMessagesService.show("Updated", {cssClass: 'alert-success', timeout: 4000});
  }
}