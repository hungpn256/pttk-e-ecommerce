export interface Customer{
  id?: number;
  mobile: string;
  email: string;
  fullName: FullName;
  address: Address;
  account: Account;

}
export interface FullName{
  id?:number;
  customerID?:number;
  lastName: string;
  midName: string;
  firstName: string;
}
export interface Address{
  id?:number;
  customerID?:number;
  number:number;
  street: string;
  district: string;
  city:string;
}
export interface Account{
  id?:number;
  customerID?:number;
  username: string;
  password: string;
}
