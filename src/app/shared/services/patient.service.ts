import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseurl: string = "http://localhost:8082/";
  bookingservice: string = this.baseurl + "booking-service/v1/";
  patient: string = this.bookingservice + "patients";
  constructor(private httpClient: HttpClient) { }
  public patientList() {
    return <any>this.httpClient.get(this.patient);
  }

  public getPatient(id) {
    return <any>this.httpClient.get(this.patient + "/" + id);
  }

  public changeStatus(id, status) {
    alert(this.patient + "/status?patientId =" + id + "&status=" + status);
    return <any>this.httpClient.put(this.patient + "/status?patientId =" + id + "&status=" + status, {});
  }

  public delete(id) {
    return <any>this.httpClient.delete(this.patient + "/" + id);
  }

}
