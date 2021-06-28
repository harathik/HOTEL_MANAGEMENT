import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService  {

  constructor() { }
  createDb()  {
    return { rooms: [
      {
        id: 101,
        roomNo:101,
        category: 'suite',
        floor: 1,
        capacity: 6,
        price: 1200.0,
        selected: false,
      },

      {
        id: 102,
        roomNo:101,
        category: 'deluxe',
        floor: 1,
        capacity: 6,
        price: 2000.0,
        selected: false,
      },
      {
        id: 103,
        roomNo:101,
        category: 'cottage',
        floor: 1,
        capacity: 6,
        price: 5200.0,
        selected: false,
      },
    ],
  employees :[
    {
      id: 1,
      empId:1,
      firstName :'harathi',
      lastName : 'string',
      email : 'string@gmail.com',
      contactNo : 9151255202,
      dateOfBirth : new Date('05/09/2000'),
      role : 'Admin',
      salary : 200000 ,
      joinedDate :new Date('05/09/2000')
    },
    {
      id: 2,
      empId:1,
      firstName :'harathi',
      lastName : 'string',
      email : 'string@gmail.com',
      contactNo : 9151255202,
      dateOfBirth : new Date('05/09/2000'),
      role : 'Admin',
      salary : 200000 ,
      joinedDate :new Date('05/09/2000')
    }
  ]
  };
  }
}
