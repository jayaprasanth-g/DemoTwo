import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NotificationService } from '../../services/notification.service';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: DOMStringList;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;
  disableBalanceOnAdd : boolean;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private notifyService: NotificationService, 
    private settingsService: SettingsService
  ) { }


  ngOnInit(): void {

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;

    // get Id from URL
    this.id = this.route.snapshot.params["id"];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client);
    });

 
  }

  onSubmit(clientForm :any){
    if (this.disableBalanceOnAdd) {
      clientForm.value.balance = 0;
    }
    if(clientForm.valid) {
      // add id to client
      clientForm.value.id = this.id;
      this.clientService.updateClient(clientForm.value);
      this.flashMessagesService.show("Data saved successfully !!", { timeout: 4000 , cssClass: 'alert-success' });

      this.notifyService.showSuccess("Data saved successfully !!", "Success");
      this.router.navigate(['/client/'+this.id]);
    }
    else {
      this.flashMessagesService.show("Data saving is Failed !!", { timeout: 4000 , cssClass: 'alert-danger'});
      this.notifyService.showError("Data saving is Failed !!", "Error");
    }
  }

}