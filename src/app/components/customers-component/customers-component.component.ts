import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerModel } from 'src/app/models/customer';
import { Response } from 'src/app/models/response';
import { CustomerService } from 'src/app/services/customers.service';
@Component({
  selector: 'app-customers-component',
  templateUrl: './customers-component.component.html',
  styleUrls: ['./customers-component.component.css']
})

export class CustomersComponent {
  public response: Response;
  public customerList: CustomerModel[];
  public customerForm = new FormGroup({
      customerName : new FormControl("", [Validators.required, Validators.maxLength(50)]),
      customerLastName : new FormControl("", [Validators.required, Validators.maxLength(50)]),
      customerEmail : new FormControl("", [Validators.required, Validators.maxLength(100), Validators.email]),
      customerDNI : new FormControl("", [Validators.required, Validators.maxLength(12)]),
  });

  public constructor(public custSvc : CustomerService){}

  ngOnInit(){
    this.customerGet();
  }

  public Submit(isEdtit:boolean){
    const modelToSend = {
      active : true,
      createAt : "",
      id: "",
      identification : this.customerForm.get("customerDNI")?.value?.toString(),
      name : this.customerForm.get("customerName")?.value,
      lastName : this.customerForm.get("customerLastName")?.value,
      mail : this.customerForm.get("customerEmail")?.value
    } as CustomerModel    
    if(isEdtit === false){ 
      this.SaveCustomer(modelToSend)                
    }
  }

  private SaveCustomer(customer:CustomerModel){
    this.custSvc.PostCustomer(customer).pipe().subscribe(resultApi => {
      resultApi && this.customerGet()
      alert(resultApi.msg)  
    })
  }

  private customerGet(){
    this.custSvc.GetCustomer().pipe().subscribe(lst => {
      this.customerList = lst; 
    })
  }
}