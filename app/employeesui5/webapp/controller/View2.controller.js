sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox"
], (BaseController,MessageBox) => {
  "use strict";

  return BaseController.extend("test.employeesui5.controller.View2", {
      onInit() {        
      },
      BacktoView1:function(){
        this.getOwnerComponent().getRouter().navTo("RouteView1");
      },
      alignment:function(oEvent){
        MessageBox.success("Align");
        //var idvalue=oEvent.text;
        
        var value=this.byId("id_empname");
        var inputwidth=value.getWidth();
        this.byId("idwelcom").setTextAlign(value);
        this.byId("idwelcom").setText("Hello Naidu"+ value);

      },
      ValidatetheForm:function(){
         this.byId("Input_EmpID").setValueState("None");
        var allFilled=true;
        //MessageBox.success("Validate");
        var empID=this.byId("Input_EmpID").getValue();
        if(empID === "")
        {
          MessageBox.error("Please enter Emp ID");
          this.byId("Input_EmpID").setValueState("Error");
          this.byId("Input_EmpID").setValueStateText("Employee Id is Mandatory");
          //empID.setValueState("Error");
        }
        else{
            var empRegExp=/^\d{6}$/;            
          if(!empID.match(empRegExp)){
            allFilled=false;
            this.byId("Input_EmpID").setValueState("Error");
            this.byId("Input_EmpID").setValueStateText("Employee Id is not Valid");
          }
        }
      }
  });
});