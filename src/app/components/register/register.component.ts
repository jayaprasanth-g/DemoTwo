import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NotificationService } from '../../services/notification.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email : string;
  password: string;

  constructor(
    private authService : AuthService,
    private router: Router,
    private flashMessagesService:FlashMessagesService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.registerUser(this.email, this.password).then (res => {
      this.flashMessagesService.show("Registration successfully !!", { timeout: 4000 , cssClass: 'alert-success' });
      this.router.navigate(['/']);

    }).catch(err => {
      this.flashMessagesService.show(err.message, { timeout: 4000 , cssClass: 'alert-danger'});
    });
  }
}