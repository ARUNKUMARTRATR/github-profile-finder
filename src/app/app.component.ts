import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'GIT-SEARCH';
constructor(private http: HttpClient,private snackBar: MatSnackBar){}
  name;
  response;
  Res;
  isLoading = false;
  imgcard = false;
  err_msg = false;
  getting()
  {
    if(!this.name)
    {
      this.err_msg = false;
      return this.snackBar.open("ENTER VALID USER NAME","OK",{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
    }
    this.err_msg = false;
    this.isLoading=true;
    const localData = localStorage.getItem(this.name);

    if(localData)
    {
      this.Res=JSON.parse(localData);

      this.isLoading = false;
      this.imgcard=true;
      this.err_msg = false;
    }
    else
    {
    
    this.http.get('https://api.github.com/users/'+this.name).subscribe(response =>{this.Res=response;localStorage.setItem(this.name,JSON.stringify(this.Res));
    this.isLoading = false;
    this.err_msg = false;
      this.imgcard=true;
    }, error =>{
      this.imgcard=false;
      this.isLoading=false;
      this.err_msg=true;
      this.snackBar.open("NO USER FOUND!","OK",{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
    });


    this.imgcard=false;
    }
    
  }

  
}
