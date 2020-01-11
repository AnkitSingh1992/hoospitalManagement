import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DesignationService } from '../../shared/services/designation.service';
import { DepartmentService } from '../../shared/services/department.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  designationListing: boolean = true;
  viewDesignation: boolean = false;
  addDesignation: boolean = false;
  editDesignation: boolean = false;
  designationList: any;
  designation: any;
  designationForm: FormGroup;
  departmentList: any;
  displayedColumns: string[] = ['departmentName', 'designationName', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService,
    private router: Router, private formBuilder: FormBuilder,
    public designationService: DesignationService, public departmentService: DepartmentService) {
    this.designationForm = this.formBuilder.group({
      designationId: [''],
      departmentId: ['', Validators.required],
      designationName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadDesignationList();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadDesignationList() {
    this.designationService.designationList().subscribe((response: any) => {
      this.designationList = response.data;
      this.dataSource = new MatTableDataSource(this.designationList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => { console.log(err) });
  }

  onView(id) {
    this.designationService.getDesignation(id).subscribe((response: any) => {
      this.designation = response.data;
      this.designationListing = false;
      this.viewDesignation = true;
    }, err => { console.log(err) });
  }
  onStatusChange(event, id) {
    var status = 0
    if (event.checked) {
      status = 1;
    }
    this.designationService.changeStatus(id, status).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadDesignationList();
      } else if (response.code == 801) {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }
  delete(id) {
    this.designationService.delete(id).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadDesignationList();
        this
      } else if (response.code == 801) {
        this.toastr.warning(response.data)
      } else if (response.code == 802) {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }

  oncancel() {
    this.designationListing = true;
    this.viewDesignation = false;
    this.addDesignation = false;
    this.editDesignation = false;
    this.loadDesignationList();
    this.designationForm.reset();
  }

  createDesgination() {
    this.designationListing = false;
    this.viewDesignation = false;
    this.addDesignation = true;
    this.editDesignation = false;
   this.getdepartmentList();
  }

  onActiveEditDesignation() {
    this.designationListing = false;
    this.viewDesignation = false;
    this.addDesignation = true;
    this.editDesignation = true;
  }
getdepartmentList(){
  this.departmentService.departmentList().subscribe((response: any) => {
    this.departmentList = response.data;

  }, err => { console.log(err) });
}
  onListingDesignation() {
    this.designationListing = true;
    this.viewDesignation = false;
    this.addDesignation = false;
    this.editDesignation = false;
  }
  onEdit(id) {
    this.designationService.getDesignation(id).subscribe((response: any) => {
      this.designationForm.controls['designationId'].setValue(response.data.designationId);
      this.designationForm.controls['departmentId'].setValue(response.data.departmentId);
      this.designationForm.controls['designationName'].setValue(response.data.designationName);   
     this.getdepartmentList();
      this.onActiveEditDesignation();
    }, err => { console.log(err) });
  }

  save() {
    alert(JSON.stringify(this.designationForm.value))
    if (this.designationForm.value.designationId == '' || this.designationForm.value.designationId == null) {
      this.designationService.saveDesignation(this.designationForm.value).subscribe(
        res => {
          alert(JSON.stringify(res))
          if (res.code == 200) {
            this.toastr.success('', res.data);
            this.loadDesignationList();
            this.designationForm.reset();
            this.onListingDesignation();

          } else {
            this.toastr.warning('', res.message)
          }
        },
        err => { console.log(err) }
      );
    } else {
      this.designationService.updateDesignation(this.designationForm.value).subscribe(
        
        res => {
          alert(JSON.stringify(res))
          if (res.code == 200) {
            this.toastr.success('', res.data);
            this.loadDesignationList();
            this.designationForm.reset();
            this.onListingDesignation();
          } else {
            this.toastr.warning('', res.message)
          }
        },
        err => { console.log(err) }
      );
    }

  }

}
