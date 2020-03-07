import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseurl: string = "http://localhost:8082/";
  bookingservice: string = this.baseurl + "booking-service/v1/";
  role: string = this.bookingservice + "role";
  constructor(private httpClient: HttpClient) { }

  public roleList() {
    return <any>this.httpClient.get(this.role);
  }
}
