// @ts-nocheck
sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press"
],
    /**
     * @param { typeof sap.ui.test.Opa5 } Opa5
     * @param { typeof sap.ui.test.actions.Press } Press
     */
    function (Opa5, Press) {

        Opa5.createPageObjects({
            onTheAppPage: {
                actions: {
                    iSayHelloDialogButton: function () {
                        return this.waitFor({
                            id: "helloDialogButton",
                            viewName: "ns.SAPUI5.view.HelloPanel",
                            actions: new Press(),
                            errorMessage: "No se encontró el botón 'Say Hello Dialog Button' en la vista HelloPanel"
                        });
                    }
                },

                assertions: {
                    iSeeTheHelloDialog: function () {
                        return this.waitFor({
                            controlType: "sap.m.Dialog",
                            success: function () {
                                Opa5.assert.ok(true, "Se abrió el diálogo correctamente");
                            },
                            errorMessage: "No se encontró el control de diálogo"
                        });
                    }
                }
            }
        });
    });