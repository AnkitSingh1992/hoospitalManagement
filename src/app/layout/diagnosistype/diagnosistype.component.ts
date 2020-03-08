import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DiagnosistypeService } from '../../shared/services/diagnosistype.service';

@Component({
  selector: 'app-diagnosistype',
  templateUrl: './diagnosistype.component.html',
  styleUrls: ['./diagnosistype.component.scss']
})
export class DiagnosistypeComponent implements OnInit {
  diagnostictListing: boolean = true;
  viewDiagnostic: boolean = false;
  addDiagnostic: boolean = false;
  editDiagnostic: boolean = false;
  diagnosticList: any;
  diagnostic: any;
  diagnosticForm: FormGroup;
  displayedColumns: string[] = ['diagnosisServiceName', 'action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(private changeDetectorRefs: ChangeDetectorRef, private toastr: ToastrService,
    private router: Router, private formBuilder: FormBuilder,
    public diagnosistypeService: DiagnosistypeService ) {
    this.diagnosticForm = this.formBuilder.group({
      diagnosisTypeId: [''],
      diagnosisServiceName: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.loadDiagnosticList();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadDiagnosticList() {
    this.diagnosistypeService.diagnosticTypeList().subscribe((response: any) => {
      this.diagnosticList = response.data;
      this.dataSource = new MatTableDataSource(this.diagnosticList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => { console.log(err) });
  }
  onView(id) {
    this. diagnosistypeService.getdiagnosticType(id).subscribe((response: any) => {
      this.diagnostic = response.data;
      this.diagnostictListing = false;
      this.viewDiagnostic = true;
    }, err => { console.log(err) });
  }

  oncancel() {
    this.diagnostictListing  = true;
    this.viewDiagnostic  = false;
    this. addDiagnostic = false;
    this. editDiagnostic = false;
    this.loadDiagnosticList();
    this.diagnosticForm.reset();
  }
  onStatusChange(event, diagnosticServiceTypeId) {
    var status = 0
    if (event.checked) {
      status = 1;
    }
    this.diagnosistypeService.changeStatus( diagnosticServiceTypeId, status).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadDiagnosticList();
        this
      } else {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }
  delete( diagnosticServiceTypeId) {
    this. diagnosistypeService.delete( diagnosticServiceTypeId).subscribe((response: any) => {
      if (response.code == 200) {
        this.toastr.success(response.data);
        this.loadDiagnosticList();
        
      } else {
        this.toastr.warning(response.data)
      }
    }, err => { console.log(err) });
  }
  createDiagnostict() {
    this.diagnostictListing = false;
    this.viewDiagnostic = false;
    this.addDiagnostic = true;
    this.editDiagnostic = false;
  }
  onActiveEditDiagnostict() {
    this.diagnostictListing = false;
    this.viewDiagnostic = false;
    this. addDiagnostic = true;
    this.editDiagnostic = true;
  }

  onListingDiagnostict() {
    this.diagnostictListing = true;
    this.viewDiagnostic = false;
    this.addDiagnostic = false;
    this.editDiagnostic = false;
  }
  onEdit(diagnosticServiceTypeId) {   
    this.diagnosistypeService.getdiagnosticType(diagnosticServiceTypeId).subscribe((response: any) => {
      console.log(JSON.stringify(response.data.diagnosisTypeId))
      this.diagnosticForm.controls['diagnosisTypeId'].setValue(response.data.diagnosisTypeId);
      this.diagnosticForm.controls['diagnosisServiceName'].setValue(response.data.diagnosisServiceName);
      this.onActiveEditDiagnostict();
    }, err => { console.log(err) });
  }

  saveDiagnostic() {
    if (this.diagnosticForm.value.diagnosisTypeId == '' || this.diagnosticForm.value.diagnosisTypeId == null) {
      this.diagnosistypeService.save(this. diagnosticForm.value).subscribe(
        res => {
          if (res.code == 200) {
            this.toastr.success('', res.data);
          } else {
            this.toastr.warning('', res.message)
          }
          this. diagnosticForm.reset();
          this.loadDiagnosticList();
          this. onListingDiagnostict();
        },
        err => { console.log(err) }
      );
    } else {
      this. diagnosistypeService.updateDiagnosticType(this.diagnosticForm.value).subscribe(
        res => {
          if (res.code == 200) {
            this.toastr.success('', res.data);
          } else {
            this.toastr.warning('', res.message)
          }
          this.diagnosticForm.reset();
          this.loadDiagnosticList();
          this. onListingDiagnostict();
        },
        err => { console.log(err) }
      );
    }

  }

}
