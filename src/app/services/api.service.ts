import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postDetails(data:any){
    return this.http.post<any>("https://localhost:3000/studentDetails/",data);
  }
  getDetails(){
    return this.http.get<any>("https://localhost:3000/studentDetails/");
  }
}
