import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room';
import { CommonService } from 'src/app/services/common.service';
import {DynamicDialogRef,DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
})
export class EditRoomComponent implements OnInit, OnChanges {
  room!: Room;
  editForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig
  ) {
    this.editForm = this.formBuilder.group({
      roomNo: [null,Validators.required],
      floor:  [null,Validators.required],
      category: [null,Validators.required],
      capacity: [null,Validators.required],
      price: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log("ngonit")
    this.room = this.config.data?.room;  
    this.setDefaults();  
    
  }
  ngOnChanges(): void {
   // this.setDefaults();
  }
  setDefaults() {
    if(this.room){
      this.editForm.setValue({
        roomNo : this.room.roomNo,
        floor : this.room.floor,
        category: this.room.category,
        capacity : this.room.capacity,
        price : this.room.price
      });

    }

  }
  submit(): void {
    if(!this.room){
      this.commonService.addNewRoom(this.editForm.value).subscribe(
        (data) => { console.log(data);
            this.ref.close(data);
        },
  
        (error) => {console.log(`error occured while adding new room  $error`);
            this.ref.close({status:false, roomId : this.room.id});
      },
      );
    }else{
       const roomId = {id: this.room.id};
      const udatedRoom : Room ={
       ...roomId, ...this.editForm.value
      }
    this.commonService.updateRoom(udatedRoom).subscribe(
      (data) => { console.log(data);
          this.ref.close(data);
      },

      (error) => {console.log(`error occured while updating room details $error`);
          this.ref.close({status:false, roomId : this.room.id});
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
