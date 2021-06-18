import { Component, OnInit } from '@angular/core';
import { AuthService  } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  user ={
    email:'',
    password:''
  }
  
  constructor(private authService: AuthService, 
              private router :Router) { }

  ngOnInit(): void {
  }

  singUp(){
    this.authService.singUp(this.user)
      .subscribe(
        res =>{
          console.log(res)
          localStorage.setItem('token',res.token);
          this.router.navigate(['/tareas']);
        },
        err => console.log(err)
      )
  }
}
