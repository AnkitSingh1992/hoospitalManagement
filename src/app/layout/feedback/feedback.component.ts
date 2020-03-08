import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from '../../shared/services/feedback.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackListing: boolean = true;
  viewFeedback: boolean = false;
  feedback: any;
  feedbackList : any;
  displayedColumns: string[] = ['name','email','mobile','departmentName','formType', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService,
    private router: Router, private formBuilder: FormBuilder,
    public feedbackService: FeedbackService ) { }

 
ngOnInit() {
    this.loadFeedbackList();
  }
  loadFeedbackList(){   
      this.feedbackService.feedbackList().subscribe((response: any) => {
        this.feedbackList = response.data;      
       console.log(JSON.stringify(this.feedbackList))
        this.dataSource = new MatTableDataSource(this.feedbackList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => { console.log(err) });    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(id) {
    this.feedbackService.getFeedback(id).subscribe((response: any) => {
      this.feedback = response.data;
      this.feedbackListing = false;
      this.viewFeedback = true;
    }, err => { console.log(err) });
  }

  oncancel() {
    this.feedbackListing = true;
    this.viewFeedback = false;
    this.loadFeedbackList();   
  }

  onStatusChange(event, feedbackId) {
    var status = 0
    if (event.checked) {
      status = 1;
    }
    this.feedbackService.changeStatus(feedbackId, status).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadFeedbackList();
        this
      } else if (response.code == 801) {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }
  delete(feedbackId) {
    this.feedbackService.delete(feedbackId).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadFeedbackList();        
      } else  {
        this.toastr.warning(response.data)
      } 
    }, err => { console.log(err) });
  }

}
