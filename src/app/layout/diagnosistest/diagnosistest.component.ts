import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DiagnosistestService } from '../../shared/services/diagnosistest.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-diagnosistest',
  templateUrl: './diagnosistest.component.html',
  styleUrls: ['./diagnosistest.component.scss']
})
export class DiagnosistestComponent implements OnInit {
  diagnsiTestListing: boolean = true;
  viewDiagnsisTest: boolean = false;
  diagnosisTestList: any;
  diagnosisTest: any;

  displayedColumns: string[] = ['serviceId', 'patientId', 'document', 'date', 'action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService,
    private router: Router, private formBuilder: FormBuilder,
    public diagnosistestService: DiagnosistestService, ) { }
  ngOnInit() {
    this.loadList();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadList() {
    this.diagnosistestService.diagnosisTestList().subscribe((response: any) => {
      this.diagnosisTestList = response.data;

      this.dataSource = new MatTableDataSource(this.diagnosisTestList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => { console.log(err) });
  }

  onView(id) {
    this.diagnosistestService.getDiagnosisTest(id).subscribe((response: any) => {
      this.diagnosisTest = response.data;
      console.log(this.diagnosisTest)
      this.diagnsiTestListing = false;
      this.viewDiagnsisTest = true;
    }, err => { console.log(err) });
  }

  oncancel() {
    this.diagnsiTestListing = true;
    this.viewDiagnsisTest = false;

    this.loadList();

  }


}
