namespace empdb;

using {cuid} from '@sap/cds/common';

entity Employees:cuid{
    Name:String(50);
    Designation:String(80);
    Email:String(50);
    Phone:Integer;
    Salary:Integer;
    Status:String(40);
}