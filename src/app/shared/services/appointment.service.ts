import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseurl: string = "http://localhost:8082/";

  bookingservice: string = this.baseurl + "booking-service/v1/";

  bookAppointment: string = this.bookingservice + "bookAppointment";

  constructor(private httpClient: HttpClient) {
  }

  public bookAppointmentList() {
    return <any>this.httpClient.get(this.bookAppointment);
  }

  public getBookAppointment(id) {
    return <any>this.httpClient.get(this.bookAppointment + "/" + id);
  }

  

  public changeStatus(id, status) {
    return <any>this.httpClient.put(this.bookAppointment + "/status?appointmentId=" + id + "&status=" + status, {});
  }

  public delete(id) {
    return <any>this.httpClient.delete(this.bookAppointment + "/" + id);
  }

  public saveDepartment(temp) {
    return <any>this.httpClient.post(this.bookAppointment+"/save", temp); 
  }

  public updateDepartment(temp) {
    return <any>this.httpClient.put(this.bookAppointment+"/update", temp); 
  }
}
