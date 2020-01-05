import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseurl: string = "http://localhost:8082/";

  bookingservice: string = this.baseurl + "booking-service/v1/";

  department: string = this.bookingservice + "department";

  constructor(private httpClient: HttpClient) {
  }

  public departmentList() {
    return <any>this.httpClient.get(this.department);
  }

  public getDepartment(id) {
    return <any>this.httpClient.get(this.department + "/" + id);
  }

  public changeStatus(id, status) {
    return <any>this.httpClient.put(this.department + "/status?departmentId=" + id + "&status=" + status, {});
  }

  public delete(id) {
    return <any>this.httpClient.delete(this.department + "/" + id);
  }

  public saveDepartment(temp) {
    return <any>this.httpClient.post(this.department+"/save", temp); 
  }

  public updateDepartment(temp) {
    return <any>this.httpClient.put(this.department+"/update", temp); 
  }
}
