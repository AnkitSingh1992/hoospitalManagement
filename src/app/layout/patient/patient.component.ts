import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../shared/services/patient.service';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patientListing: boolean = true;
  viewPatient: boolean = false;
  patient: any;
  patientList : any;
  displayedColumns: string[] = ['patientName','mobileNo','emailId','registerDate', 'action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService,
    private router: Router, private formBuilder: FormBuilder,
    public patientService: PatientService ) { }

  ngOnInit() {
    this.loadPatientList();
  }
  loadPatientList(){   
      this.patientService.patientList().subscribe((response: any) => {
        this.patientList = response.data;      
        this.dataSource = new MatTableDataSource(this.patientList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => { console.log(err) });
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(id) {
    this.patientService.getPatient(id).subscribe((response: any) => {
      this.patient = response.data;
      this.patientListing = false;
      this.viewPatient = true;
    }, err => { console.log(err) });
  }

  oncancel() {
    this.patientListing = true;
    this.viewPatient = false;  
    this.loadPatientList();
    
  }
  onStatusChange(event, id) {
    var status = 0
    if (event.checked) {
      status = 1;
    }
  
    this.patientService.changeStatus(id, status).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadPatientList();
        this
      } else if (response.code == 801) {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }
  delete(id) {
    alert(id)
    this.patientService.delete(id).subscribe((response: any) => {
      console.log(response)
      if (response.code == 200) {
        console.log(response)
        this.toastr.success(response.data);
        this.loadPatientList();
        this
      } else if (response.code == 801) {
        this.toastr.warning(response.data)
      } else if (response.code == 803) {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }
}
