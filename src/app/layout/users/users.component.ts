import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from '../../shared/services/designation.service';
import { DepartmentService } from '../../shared/services/department.service';
import { RoleService } from '../../shared/services/role.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userListing: boolean = true;
  viewUser: boolean = false;
  addUser: boolean = false;
  editUser: boolean = false;
  userList: any;
  user: any;
  userForm: FormGroup;
  departmentList: any;
  designationsList: any;
  roleList: any;
  displayedColumns: string[] = ['name', 'email', 'roles', 'designations', 'departments', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService,
    private router: Router, private formBuilder: FormBuilder,
    public designationService: DesignationService,
    public departmentService: DepartmentService,
    public roleService: RoleService,
    public userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      userId: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      serviceStartTime: ['', Validators.required],
      serviceEndTime: ['', Validators.required],
      launchEndTime: ['', Validators.required],
      launchStartTime: ['', Validators.required],
      roles: ['', Validators.required],
      designations: ['', Validators.required],
      department: ['']

    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.loadUserList();
  }
  loadUserList() {
    this.userService.userList().subscribe((response: any) => {
      this.userList = response.data;
      console.log(this.userList)
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.userListing = true;
      this.viewUser = false;
      this.addUser = false;
      this.editUser = false;
    }, err => { console.log(err) });
  }
  oncancel() {
    this.userListing = true;
    this.viewUser = false;
    this.addUser = false;
    this.editUser = false;
    this.userForm.reset();
    this.loadUserList();
  }

  createUser() {
    this.userListing = false;
    this.viewUser = false;
    this.addUser = true;
    this.editUser = false;
    this.getdepartmentList();
    this.getroleList();
  }
  saveUser() {
    var temp = {};
    temp["userId"] = this.userForm.value.userId;
    temp["name"] = this.userForm.value.name;
    temp["email"] = this.userForm.value.email;
    temp["mobile"] = this.userForm.value.mobile;
    temp["serviceStartTime"] = this.userForm.value.serviceStartTime;
    temp["serviceEndTime"] = this.userForm.value.serviceEndTime;
    temp["launchStartTime"] = this.userForm.value.launchStartTime;
    temp["launchEndTime"] = this.userForm.value.launchEndTime;
    temp["roles"] = [];
    temp["roles"].push(this.userForm.value.roles);
    temp["designations"] = [];
    temp["designations"].push(this.userForm.value.designations); 
    if (this.userForm.value.userId == '' || this.userForm.value.userId == null) {
      this.userService.saveUsers(temp).subscribe(
        res => {
          if (res.code == 200) {
            this.loadUserList();
            this.toastr.success('', res.data);
          } else {
            this.toastr.warning('', res.message)
          }
          this.userForm.reset();
        },
        err => { console.log(err) }
      );
    }else{
      this.userService.updateUser(temp).subscribe(
        res => {
          if (res.code == 200) {
            this.loadUserList();
            this.toastr.success('', res.data);
          } else {
            this.toastr.warning('', res.message)
          }
          this.userForm.reset();
        },
        err => { console.log(err) }
      );
    }
  }

  getdepartmentList() {
    this.departmentService.departmentList().subscribe((response: any) => {
      this.departmentList = response.data;
    }, err => { console.log(err) });
  }

  getroleList() {
    this.roleService.roleList().subscribe((response: any) => {
      this.roleList = response.data;
    }, err => { console.log(err) });
  }

  selectDepartment(event) {
    this.designationService.designationListByDepartmentId(event.value).subscribe((response: any) => {
      this.designationsList = response.data;
      console.log(this.designationsList);
    }, err => { console.log(err) });
  }

  onView(id) {
    this.userService.getUser(id).subscribe((response: any) => {
      this.user = response.data;
      this.userListing = false;
      this.viewUser = true;
    }, err => { console.log(err) });
  }

  onStatusChange(event, userId) {
    var status = 0
    if (event.checked) {
      status = 1;
    }
    this.userService.changeStatus(userId, status).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.user;
        this
      } else if (response.code == 801) {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }
  delete(userId) {
    this.userService.delete(userId).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadUserList();
        this
      } else if (response.code == 801) {
        this.toastr.warning(response.data)
      } else if (response.code == 802) {
        this.toastr.warning(response.data)
      }
      else if (response.code == 803) {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }

  onActiveEditUser() {
    this.userListing = false;
    this.viewUser = false;
    this.addUser = true;
    this.editUser = true;
  }

  onEdit(userId) { 
    this.userService.getUser(userId).subscribe((response: any) => {
      var user = response.data;
      this.userForm.controls['userId'].setValue(user.userId);
      this.userForm.controls['name'].setValue(user.name);
      this.userForm.controls['email'].setValue(user.email);
      this.userForm.controls['mobile'].setValue(user.mobileNumber);
      this.userForm.controls['serviceStartTime'].setValue(user.serviceStartTime);
      this.userForm.controls['serviceEndTime'].setValue(user.serviceEndTime);
      this.userForm.controls['launchEndTime'].setValue(user.launchEndTime);
      this.userForm.controls['launchStartTime'].setValue(user.launchStartTime);
      this.userForm.controls['launchStartTime'].setValue(user.launchStartTime);
      this.userForm.controls['roles'].setValue(user.roles[0].roleId);
      this.userForm.controls['designations'].setValue(user.designations[0].designationId);
      this.userForm.controls['department'].setValue(user.designations[0].departmentId);
      let event = {};
      event["value"] = user.designations[0].departmentId;
      this.getdepartmentList();
      this.selectDepartment(event);
      this.getroleList();

      this.onActiveEditUser();
    }, err => { console.log(err) });
  }

}
