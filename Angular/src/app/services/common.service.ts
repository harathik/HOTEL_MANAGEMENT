import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { DropDownOptions } from '../models/drop-down-options';
import { Room } from '../models/room';
import { retry, catchError, map } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { Reservation } from '../models/reservation';
import { Categories } from '../models/categories';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
 
  private apiUrl ="http://localhost:20000/";
  private url = 'api/rooms/';
  private empUrl = 'api/employees';
  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`/reservation/getAll/reservations`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  


  reserve(bookingData: Reservation) : Observable<any>{
  // return of(true)
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'blob' as 'json' };

  
  return this.http.post<any>(`/reservation/save/reservation`, bookingData,httpOptions).pipe(
    map(response => {
      if (response instanceof HttpResponse) {
        response = response.clone<any>({ body: response.body });
      }

      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.error(error);
      return throwError(error);
    })
  );
  }

  getAllInventory()  : Observable<Item[]>{
    return this.http.get<Item[]>(`/hotel/getAll/inventory`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {

        console.error(error);
        return throwError(error);
      })
    );
  }

  addNewItem(item: Item): Observable<{ status: boolean }> {
    /*   return of({ status: true, roomId: 104 });
    product.id = null; */
    return this.http.post<Item>(`/hotel/save/inventory`, item).pipe(
      map((item: Item) => {
        return {
          status: true
         
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  updateItem(
    item: Item
  ): Observable<{ status: boolean }> {
    return this.http.put<Item>(`/hotel/update/inventory`, item).pipe(
      map((item: Item) => {
        return {
          status: true,
         
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  deleteInventory(item: Item) :Observable<any>{
    return this.http.delete(`/hotel/deleteinventory/byid/${item.id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`/hotel/getAll/staff`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  addNewEmployee(
    employee: Employee
  ): Observable<{ status: boolean; employeeId: string }> {
    return this.http.post<Employee>(`/hotel/save/staff`, employee).pipe(
      map((emp: Employee) => {
        return {
          status: true,
          employeeId: emp?.empId,
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  updateEmployee(
    employee: Employee
  ): Observable<{ status: boolean; employeeId: string }> {
    return this.http.post<Employee>(`/hotel/save/staff`, employee).pipe(
      map((emp: Employee) => {
        return {
          status: true,
          employeeId: emp?.empId,
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  deleteEmployee(
    employee: Employee
  ) {
    return this.http.delete(`/hotel/deletestaff/byid/${employee.id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  deleteRoom(room: Room) {
    return this.http.delete(`/hotel/deleteroom/byid/${room.id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  deleteCategory(categoy: Categories) {
    return this.http.delete(`/hotel/deleteCategory/byid/${categoy.id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  deleteReservation(booking: Reservation) :Observable<any>{
    return this.http.delete(`/reservation/deletereservations/byid/${booking.id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  getRoomTypes(): Observable<DropDownOptions[]> {
    const roomTypes: DropDownOptions[] = [
     /*  { label: 'Suite', value: 1 },
      { label: 'Deluxe', value: 2 },
      { label: 'Double', value: 3 },
      { label: 'Single', value: 4 },
      { label: 'Cottage', value: 5 }, */
    ];
    return of(roomTypes);
  }
  getBedTypes(): Observable<DropDownOptions[]> {
    const bedTypes: DropDownOptions[] = [
     /*  { label: 'Single', value: 1 },
      { label: 'Double', value: 2 },
      { label: 'Triple', value: 3 },
      { label: 'Quad', value: 4 }, */
    ];
    return of(bedTypes);
  }

  addNewRoom(room: Room): Observable<{ status: boolean; roomId: string }> {
    /*   return of({ status: true, roomId: 104 });
    product.id = null; */
    return this.http.post<Room>(`/hotel/save/room`, room).pipe(
      map((newRoom: Room) => {
        return {
          status: true,
          roomId: newRoom.roomNo,
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  addNewCategory(updatedCategory: Categories
    ): Observable<{ status: boolean; categoryId: string }> {
      
      return this.http.post<Categories>(`/hotel/save/category`, updatedCategory).pipe(
        map((newCategory: Categories) => {
          return {
            status: true,
            categoryId: newCategory.name,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
  updateRoom(
    updatedRoom: Room
  ): Observable<{ status: boolean; roomId: string }> {
    return this.http.put(`/hotel/update/room`, updatedRoom).pipe(
      map((data: any) => {
        console.log(`data updated in put uirl ${data}`);
        return {
          status: true, 
          roomId: updatedRoom.roomNo,
        };
      })
    );
  }
  updateCategory(
    updatedCategory: Categories
  ): Observable<any> {
   return this.http.put(`/hotel/update/category`, updatedCategory).pipe(
    map((data: any) => {
      console.log(`data updated in put uirl ${data}`);
      return {
        status: true, 
        categoryId: data?.roomNo,
      };
    })
  );
  }
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`/hotel/getAll/rooms`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getAllCategories(): Observable<Categories[]> {
    
    return this.http.get<Categories[]>(`/hotel/getAll/categories`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getAvailableRooms(checkin: Date, checkout: Date): Observable<Room[]> {
    return this.http.get<Room[]>(`/hotel/search/rooms/${checkin}/${checkout}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
   



}

}