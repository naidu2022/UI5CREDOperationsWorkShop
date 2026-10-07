namespace empdb;

using {cuid} from '@sap/cds/common';

entity Employees:cuid{
    Name:String(50);
    Designation:String(80);
    Email:String(50);
    Phone:Integer;
    Salary:Integer;
    Status:String(40);
    certifications:Composition of many Certifications on certifications.employee=$self;
}
entity Certifications: cuid{
    employee:Association to Employees;
    code:String;
    name:String;
}