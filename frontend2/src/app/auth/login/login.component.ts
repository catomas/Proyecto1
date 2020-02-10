import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';
import { locationI } from '../../models/location';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  private locations : locationI

  ngOnInit() {

  }

  onLogin(form):void{
    this.authService.login(form.value).subscribe(res => {
      //this.router.navigateByUrl('/usuario')
    });
  }

  getLocation() {
    this.locations = this.authService.location()
    console.log("hola");
    console.log(this.locations);
    }
  

}
