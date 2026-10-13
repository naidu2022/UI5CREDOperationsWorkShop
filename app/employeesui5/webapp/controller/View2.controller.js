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

      }
  });
});