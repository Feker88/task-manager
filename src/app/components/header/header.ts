import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public IsAuthenticated = signal(false);

constructor(private router: Router) {
      this.IsAuthenticated.set((localStorage.getItem('token')) != null);
  }

  public logout(){
    
    localStorage.removeItem('token');
    this.IsAuthenticated.set(false);
    this.router.navigate(['login']);

  }
}

