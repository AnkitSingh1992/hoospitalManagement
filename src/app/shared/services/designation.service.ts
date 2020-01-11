import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  baseurl: string = "http://localhost:8082/";

  bookingservice: string = this.baseurl + "booking-service/v1/";

  designation: string = this.bookingservice + "designation";

  constructor(private httpClient: HttpClient) {
  }

  public designationList() {
    return <any>this.httpClient.get(this.designation);
  }

  public getDesignation(id) {
    return <any>this.httpClient.get(this.designation + "/" + id);
  }

  public changeStatus(id, status) {
    return <any>this.httpClient.put(this.designation + "/status?designationId=" + id + "&status=" + status, {});
  }

  public delete(id) {
    return <any>this.httpClient.delete(this.designation + "/" + id);
  }

  public saveDesignation(temp) {
    return <any>this.httpClient.post(this.designation+"/save", temp); 
  }

  public updateDesignation(temp) {
    return <any>this.httpClient.put(this.designation+"/update", temp); 
  }
}
