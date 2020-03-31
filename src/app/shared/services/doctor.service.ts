import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  baseurl: string = "http://localhost:8082/";

  bookingservice: string = this.baseurl + "booking-service/v1/";

  designation: string = this.bookingservice + "designation"
  constructor() { }
}
