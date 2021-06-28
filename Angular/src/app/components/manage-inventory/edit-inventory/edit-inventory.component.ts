import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Item } from 'src/app/models/item';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit {
  item!: Item;
  editForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig
  ) {
    this.editForm = this.formBuilder.group({
      //itemId: [null,Validators.required],
      name:  [null,Validators.required],
      price: [null,Validators.required],
      quantity: [null,Validators.required],
    });
  }

  ngOnInit(): void {
    console.log("ngonit")
    this.item = this.config.data?.item;  
    this.setDefaults();  
    
  }
  ngOnChanges(): void {
   // this.setDefaults();
  }
  setDefaults() {
    if(this.item){
      this.editForm.setValue({
       // itemId : this.item.itemId,
        name : this.item.name,
        price: this.item.price,
        quantity : this.item.quantity,
      });

    }

  }
  submit(): void {
    if(!this.item){
      this.commonService.addNewItem(this.editForm.value).subscribe(
        (data) => { console.log(data);
            this.ref.close(data);
        },
  
        (error) => {console.log(`error occured while adding new item  ${error}`);
            this.ref.close({status:false, roomId : this.item?.id});
      },
      );
    }else{
      const itemId = {id: this.item.id};
      const item : Item ={
       ...itemId, ...this.editForm.value
      }
    this.commonService.updateItem(item).subscribe(
      (data) => { console.log(data);
          this.ref.close(data);
      },

      (error) => {console.log(`error occured while updating room details ${error}`);
          this.ref.close({status:false, roomId : this.item?.id});
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
