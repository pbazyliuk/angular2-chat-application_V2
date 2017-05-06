import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoginService } from "app/auth/shared";

function dateCompare(c: AbstractControl):
          {[key: string]: boolean} | null {
            let startControl = c.get('currentpassword');
            let endControl = c.get('newpassword');
            // if (startControl.pristine || endControl.pristine) {
            //   return null;
            // }
            if(startControl.value !== endControl.value) {
              return null
            }
            return { 'match': true};
          }

@Component({
  selector: 'ct-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  private profileForm: FormGroup;
  private userInfo$: Observable<object>;
  private userInfoCurrent;
  private userInfoNew;
  private userInfoComplex;

   constructor(private store: Store<ApplicationState>, private LoginService: LoginService, private fb: FormBuilder) {
      this.userInfo$ = store
        .map(this.mapStatetoUserInfo.bind(this))
   }

   profileSubmit(value: object) {
     this.userInfoNew = {
      firstname: this.profileForm.value.firstname || this.userInfoCurrent.firstname,
      lastname: this.profileForm.value.lastname || this.userInfoCurrent.lastname,
      email: this.profileForm.value.email || this.userInfoCurrent.email,
      currentpassword: this.profileForm.value.passwords.currentpassword,
      newpassword: this.profileForm.value.passwords.newpassword
      // confirmpassword: this.signUpForm.value.passwords.confirmpassword
     };

      console.log(value);
      console.log(this.userInfoCurrent);

      this.userInfoComplex = Object.assign(this.userInfoCurrent, this.userInfoNew, this.userInfoNew.passwords );
        console.log(this.userInfoComplex)
      

      // this.LoginService
      //    .profileUpdate()
      //   //  .subscribe(userInfo => {
      //   //    //console.error(userInfo)
      //   //         this.store.dispatch(
      //   //         new RegisterSuccessActions(userInfo)
      //   //       )
      //   //       this.router.navigate(['chat']);}, 
      //   //       this.onLoginError)
    

   }

   onLoginSuccess (res) {
    
  }

   mapStatetoUserInfo(state: ApplicationState): object {
     this.userInfoCurrent = state.uiState.user;
     return state.uiState.user;
   }

   ngOnInit(): void {
   this.profileForm = this.fb.group({
        firstname: ['', [Validators.minLength(3)]],
        lastname: ['', [Validators.minLength(3)]],
        email: ['', [Validators.pattern('[^@]+@[^@]+\.[a-zA-Z]{2,}')]],
         passwords: this.fb.group({
          currentpassword: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(14)]], // 
          newpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]]
        }, {validator: dateCompare})
  })

}
}