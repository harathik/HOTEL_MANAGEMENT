import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Categories } from 'src/app/models/categories';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  category!: {id:number, name: string };
  editForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig
  ) {
    this.editForm = this.formBuilder.group({
      //id: [null,Validators.required],
      name:  [null,Validators.required],
    
    });
  }

  ngOnInit(): void {
    console.log("ngonit")
    this.category = this.config.data?.category;  
    this.setDefaults();  
    
  }
  ngOnChanges(): void {
   // this.setDefaults();
  }
  setDefaults() {
    if(this.category){
      this.editForm.setValue({
      //  id : this.category.id,
        name : this.category.name,
       
      });

    }

  }
  submit(): void {
    if(!this.category){
      this.commonService.addNewCategory(this.editForm.value).subscribe(
        (data) => { console.log(data);
            this.ref.close(data);
        },
  
        (error) => {console.log(`error occured while adding new category  ${error}`);
            this.ref.close({status:false, id : this.category.id});
      },
      );
    }else{
     
    this.commonService.updateCategory({id: this.category.id, name: this.editForm.get('name')?.value}).subscribe(
      (data) => { console.log(data);
          this.ref.close(data);
      },

      (error) => {console.log(`error occured while updating room details ${error}`);
          this.ref.close({status:false, id : this.category.id});
    },
    );
  }
  }

  reset(): void {
    this.editForm.reset();
  }

  cancel(): void {
    this.ref.close();
  }
}
