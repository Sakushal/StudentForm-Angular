import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'studentForm';

  displayedColumns: string[] = ['username', 'email', 'password','dob','contact','address'];
  dataSource!: MatTableDataSource<any>;
  list: any[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog, private api : ApiService){

  }
  ngOnInit():void{
    this.getAllDetails();
  }

  openDialog(){
    this.dialog.open(DialogComponent,{
      width : '40%'
    });
  }
  getAllDetails(){
    this.api.getDetails()
    .subscribe({
      next:(res)=>{
        debugger;
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort= this.sort;
        console.log({res})
      },
      error:(err)=>{
        alert(err);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
