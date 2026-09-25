sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("test.employeesui5.controller.View1", {
        onInit() {
        },
        onCreateEmployee: async function () {
            //MessageBox.success("Hello Naidu");
            var listBinding=this.byId("employeeTable").getBinding("items");
            var newMemory=listBinding.create();                        
            var dialog=this.loadFragment();
            dialog.open();
            dialog.setBindingContext(newMemory);
            await newMemory.created();
            console.log("New Employee Data");
            console.log(newMemory.getObject());
            MessageBox.success("New Employee Created Successfully");           

        },
        loadFragment: function () {
            if (!this.dialog) {
                this.dialog = sap.ui.xmlfragment(this.getView().getId(),"test.employeesui5.view.EmpCreate",this);
                this.getView().addDependent(this.dialog);
            }
            return this.dialog;
        },
        onCancelDialog:function(){
            this.dialog.close();
        },
        onSaveDialog:function(){            
            var oModel=this.getOwnerComponent().getModel();
            oModel.submitBatch("EmpGrp");
            this.loadFragment().close();
           
        }
    });
});