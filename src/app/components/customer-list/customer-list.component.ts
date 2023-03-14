import { Component, Input } from '@angular/core';
import { CustomerModel } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  @Input()  
  get customerList(): CustomerModel[] { return this._customerList; }
  set customerList(customerList: CustomerModel[]) {
    this._customerList = customerList;
  }
  public _customerList:CustomerModel[] = new Array<CustomerModel>;  
}

