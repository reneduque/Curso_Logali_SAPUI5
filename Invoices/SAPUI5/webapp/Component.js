// @ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "ns/SAPUI5/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog"
],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent 
     * @param {typeof sap.ui.core.ResourceModel} ResourceModel
     */
    function (UIComponent, Models, ResourceModel, HelloDialog) {

        return UIComponent.extend("ns.SAPUI5.Component", {

            metadata: {
                manifest: "json"
            },

            init: function () {
                //Llama la función init del padre
                UIComponent.prototype.init.apply(this, arguments);

                //Establece el modelo de datos en la vista
                this.setModel(Models.createRecipient());

                //Establece el modelo i18n en la vista
                //var i18nModel = new ResourceModel({ bundleName: "ns.SAPUI5.i18n.i18n" });
                //this.setModel(i18nModel, "i18n");

                this._helloDialog = new HelloDialog(this.getRootControl());

                //Crea las vistas basadas en la URL/hash
                this.getRouter().initialize();
            },

            exit: function () {
                this._helloDialog.destroy();
                delete this._helloDialog;
            },

            openHelloDialog: function () {
                this._helloDialog.open();
            }

        });

    });