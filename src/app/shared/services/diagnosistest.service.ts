import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DiagnosistestService {
  baseurl: string = "http://localhost:8082/";

  bookingservice: string = this.baseurl + "booking-service/v1/";

  diagnsisTest: string = this.bookingservice + "diagnosticTest";
  constructor(private httpClient: HttpClient) {
  }

  public diagnosisTestList() {
    return <any>this.httpClient.get(this.diagnsisTest);
  }

  public getDiagnosisTest(id) {
    return <any>this.httpClient.get(this.diagnsisTest + "/" + id);
  }
}
