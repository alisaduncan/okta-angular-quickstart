import { Component, inject, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import { AuthState } from '@okta/okta-auth-js';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe],
  template: `
  <div class="profile-card">
    <div class="shield"></div>
    <p>You're logged in!
      @if(name$ | async; as name) {
        <span>Welcome, {{name}} </span>
      }
    </p>
  </div>
  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private oktaAuthStateService = inject(OktaAuthStateService);
  
  public name$ = this.oktaAuthStateService.authState$.pipe(
    filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
    map((authState: AuthState) => authState.idToken?.claims.name ?? '')
  );
}
