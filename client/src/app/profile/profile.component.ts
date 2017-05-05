import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";

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

  constructor(private store: Store<ApplicationState>,private fb: FormBuilder) {
      this.userInfo$ = store
        .map(this.mapStatetoUserInfo)
   }

   mapStatetoUserInfo(state: ApplicationState): object {
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