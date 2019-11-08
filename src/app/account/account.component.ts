import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,public router:Router) { }

  ngOnInit() {
  }
  logout(){
      this.afAuth.auth.signOut().then(success =>{
        this.router.navigate(['/log']);
      })

  }
}
