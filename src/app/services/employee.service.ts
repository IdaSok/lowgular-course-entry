import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { PersonModel } from '../model/person.model';
import { CreateEmployeeModel } from '../model/create-employee.model';
import {ApiResponse} from './api.response';
import {EmployeeResponse} from './employee.response';

@Injectable()
export class EmployeeService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<PersonModel[]> {
    return this._httpClient.get<ApiResponse<EmployeeResponse[]>>('https://dummy.restapiexample.com/employees').pipe(map((response:ApiResponse<EmployeeResponse[]>): PersonModel[] => {
        return response.data.map((employeeResponse:EmployeeResponse) => {
          return {
            personalNumber: employeeResponse.id,
            name: employeeResponse.employee_name,
            mail: employeeResponse.employee_name + "@lowgular.io",
            img: employeeResponse.profile_image,
          }
        });
        }));
  }

  create(employee: CreateEmployeeModel): Observable<any> {
    return this._httpClient.post('https://dummy.restapiexample.com/create', employee).pipe(map(_=>void 0));
  }

  delete(id: string): Observable<void> {
    return this._httpClient.delete('https://dummy.restapiexample.com/create' + id).pipe(map(_=>void 0));
  }
}
