import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CustomerModel } from '../models/customer';
import { Response } from 'src/app/models/response';
@Injectable({
    providedIn: 'root',
  })

export class CustomerService {
  constructor(private http: HttpClient) { }
  baseUrl = "https://localhost:5207/"
   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  public GetCustomer():Observable<CustomerModel[]>{
    return this.http.get<CustomerModel[]>(this.baseUrl + "Customers").pipe(retry(1), catchError(this.handleError));
  }

  public PostCustomer(customer:CustomerModel):Observable<Response>{
    return this.http.post<Response>(this.baseUrl + "Customers", customer).pipe(retry(1), catchError(this.handleError));
  }
  
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}