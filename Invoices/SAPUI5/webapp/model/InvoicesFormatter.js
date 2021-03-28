/*eslint-env es6*/
//@ts-nocheck
sap.ui.define([],

    function () {

        return {
            invoiceStatus: function (sStatus) {

                const resourseBundle = this.getView().getModel("i18n").getResourceBundle();

                switch (sStatus) {
                    case 'A': return resourseBundle.getText("invoiceStatusA");
                    case 'B': return resourseBundle.getText("invoiceStatusB");
                    case 'C': return resourseBundle.getText("invoiceStatusC");
                    default: return sStatus;
                }

            }
        }

    });