import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl: string = "http://localhost:8082/";
  bookingservice: string = this.baseurl + "booking-service/v1/";
  user: string = this.bookingservice + "users";
  constructor(private httpClient: HttpClient) { }

  public saveUsers(temp) {
    return <any>this.httpClient.post(this.user + "/save", temp);
  }

  public userList() {
    return <any>this.httpClient.get(this.user);
  }

  public getUser(id) {
    return <any>this.httpClient.get(this.user + "/" + id);
  }


  public changeStatus(id, status) {
    return <any>this.httpClient.put(this.user + "/status?userId=" + id + "&status=" + status, {});
  }

  public delete(id) {
    return <any>this.httpClient.delete(this.user + "/" + id);
  }

  public updateUser(temp) {
    return <any>this.httpClient.put(this.user + "/update", temp);
  }
}
