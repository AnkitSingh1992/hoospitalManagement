import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DepartmentService } from '../../shared/services/department.service';

import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departmentListing: boolean = true;
  viewDepartment: boolean = false;
  addDepartment: boolean = false;
  editDepartment: boolean = false;
  departmentList: any;
  department: any;
  departmentForm: FormGroup;
  displayedColumns: string[] = ['departmentName', 'action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService,
    private router: Router, private formBuilder: FormBuilder,
    public departmentService: DepartmentService,   ) {
    this.departmentForm = this.formBuilder.group({
      departmentId: [''],   
      departmentName: ['', Validators.required]
    });


  }

  ngOnInit() {
    this.loadDepartmentList();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadDepartmentList() {
    this.departmentService.departmentList().subscribe((response: any) => {
      this.departmentList = response.data;
      this.dataSource = new MatTableDataSource(this.departmentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => { console.log(err) });
  }

  onView(id) {
    this.departmentService.getDepartment(id).subscribe((response: any) => {
      this.department = response.data;
      this.departmentListing = false;
      this.viewDepartment = true;
    }, err => { console.log(err) });
  }

  oncancel() {
    this.departmentListing = true;
    this.viewDepartment = false;
    this.addDepartment = false;
    this.editDepartment = false;
    this.loadDepartmentList();
    this.departmentForm.reset();
  }
  onStatusChange(event, departmentId) {
    var status = 0
    if (event.checked) {
      status = 1;
    }
    this.departmentService.changeStatus(departmentId, status).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadDepartmentList();
        this
      } else if (response.code == 801) {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }
  delete(departmentId) {
    this.departmentService.delete(departmentId).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadDepartmentList();
        this
      } else if (response.code == 801) {
        this.toastr.warning(response.data)
      } else if (response.code == 802) {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }
  createDepartment() {
    this.departmentListing = false;
    this.viewDepartment = false;
    this.addDepartment = true;
    this.editDepartment = false;
  }
  onActiveEditDepartment() {
    this.departmentListing = false;
    this.viewDepartment = false;
    this.addDepartment = true;
    this.editDepartment = true;
  }

  onListingDepartment() {
    this.departmentListing = true;
    this.viewDepartment = false;
    this.addDepartment = false;
    this.editDepartment = false;
  }
  onEdit(departmentId) {
    this.departmentService.getDepartment(departmentId).subscribe((response: any) => {
      this.departmentForm.controls['departmentId'].setValue(response.data.departmentId);
      this.departmentForm.controls['departmentName'].setValue(response.data.departmentName);
      this.onActiveEditDepartment();
    }, err => { console.log(err) });
  }

  saveDepartment() {
    if (this.departmentForm.value.departmentId == '' || this.departmentForm.value.departmentId == null) {
      this.departmentService.saveDepartment(this.departmentForm.value).subscribe(
        res => {
          if (res.code == 200) {
            this.toastr.success('', res.data);
          } else {
            this.toastr.warning('', res.message)
          }
          this.departmentForm.reset();
          this.loadDepartmentList();
          this.onListingDepartment();
        },
        err => { console.log(err) }
      );
    } else {
      this.departmentService.updateDepartment(this.departmentForm.value).subscribe(
        res => {
          if (res.code == 200) {
            this.toastr.success('', res.data);
          } else {
            this.toastr.warning('', res.message)
          }
          this.departmentForm.reset();
          this.loadDepartmentList();
          this.onListingDepartment();
        },
        err => { console.log(err) }
      );
    }

  }


}
