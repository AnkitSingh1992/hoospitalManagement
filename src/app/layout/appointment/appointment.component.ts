import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppointmentService } from '../../shared/services/appointment.service';

import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  appintmentListing: boolean = true;
  viewAppointment: boolean = false;
  appointmentList: any;
  appointment: any;

  displayedColumns: string[] = ['patientId', 'doctorId', 'date', 'slot', 'action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService,
    private router: Router, private formBuilder: FormBuilder,
    public appointmentService: AppointmentService, ) { }

  ngOnInit() {
    this.loadAppointmentList();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadAppointmentList() {
    this.appointmentService.bookAppointmentList().subscribe((response: any) => {
      this.appointmentList = response.data;
      console.log(this.appointmentList)
      this.dataSource = new MatTableDataSource(this.appointmentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => { console.log(err) });
  }

  onView(id) {
    this.appointmentService.getBookAppointment(id).subscribe((response: any) => {
      this.appointment = response.data;
      this.appintmentListing = false;
      this.viewAppointment = true;
    }, err => { console.log(err) });
  }

  oncancel() {
    this.appintmentListing = true;
    this.viewAppointment= false;
  
    this.loadAppointmentList();
    
  }
  onStatusChange(event, departmentId) {
    var status = 0
    if (event.checked) {
      status = 1;
    }
    this.appointmentService.changeStatus(departmentId, status).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadAppointmentList();
        this
      } else {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }
  delete(departmentId) {
    this.appointmentService.delete(departmentId).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadAppointmentList();
        this
      } else {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }

}
