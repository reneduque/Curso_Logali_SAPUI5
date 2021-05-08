//@ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],
    /**
     * @param{ typeof sap.ui.core.util.MockServer } MockServer
     * @param{ typeof sap.ui.model.json.JSONModel } JSONModel
     * @param{ typeof sap.base.util.UriParameters } UriParameters
     * @param{ typeof sap.base.Log } Log
     */
    function (MockServer, JSONModel, UriParameters, Log) {
        "use strict";

        var oMockServer,
            _sAppPath = "ns/SAPUI5/",
            _sJSONFilesPath = _sAppPath + "localService/mockdata";

        var oMockServerInterface = {

            /**
             * Inicializa el mock server asíncrono
             * @protected
             * @param {object} oOptionsParameter
             * @returns{Promise} una promesa que se resuelve cuando el mock server ha sido iniciado 
             */
            init: function (oOptionsParameter) {

                var oOptions = oOptionsParameter || {};

                return new Promise (function (fnResolve, fnReject) {
                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParameters = new UriParameters(window.location.href);

                        //Analiza el manifiesto para el URI de los metadatos locales
                        var sJSONFilesUrl = sap.ui.require.toUrl(_sJSONFilesPath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                        var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                        //Asegurar que haya un Slash al final de la Url
                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                        //Crear una instancia del mock server o parar si existe una y reinicializar
                        if (!oMockServer) {
                            oMockServer = new MockServer({
                                rootUri: sMockServerUrl
                            });
                        } else {
                            oMockServer.stop();
                        };

                        //Configurar el mock server con las opciones dadas o un retraso predeterminado de 0.5sg
                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500 )
                        });

                        //Simular todas las solicitudes usando Mock Data
                        oMockServer.simulate(sMetadataUrl, {
                            sMockdataBaseUrl: sJSONFilesUrl,
                            bGenerateMissingMockData: true
                        });

                        var aRequests = oMockServer.getRequests();

                        //Armar una respuesta de error por cada petición
                        var fnResponse = function (iErrCode, sMessage, aRequest) {
                            aRequest.response = function (oXhr) {
                                oXhr.respond(iErrCode, {"Content-Type" : "text/plain;charset=utf-8"}, sMessage);
                            };
                        };

                        //Simular los errores de metadata
                        if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                            aRequests.forEach(function (aEntry) {
                                if (aEntry.path.toString().indexof("$metadata") > -1) {
                                    fnResponse(500, "metadata Error", aEntry);
                                }
                            });
                        };

                        //Simular errores por petición
                        var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                        var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                        if (sErrorParam) {
                            aRequests.forEach(function (aEntry) {
                                fnResponse(iErrorCode, sErrorParam, aEntry);
                            });
                        };

                        //Establecer la petición e iniciar el servidor
                        oMockServer.setRequests(aRequests);
                        oMockServer.start();

                        Log.info("Ejecutando la aplicación con mock data");
                        fnResolve();
                    });

                    oManifestModel.attachRequestFailed(function () {
                        var sError = "Falló al cargar la aplicación manifest";

                        Log.error(sError);
                        fnReject(new Error(sError));
                    });
                });
            }
        };

        return oMockServerInterface;

    });