import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Categories } from 'src/app/models/categories';
import { Item } from 'src/app/models/item';
import { Room } from 'src/app/models/room';
import { CommonService } from 'src/app/services/common.service';
import { EditCategoryComponent } from '../manage-rooms/edit-category/edit-category.component';
import { EditRoomComponent } from '../manage-rooms/edit-room/edit-room.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.css'],
  providers:[DialogService,MessageService]
})
export class ManageInventoryComponent implements OnInit {

  items : Item[] =[]
  constructor(
    private commonService: CommonService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchInventory();
  }

  private fetchInventory() {
    this.commonService.getAllInventory().subscribe(
      (data) => (this.items = data),
      (err) => console.log(`error occured while fetchin all rooms ${err}`),
      () => console.log('fetching all rooms service executed')
    );
  }

  
  editItemDetails(item: Item) {
    console.log(`room selected for editing ${item} `);
    const ref = this.dialogService.open(EditInventoryComponent, {
      showHeader: false,
      width: '50%',
      data: {
        item: item,
      },
      closeOnEscape: false,
      dismissableMask: false,
      closable: false,
      style: {
        border: '1px solid  black',
        padding: 0,
        'border-radius': '24px',
        'background-color': 'transparent',
      },
      contentStyle: {
        'max-height': '500px',
        overflow: 'auto',
        padding: 0,
        'border-radius': '24px',
        'background-color': 'transparent',
        border: '1 px solid black',
      },
    });
    ref.onClose.subscribe((data: { status: boolean; itemId: string }) => {
      if (data && data.status === true) {
        this.fetchInventory();
        this.messageService.add({
          severity: 'success',
          summary: 'Inventory update status',
          detail: 'Inventory updated successfully',
        });
      }  else if(data) {
        this.messageService.add({
          severity: 'error',
          summary: 'Inventory update status',
          detail:
            'Inventory has failed to update. PLease try again',
        });
      }
    });
  }


  addNewItem(): void {
    const ref = this.dialogService.open(EditInventoryComponent, {
      showHeader: false,
      width: '50%',
      data: {
        //employee: employee,
      },
      closeOnEscape: false,
      dismissableMask: false,
      closable: false,
      style: {
        border: '1px solid  black',
        padding: 0,
        'border-radius': '24px',
        'background-color': 'transparent',
      },
      contentStyle: {
        'max-height': '500px',
        overflow: 'auto',
        padding: 0,
        'border-radius': '24px',
        'background-color': 'transparent',
        border: '1 px solid black',
      },
    });

    ref.onClose.subscribe((data: { status: boolean; roomId: string }) => {
      this.fetchInventory();
      if (data && data.status === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'Inventory Add status',
          detail: 'Inventory Added successfully',
        });
      } else if(data) {
        this.messageService.add({
          severity: 'error',
          summary: 'Inventory Add status',
          detail:
            'Inventory has failed to create Please try again',
        });
      }
    });
  }
 
  deleteItemDetails(item: Item) {
    this.commonService.deleteInventory(item).subscribe(
      (data) => {
        this.fetchInventory();
        this.messageService.add({
          severity: 'success',
          summary: 'Inventory Delete status',
          detail: `Inventory Deleted successfully`,
        });
        
      },
      (err) => this.messageService.add({
        severity: 'error',
        summary: 'Inventor Add status',
        detail:
          `${err} PLease try again`,
      }),
      () => console.log('fetching all Inventory service executed')
    );
  }

}
