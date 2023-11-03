import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MockService } from '../services/tiles-mock-api';
import { UserModel } from '../models/tiles.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  form!: FormGroup;
  public allUsers: UserModel[] = [];
  public selectedUser: UserModel;

  constructor(private fb: FormBuilder, public router: Router, public mockTileService: MockService) {

    console.log('Profile running')

    this.form = this.fb.group({
      FullName: '',
      UserId: '',
      IsSupervisor: false,
      UserType: '',
      Avatar: ''
    })

    this.mockTileService.userLoggedInSubject$
      .subscribe(user => {
        if (user !== null) {
          console.log('|||||||||||||||||||||||||||||  Profile  ', user)

          // @ts-ignore
          this.form.get('FullName').setValue(user.FullName);

          // @ts-ignore
          this.form.get('UserId').setValue(user.UserId);

          // @ts-ignore
          this.form.get('UserType').setValue(user.UserType);

          // @ts-ignore
          this.form.get('IsSupervisor').setValue(user.IsSupervisor);

        } else {

        }

      })


    this.mockTileService.apiUsersSubject$
      .subscribe(users => {
        this.allUsers = users
        console.log('Profile running ', this.allUsers)
      })
  }


  ngOnInit(): void { }

  public selectUserFromDropdown(event: any) {

    console.log(' event ', event, ' this.form ', this.form.value.fullName)

    this.selectedUser = this.mockTileService.returnUserFromDropdown(event)

    console.log('is selectedUser ', this.selectedUser);

    // @ts-ignore
    this.form.get('FullName').setValue(event.FullName);

    // @ts-ignore
    this.form.get('UserId').setValue(event.UserId);

    // @ts-ignore
    this.form.get('UserType').setValue(event.UserType);

    // @ts-ignore
    this.form.get('IsSupervisor').setValue(event.IsSupervisor);

    window.localStorage.setItem('tiles-profile', (JSON.stringify(this.form.value)));

    this.mockTileService.userLoggedInSubject$.next(this.selectedUser)

    console.log('is form valid??? ', this.selectedUser);

    console.log(' event ', event, ' this.form ', this.form.value, ' this.selectedUser ', this.selectedUser)


  }

  public submit() {
    this.router.navigate(['/start-page']);
  }

  public onExit() {
    this.router.navigate(['/start-page']);
  }

  get formValues() {
    //console.log('get ', this.form);
    return this.form.value;
  }
}
