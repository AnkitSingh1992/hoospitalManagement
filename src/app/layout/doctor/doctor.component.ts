import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})

export class DoctorComponent implements OnInit {
  user: any;
  address: FormGroup;
  summaryForm: FormGroup;
  educationForm: FormGroup;
  recognizationForm: FormGroup;
  membershipForm: FormGroup;
  experienceForm: FormGroup;
  reserchForm: FormGroup;
  faculityForm: FormGroup;
  followForm:FormGroup;
  presentationForm:FormGroup;
  registrationForm:FormGroup;

  editAddress: boolean = false;
  editSummary: boolean = false;
  editEducation: boolean = false;
  editRecognization: boolean = false;
  editMembership: boolean = false;
  editExperience: boolean = false;
  editReserch: boolean = false;
  editFaculity: boolean = false;
  editFollow: boolean = false;
  editPresentation : boolean = false;
  editRegistration : boolean = false;


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService,
    private router: Router, private formBuilder: FormBuilder,
    private userService: UserService) {
    this.address = this.formBuilder.group({
      addressId: [''],
      permanentAddressLine1: ['', Validators.required],
      permanentAddressLine2: ['', Validators.required],
      permanentCity: ['', Validators.required],
      permanentState: ['', Validators.required],
      permanentCounty: ['', Validators.required],
      permanentPinCode: ['', Validators.required],
      residenceAddressLine1: ['', Validators.required],
      residenceAddressLine2: ['', Validators.required],
      residenceCity: ['', Validators.required],
      residenceState: ['', Validators.required],
      residenceCounty: ['', Validators.required],
      residencePinCode: ['', Validators.required]
    });

    this.summaryForm = this.formBuilder.group({
      summaryId: [''],
      doctor_id: [''],
      short_summary: ['', Validators.required],
      sumarry: ['', Validators.required]
    });

    this.educationForm = this.formBuilder.group({
      education_id: [''],
      doctor_id: [''],
      degreeName: ['', Validators.required],
      specialization: ['', Validators.required],
      college: ['', Validators.required],
      university: ['', Validators.required],
      cityname: ['', Validators.required],
      statename: ['', Validators.required],
      country: ['', Validators.required],
      joiningDate: ['', Validators.required],
      passoutDate: ['', Validators.required]
    });

    this.recognizationForm = this.formBuilder.group({
      award_recogination_id: [''],
      doctor_id: [''],
      award_recogination: ['', Validators.required],
    });

    this.experienceForm = this.formBuilder.group({
      experience_id: [''],
      doctor_id: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      hospital_name: ['', Validators.required],
      designation: ['', Validators.required],
    });

    this.membershipForm = this.formBuilder.group({
      memebership_id: [''],
      doctor_id: [''],
      membership: ['', Validators.required],
    });

    this.reserchForm = this.formBuilder.group({
      reserch_id: [''],
      doctor_id: [''],
      reserch: ['', Validators.required],
    });

    this.faculityForm = this.formBuilder.group({
      faculity_id: [''],
      doctor_id: [''],
      faculity: ['', Validators.required],
    });

    this.followForm = this.formBuilder.group({
      follow_id: [''],
      doctor_id: [''],
      follow_name: ['', Validators.required],
    });

    this.presentationForm = this.formBuilder.group({
      presntation_id: [''],
      doctor_id: [''],
      presentation: ['', Validators.required],
    });
    this.registrationForm = this.formBuilder.group({
      reg_id: [''],
      doctor_id: [''],
      reg_number: ['', Validators.required],
    });


  }
  ngOnInit() {
    this.getUser(10);
  }
  getUser(id) {
    this.userService.getUser(id).subscribe((response: any) => {
      this.user = response.data;
      console.log(JSON.stringify(this.user))
    }, err => { console.log(err) });
  }
}

