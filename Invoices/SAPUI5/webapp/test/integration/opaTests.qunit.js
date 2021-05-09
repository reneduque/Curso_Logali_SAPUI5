// @ts-nocheck
/* eslint-disable no-undef */
/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require([
        "ns/SAPUI5/test/integration/NavigationJourney"
    ], function () {
        QUnit.start();
    });
});