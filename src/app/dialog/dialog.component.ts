import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {

  studentForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api:ApiService , private dialogRef: MatDialogRef<DialogComponent>){}

  ngOnInit(): void{
    this.studentForm = this.formBuilder.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      dob:['',Validators.required],
      contact:['',Validators.required],
      address:['',Validators.required]

    })
  }
  addDetails(){
    console.log(this.studentForm.value);
    if(this.studentForm.valid){
      this.api.postDetails(this.studentForm.value)
      .subscribe({
        next:(res)=>{
          alert("Details added successfully");
          this.studentForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("ERROR")
        }
        
      })
    }
  }
}
