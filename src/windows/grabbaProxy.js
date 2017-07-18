// cordova wraps this file inside something which looks like: "cordova.define("com.grabba.cordova.plugin.GrabbaProxy", function(require, exports, module) { ......... });"
    //Convenience function to set/release callbacks
    var setCallback = function (newCallback, oldCallback) {
        if (oldCallback) {
            oldCallback(null, {
                status: cordova.callbackStatus.NO_RESULT,
                keepCallback: false
            });
        }

        return newCallback;
    };
    //Convenience object to keep callbacks
    var keepCallback = {
        status: cordova.callbackStatus.OK,
        keepCallback: true
    };

    //Grabba callbacks
    var GrabbaConnectedCallback = null;
    var GrabbaConnected = function () {
        if (GrabbaConnectedCallback) {
            GrabbaConnectedCallback(true, keepCallback);
        }
    };
    var GrabbaDisconnectedCallback = null;
    var GrabbaDisconnected = function () {
        if (GrabbaDisconnectedCallback) {
            GrabbaDisconnectedCallback(false, keepCallback);
        }
    };

    var GrabbaLeftButtonCallback = null;
    var GrabbaLeftButton = function () {
        if (GrabbaLeftButtonCallback) {
            GrabbaLeftButtonCallback(null, keepCallback);
        }
    };

    var GrabbaRightButtonCallback = null;
    var GrabbaRightButton = function () {
        if (GrabbaRightButtonCallback) {
            GrabbaRightButtonCallback(null, keepCallback);
        }
    };

    //GrabbaBarcode callbacks
    var GrabbaBarcodeTriggeredCallback = null;
    var GrabbaBarcodeTriggered = function () {
        if (GrabbaBarcodeTriggeredCallback) {
            GrabbaBarcodeTriggeredCallback(null, keepCallback);
        }
    };
    var GrabbaBarcodeScannedCallback = null;
    var GrabbaBarcodeScanned = function (barcodeData) {
        if (GrabbaBarcodeScannedCallback) {
            GrabbaBarcodeScannedCallback({
                data: barcodeData.target.lookup("data"),
                symbology: barcodeData.target.lookup("symbology"),
                symbologyInt: barcodeData.target.lookup("symbologyInt")
            }, keepCallback);
        }
    };
    var GrabbaBarcodeStoppedCallback = null;
    var GrabbaBarcodeStopped = function () {
        if (GrabbaBarcodeStoppedCallback) {
            GrabbaBarcodeStoppedCallback(null, keepCallback);
        }
    };
    var GrabbaBarcodeTimedOutCallback = null;
    var GrabbaBarcodeTimedOut = function () {
        if (GrabbaBarcodeTimedOutCallback) {
            GrabbaBarcodeTimedOutCallback(null, keepCallback);
        }
    };

    //GrabbaProxcard callbacks
    var GrabbaProxcardTriggeredCallback = null;
    var GrabbaProxcardTriggered = function () {
        if (GrabbaProxcardTriggeredCallback) {
            GrabbaProxcardTriggeredCallback(null, keepCallback);
        }
    };
    var GrabbaProxcardScannedCallback = null;
    var GrabbaProxcardScanned = function (ProxcardData) {
        if (GrabbaProxcardScannedCallback) {
            GrabbaProxcardScannedCallback({
                data: ProxcardData.target.lookup("data"),
                type: ProxcardData.target.lookup("type"),
                typeInt: ProxcardData.target.lookup("typeInt")
            }, keepCallback);
        }
    };
    var GrabbaProxcardStoppedCallback = null;
    var GrabbaProxcardStopped = function () {
        if (GrabbaProxcardStoppedCallback) {
            GrabbaProxcardStoppedCallback(null, keepCallback);
        }
    };
    var GrabbaProxcardTimedOutCallback = null;
    var GrabbaProxcardTimedOut = function () {
        if (GrabbaProxcardTimedOutCallback) {
            GrabbaProxcardTimedOutCallback(null, keepCallback);
        }
    };

    //GrabbaPassport callbacks
    var GrabbaPassportReadCallback = null;
    var GrabbaPassportRead = function (passportData) {
        if (GrabbaPassportReadCallback) {
            GrabbaPassportReadCallback(passportData.target, keepCallback);
        }
    };


    //GrabbaMagstripe callbacks
    var GrabbaMagstripeReadCallback = null;
    var GrabbaMagstripeRead = function (tracks) {
        if (GrabbaMagstripeReadCallback) {
            GrabbaMagstripeReadCallback({
                track1: tracks.target.lookup("track1"),
                track2: tracks.target.lookup("track2"),
                track3: tracks.target.lookup("track3"),
            }, keepCallback);
        }
    };

    var GrabbaMagstripeRawReadCallback = null;
    var GrabbaMagstripeRawRead = function (tracks) {
        if (GrabbaMagstripeRawReadCallback) {
            GrabbaMagstripeRawReadCallback({
                track1: tracks.target.lookup("track1"),
                track2: tracks.target.lookup("track2"),
                track3: tracks.target.lookup("track3"),
            }, keepCallback);
        }
    };

    //GrabbaFingerprint callbacks
    var GrabbaFingerprintTemplateCallback = null;
    var GrabbaFingerprintTemplate = function (template) {
        if (GrabbaFingerprintTemplateCallback) {
            GrabbaFingerprintTemplateCallback({
                data: template.target.lookup("data"),
                type: template.target.lookup("type"),
                typeInt: template.target.lookup("typeInt")
            }, keepCallback);
        }
    };
    var GrabbaFingerprintImageCallback = null;
    var GrabbaFingerprintImage = function (image) {
        if (GrabbaFingerprintImageCallback) {
            GrabbaFingerprintImageCallback({
                data: image.target.lookup("data"),
                numRows: image.target.lookup("numRows"),
                numColumns: image.target.lookup("numColumns"),
                type: image.target.lookup("type"),
                typeInt: image.target.lookup("typeInt")
            }, keepCallback);
        }
    };
    var GrabbaFingerprintUserMessageCallback = null;
    var GrabbaFingerprintUserMessage = function (userMessage) {
        if (GrabbaFingerprintUserMessageCallback) {
            var record = userMessage.target.lookup("userRecord");
            var userID = record.lookup("userID");
            var userData = record.lookup("userData");
            var userRecord = null;
            if (userID && userData)
            {
                userRecord = {
                    userID: userID,
                    userData: userData
                }
            }

            GrabbaFingerprintUserMessageCallback({
                text: userMessage.target.lookup("text"),
                id: userMessage.target.lookup("id"),
                number: userMessage.target.lookup("number"),
                total: userMessage.target.lookup("total"),
                userRecord: userRecord
            }, keepCallback);
        }
    };

    //GrabbaMRTD callbacks
    var GrabbaMRTDProgressCallback = null;
    var GrabbaMRTDProgress = function (percentage) {
        if (GrabbaMRTDProgressCallback) {
            GrabbaMRTDProgressCallback(percentage.target, keepCallback);
        }
    };

    module.exports = {
        Grabba: function (callback, onError, params) {
            var command = params[0];
            if (command.command == 'isConnected') {
                GrabbaDriver.Grabba.instance().isConnectedAsync(callback, onError);
            }
            else if (command.command == 'clearExclusiveAccessCallback') {
                //There is no concept of exclusive access on Windows.
            }
            else if (command.command == 'registerExclusiveAccessCallback') {
                //There is no concept of exclusive access on Windows
                //We will invoke an exclusive access granted callback immediately.
                callback(true);
            }
            else if (command.command == 'clearConnectionCallback') {
                GrabbaDriver.Grabba.instance().ongrabbaconnectedevent = setCallback(null, GrabbaConnectedCallback);
                GrabbaDriver.Grabba.instance().ongrabbadisconnectedevent = setCallback(null, GrabbaDisconnectedCallback);
            }
            else if (command.command == 'registerConnectionCallback') {
                GrabbaConnectedCallback = setCallback(callback, GrabbaConnectedCallback);
                GrabbaDriver.Grabba.instance().ongrabbaconnectedevent = GrabbaConnected;
                GrabbaDisconnectedCallback = setCallback(callback, GrabbaDisconnectedCallback);
                GrabbaDriver.Grabba.instance().ongrabbadisconnectedevent = GrabbaDisconnected;
            }
            else if (command.command == 'clearButtonCallbacks') {
                GrabbaDriver.Grabba.instance().onleftbuttonevent = setCallback(null, GrabbaLeftButtonCallback);
                GrabbaDriver.Grabba.instance().onrightbuttonevent = setCallback(null, GrabbaRightButtonCallback);
            }
            else if (command.command == 'registerLeftButtonCallback') {
                GrabbaLeftButtonCallback = setCallback(callback, GrabbaLeftButtonCallback);
                GrabbaDriver.Grabba.instance().onleftbuttonevent = GrabbaLeftButton;
            }
            else if (command.command == 'registerRightButtonCallback') {
                GrabbaRightButtonCallback = setCallback(callback, GrabbaRightButtonCallback);
                GrabbaDriver.Grabba.instance().onrightbuttonevent = GrabbaRightButton;
            }
            else if (command.command == "getDriverVersion") {
                GrabbaDriver.Grabba.instance().getDriverVersionAsync(callback, onError);
            }
            else if (command.command == 'getBatteryLevel') {
                GrabbaDriver.Grabba.instance().getBatteryLevelAsync(callback, onError);
            }
            else if (command.command == 'getFirmwareVersion') {
                GrabbaDriver.Grabba.instance().getFirmwareVersionAsync(callback, onError);
            }
            else if (command.command == 'getHardwareVersion') {
                GrabbaDriver.Grabba.instance().getHardwareVersionAsync(callback, onError);
            }
            else if (command.command == 'getModel') {
                GrabbaDriver.Grabba.instance().getModelNumberAsync(callback, onError);
            }
            else if (command.command == 'getLeftButtonState') {
                GrabbaDriver.Grabba.instance().getLeftButtonStateAsync(callback, onError);
                onError('Function not supported.');
            }
            else if (command.command == 'getRightButtonState') {
                GrabbaDriver.Grabba.instance().getRightButtonStateAsync(callback, onError);
                onError('Function not supported.');
            }
            else if (command.command == 'getSerialNumber') {
                GrabbaDriver.Grabba.instance().getSerialNumberAsync(callback, onError);
            }
            else {
                onError('Invalid action');
            }
        },
        GrabbaBarcode: function (callback, onError, params) {
            var command = params[0];
            if (command.command == 'trigger') {
                GrabbaDriver.GrabbaBarcode.instance().triggerAsync(command.enable, onError);
            }
            else if (command.command == 'isSupported') {
                GrabbaDriver.GrabbaBarcode.instance().isBarcodeSupportedAsync(callback, onError);
            }
            else if (command.command == 'clearCallbacks') {
                GrabbaDriver.GrabbaBarcode.instance().onbarcodetriggeredevent = setCallback(null, GrabbaBarcodeTriggeredCallback);
                GrabbaDriver.GrabbaBarcode.instance().onbarcodetimedoutevent = setCallback(null, GrabbaBarcodeTimedOutCallback);
                GrabbaDriver.GrabbaBarcode.instance().onbarcodestoppedevent = setCallback(null, GrabbaBarcodeStoppedCallback);
                GrabbaDriver.GrabbaBarcode.instance().onbarcodescannedevent = setCallback(null, GrabbaBarcodeScannedCallback);
            }
            else if (command.command == 'registerCallbackTriggered') {
                GrabbaBarcodeTriggeredCallback = setCallback(callback, GrabbaBarcodeTriggeredCallback);
                GrabbaDriver.GrabbaBarcode.instance().onbarcodetriggeredevent = GrabbaBarcodeTriggered;
            }
            else if (command.command == 'registerCallbackTimeout') {
                GrabbaBarcodeTimedOutCallback = setCallback(callback, GrabbaBarcodeTimedOutCallback);
                GrabbaDriver.GrabbaBarcode.instance().onbarcodetimedoutevent = GrabbaBarcodeTimedOut;
            }
            else if (command.command == 'registerCallbackStopped') {
                GrabbaBarcodeStoppedCallback = setCallback(callback, GrabbaBarcodeStoppedCallback);
                GrabbaDriver.GrabbaBarcode.instance().onbarcodestoppedevent = GrabbaBarcodeStopped;
            }
            else if (command.command == 'registerCallbackScanned') {
                GrabbaBarcodeScannedCallback = setCallback(callback, GrabbaBarcodeScannedCallback);
                GrabbaDriver.GrabbaBarcode.instance().onbarcodescannedevent = GrabbaBarcodeScanned;
            }
            else {
                onError('Invalid action');
            }
        },
        GrabbaProxcard: function (callback, onError, params) {
            var command = params[0];
            if (command.command == 'trigger') {
                GrabbaDriver.GrabbaProxcard.instance().triggerAsync(command.enable, onError);
            }
            else if (command.command == 'isSupported') {
                GrabbaDriver.GrabbaProxcard.instance().isProxcardSupportedAsync(callback, onError);
            }
            else if (command.command == 'clearCallbacks') {
                GrabbaDriver.GrabbaProxcard.instance().onproxcardtriggeredevent = setCallback(null, GrabbaProxcardTriggeredCallback);
                GrabbaDriver.GrabbaProxcard.instance().onproxcardtimedoutevent = setCallback(null, GrabbaProxcardTimedOutCallback);
                GrabbaDriver.GrabbaProxcard.instance().onproxcardstoppedevent = setCallback(null, GrabbaProxcardStoppedCallback);
                GrabbaDriver.GrabbaProxcard.instance().onproxcardscannedevent = setCallback(null, GrabbaProxcardScannedCallback);
            }
            else if (command.command == 'registerCallbackTriggered') {
                GrabbaProxcardTriggeredCallback = setCallback(callback, GrabbaProxcardTriggeredCallback);
                GrabbaDriver.GrabbaProxcard.instance().onproxcardtriggeredevent = GrabbaProxcardTriggered;
            }
            else if (command.command == 'registerCallbackTimeout') {
                GrabbaProxcardTimedOutCallback = setCallback(callback, GrabbaProxcardTimedOutCallback);
                GrabbaDriver.GrabbaProxcard.instance().onproxcardtimedoutevent = GrabbaProxcardTimedOut;
            }
            else if (command.command == 'registerCallbackStopped') {
                GrabbaProxcardStoppedCallback = setCallback(callback, GrabbaProxcardStoppedCallback);
                GrabbaDriver.GrabbaProxcard.instance().onproxcardstoppedevent = GrabbaProxcardStopped;
            }
            else if (command.command == 'registerCallbackScanned') {
                GrabbaProxcardScannedCallback = setCallback(callback, GrabbaProxcardScannedCallback);
                GrabbaDriver.GrabbaProxcard.instance().onproxcardscannedevent = GrabbaProxcardScanned;
            }
            else {
                onError('Invalid action');
            }
        },
        GrabbaPassport: function (callback, onError, params) {
            var command = params[0];
            if (command.command == 'isSupported') {
                GrabbaDriver.GrabbaPassport.instance().isPassportSupportedAsync(callback, onError);
            }
            else if (command.command == 'clearCallbacks') {
                GrabbaDriver.GrabbaPassport.instance().onpassportscannedevent = setCallback(null, GrabbaPassportReadCallback);
            }
            else if (command.command == 'registerCallback') {
                GrabbaPassportReadCallback = setCallback(callback, GrabbaPassportReadCallback);
                GrabbaDriver.GrabbaPassport.instance().onpassportscannedevent = GrabbaPassportRead;
            }
            else {
                onError('Invalid action');
            }
        },
        GrabbaMagstripe: function (callback, onError, params) {
            var command = params[0];
            if (command.command == 'isSupported') {
                GrabbaDriver.GrabbaMagstripe.instance().isMagstripeSupportedAsync(callback, onError);
            }
            else if (command.command == 'clearCallbacks') {
                GrabbaDriver.GrabbaMagstripe.instance().onmagstripereadevent = setCallback(null, GrabbaMagstripeReadCallback);
            }
            else if (command.command == 'registerReadCallback') {
                GrabbaMagstripeReadCallback = setCallback(callback, GrabbaMagstripeReadCallback);
                GrabbaDriver.GrabbaMagstripe.instance().onmagstripereadevent = GrabbaMagstripeRead;
            }
            else if (command.command == 'registerRawReadCallback') {
                onError('Magstripe raw read is not currently supported on this platform.');
                //GrabbaMagstripeRawReadCallback = setCallback(callback, GrabbaMagstripeRawReadCallback);
                //GrabbaDriver.GrabbaMagstripe.instance().onmagstriperawreadevent = GrabbaMagstripeRawRead;
            }
            else {
                onError('Invalid action');
            }
        },
        GrabbaFingerprint: function (callback, onError, params) {
            var command = params[0];
            if (command.command == 'isSupported') {
                GrabbaDriver.GrabbaFingerprint.instance().isFingerprintSupportedAsync(callback, onError);
            }
            else if (command.command == 'enrolFingerprint') {
                GrabbaDriver.GrabbaFingerprint.instance().enrolFingerprintAsync(command.templateType, command.imageType, command.numAcquisitions, command.numFingers, onError);
            }
            else if (command.command == 'enrolFingerprintToDatabase') {
                GrabbaDriver.GrabbaFingerprint.instance().enrolFingerprintToDatabaseAsync(command.templateType, command.imageType, command.numAcquisitions, command.numFingers, command.userRecord.userID, command.userRecord.userData, onError);
            }
            else if (command.command == 'identifyFingerprint') {
                GrabbaDriver.GrabbaFingerprint.instance().identifyFingerprintAsync(onError);
            }
            else if (command.command == 'verifyFingerprint') {
                GrabbaDriver.GrabbaFingerprint.instance().verifyFingerprintAsync(command.data, command.typeInt, onError);
            }
            else if (command.command == 'clearFingerprintDatabase') {
                GrabbaDriver.GrabbaFingerprint.instance().clearFingerprintDatabaseAsync(onError);
            }
            else if (command.command == 'resetFingerprintDatabase') {
                GrabbaDriver.GrabbaFingerprint.instance().resetFingerprintDatabaseAsync(onError);
            }
            else if (command.command == 'abort') {
                GrabbaDriver.GrabbaFingerprint.instance().abortAsync(onError);
            }
            else if (command.command == 'convertImageToBase64') {
                GrabbaDriver.GrabbaFingerprint.instance().convertImageToBase64Async(callback, command.image.data, command.image.numRows, command.image.numColumns, command.image.typeInt, onError);
            }
            else if (command.command == 'registerTemplateDataCallback') {
                GrabbaFingerprintTemplateCallback = setCallback(callback, GrabbaFingerprintTemplateCallback);
                GrabbaDriver.GrabbaFingerprint.instance().onfingerprinttemplateevent = GrabbaFingerprintTemplate;
            }
            else if (command.command == 'registerImageDataEventCallback') {
                GrabbaFingerprintImageCallback = setCallback(callback, GrabbaFingerprintImageCallback);
                GrabbaDriver.GrabbaFingerprint.instance().onfingerprintimageevent = GrabbaFingerprintImage;
            }
            else if (command.command == 'registerUserMessageEventCallback') {
                GrabbaFingerprintUserMessageCallback = setCallback(callback, GrabbaFingerprintUserMessageCallback);
                GrabbaDriver.GrabbaFingerprint.instance().onfingerprintusermessageevent = GrabbaFingerprintUserMessage;
            }
            else if (command.command == 'clearCallbacks') {
                GrabbaDriver.GrabbaFingerprint.instance().onfingerprintusermessageevent = setCallback(null, GrabbaFingerprintUserMessageCallback);
                GrabbaDriver.GrabbaFingerprint.instance().onfingerprintimageevent = setCallback(null, GrabbaFingerprintImageCallback);
                GrabbaDriver.GrabbaFingerprint.instance().onfingerprinttemplateevent = setCallback(null, GrabbaFingerprintTemplateCallback);
            }
            else {
                onError('Invalid action');
            }
        },
        GrabbaMRTD: function (callback, onError, params) {
            var command = params[0];
            if (command.command == 'isSupported') {
                GrabbaDriver.GrabbaMRTD.instance().isMRTDSupportedAsync(callback, onError);
            }
            else if (command.command == "getDataFromMRZ") {
                GrabbaDriver.GrabbaMRTD.instance().getDataFromMRZAsync(command.trackData, command.fileID,
                    function (tlv) {
                        callback(tlv.lookup("rawData"));
                    }, onError);
            }
            else if (command.command == "registerCallbackMRTDProgress") {
                GrabbaMRTDProgressCallback = setCallback(callback, GrabbaMRTDProgressCallback);
                GrabbaDriver.GrabbaMRTD.instance().onmrtdprogressevent = GrabbaMRTDProgress;
            }
            else {
                onError('Invalid action');
            }
        },
        GrabbaUtil: function (callback, onError, params) {
            var command = params[0];
            if (command.command == 'convertJpegToBase64') {
                GrabbaDriver.GrabbaUtil.convertJpegToBase64Async(command.image, command.offset, callback, onError);
            }
            else {
                onError('Invalid action');
            }
        }
    };

    require("cordova/exec/proxy").add("GrabbaPlugin", module.exports);

    // This code is used to open the Grabba driver when the plugin first binds/starts
    GrabbaDriver.Grabba.instance().openAsync(function () { });
    GrabbaDriver.GrabbaBarcode.instance();
    GrabbaDriver.GrabbaProxcard.instance();
    GrabbaDriver.GrabbaMagstripe.instance();
    GrabbaDriver.GrabbaPassport.instance();
    GrabbaDriver.GrabbaFingerprint.instance();
    GrabbaDriver.GrabbaMRTD.instance();
    GrabbaDriver.GrabbaUtil.instance();