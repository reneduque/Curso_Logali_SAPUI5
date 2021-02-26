// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ns.SAPUI5.controller.App", {

            onInit: function () {

            },

            onOpenDialogHeader: function () {
                this.getOwnerComponent().openHelloDialog();
            }

        });

    });