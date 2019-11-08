import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { __await } from 'tslib';
import { promise } from 'protractor';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  errorMessage: string = '';


  constructor(  public afAuth: AngularFireAuth,public router :Router,public db:AngularFirestore) {
     if(this.afAuth.auth.currentUser != null) {
      if(afAuth.auth.currentUser.displayName !=null)
        router.navigateByUrl('/acc');
    }
  }

  ngOnInit() {
  }
  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err.message);
        reject(err);
      })
    })
 }
 doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
    })
  })
}
async doLogin(){
  var email =( <HTMLInputElement>document.getElementById('email'));
 var pass =( <HTMLInputElement>document.getElementById('pass'));
    this.afAuth.auth.signInWithEmailAndPassword(email.value,pass.value).then(async (success)=>{
      var userNow = this.afAuth.auth.currentUser;
      var displayname ;
      await this.getData(email.value).then(str=>{displayname = str;})
      userNow.updateProfile({
      displayName: displayname
    })
     this.router.navigate(['/acc']);
    
      }).catch(err=>{
        alert(err);
      });

}
  async getData(value:string) 
{
  var fb= this.db.collection("/DataAccount");
  var query = fb.doc(value).get();
  var str = '';
  await query.forEach(  (child) => {
     str=child.get('name');
    })
    return str
  }

}
