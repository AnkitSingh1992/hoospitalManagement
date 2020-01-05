import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})


export class DoctorComponent implements OnInit {
 ELEMENT_DATA :any;
 doctorListing: boolean = true;
 createDoctor: boolean = false;
 editDoctor: boolean = false;
 userForm: FormGroup;
 displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
 dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService, private router: Router, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      user_id: [''],
      status: [''],
      role_id: ['', [Validators.required]]
  });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadData() { 
    this.ELEMENT_DATA= [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      
    ];
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
  ngOnInit() {
 this.doctorListing =true;
      this.loadData();
  
  }
  onActiveCreateDoctor() {
    this.createDoctor = true;
    this.doctorListing = false;
    this.editDoctor = false;
    this.userForm.reset();
  }

  onActivateEditUser() {
    this.createDoctor = true;
    this.doctorListing = false;
    this.editDoctor = true;
    this.userForm.controls['password'].clearValidators();
    this.userForm.controls['password'].updateValueAndValidity();

  }
  onActivateDoctorListing() {
    this.createDoctor = false;
    this.doctorListing = true;
  }
}
