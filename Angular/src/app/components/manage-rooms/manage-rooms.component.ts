import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/messages';
import { Room } from 'src/app/models/room';
import { CommonService } from 'src/app/services/common.service';
import { DialogService } from 'primeng/dynamicdialog';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { MessageService } from 'primeng/api';
import { Categories } from 'src/app/models/categories';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrls: ['./manage-rooms.component.css'],
  providers: [DialogService, MessageService],
})
export class ManageRoomsComponent implements OnInit {
  rooms: Room[] = [];
  roomSelectedForEdit!: Room;
  isEditing: boolean = false;
  isNewRoom: boolean = false;
  showmsg: boolean = false;
  message: string = '';
  statusMessages: Message[] = [];
  categories :  Categories[] =[];

  constructor(
    private commonService: CommonService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchAllRooms();
    this.fetchAllCategories();
  }

  private fetchAllCategories() {
    this.commonService.getAllCategories().subscribe(
      (data) => (this.categories = data),
      (err) => console.log(`error occured while fetchin all rooms ${err}`),
      () => console.log('fetching all categories service executed')
    );
  }

  private fetchAllRooms() {
    this.commonService.getAllRooms().subscribe(
      (data) => (this.rooms = data),
      (err) => console.log(`error occured while fetching all rooms ${err}`),
      () => console.log('fetching all rooms service executed')
    );
  }

  editRoomDetails(room: Room, index: number) {
    console.log(`room selected for editing ${room} and index no is ${index} `);
    this.isEditing = true;
    this.roomSelectedForEdit = room;
    const ref = this.dialogService.open(EditRoomComponent, {
      showHeader: false,
      width: '50%',
      data: {
        room: room,
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
    ref.onClose.subscribe((data: { status: boolean }) => {
      if (data && data.status === true) {
        this.fetchAllRooms();
        this.messageService.add({
          severity: 'success',
          summary: 'Room update status',
          detail: 'Room updated successfully',
        });
      } else if(data && data.status===false ){
        this.messageService.add({
          severity: 'error',
          summary: 'Room update status',
          detail:
            'Room  has failed to update. PLease try again',
        });
      }
    });
  }

  editCategoryDetails(category: Categories) {
    console.log(`room selected for editing ${category} `);
    this.isEditing = true;
    const ref = this.dialogService.open(EditCategoryComponent, {
      showHeader: false,
      width: '50%',
      data: {
        category: category,
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
    ref.onClose.subscribe((data: { status: boolean }) => {
      if (data && data.status === true) {
        this.fetchAllCategories();
        this.messageService.add({
          severity: 'success',
          summary: 'Category update status',
          detail: 'Category updated successfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Category update status',
          detail:
            'Category  has failed to update Please try again',
        });
      }
    });
  }


  addNewRoom(): void {
    this.isNewRoom = true;
    const ref = this.dialogService.open(EditRoomComponent, {
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

    ref.onClose.subscribe((data: { status: boolean }) => {
      if (data && data.status === true) {
        this.fetchAllRooms();
        this.messageService.add({
          severity: 'success',
          summary: 'Room Add status',
          detail: 'Room created successfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Room Add status',
          detail:
            'Room  has failed to create. PLease try again',
        });
      }
    });
  }
  addNewCategory(): void {
    const ref = this.dialogService.open(EditCategoryComponent, {
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

    ref.onClose.subscribe((data: { status: boolean}) => {
      if (data && data.status === true) {
        this.fetchAllCategories();
        this.messageService.add({
          severity: 'success',
          summary: 'Category Add status',
          detail: 'Categoy Added successfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Category Add status',
          detail:
            'Category  has failed to add Please try again',
        });
      }
    });
  }

  deleteRoomDetails(room : Room) {
    this.commonService.deleteRoom(room).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Room Delete status',
          detail: `Room ${data} Deleted successfully`,
        });
        this.fetchAllRooms();
      },
      (err) => this.messageService.add({
        severity: 'error',
        summary: 'Category Add status',
        detail:
          `${err} PLease try again`,
      }),
      () => console.log('fetching all rooms service executed')
    );
  }
  deleteCategoryDetails(category : Categories) {
    this.commonService.deleteCategory(category).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Category Delete status',
          detail: `Category  Deleted successfully`,
        });
        this.fetchAllCategories();
      },
      (err) => this.messageService.add({
        severity: 'error',
        summary: 'Category Add status',
        detail:
          `${err} PLease try again`,
      }),
      () => console.log('fetching all categoories service executed')
    );
  }

  
}
