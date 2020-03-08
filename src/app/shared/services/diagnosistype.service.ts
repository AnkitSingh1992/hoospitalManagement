import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DiagnosistypeService {


  baseurl: string = "http://localhost:8082/";

  bookingservice: string = this.baseurl + "booking-service/v1/";

  diagnosticType: string = this.bookingservice + "diagnosticType";

  constructor(private httpClient: HttpClient) {
  }

  public  diagnosticTypeList() {
    return <any>this.httpClient.get(this. diagnosticType);
  }

  public getdiagnosticType(id) {
    return <any>this.httpClient.get(this.diagnosticType + "/" + id);
  }

  public changeStatus(id, status) {
    return <any>this.httpClient.put(this.diagnosticType + "/status?diagnosticServiceTypeId=" + id + "&status=" + status, {});
  }

  public delete(id) {
    return <any>this.httpClient.delete(this.diagnosticType + "/" + id);
  }

  public save(temp) {
    return <any>this.httpClient.post(this.diagnosticType+"/save", temp); 
  }

  public updateDiagnosticType(temp) {
    return <any>this.httpClient.put(this.diagnosticType+"/update", temp); 
  }
}
