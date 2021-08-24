import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NotificationService } from '../../services/notification.service';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client : Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd : boolean ;
  
  @ViewChild('clientForm') form: any;
  constructor(
    private notifyService: NotificationService, 
    private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private router:Router,
    private settingsService: SettingsService
    ) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit(clientForm :any){

    console.log(clientForm.value);
    console.log(clientForm.valid);
    console.log(clientForm.value.balance);

    if (this.disableBalanceOnAdd) {
      clientForm.value.balance = 0;
    }
    if(clientForm.valid) {
      this.clientService.newClient(clientForm.value);
      this.flashMessagesService.show("Data saved successfully !!", { timeout: 4000 , cssClass: 'alert-success' });

      this.notifyService.showSuccess("Data saved successfully !!", "Success");
      this.router.navigate(['/']);
    }
    else {
      this.flashMessagesService.show("Data saving is Failed !!", { timeout: 4000 , cssClass: 'alert-danger'});
      this.notifyService.showError("Data saving is Failed !!", "Error");
    }
  }
}