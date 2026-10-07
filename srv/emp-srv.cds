using {empdb as myemp } from '../db/schema';

service employeeService{
    entity Employees as projection on myemp.Employees;
    entity Certifications as projection on myemp.Certifications;
}