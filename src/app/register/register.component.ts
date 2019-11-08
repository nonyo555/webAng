import { Component, OnInit, ɵɵtextInterpolate6 } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {
  db:AngularFirestore;
  customers: any;
  constructor( db:AngularFirestore) {
    this.db = db;
  }
  ngOnInit() {
  }
    //(<HTMLInputElement>document.getElementById("email")).value



    doRegister(){
    var email =( <HTMLInputElement>document.getElementById('email')) ;
      var pass =( <HTMLInputElement>document.getElementById('pass'));
      var pass2 =( <HTMLInputElement>document.getElementById('pass2'));
      var idHave = false   
      if(pass.value == pass2.value){
      var test =firebase.auth().createUserWithEmailAndPassword(email.value,pass.value).then(
        sucess =>{
          this.RegisterACC(email.value);
        })
      .catch
      (err =>{  
        alert(err.message)
        idHave = true;
      })
     
      email.value ='';
      pass.value = '';
      pass2.value = '';
    }
      else{
        alert('Password anf Confirm Password don\'t be the same');
      }
   /*   var fb= this.db.collection("/product");
      fb.doc( email.value).snapshotChanges().forEach(child => {
        if(child.payload.get('name') !=  undefined){
          
        }
        else
        {this.Register();}
      })
      ;*/
  /*    var fb= this.db.collection("/DataAccount");
      fb.get().subscribe(
        querySnapshot =>{
     
          
          
        },
        err=>{
            alert(err);
        }
      )*/
}
 RegisterACC(str :string) {
  var name =( <HTMLInputElement>document.getElementById('name'));
  var age =( <HTMLInputElement>document.getElementById('age'));
  var comment =( <HTMLInputElement>document.getElementById('comment'));
 
  var fb= this.db.collection("/DataAccount");
   fb.doc(str).set({
    name: name.value,
    password: age.value,
    comment: comment.value,
    status: true
  })
  name.value ='';
  age.value = '';
  comment.value = '';
  return ;
 }
/*getCustomersList() {
  this.db.doc('none').snapshotChanges().pipe(
    map(changes =>
      (c =>
        ({ name: c.payload.doc.id, ...c.payload.doc.data(),
           pass: c.payload.doc.id, ...c.payload.doc.data() 
        })
      )
    )
  ).subscribe(customers => {
    this.customers = customers;
  });
}*/
}
