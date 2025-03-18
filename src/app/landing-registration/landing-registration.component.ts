import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PocketBaseService } from '../services/pocketbase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './landing-registration.component.html',
  styleUrl: './landing-registration.component.css'
})
export class LandingRegistrationComponent {
  form: FormGroup;

  constructor (private fb: FormBuilder, private pocketbase: PocketBaseService, private router: Router){
    this.form = this.fb.group({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      dob: "",
      password: "",
      passwordConfirm: "",
      gender: ""
    });
  }

  onRegister(){
    this.pocketbase.registerUser(this.form.value).then(()=>{
      this.router.navigate(['login']);
      console.log("Succcess!")
    })
  }
}
