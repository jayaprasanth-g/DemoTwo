import { Component } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DemoTwo';
  // items: Observable<any[]>;
  // constructor(firestore: AngularFirestore) {
  //   this.items = firestore.collection('items').valueChanges();
  //   console.log(this.items);
  // }

}