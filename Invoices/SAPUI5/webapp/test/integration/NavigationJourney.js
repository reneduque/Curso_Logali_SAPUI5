// @ts-nocheck
sap.ui.define([
    "ns/SAPUI5/localService/mockserver",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel"
],
    /**
     * @param { typeof sap.ui.test.opaQunit } opaQunit
     */
    function (mockserver, opaQunit) {

        QUnit.module("Navegación");

        opaQunit("Debe abrir 'Hello Dialog'", function (Given, When, Then) {

            //Inicializar el Mock Server
            mockserver.init();
            
            //Arreglos
            Given.iStartMyUIComponent({
                componentConfig: {
                    name: "ns.SAPUI5"
                }
            });

            //Acciones
            When.onTheAppPage.iSayHelloDialogButton();

            //Afirmaciones
            Then.onTheAppPage.iSeeTheHelloDialog();

            //Limpiar
            Then.iTeardownMyApp();

        });
    });