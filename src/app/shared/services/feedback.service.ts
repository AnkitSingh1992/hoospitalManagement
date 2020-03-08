import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  baseurl: string = "http://localhost:8082/";
  bookingservice: string = this.baseurl + "booking-service/v1/";
  patientFeedback: string = this.bookingservice + "patientFeedback";
  constructor(private httpClient: HttpClient) { }
  public feedbackList() {
    return <any>this.httpClient.get(this.patientFeedback);
  }

  public getFeedback(id) {
    return <any>this.httpClient.get(this.patientFeedback + "/" + id);
  }

  public changeStatus(id, status) {
    return <any>this.httpClient.put(this.patientFeedback + "/status?patientFeedbackId="+id + "&status=" +status, {});
  }

  public delete(id) {
    return <any>this.httpClient.delete(this.patientFeedback + "/" + id);
  }
}
