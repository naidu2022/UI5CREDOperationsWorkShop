//const { odata } = require("@sap/cds");

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, MessageBox, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("test.employeesui5.controller.View1", {
        onInit() {
            //MessageBox.success("Init");
            var oViewModel = new sap.ui.model.json.JSONModel({
                editMode: false,
                buttonEnabled: false
                //visibleButton:true
            });
            this.getView().setModel(oViewModel, "viewModel");
        },
        onCreateEmployee: async function () {
            //MessageBox.success("Hello Naidu");
            this.getView().getModel("viewModel").setProperty("/editMode", true);
            var listBinding = this.byId("employeeTable").getBinding("items");
            var newMemory = listBinding.create();
            var dialog = this.loadFragment();
            dialog.open();
            dialog.setBindingContext(newMemory);
            await newMemory.created();
            console.log("New Employee Data");
            console.log(newMemory.getObject());
            //MessageBox.success("New Employee Created Successfully");

        },
        onUpdateEmployee: async function () {
            var oTable = this.byId("employeeTable");
            var aSelectedItems = oTable.getSelectedItems();
            //MessageBox.success("You selected " + aSelectedItems.length +" Records");
            if (aSelectedItems.length > 1) {
                MessageBox.warning("Please select only single record to update the record");
            }
            else if (aSelectedItems.length < 1) {
                MessageBox.warning("Please select at least single record to update the record");
            }
            else {
                //MessageBox.success("Good You have selected single record");
                this.getView().getModel("viewModel").setProperty("/editMode", true);
                this.getView().getModel("viewModel").setProperty("/buttonEnabled", true);
                var oSelectedItem = aSelectedItems[0];
                var oContext = oSelectedItem.getBindingContext();
                var oDialog = this.loadFragment();
                oDialog.setBindingContext(oContext);
                //oDialog.getBeginButton().setText("Update");
                oDialog.open();
            }

        },
        onDeleteEmployee: function () {

            var oTable = this.byId("employeeTable");
            var aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length === 0) {
                MessageBox.error("Please select at least one record.");
                return;
            }

            var that = this;

            MessageBox.confirm(
                "Are you sure you want to delete selected employee(s)?",
                {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],

                    onClose: async function (sAction) {

                        if (sAction === MessageBox.Action.YES) {

                            try {

                                var oModel = that.getOwnerComponent().getModel();

                                var aContexts = aSelectedItems.map(function (oItem) {
                                    return oItem.getBindingContext();
                                });

                                await Promise.all(
                                    aContexts.map(function (oContext) {
                                        return oContext.delete("EmpGrp");
                                    }),
                                    oModel.submitBatch("EmpGrp")
                                );
                                //MessageBox.success("aaaa");
                                //oModel.submitBatch("EmpGrp");
                                //MessageBox.success("bbbbb");
                                MessageBox.success(
                                    aContexts.length +
                                    " Employee(s) deleted successfully."
                                );

                            } catch (oError) {

                                console.error(oError);

                                MessageBox.error(
                                    "Delete operation failed."
                                );
                            }
                        }
                    }
                }
            );
        },
        onSearchEmployee: async function (oEvent) {
            var sValue = oEvent.getParameter("query");
            var oTable = this.byId("employeeTable");
            var oBinding = oTable.getBinding("items");
            var aFilters = [];
            if (sValue) {
                aFilters.push(
                    new Filter({
                        filters: [
                            new Filter("Name", FilterOperator.Contains, sValue),
                            new Filter("Designation", FilterOperator.Contains, sValue),
                            new Filter("Email", FilterOperator.Contains, sValue),
                            //new Filter("Phone", FilterOperator.Contains, sValue),
                            //new Filter("Salary", FilterOperator.Contains, sValue),
                            new Filter("Status", FilterOperator.Contains, sValue)
                        ],
                        and: false
                    })
                );
            }
            oBinding.filter(aFilters);
            //MessageBox.success("Search function");
        },
        loadFragment: function () {
            if (!this.dialog) {
                this.dialog = sap.ui.xmlfragment(this.getView().getId(), "test.employeesui5.view.EmpCreate", this);
                this.getView().addDependent(this.dialog);
            }
            return this.dialog;
        },
        onCancelDialog: function () {
            this.dialog.close();
            //this.newMemory.delete();
            //this.newMemory=null;
        },
        onSaveDialog: async function () {
            try {
                // var oModel = this.getOwnerComponent().getModel();
                // oModel.submitBatch("EmpGrp");
                // this.loadFragment().close();
                var oModel = this.getOwnerComponent().getModel();
                await oModel.submitBatch("EmpGrp");
                MessageBox.success("Employee Saved Successfully");
                this.dialog.close();
            } catch (oError) {
                console.error(oError);
                MessageBox.error(
                    "Update Failed"
                );
            }



        },
        addCertifications: function () {
            //MessageBox.success("lskdfj");
            
            var certificationslistBinidng = this.byId("id_Certifications").getBinding("items");
            var certifyMemory = certificationslistBinidng.create();

        },
        onViewEmployee: function () {
            //MessageBox.success("lsdf");
            var oTable = this.byId("employeeTable");
            var aSelectedItems = oTable.getSelectedItems();
            //MessageBox.success("You selected " + aSelectedItems.length +" Records");
            if (aSelectedItems.length > 1) {
                MessageBox.warning("Please select only single record to update the record");
            }
            else if (aSelectedItems.length < 1) {
                MessageBox.warning("Please select at least single record to update the record");
            }
            else {
                //MessageBox.success("Good You have selected single record");
                this.getView().getModel("viewModel").setProperty("/editMode", false);
                var oSelectedItem = aSelectedItems[0];
                var oContext = oSelectedItem.getBindingContext();
                var oDialog = this.loadFragment();
                oDialog.setBindingContext(oContext);
                //oDialog.getBeginButton().setText("Update");
                oDialog.open();
            }
        },
        onSelectionChange: function () {

            var oTable = this.byId("employeeTable");
            var aSelectedItems = oTable.getSelectedItems();

            var bHasSelection = aSelectedItems.length > 0;
            if (bHasSelection > 0) {
                this.getView()
                    .getModel("viewModel")
                    .setProperty("/buttonEnabled", true);
            } else {
                this.getView()
                    .getModel("viewModel")
                    .setProperty("/buttonEnabled", false);
            }

        },
        /////If we want to keep the single button in the header then we need to delete this function 
        //and we need to remove employee> from the  <Input value="{employee>code}" 
        // editable="{viewModel>/editMode}"/> and 
        //we need to remove the employee> from the  <Table id="id_Certifications" 
        // items="{employee>/certifications}">
        //and we need to remove employee> from the   <Input value="{employee>/Designation}" 
        // id="id_Designation" editable="{viewModel>/editMode}"/> for all fields
        onRowViewEmployee: async function (oEvent) {
            //MessageBox.success("lskdj");
            var oButton = oEvent.getSource();

            var oContext = oButton.getBindingContext();
            this.getView().getModel("viewModel").setProperty("/editMode", false);
            if (!this.oEmployeeDialog) {
                this.oEmployeeDialog = await this.loadFragment({
                    name: "employeeui.fragment.EmployeeDialog"
                });
            }

            this.oEmployeeDialog.setBindingContext(oContext);

            this.getView()
                .getModel("viewModel")
                .setProperty("/editMode", false);

            this.oEmployeeDialog.open();
        },
        onRowEditEmployee: async function (oEvent) {

            var oButton = oEvent.getSource();

            var oContext = oButton.getBindingContext();

            if (!this.oEmployeeDialog) {
                this.oEmployeeDialog = await this.loadFragment({
                    name: "employeeui.fragment.EmployeeDialog"
                });
            }

            this.oEmployeeDialog.setBindingContext(oContext);

            this.getView()
                .getModel("viewModel")
                .setProperty("/editMode", true);

            this.oEmployeeDialog.open();

        }

    });
});