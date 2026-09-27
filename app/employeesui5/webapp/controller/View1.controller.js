sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, MessageBox, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("test.employeesui5.controller.View1", {
        onInit() {
        },
        onCreateEmployee: async function () {
            //MessageBox.success("Hello Naidu");
            var listBinding = this.byId("employeeTable").getBinding("items");
            var newMemory = listBinding.create();
            var dialog = this.loadFragment();
            dialog.open();
            dialog.setBindingContext(newMemory);
            await newMemory.created();
            console.log("New Employee Data");
            console.log(newMemory.getObject());
            MessageBox.success("New Employee Created Successfully");

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
                var oSelectedItem = aSelectedItems[0];
                var oContext = oSelectedItem.getBindingContext();
                var oDialog = this.loadFragment();
                oDialog.setBindingContext(oContext);
                oDialog.getBeginButton().setText("Update");
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
        },
        onSaveDialog: function () {
            var oModel = this.getOwnerComponent().getModel();
            oModel.submitBatch("EmpGrp");
            this.loadFragment().close();

        }
    });
});