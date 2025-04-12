import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators} from "@angular/forms"
@Component({
  selector: 'app-registro',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{

  formGroup ?:FormGroup

  ngOnInit(): void {
      
    this.formGroup = new FormGroup({

      nombre: new FormControl("",[Validators.min(4),Validators.required,Validators.maxLength(9)]),
      apellido : new FormControl("",[Validators.min(5),Validators.required,Validators.maxLength(12)]),
      edad : new FormControl("",[Validators.required])
    })
  }

}
