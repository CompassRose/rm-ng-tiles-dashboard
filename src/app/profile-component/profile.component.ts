import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {
    console.log('Profile running')
  }

  ngOnInit(): void {
    console.log('Profile running')
    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      initials: '',
      avatar: ''
    })
  }

  submit() {
    console.log('is form valid??? ', this.form);
    window.localStorage.setItem('tiles-profile', (JSON.stringify(this.form.value)));
    //console.log(this.form.controls['avatar']);
    this.router.navigate(['/start-page']);
  }

  onExit() {
    this.router.navigate(['/start-page']);
  }
  get formValues() {
    //console.log('get ', this.form);
    return this.form.value;
  }
}
