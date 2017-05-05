import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";

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
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.pattern('[^@]+@[^@]+\.[a-zA-Z]{2,}')]]
  })

}
}