//Copyright (c) 2014, Grabba International
//All rights reserved.
//
//Redistribution and use in binary forms, without modification, are permitted
//provided that the following conditions are met:
//    * Redistribution of the SDK documentation is prohibited. Redistribution of 
//      SDK libraries and headers is only permitted when compiled into an end 
//      program in binary form.
//    * Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//    * Modification, reverse engineering or tampering with the SDK software 
//      is prohibited.
//
//THIS SDK IS PROVIDED BY GRABBA INTERNATIONAL "AS IS" AND ANY EXPRESS OR IMPLIED
//WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
//MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
//EVENT SHALL GRABBA INTERNATIONAL BE LIABLE FOR ANY DIRECT, INDIRECT, 
//INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
//PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
//LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
//OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
//GRABBA INTERNATIONAL HAS BEEN ADVISED OF OR SHOULD HAVE BEEN AWARE OF THE
//POSSIBILITY OF SUCH DAMAGE.
//
//YOUR USE OF THE SDK AND ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH
//THE USE OF THE SDK IS AT YOUR OWN DISCRETION AND RISK AND YOU ARE SOLELY
//RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR OTHER DEVICE OR LOSS OF
//DATA THAT RESULTS FROM SUCH USE.

var exec = require('cordova/exec');

//   _____           _     _           
//  |  __ \         | |   | |          
//  | |  \/_ __ __ _| |__ | |__   __ _ 
//  | | __| '__/ _` | '_ \| '_ \ / _` |
//  | |_\ \ | | (_| | |_) | |_) | (_| |
//   \____/_|  \__,_|_.__/|_.__/ \__,_|
//                                     
//

/**
 * @class       Grabba
 * @classdesc   Grabba plugin for cordova 3.5.0+
 * <br>
 * Currently supports:<br>
 * - Android<br>
 * - iOS<br>
 * - Windows 8.1<br>
 */
var Grabba = function () {
    "use strict";
    this.platforms = ["android", "ios", "windows"];
};

/**
 * Check if the API is supported on this platform.
 *
 * @memberOf Grabba
 *
 * @returns {Boolean}
 */
Grabba.prototype.isSupported = function () {
    "use strict";
    return this.platforms.indexOf(device.platform.toLowerCase()) > -1;
};

/**
 * Register a callback function for exclusive access events.
 * If no callbacks (null) is passed to this function, all present callbacks will be cleared.
 * 
 * @memberOf Grabba
 * @param {function} callback Called on exclusive access event with the following parameters:<br>
 * {boolean} Gained/lost exclusive access to the Grabba.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //Register for exclusive access events
 *  grabba.registerExclusiveAccessCallback(function(haveAccess) {
 *      alert('exclusive access ' + haveAccess);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });
 */
Grabba.prototype.registerExclusiveAccessCallback = function (callback, onError) {
    var command;
    if (!callback) {
        command = {
            command: "clearExclusiveAccessCallback"
        };
        exec(callback, onError, "GrabbaPlugin", "Grabba", [command]);
        return;
    }

    command = {
        command: "registerExclusiveAccessCallback"
    };
    exec(callback, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Register a callback function for connection events.
 * If no callbacks (null) is passed to this function, all present callbacks will be cleared.
 * Please be aware that it is possible to miss connection events if the Grabba is connected prior to calling this function.
 * To avoid any issues you can check if the Grabba was already connected using grabba.isConnected(onSuccess, onError)
 * 
 * @memberOf Grabba
 * @param {function} callback Called on connection event with the following parameters:<br>
 * {boolean} Connected state.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //Register for connection events
 *  grabba.registerConnectionCallback(function(isConnected) {
 *      alert('Connected state: ' + isConnected);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });
 */
Grabba.prototype.registerConnectionCallback = function (callback, onError) {
    var command;
    if (!callback) {
        command = {
            command: "clearConnectionCallback"
        };
        exec(callback, onError, "GrabbaPlugin", "Grabba", [command]);
        return;
    }

    command = {
        command: "registerConnectionCallback"
    };
    exec(callback, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Register a callback function for button events.
 * If no callbacks (null) is passed to this function, all present callbacks will be cleared.
 * 
 * @param {Object} callback An object which implements the following functions:<br>
 * <b>leftButtonEvent : function(boolean){}</b><br>
 * Called when the left button changes states with the following parameters:<br>
 * {boolean} indicating whether or not the button is pressed.<br><br>
 * <b>rightButtonEvent : function(boolean){}</b><br>
 * Called when the right button changes states with the following parameters:<br>
 * {boolean} indicating whether or not the button is pressed.<br><br>
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //Register for button events
 * grabba.registerButtonCallback({
 *      leftButtonEvent: function(pressed) {
 *          alert('Left button state ' + pressed);
 *      },
 *      rightButtonEvent: function(pressed) {
 *          alert('Right button state ' + pressed);
 *      }
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });
 */
Grabba.prototype.registerButtonCallback = function (callback, onError) {
    var command;
    if (!callback || (!callback.leftButtonEvent && !callback.rightButtonEvent)) {
        command = {
            command: "clearButtonCallbacks"
        };
        exec(null, onError, "GrabbaPlugin", "Grabba", [command]);
        return;
    }

    if (callback.leftButtonEvent) {
        command = {
            command: "registerLeftButtonCallback"
        };
        exec(callback.leftButtonEvent, onError, "GrabbaPlugin", "Grabba", [command]);
    }

    if (callback.rightButtonEvent) {
        command = {
            command: "registerRightButtonCallback"
        };
        exec(callback.rightButtonEvent, onError, "GrabbaPlugin", "Grabba", [command]);
    }
};

/**
 * Check if the Grabba is connected.
 * 
 * @memberOf Grabba
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {boolean} indicating connection state.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //Button to check if the Grabba is connected
 * <button onclick="grabba.isConnected(function(state){
 *      alert('Grabba connected is ' + state);
 * },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">Check connection</button>
 */
Grabba.prototype.isConnected = function (onSuccess, onError) {
    var command = {
        command: "isConnected"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Check the Grabba battery level.
 * 
 * @memberOf Grabba
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {int} battery level.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to the current Grabba battery level
 * <button onclick="grabba.getBatteryLevel(function(state){
 *      alert('Grabba battery is ' + state);
 * },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">get battery level</button>
 */
Grabba.prototype.getBatteryLevel = function (onSuccess, onError) {
    var command = {
        command: "getBatteryLevel"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Obtain the Grabba driver version.
 * 
 * @memberOf Grabba
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {String} Driver version.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to get the current driver version
 *  <button onclick="grabba.getDriverVersion(function(version){
 *  alert('Grabba driver version is ' + version);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">get driver version</button>
 */
Grabba.prototype.getDriverVersion = function (onSuccess, onError) {
    var command = {
        command: "getDriverVersion"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Obtain the Grabba firmware version.
 * 
 * @memberOf Grabba
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {String} firmware version.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to get the current firmware version
 *  <button onclick="grabba.getFirmwareVersion(function(version){
 *  alert('Grabba firmware version is ' + version);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">get firmware version</button>
 */
Grabba.prototype.getFirmwareVersion = function (onSuccess, onError) {
    var command = {
        command: "getFirmwareVersion"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Obtain the Grabba hardware version.
 * 
 * @memberOf Grabba
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {String} hardware version.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to get the current hardware version
 *  <button onclick="grabba.getHardwareVersion(function(version){
 *  alert('Grabba hardware version is ' + version);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">get hardware version</button>
 */
Grabba.prototype.getHardwareVersion = function (onSuccess, onError) {
    var command = {
        command: "getHardwareVersion"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Obtain the Grabba model number.
 * 
 * @memberOf Grabba
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {String} Grabba model number.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to get the Grabba model number
 *  <button onclick="grabba.getModel(function(model){
 *  alert('Grabba model is ' + model);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">get model number</button>
 */
Grabba.prototype.getModel = function (onSuccess, onError) {
    var command = {
        command: "getModel"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Check of the left Grabba button is pressed.
 * 
 * @memberOf Grabba
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {boolean} Left button pressed state.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to get the Grabba model number
 *  <button onclick="grabba.getLeftButtonState(function(pressed){
 *  alert('Grabba left button state is ' + pressed);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">get left button state</button>
 */
Grabba.prototype.getLeftButtonState = function (onSuccess, onError) {
    var command = {
        command: "getLeftButtonState"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Check of the right Grabba button is pressed.
 * 
 * @memberOf Grabba
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {boolean} Right button pressed state.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to get the Grabba model number
 *  <button onclick="grabba.getRightButtonState(function(pressed){
 *  alert('Grabba right button state is ' + pressed);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">get right button state</button>
 */
Grabba.prototype.getRightButtonState = function (onSuccess, onError) {
    var command = {
        command: "getRightButtonState"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Obtain the Grabba's serial number.
 * 
 * @memberOf Grabba
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {String} Grabba serial number.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to get the Grabba serial number
 *  <button onclick="grabba.getSerialNumber(function(serialNumber){
 *  alert('Grabba serial number is ' + serialNumber);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">get serial number</button>
 */
Grabba.prototype.getSerialNumber = function (onSuccess, onError) {
    var command = {
        command: "getSerialNumber"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Obtain the value of a given integer preference.
 *
 * @memberOf Grabba
 * @param {String} intPrefID Integer preference ID. Preference IDs can be found under each respective class's <b>preferences</b> member.
 * @param {function} onSuccess Invoked on success with the following parameters:<br>
 * {int} Integer value of preference.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 */
Grabba.prototype.getIntPref = function (intPrefID, onSuccess, onError) {
    var command = {
        command: "getIntPref",
        prefID: intPrefID
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Set the value of a given integer preference.
 * <b>grabba.savePreferences</b> must be called to commit preference changes on some platforms.
 *
 * @memberOf Grabba
 * @param {String} intPrefID Integer preference ID. Preference IDs can be found under each respective class's <b>preferences</b> member.
 * @param {int} newIntValue New preference value.
 * @param {function} onSuccess Invoked on success.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @see Grabba#savePreferences
 */
Grabba.prototype.setIntPref = function (intPrefID, newIntValue, onSuccess, onError) {
    var command = {
        command: "setIntPref",
        prefID: intPrefID,
        newValue: newIntValue
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Obtain the value of a given boolean preference.
 *
 * @memberOf Grabba
 * @param {String} boolPrefID boolean preference ID. Preference IDs can be found under each respective class's <b>preferences</b> member.
 * @param {function} onSuccess Invoked on success with the following parameters:<br>
 * {boolean} Boolean value of preference.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 */
Grabba.prototype.getBoolPref = function (boolPrefID, onSuccess, onError) {
    var command = {
        command: "getBoolPref",
        prefID: boolPrefID
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};
/**
 * Set the value of a given boolean preference.
 * <b>grabba.savePreferences</b> must be called to commit preference changes on some platforms.
 *
 * @memberOf Grabba
 * @param {String} boolPrefID Boolean preference ID. Preference IDs can be found under each respective class's <b>preferences</b> member.
 * @param {boolean} newBoolValue New preference value.
 * @param {function} onSuccess Invoked on success.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @see Grabba#getBoolPref
 * @see Grabba#savePreferences
 */
Grabba.prototype.setBoolPref = function (boolPrefID, newBoolValue, onSuccess, onError) {
    var command = {
        command: "setBoolPref",
        prefID: boolPrefID,
        newValue: newBoolValue
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Commit all preference changes to persistent memory and also to the Grabba hardware.
 * Before calling this function, some (but not all) preference values may be in effect, so it is recommended to save the preferences as soon as possible after modification.
 * @param {function} onSuccess Invoked on success.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @see Grabba#setBoolPref
 * @see Grabba#setIntPref
 */
Grabba.prototype.savePreferences = function (onSuccess, onError) {
    var command = {
        command: "savePreferences"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "Grabba", [command]);
};

/**
 * Grabba general preference identifiers.
 * @type GrabbaPreferences
 */
Grabba.prototype.preferences;

/**
 * Grabba general preference identifiers.<br> Please refer to the preference name suffix for the preference type.
 * 
 * @class       GrabbaPreferences
 * @classdesc   Access this class via <b>grabba.preferences</b>
 * @see Grabba#setBoolPref
 * @see Grabba#getBoolPref
 * @see Grabba#setIntPref
 * @see Grabba#getIntPref
 */
var GrabbaPreferences = function () {
    "use strict";
    this.platforms = ["android"];
};

/**
 * Set the auto power off time in seconds.<br>
 * The Grabba will disconnect and powerdown after this period of inactivity. Minimum setting is 10 seconds.
 * @memberOf GrabbaPreferences
 */
GrabbaPreferences.prototype.autoPowerOffTimeInt = "GrabbaPreferences.autoPowerOffTimeInt 300";

/**
 * <b>Android specific.</b><br>
 * Set the Grabba extended battery mode.<br>
 * This can be set to the following:<br>
 * GrabbaExtendedBattery.MODE_AUTO = 0: Automatic mode. This mode allows the Grabba to decide when to supply charge to the Android device and presents a pop up when wanting to supply charge.<br>
 * GrabbaExtendedBattery.MODE_FORCE_ON = 1: Forces the Grabba to supply charge to the Android device.<br>
 * GrabbaExtendedBattery.MODE_FORCE_OFF = 2: Forces the Grabba to stop supplying charge to the Android device.<br>
 * Please note that the transition between non-charge to charge mode (or back)on Android results in a 
 * re-connect, meaning that the Grabba will be unavailable for several seconds. Therefore the mode switch 
 * should only be done when the grabba isn't currently active.
 */
GrabbaPreferences.prototype.extendedBatteryModeInt = "GrabbaPreferences.extendedBatteryModeInt 0";
/**
 * @deprecated No longer required - a pop up dialog is now displayed when the Android device is low on 
 * power which asks if the user would like to switch to supplemental charge mode.
 * <b>Android specific.</b><br> 
 * Set the battery check interval in seconds.<br>
 * After this many seconds of inactivity, the Grabba driver will compare the battery level of the Android 
 * device with the level of the Grabba device. If the Grabba device has more power remaining the driver 
 * will switch the Grabba into charge mode. The transition from non-charge to charge mode (or back) means
 * the grabba will be offline for approximately 4-7 seconds (on select HTC devices the mode change will 
 * not affect connectivity). Therefore the mode switch should only be done when the grabba isn't currently 
 * active. Set to zero to stop automatic charging by the Grabba device.
 */
GrabbaPreferences.prototype.extendedBatteryTimerIntervalInt = "GrabbaPreferences.extendedBatteryTimerIntervalInt 60";

/**
 * <b>Android specific.</b>
 * Enable or disable the Grabba extended battery supplemental charge pop up when the Android is low on 
 * power.<br>
 * This dialog asks if you wish to enable Grabba supplemental charging.<br>
 * 
 */
GrabbaPreferences.prototype.extendedBatteryWarningBool = "GrabbaPreferences.extendedBatteryWarningBool true";
/**
 * <b>Android specific.</b><br>
 * Preference to set the Android battery threshold at which a pop up window will appear to ask if the user 
 * would like to enable Grabba supplemental charging.<br>
 * This pop up window will not appear if the Grabba is already providing supplemental charge.<br>
 * Valid range is between 0 and 100 inclusive. Invalid input will result in using the default value.
 */
GrabbaPreferences.prototype.extendedBatteryWarningThresholdInt = "GrabbaPreferences.extendedBatteryWarningThresholdInt 20";

/**
 * <b>iOS specific.</b><br>
 * Preference to enable connections with the Grabba Debug Bridge.
 */
GrabbaPreferences.prototype.debugBridgeEnabledBool = "GrabbaPreferences.debugBridgeEnabledBool false";

/**
 * An instance of the Grabba plugin used to access Grabba functions.
 * 
 * @type Grabba
 */
var grabba = new Grabba();
module.exports = grabba;
module.exports.preferences = new GrabbaPreferences();

//   _____           _     _          ______                         _      
//  |  __ \         | |   | |         | ___ \                       | |     
//  | |  \/_ __ __ _| |__ | |__   __ _| |_/ / __ _ _ __ ___ ___   __| | ___ 
//  | | __| '__/ _` | '_ \| '_ \ / _` | ___ \/ _` | '__/ __/ _ \ / _` |/ _ \
//  | |_\ \ | | (_| | |_) | |_) | (_| | |_/ / (_| | | | (_| (_) | (_| |  __/
//   \____/_|  \__,_|_.__/|_.__/ \__,_\____/ \__,_|_|  \___\___/ \__,_|\___|
//                                                                          
//                                                                          

/**
 * Access Grabba barcode capabilities via <b>grabba.barcode</b>
 * 
 * @class       GrabbaBarcode
 * @classdesc   Access this class via <b>grabba.barcode</b>
 */
var GrabbaBarcode = function () {
    "use strict";
    this.platforms = ["android", "ios", "windows"];
};

/**
 * Access Grabba barcode reading capabilities through <b>grabba.barcode</b>
 * 
 * @type GrabbaBarcode
 */
Grabba.prototype.barcode;

/**
 * Determines if the currently connected Grabba supports barcode functionality.
 * 
 * @memberOf GrabbaBarcode
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {boolean} Boolean indicating if GrabbaBarcode is supported.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to check if the connected Grabba supports barcode functionality.
 *  <button onclick="grabba.barcode.isSupported(function(supported){
 *  alert('Grabba barcode supported is ' + supported);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">Is barcode supported?</button>
 */
GrabbaBarcode.prototype.isSupported = function (onSuccess, onError) {
    var command = {
        command: "isSupported"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "GrabbaBarcode", [command]);
};

/**
 * Register callbacks for Barcode related events.<br>
 * If no callbacks are passed to this function, all present callbacks will be cleared.
 * 
 * @memberOf GrabbaBarcode
 * @param {Object} callback An object which implements the following functions:<br>
 * <b>triggeredEvent : function(){}</b><br>
 * Called when the barcode scanner is triggered.<br><br>
 * <b>timeoutEvent : function(){}</b><br>
 * Called when the barcode scanner has timed out.<br><br>
 * <b>stoppedEvent : function(){}</b><br>
 * Called when the barcode scanner has stopped.<br><br>
 * <b>scannedEvent : function(barcode){}</b><br>
 * Called when a barcode is scanned.<br>
 * The returned object contains properties as follows:<br>
 * {String} barcode.data The scanned barcode data.<br>
 * {String} barcode.symbology The scanned barcode's symbology.<br>
 * {int} barcode.symbologyInt Integer representation of the barcode's symbology.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //An example of an implemented barcode callback is as follows:
 *  grabba.barcode.registerCallback(barcodeCallbacks, onError);
 *  var barcodeTimeoutFunction = function () {
 *      alert('Barcode timed out');
 *  };
 *  grabba.barcode.registerCallback(barcodeCallbacks, onError);
 *  var barcodeTimeoutFunction = function() {
 *      alert('Barcode timed out');
 *  };
 *  var barcodeCallbacks = {
 *  //Functions may also be declared inline as seen here.
 *  triggeredEvent: function() {
 *      alert('Barcode triggered');
 *  },
 *  //These functions are optional and unimplemented functions will simply not be called.
 *  //stoppedEvent : function () {
 *  //alert('Barcode scanning stopped');
 *  //},
 *  scannedEvent: function(barcode) {
 *  //barcode contains data fields
 *      alert('Barcode scanned event\n Data: ' + barcode.data + '\n' + "Symbology: " + barcode.symbology);
 *  },
 *  //You may create a function separately as seen with barcodeTimeoutFunction here.
 *      timeoutEvent: barcodeTimeoutFunction
 *  };
 */
GrabbaBarcode.prototype.registerCallback = function (callback, onError) {
    var command;
    if (!callback || (!callback.triggeredEvent && !callback.timeoutEvent && !callback.stoppedEvent && !callback.scannedEvent)) {
        command = {
            command: "clearCallbacks"
        };
        exec(null, onError, "GrabbaPlugin", "GrabbaBarcode", [command]);
        return;
    }

    if (callback.triggeredEvent) {
        command = {
            command: "registerCallbackTriggered"
        };
        exec(callback.triggeredEvent, onError, "GrabbaPlugin", "GrabbaBarcode", [command]);
    }

    if (callback.timeoutEvent) {
        command = {
            command: "registerCallbackTimeout"
        };
        exec(callback.timeoutEvent, onError, "GrabbaPlugin", "GrabbaBarcode", [command]);
    }

    if (callback.stoppedEvent) {
        command = {
            command: "registerCallbackStopped"
        };
        exec(callback.stoppedEvent, onError, "GrabbaPlugin", "GrabbaBarcode", [command]);
    }

    if (callback.scannedEvent) {
        command = {
            command: "registerCallbackScanned"
        };
        exec(callback.scannedEvent, onError, "GrabbaPlugin", "GrabbaBarcode", [command]);
    }
};

/**
 * Starts or stops barcode scanning.<br>
 * To receive the barcode events and scanned data, first register for callbacks using {@link GrabbaBarcode#registerCallback} and then call:<br>
 * <code>
 * grabba.barcode.trigger(onError, true)
 * </code>
 * <br>
 * To start the barcode scanner and scan the barcode.
 * 
 * @memberOf GrabbaBarcode
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @param {boolean} enable Pass true to start scanning, false to stop.
 * 
 * @see GrabbaBarcode#registerCallback
 * 
 * @example <!--A button which starts the barcode scanning process-->
 * <button onclick="grabba.barcode.trigger(onError, true)">Trigger</button>
 */
GrabbaBarcode.prototype.trigger = function (onError, enable) {
    var command = {
        command: "trigger",
        enable: enable
    };
    exec(null, onError, "GrabbaPlugin", "GrabbaBarcode", [command]);
};

/**
 * Grabba barcode preference identifiers.
 * @type GrabbaBarcodePreferences
 */
GrabbaBarcode.prototype.preferences;

/**
 * Grabba barcode preference identifiers.<br>
 * Please refer to the preference name suffix for the preference type.
 * 
 * @class       GrabbaBarcodePreferences
 * @classdesc   Access this class via <b>grabba.barcode.preferences</b>
 * @see Grabba#setBoolPref
 * @see Grabba#getBoolPref
 * @see Grabba#setIntPref
 * @see Grabba#getIntPref
 */
var GrabbaBarcodePreferences = function () {
    "use strict";
    this.platforms = ["android", "ios"];
};

/**
 * Issue a beep upon successful scan. Default: true
 * @memberOf GrabbaBarcodePreferences
 */
GrabbaBarcodePreferences.prototype.beepOnScanBool = "GrabbaBarcodePreferences.beepOnScanBool true";
/**
 * Barcode scan timeout in milliseconds. Default: 5000
 * @memberOf GrabbaBarcodePreferences
 */
GrabbaBarcodePreferences.prototype.scanTimeoutInt = "GrabbaBarcodePreferences.scanTimeoutInt 5000";
/**
 * Vibrate the phone upon successful scan. Default: true
 * @memberOf GrabbaBarcodePreferences
 */
GrabbaBarcodePreferences.prototype.vibrateOnScanBool = "GrabbaBarcodePreferences.vibrateOnScanBool true";
/**
 * Search mode for x300.<br> 
 * 0: No preference.<br>
 * 1: Prefer 1D barcode (can still scan stacked barcodes)<br>
 * 2: Prefer stacked barcode (can still scan 1D barcodes)<br>
 * @memberOf GrabbaBarcodePreferences
 */
GrabbaBarcodePreferences.prototype.x300SearchModeInt = "GrabbaBarcodePreferences.x300SearchModeInt 0";
/**
 * Search mode for x400<br>
 * 0: Full omnidirectional search (default)<br>
 * Searches for barcode features starting at the center of an image to the image limits.<br>
 * Can read all symbologies in any orientation in this mode.<br>
 * <br>
 * 1: Quick omnidirectional search<br>
 * Quick search for barcode around center of image.<br>
 * May miss off center symbols and larger data matrix/QR symbols. Can read all symbologies in any
 * orientation in this mode.<br>
 * <br>
 * 2: Advanced linear decoding<br>
 * Quick horizontal linear scans in center band of image. Not omnidirectional, does not read in any 
 * orientation. Cannot read 2D, OCR or postal symbols.
 * @memberOf GrabbaBarcodePreferences
 */
GrabbaBarcodePreferences.prototype.x400SearchModeInt = "GrabbaBarcodePreferences.x400SearchModeInt 0";
/**
 * Grabba barcode imager preference identifiers.
 * @type GrabbaBarcodePreferencesImager
 */
GrabbaBarcodePreferences.prototype.imager;

/**
 * Grabba barcode imager preference identifiers.<br>
 * Please refer to the preference name suffix for the preference type.
 * 
 * @class       GrabbaBarcodePreferencesImager
 * @classdesc   Access this class via <b>grabba.barcode.preferences.imager</b>
 * @see Grabba#setBoolPref
 * @see Grabba#getBoolPref
 * @see Grabba#setIntPref
 * @see Grabba#getIntPref
 */
var GrabbaBarcodePreferencesImager = function () {
    "use strict";
    this.platforms = ["android"];
};

/**
 * Grabba barcode imager preference identifiers.
 * @type GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImager.prototype.snap;

/**
 * Grabba barcode imager preference identifiers.
 * @type GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImager.prototype.ship;

/**
 * Grabba barcode symbology preference identifiers.
 * @type GrabbaBarcodeSymbology
 */
GrabbaBarcodePreferences.prototype.symbology;

/**
 * Grabba barcode imager ship (transfer) preference identifiers.<br>
 * Please refer to the preference name suffix for the preference type.
 * 
 * @class       GrabbaBarcodePreferencesImagerShip
 * @classdesc   Access this class via <b>grabba.barcode.preferences.imager.ship</b>
 * @see Grabba#setBoolPref
 * @see Grabba#getBoolPref
 * @see Grabba#setIntPref
 * @see Grabba#getIntPref
 */
var GrabbaBarcodePreferencesImagerShip = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Blur images by smoothing transitions between hard edges, lines and shaded areas.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.blurImageBool = "ImagerShipPreferences.blurImageBool false";
/**
 * Image compensation flattens the image to account for variations in illumination.<br>
 * false = compensation disabled<br>
 * true = compensation enabled<br>
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.compensationBool = "ImagerShipPreferences.compensationBool false";
/**
 * Ship a window of the image by specifying the left, right, top, and bottom pixel coordinates.<br>
 * Device columns are numbered 0 through 640, and device rows are numbered 0 through 480.<br>
 * Crop bottom default: 0.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.cropBottomInt = "ImagerShipPreferences.cropBottomInt 479";
/**
 * Ship a window of the image by specifying the left, right, top, and bottom pixel coordinates.<br>
 * Device columns are numbered 0 through 640, and device rows are numbered 0 through 480 for x400.<br>
 * Crop left default: 0.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.cropLeftInt = "ImagerShipPreferences.cropLeftInt 0";
/**
 *The number of pixels to cut from the outside margin of the image; thus only the center pixels are transmitted.<br>
 * Crop margin default: 0.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.cropMarginInt = "ImagerShipPreferences.cropMarginInt 0";
/**
 * Ship a window of the image by specifying the left, right, top, and bottom pixel coordinates.<br>
 * Device columns are numbered 0 through 640, and device rows are numbered 0 through 480 for x400.<br>
 * Crop right default: 0.<br>
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.cropRightInt = "ImagerShipPreferences.cropLeftInt 639";
/**
 * Ship a window of the image by specifying the left, right, top, and bottom pixel coordinates.<br>
 * Device columns are numbered 0 through 640, and device rows are numbered 0 through 480.<br>
 * Crop top default: 0.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.cropTopInt = "ImagerShipPreferences.cropTopInt 0";
/**
 * Document image filter for sharpening document images.<br>
 * Valid range of 0-255.<br>
 * This preference is best used with the following preferences:<br>
 * ImagingStyle = 0<br>
 * LED state = false<br>
 * Target white value = 168<br>
 * Target set point percentage = 90<br>
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.documentImageFilterInt = "ImagerShipPreferences.documentImageFilterInt 0";
/**
 * An edge sharpen filter to clean up the edges of an image.<br>
 * This may result in loss of fine detail from the original image.<br>
 * Valid range 0-24.<br>
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.edgeSharpenInt = "ImagerShipPreferences.edgeSharpenInt 0";
/**
 * File format sets the desired image format.<br>
 * Changing this preference will result in no image if the file format is not supported.<br>
 * 0 = KIM format<br>
 * 1 = TIFF binary<br>
 * 2 = TIFF binary group 4, compressed<br>
 * 3 = TIFF greyscale<br>
 * 4 = Uncompressed binary (upper left to lower right, 1 pixel/bit, 0 padded end of line)<br>
 * 5 = Uncompressed greyscale (Upper left to lower right, bitmap format)<br>
 * 6 = JPEG format<br>
 * 8 = BMP format (Lower right to upper left, uncompressed)<br>
 * 10 = TIFF colour compressed image<br>
 * 11 = TIFF colour uncompressed image<br>
 * 12 = JPEG colour image<br>
 * 14 = BMP colour format<br>
 * 15 = BMP Uncompressed raw image<br>
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.fileFormatInt = "ImagerShipPreferences.fileFormatInt 6";
/**
 * Increases the contrast of the transmitted image. Not available with some image formats.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.gammaCorrectionInt = "ImagerShipPreferences.gammaCorrectionInt 0";
/**
 * Preference to ship the histogram for an image.<br>
 * Provides a quick picture of the tonal range in an image.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.histogramShipBool = "ImagerShipPreferences.histogramShipBool false";
/**
 * Increases the contrast of the transmitted image. Not available with some image formats.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.histogramStretchBool = "ImagerShipPreferences.histogramStretchBool false";
/**
 * Enhances pictures taken from distances greater than 3m (10 feet).<br>
 * false = infinity filter off<br>
 * true = infinity filter on
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.infinityFilterBool = "ImagerShipPreferences.infinityFilterBool false";
/**
 * Invert image across X axis.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.invertImageXAxisBool = "ImagerShipPreferences.invertImageXAxisBool false";
/**
 * Invert image across Y axis.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.invertImageYAxisBool = "ImagerShipPreferences.invertImageYAxisBool false";
/**
 * Sets the desired image quality when using JPEG image format. Higher numbers result in higher quality but larger files.<br>
 * Smaller numbers result in greater amounts of lossy compression but faster transmission and smaller files.<br>
 * Valid range of 0-100.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.jpegImageQualityInt = "ImagerShipPreferences.jpegImageQualityInt 50";
/**
 * Reduce salt and pepper noise in images. Not available on all scan engines.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.noiseReductionBool = "ImagerShipPreferences.noiseReductionBool false";
/**
 * Pixel depth sets the number of bits per pixel in the transmitted image (in KIM or BMP formats only) 8 = 8 bits per pixel, greyscale image<br>
 * 1 = 1 bit per pixel, black and white image<br>
 * 24 = 24 bits per pixel (BMP format)<br>
 * 32 = 32 bits per pixel (RGBX)<br>
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.pixelDepthInt = "ImagerShipPreferences.pixelDepthInt 8";
/**
 * Preferences to pre-rotate the image.<br>
 * 0 = Image as snapped (right side up)<br>
 * 1 = Rotate image 90 degrees to the right.<br>
 * 2 = Rotate images 180 degrees (upside down)<br>
 * 3 = Rotate image 90 degrees to the left.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.rotateImageInt = "ImagerShipPreferences.rotateImageInt 0";
/**
 * Preference to skip pixels to minimise file size.<br>
 * 1 = Ship every pixel<br>
 * 2 = Ship every second pixel<br>
 * 3 = Ship every third pixel<br>
 * Valid range of 0-10. Images may become unusable beyond this value.
 * @memberOf GrabbaBarcodePreferencesImagerShip
 */
GrabbaBarcodePreferencesImagerShip.prototype.skipPixelInt = "ImagerShipPreferences.skipPixelInt 1";

/**
 * Grabba barcode imager snap (capture) preference identifiers.<br>
 * Please refer to the preference name suffix for the preference type.
 * 
 * @class       GrabbaBarcodePreferencesImagerSnap
 * @classdesc   Access this class via <b>grabba.barcode.preferences.imager.snap</b>
 * @see Grabba#setBoolPref
 * @see Grabba#getBoolPref
 * @see Grabba#setIntPref
 * @see Grabba#getIntPref
 */
var GrabbaBarcodePreferencesImagerSnap = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * @deprecated Unused beeper preference.
 * @memberOf GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImagerSnap.prototype.beeperBool = "ImagerSnapPreferences.beeperBool false";
/**
 * Delta for acceptance, only used when in photo style imaging<br>
 * This sets the allowable acceptable tolerance for the target white value.<br>
 * Valid range of 0-255.
 * @memberOf GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImagerSnap.prototype.deltaForAcceptanceInt = "ImagerSnapPreferences.deltaForAcceptanceInt 25";
/**
 * Exposure timing, only used in manual style imaging.<br>
 * Units are 127 microseconds<br>
 * The exposure time determines how long the engine takes to capture an image.<br>
 * Valid range of 1-7874<br>
 * @memberOf GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImagerSnap.prototype.exposureInt = "ImagerSnapPreferences.exposureInt 200";
/**
 * Gain, only used in manual style imaging.<br>
 * The gain brightens images taken - as you increase gain, the noise in an image is also amplified.<br>
 * 1 = No gain<br>
 * 2 = Medium gain<br>
 * 4 = Heavy gain<br>
 * 8 = Maximum gain
 * @memberOf GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImagerSnap.prototype.gainInt = "ImagerSnapPreferences.gainInt 4";
/**
 * Decoding style preferences<br>
 * 0 = Decoding style imaging<br>
 * 1 = Photo style (default)<br>
 * 2 = Manual style, disables auto-exposure and makes use of other preferences for configuration
 * @memberOf GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImagerSnap.prototype.imagingStyleInt = "ImagerSnapPreferences.ImagingStyleInt 1";
/**
 * LED state while taking images - not available when using decoding style imaging<br>
 * false = LED off, preferred when taking colour images (if supported by the device)<br>
 * true = LED on
 * @memberOf GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImagerSnap.prototype.LEDStateBool = "ImagerSnapPreferences.LEDStateBool false";
/**
 * Target set point percentage Sets the target point for light and dark values in the captured image.<br>
 * Valid range of 1-99.<br>
 * A setting of 75 means to aim for 75% of pixels at or below the target white value and 25% above the target white value.
 * @memberOf GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImagerSnap.prototype.targetSetPointPercentageInt = "ImagerSnapPreferences.targetSetPointPercentageInt 50";
/**
 * @deprecated Unused trigger preference.
 * @memberOf GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImagerSnap.prototype.triggerBool = "ImagerSnapPreferences.triggerBool false";
/**
 * Maximum number of frames allowed to be taken to reach the delta for acceptance, only used in photo style imaging<br>
 * Valid range of 0-10.
 * @memberOf GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImagerSnap.prototype.updateTriesInt = "ImagerSnapPreferences.updateTriesInt 6";
/**
 * Target white value, only used in photo style imaging<br>
 * This sets the target for the median greyscale value in the captured image.<br>
 * For capturing close up images of high contrast images like documents, a lower setting such as 75 is recommended.<br>
 * Higher settings result in longer exposure times and brighter images.<br>
 * Valid range of 0-255.
 * @memberOf GrabbaBarcodePreferencesImagerSnap
 */
GrabbaBarcodePreferencesImagerSnap.prototype.whiteTargetValueInt = "ImagerSnapPreferences.whiteTargetValueInt 90";

/**
 * Grabba barcode symbology preference identifiers.<br>
 * Please refer to the preference name suffix for the preference type.
 * @class GrabbaBarcodeSymbology
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology</b>
 */
var GrabbaBarcodeSymbology = function () {
    "use strict";
    this.platforms = ["android"];
};

/**
 * Preferences for Australian Postal barcodes
 * @type GrabbaBarcodeSymbologyAusPost
 */
GrabbaBarcodeSymbology.prototype.auspost;
/**
 * Preferences for Australian Postal barcodes
 * @class GrabbaBarcodeSymbologyAusPost
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.auspost</b>
 */
var GrabbaBarcodeSymbologyAusPost = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling AusPost symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyAusPost
 */
GrabbaBarcodeSymbologyAusPost.prototype.enabledBool = "Symb.AusPost.enabledBool false";

/**
 * Preferences for Aztec barcodes
 * @type GrabbaBarcodeSymbologyAztec
 */
GrabbaBarcodeSymbology.prototype.aztec;
/**
 * Preferences for Aztec barcodes
 * @class GrabbaBarcodeSymbologyAztec
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.aztec</b>
 */
var GrabbaBarcodeSymbologyAztec = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Aztec symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyAztec
 */
GrabbaBarcodeSymbologyAztec.prototype.enabledBool = "Symb.Aztec.enabledBool true";

/**
 * Preferences for BC412 barcodes
 * @type GrabbaBarcodeSymbologyBC412
 */
GrabbaBarcodeSymbology.prototype.bc412;
/**
 * Preferences for BC412 barcodes
 * @class GrabbaBarcodeSymbologyBC412
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.bc412</b>
 */
var GrabbaBarcodeSymbologyBC412 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling BC412 symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyBC412
 */
GrabbaBarcodeSymbologyBC412.prototype.enabledBool = "Symb.BC412.enabledBool false";
/**
 * The minimum length of a BC412 symbology. Default: 1
 * @memberOf GrabbaBarcodeSymbologyBC412
 */
GrabbaBarcodeSymbologyBC412.prototype.minimumLengthInt = "Symb.BC412.minimumLengthInt 1";

/**
 * Preferences for British barcodes
 * @type GrabbaBarcodeSymbologyBritish
 */
GrabbaBarcodeSymbology.prototype.british;
/**
 * Preferences for British barcodes
 * @class GrabbaBarcodeSymbologyBritish
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.british</b>
 */
var GrabbaBarcodeSymbologyBritish = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling British post symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyBritish
 */
GrabbaBarcodeSymbologyBritish.prototype.enabledBool = "Symb.British.enabledBool false";

/**
 * Preferences for Canadian barcodes
 * @type GrabbaBarcodeSymbologyCanadian
 */
GrabbaBarcodeSymbology.prototype.canadian;
/**
 * Preferences for Canadian barcodes
 * @class GrabbaBarcodeSymbologyCanadian
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.canadian</b>
 */
var GrabbaBarcodeSymbologyCanadian = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Canadian post symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyCanadian
 */
GrabbaBarcodeSymbologyCanadian.prototype.enabledBool = "Symb.Canadian.enabledBool false";

/**
 * Preferences for China Postage barcodes
 * @type GrabbaBarcodeSymbologyChinaPostage
 */
GrabbaBarcodeSymbology.prototype.chinapostage;
/**
 * Preferences for China Postage barcodes
 * @class GrabbaBarcodeSymbologyChinaPostage
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.chinapostage</b>
 */
var GrabbaBarcodeSymbologyChinaPostage = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling China Postage symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyChinaPostage
 */
GrabbaBarcodeSymbologyChinaPostage.prototype.enabledBool = "Symb.ChinaPostage.enabledBool false";
/**
 * The minimum length of a China Postage symbology. Default: 4
 * @memberOf GrabbaBarcodeSymbologyChinaPostage
 */
GrabbaBarcodeSymbologyChinaPostage.prototype.minimumLengthInt = "Symb.ChinaPostage.minimumLengthInt 4";

/**
 * Preferences for Codabar barcodes
 * @type GrabbaBarcodeSymbologyCodabar
 */
GrabbaBarcodeSymbology.prototype.codabar;
/**
 * Preferences for Codabar barcodes
 * @class GrabbaBarcodeSymbologyCodabar
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.codabar</b>
 */
var GrabbaBarcodeSymbologyCodabar = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Codabar symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyCodabar
 */
GrabbaBarcodeSymbologyCodabar.prototype.enabledBool = "Symb.Codabar.enabledBool true";
/**
 * The minimum length for a Codabar symbology. Default: 3
 * @memberOf GrabbaBarcodeSymbologyCodabar
 */
GrabbaBarcodeSymbologyCodabar.prototype.minimumLengthInt = "Symb.Codabar.minimumLengthInt 3";

/**
 * Preferences for CodablockA barcodes
 * @type GrabbaBarcodeSymbologyCodablockA
 */
GrabbaBarcodeSymbology.prototype.codablocka;
/**
 * Preferences for CodablockA barcodes
 * @class GrabbaBarcodeSymbologyCodablockA
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.codablocka</b>
 */
var GrabbaBarcodeSymbologyCodablockA = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Enable or disable CodablockA.<br>
 * Note: Enabling CodablockA will disable code 39 codes.
 * @memberOf GrabbaBarcodeSymbologyCodablockA
 */
GrabbaBarcodeSymbologyCodablockA.prototype.enabledBool = "Symb.CodablockA.enabledBool false";

/**
 * Preferences for CodablockF barcodes
 * @type GrabbaBarcodeSymbologyCodablockF
 */
GrabbaBarcodeSymbology.prototype.codablockf;
/**
 * Preferences for CodablockF barcodes
 * @class GrabbaBarcodeSymbologyCodablockF
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.codablockf</b>
 */
var GrabbaBarcodeSymbologyCodablockF = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Enable or disable Codablock F.<br>
 * Note: Enabling CodablockF will disable code 128 type codes (including EAN 128).
 * @memberOf GrabbaBarcodeSymbologyCodablockF
 */
GrabbaBarcodeSymbologyCodablockF.prototype.enabledBool = "Symb.CodablockF.enabledBool false";

/**
 * Preferences for Code11 barcodes
 * @type GrabbaBarcodeSymbologyCode11
 */
GrabbaBarcodeSymbology.prototype.code11;
/**
 * Preferences for Code11 barcodes
 * @class GrabbaBarcodeSymbologyCode11
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.code11</b>
 */
var GrabbaBarcodeSymbologyCode11 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Code 11 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyCode11
 */
GrabbaBarcodeSymbologyCode11.prototype.enabledBool = "Symb.Code11.enabledBool true";
/**
 * The minimum length of Code 11 symbology. Default: 2
 * @memberOf GrabbaBarcodeSymbologyCode11
 */
GrabbaBarcodeSymbologyCode11.prototype.minimumLengthInt = "Symb.Code11.minimumLengthInt 2";

/**
 * Preferences for Code128 barcodes
 * @type GrabbaBarcodeSymbologyCode128
 */
GrabbaBarcodeSymbology.prototype.code128;
/**
 * Preferences for Code128 barcodes
 * @class GrabbaBarcodeSymbologyCode128
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.code128</b>
 */
var GrabbaBarcodeSymbologyCode128 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling check digit calculation for Code 128 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyCode128
 */
GrabbaBarcodeSymbologyCode128.prototype.calcCheckDigitBool = "Symb.Code128.calcCheckDigitBool true";
/**
 * Preference for enabling or disabling Code128 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyCode128
 */
GrabbaBarcodeSymbologyCode128.prototype.enabledBool = "Symb.Code128.enabledBool true";
/**
 * Tthe minimum length of a Code 128 symbology. Default: 1
 * @memberOf GrabbaBarcodeSymbologyCode128
 */
GrabbaBarcodeSymbologyCode128.prototype.minimumLengthInt = "Symb.Code128.minimumLengthInt 1";
/**
 * Preference for enabling or disabling Code 128 check digit transfer. Default: false
 * @memberOf GrabbaBarcodeSymbologyCode128
 */
GrabbaBarcodeSymbologyCode128.prototype.txCheckDigitBool = "Symb.Code128.txCheckDigitBool false";
/**
 * Preference for enabling or disabling EAN128 identifier. Default: true
 * @memberOf GrabbaBarcodeSymbologyCode128
 */
GrabbaBarcodeSymbologyCode128.prototype.txEan128IdentifierBool = "Symb.Code128.txEan128IdentifierBool true";

/**
 * Preferences for Code16k barcodes
 * @type GrabbaBarcodeSymbologyCode16k
 */
GrabbaBarcodeSymbology.prototype.code16k;
/**
 * Preferences for Code16k barcodes
 * @class GrabbaBarcodeSymbologyCode16k
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.code16k</b>
 */
var GrabbaBarcodeSymbologyCode16k = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Code16k symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyCode16k
 */
GrabbaBarcodeSymbologyCode16k.prototype.enabledBool = "Symb.Code16k.enabledBool false";

/**
 * Preferences for Code26 barcodes
 * @type GrabbaBarcodeSymbologyCode26
 */
GrabbaBarcodeSymbology.prototype.code26;
/**
 * Preferences for Code26 barcodes
 * @class GrabbaBarcodeSymbologyCode26
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.code26</b>
 */
var GrabbaBarcodeSymbologyCode26 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Code 26 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyCode26
 */
GrabbaBarcodeSymbologyCode26.prototype.enabledBool = "Symb.Code26.enabledBool false";

/**
 * Preferences for Code39 barcodes
 * @type GrabbaBarcodeSymbologyCode39
 */
GrabbaBarcodeSymbology.prototype.code39;
/**
 * Preferences for Code39 barcodes
 * @class GrabbaBarcodeSymbologyCode39
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.code39</b>
 */
var GrabbaBarcodeSymbologyCode39 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling check digit calculation for Code 39 symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyCode39
 */
GrabbaBarcodeSymbologyCode39.prototype.calcCheckDigitBool = "Symb.Code39.calcCheckDigitBool false";
/**
 * Preference for enabling or disabling Code39 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyCode39
 */
GrabbaBarcodeSymbologyCode39.prototype.enabledBool = "Symb.Code39.enabledBool true";
/**
 * Preference for enabling or disabling full ASCII reformatting of a Code 39 symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyCode39
 */
GrabbaBarcodeSymbologyCode39.prototype.fullASCIIReformatBool = "Symb.Code39.fullASCIIReformatBool false";
/**
 * The minimum length of a Code 39 symbology. Default: 1
 * @memberOf GrabbaBarcodeSymbologyCode39
 */
GrabbaBarcodeSymbologyCode39.prototype.minimumLengthInt = "Symb.Code39.minimumLengthInt 1";
/**
 * Preference for enabling or disabling Code 39 check digit transfer. Default: false
 * @memberOf GrabbaBarcodeSymbologyCode39
 */
GrabbaBarcodeSymbologyCode39.prototype.txCheckDigitBool = "Symb.Code39.txCheckDigitBool false";
/**
 * Preference for enabling or disabling start/stop characters in Code 39 symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyCode39
 */
GrabbaBarcodeSymbologyCode39.prototype.txStartStopBool = "Symb.Code39.txStartStopBool false";

/**
 * Preferences for Code49 barcodes
 * @type GrabbaBarcodeSymbologyCode49
 */
GrabbaBarcodeSymbology.prototype.code49;
/**
 * Preferences for Code49 barcodes
 * @class GrabbaBarcodeSymbologyCode49
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.code49</b>
 */
var GrabbaBarcodeSymbologyCode49 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Code49 symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyCode49
 */
GrabbaBarcodeSymbologyCode49.prototype.enabledBool = "Symb.Code49.enabledBool false";

/**
 * Preferences for Code93 barcodes
 * @type GrabbaBarcodeSymbologyCode93
 */
GrabbaBarcodeSymbology.prototype.code93;
/**
 * Preferences for Code93 barcodes
 * @class GrabbaBarcodeSymbologyCode93
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.code93</b>
 */
var GrabbaBarcodeSymbologyCode93 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Code 93 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyCode93
 */
GrabbaBarcodeSymbologyCode93.prototype.enabledBool = "Symb.Code93.enabledBool true";
/**
 * The minimum length of a Code 93 symbology. Default: 1
 * @memberOf GrabbaBarcodeSymbologyCode93
 */
GrabbaBarcodeSymbologyCode93.prototype.minimumLengthInt = "Symb.Code93.minimumLengthInt 1";

/**
 * Preferences for CodeOne barcodes
 * @type GrabbaBarcodeSymbologyCodeOne
 */
GrabbaBarcodeSymbology.prototype.codeone;
/**
 * Preferences for CodeOne barcodes
 * @class GrabbaBarcodeSymbologyCodeOne
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.codeone</b>
 */
var GrabbaBarcodeSymbologyCodeOne = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling CodeOne symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyCodeOne
 */
GrabbaBarcodeSymbologyCodeOne.prototype.enabledBool = "Symb.CodeOne.enabledBool false";

/**
 * Preferences for Coupon barcodes
 * @type GrabbaBarcodeSymbologyCoupon
 */
GrabbaBarcodeSymbology.prototype.coupon;
/**
 * Preferences for Coupon barcodes
 * @class GrabbaBarcodeSymbologyCoupon
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.coupon</b>
 */
var GrabbaBarcodeSymbologyCoupon = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Coupon symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyCoupon
 */
GrabbaBarcodeSymbologyCoupon.prototype.enabledBool = "Symb.Coupon.enabledBool false";

/**
 * Preferences for D25 barcodes
 * @type GrabbaBarcodeSymbologyD25
 */
GrabbaBarcodeSymbology.prototype.D25;
/**
 * Preferences for D25 barcodes
 * @class GrabbaBarcodeSymbologyD25
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.d25</b>
 */
var GrabbaBarcodeSymbologyD25 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling D25 symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyD25
 */
GrabbaBarcodeSymbologyD25.prototype.enabledBool = "Symb.D25.enabledBool false";

/**
 * Preferences for DataMatrix barcodes
 * @type GrabbaBarcodeSymbologyDataMatrix
 */
GrabbaBarcodeSymbology.prototype.datamatrix;
/**
 * Preferences for DataMatrix barcodes
 * @class GrabbaBarcodeSymbologyDataMatrix
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.datamatrix</b>
 */
var GrabbaBarcodeSymbologyDataMatrix = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling DataMatrix symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyDataMatrix
 */
GrabbaBarcodeSymbologyDataMatrix.prototype.enabledBool = "Symb.DataMatrix.enabledBool true";

/**
 * Preferences for EAN13 barcodes
 * @type GrabbaBarcodeSymbologyEAN13
 */
GrabbaBarcodeSymbology.prototype.ean13;
/**
 * Preferences for EAN13 barcodes
 * @class GrabbaBarcodeSymbologyEAN13
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.ean13</b>
 */
var GrabbaBarcodeSymbologyEAN13 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling EAN13 add on 2 digits. Default: false
 * @memberOf GrabbaBarcodeSymbologyEAN13
 */
GrabbaBarcodeSymbologyEAN13.prototype.addOn2DigitBool = "Symb.EAN13.addOn2DigitBool false";
/**
 * Preference for enabling or disabling EAN13 add on 5 digits. Default: false
 * @memberOf GrabbaBarcodeSymbologyEAN13
 */
GrabbaBarcodeSymbologyEAN13.prototype.addOn5DigitBool = "Symb.EAN13.addOn5DigitBool false";
/**
 * Preference for enabling or disabling EAN13 barcode symbologies. Default: true
 * @memberOf GrabbaBarcodeSymbologyEAN13
 */
GrabbaBarcodeSymbologyEAN13.prototype.enabledBool = "Symb.EAN13.enabledBool true";
/**
 * Preference for enabling or disabling EAN13 to ISBN conversion. Default: false
 * @memberOf GrabbaBarcodeSymbologyEAN13
 */
GrabbaBarcodeSymbologyEAN13.prototype.ISBNConversionBool = "Symb.EAN13.ISBNConversionBool false";
/**
 * Preference for enabling or disabling EAN13 to ISSN conversion. Default: false
 * @memberOf GrabbaBarcodeSymbologyEAN13
 */
GrabbaBarcodeSymbologyEAN13.prototype.ISSNConversionBool = "Symb.EAN13.ISSNConversionBool false";
/**
 * Preference for enabling or disabling EAN13 add ons. Default: false
 * @memberOf GrabbaBarcodeSymbologyEAN13
 */
GrabbaBarcodeSymbologyEAN13.prototype.requireAddOnsBool = "Symb.EAN13.requireAddOnsBool false";
/**
 * Preference for enabling or disabling EAN13 transfer check digit. Default: true
 * @memberOf GrabbaBarcodeSymbologyEAN13
 */
GrabbaBarcodeSymbologyEAN13.prototype.txCheckDigitBool = "Symb.EAN13.txCheckDigitBool true";

/**
 * Preferences for EAN8 barcodes
 * @type GrabbaBarcodeSymbologyEAN8
 */
GrabbaBarcodeSymbology.prototype.ean8;
/**
 * Preferences for EAN8 barcodes
 * @class GrabbaBarcodeSymbologyEAN8
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.ean8</b>
 */
var GrabbaBarcodeSymbologyEAN8 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling reformatting EAN8 to EAN13. Default: false
 * @memberOf GrabbaBarcodeSymbologyEAN8
 */
GrabbaBarcodeSymbologyEAN8.prototype.EAN8toEAN13ReformatBool = "Symb.EAN8.EAN8toEAN13ReformatBool false";
/**
 * Preference for enabling or disabling EAN8 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyEAN8
 */
GrabbaBarcodeSymbologyEAN8.prototype.enabledBool = "Symb.EAN8.enabledBool true";
/**
 * Preference for enabling or disabling EAN8 transfer check digit. Default: true
 * @memberOf GrabbaBarcodeSymbologyEAN8
 */
GrabbaBarcodeSymbologyEAN8.prototype.txCheckDigitBool = "Symb.EAN8.txCheckDigitBool true";

/**
 * Preferences for EANComposite barcodes
 * @type GrabbaBarcodeSymbologyEANComposite
 */
GrabbaBarcodeSymbology.prototype.eancomposite;
/**
 * Preferences for EANComposite barcodes
 * @class GrabbaBarcodeSymbologyEANComposite
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.eancomposite</b>
 */
var GrabbaBarcodeSymbologyEANComposite = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling EAN Composite symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyEANComposite
 */
GrabbaBarcodeSymbologyEANComposite.prototype.enabledBool = "Symb.EANComposite.enabledBool false";

/**
 * Preferences for Industrial25 barcodes
 * @type GrabbaBarcodeSymbologyIndustrial25
 */
GrabbaBarcodeSymbology.prototype.industrial25;
/**
 * Preferences for Industrial25 barcodes
 * @class GrabbaBarcodeSymbologyIndustrial25
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.industrial25</b>
 */
var GrabbaBarcodeSymbologyIndustrial25 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Industrial 2 of 5 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyIndustrial25
 */
GrabbaBarcodeSymbologyIndustrial25.prototype.enabledBool = "Symb.Industrial25.enabledBool true";
/**
 * The minimum length of an Industrial 2 of 5 symbology. Default: 2
 * @memberOf GrabbaBarcodeSymbologyIndustrial25
 */
GrabbaBarcodeSymbologyIndustrial25.prototype.minimumLengthInt = "Symb.Industrial25.minimumLengthInt 2";

/**
 * Preferences for Interleaved25 barcodes
 * @type GrabbaBarcodeSymbologyInterleaved25
 */
GrabbaBarcodeSymbology.prototype.interleaved25;
/**
 * Preferences for Interleaved25 barcodes
 * @class GrabbaBarcodeSymbologyInterleaved25
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.interleaved25</b>
 */
var GrabbaBarcodeSymbologyInterleaved25 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling the Interleaved 2 of 5 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyInterleaved25
 */
GrabbaBarcodeSymbologyInterleaved25.prototype.enabledBool = "Symb.Interleaved25.enabledBool true";
/**
 * The minimum length of an Interleaved 2 of 5 symbology. Default: 4
 * @memberOf GrabbaBarcodeSymbologyInterleaved25
 */
GrabbaBarcodeSymbologyInterleaved25.prototype.minimumLengthInt = "Symb.Interleaved25.minimumLengthInt 4";

/**
 * Preferences for Japanese barcodes
 * @type GrabbaBarcodeSymbologyJapanese
 */
GrabbaBarcodeSymbology.prototype.japanese;
/**
 * Preferences for Japanese barcodes
 * @class GrabbaBarcodeSymbologyJapanese
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.japanese</b>
 */
var GrabbaBarcodeSymbologyJapanese = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Japanese postal symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyJapanese
 */
GrabbaBarcodeSymbologyJapanese.prototype.enabledBool = "Symb.Japanese.enabledBool false";

/**
 * Preferences for Korea barcodes
 * @type GrabbaBarcodeSymbologyKorea
 */
GrabbaBarcodeSymbology.prototype.korea;
/**
 * Preferences for Korea barcodes
 * @class GrabbaBarcodeSymbologyKorea
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.korea</b>
 */
var GrabbaBarcodeSymbologyKorea = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Korea postal symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyKorea
 */
GrabbaBarcodeSymbologyKorea.prototype.enabledBool = "Symb.Korea.enabledBool false";

/**
 * Preferences for Matrix25 barcodes
 * @type GrabbaBarcodeSymbologyMatrix25
 */
GrabbaBarcodeSymbology.prototype.matrix25;
/**
 * Preferences for Matrix25 barcodes
 * @class GrabbaBarcodeSymbologyMatrix25
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.matrix25</b>
 */
var GrabbaBarcodeSymbologyMatrix25 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Matrix 2 of 5 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyMatrix25
 */
GrabbaBarcodeSymbologyMatrix25.prototype.enabledBool = "Symb.Matrix25.enabledBool true";
/**
 * The minimum length of a Matrix 2 of 5 symbology. Default: 4
 * @memberOf GrabbaBarcodeSymbologyMatrix25
 */
GrabbaBarcodeSymbologyMatrix25.prototype.minimumLengthInt = "Symb.Matrix25.minimumLengthInt 4";

/**
 * Preferences for Maxicode barcodes
 * @type GrabbaBarcodeSymbologyMaxicode
 */
GrabbaBarcodeSymbology.prototype.maxicode;
/**
 * Preferences for Maxicode barcodes
 * @class GrabbaBarcodeSymbologyMaxicode
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.maxicode</b>
 */
var GrabbaBarcodeSymbologyMaxicode = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Maxicode symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyMaxicode
 */
GrabbaBarcodeSymbologyMaxicode.prototype.enabledBool = "Symb.Maxicode.enabledBool false";

/**
 * Preferences for MicroPDF417 barcodes
 * @type GrabbaBarcodeSymbologyMicroPDF417
 */
GrabbaBarcodeSymbology.prototype.micropdf417;
/**
 * Preferences for MicroPDF417 barcodes
 * @class GrabbaBarcodeSymbologyMicroPDF417
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.micropdf417</b>
 */
var GrabbaBarcodeSymbologyMicroPDF417 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling MicroPDF417 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyMicroPDF417
 */
GrabbaBarcodeSymbologyMicroPDF417.prototype.enabledBool = "Symb.MicroPDF417.enabledBool true";

/**
 * Preferences for MSI barcodes
 * @type GrabbaBarcodeSymbologyMSI
 */
GrabbaBarcodeSymbology.prototype.msi;
/**
 * Preferences for MSI barcodes
 * @class GrabbaBarcodeSymbologyMSI
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.msi</b>
 */
var GrabbaBarcodeSymbologyMSI = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling MSI symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyMSI
 */
GrabbaBarcodeSymbologyMSI.prototype.enabledBool = "Symb.MSI.enabledBool false";
/**
 * The minimum length of MSI symbology. Default: 3
 * @memberOf GrabbaBarcodeSymbologyMSI
 */
GrabbaBarcodeSymbologyMSI.prototype.minimumLengthInt = "Symb.MSI.minimumLengthInt 3";

/**
 * Preferences for Netherlands barcodes
 * @type GrabbaBarcodeSymbologyNetherlands
 */
GrabbaBarcodeSymbology.prototype.netherlands;
/**
 * Preferences for Netherlands barcodes
 * @class GrabbaBarcodeSymbologyNetherlands
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.netherlands</b>
 */
var GrabbaBarcodeSymbologyNetherlands = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Netherlands postal symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyNetherlands
 */
GrabbaBarcodeSymbologyNetherlands.prototype.enabledBool = "Symb.Netherlands.enabledBool false";

/**
 * Preferences for PDF417 barcodes
 * @type GrabbaBarcodeSymbologyPDF417
 */
GrabbaBarcodeSymbology.prototype.pdf417;
/**
 * Preferences for PDF417 barcodes
 * @class GrabbaBarcodeSymbologyPDF417
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.pdf417</b>
 */
var GrabbaBarcodeSymbologyPDF417 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling PDF417 symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyPDF417
 */
GrabbaBarcodeSymbologyPDF417.prototype.enabledBool = "Symb.PDF417.enabledBool true";
/**
 * Preference for enabling or disabling transfer of the control header for PDF417. Default: false
 * @memberOf GrabbaBarcodeSymbologyPDF417
 */
GrabbaBarcodeSymbologyPDF417.prototype.txControlHeaderBool = "Symb.PDF417.txControlHeaderBool false";
/**
 * Preference for enabling or disabling transfer of the file name for PDF417. Default: false
 * @memberOf GrabbaBarcodeSymbologyPDF417
 */
GrabbaBarcodeSymbologyPDF417.prototype.txFileNameBool = "Symb.PDF417.txFileNameBool false";

/**
 * Preferences for Planet barcodes
 * @type GrabbaBarcodeSymbologyPlanet
 */
GrabbaBarcodeSymbology.prototype.planet;
/**
 * Preferences for Planet barcodes
 * @class GrabbaBarcodeSymbologyPlanet
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.planet</b>
 */
var GrabbaBarcodeSymbologyPlanet = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling PLANET symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyPlanet
 */
GrabbaBarcodeSymbologyPlanet.prototype.enabledBool = "Symb.Planet.enabledBool false";

/**
 * Preferences for Plessey barcodes
 * @type GrabbaBarcodeSymbologyPlessey
 */
GrabbaBarcodeSymbology.prototype.plessey;
/**
 * Preferences for Plessey barcodes
 * @class GrabbaBarcodeSymbologyPlessey
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.plessey</b>
 */
var GrabbaBarcodeSymbologyPlessey = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Plessey symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyPlessey
 */
GrabbaBarcodeSymbologyPlessey.prototype.enabledBool = "Symb.Plessey.enabledBool true";
/**
 * The minimum length of a Plessey symbology. Default: 4
 * @memberOf GrabbaBarcodeSymbologyPlessey
 */
GrabbaBarcodeSymbologyPlessey.prototype.minimumLengthInt = "Symb.Plessey.minimumLengthInt 4";
/**
 * Enable or disable transfer of check digits. Default: false
 * @memberOf GrabbaBarcodeSymbologyPlessey
 */
GrabbaBarcodeSymbologyPlessey.prototype.txCheckDigitBool = "Symb.Plessey.txCheckDigitBool false";
/**
 * Enable or disable X to A conversion. Default: false
 * @memberOf GrabbaBarcodeSymbologyPlessey
 */
GrabbaBarcodeSymbologyPlessey.prototype.xToAConversionBool = "Symb.Plessey.xToAConversionBool false";

/**
 * Preferences for Posi barcodes
 * @type GrabbaBarcodeSymbologyPosi
 */
GrabbaBarcodeSymbology.prototype.posi;
/**
 * Preferences for Posi barcodes
 * @class GrabbaBarcodeSymbologyPosi
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.posi</b>
 */
var GrabbaBarcodeSymbologyPosi = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Posi symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyPosi
 */
GrabbaBarcodeSymbologyPosi.prototype.enabledBool = "Symb.Posi.enabledBool false";

/**
 * Preferences for Postnet barcodes
 * @type GrabbaBarcodeSymbologyPostnet
 */
GrabbaBarcodeSymbology.prototype.postnet;
/**
 * Preferences for Postnet barcodes
 * @class GrabbaBarcodeSymbologyPostnet
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.postnet</b>
 */
var GrabbaBarcodeSymbologyPostnet = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling POSTNET symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyPostnet
 */
GrabbaBarcodeSymbologyPostnet.prototype.enabledBool = "Symb.Postnet.enabledBool false";

/**
 * Preferences for QRCode barcodes
 * @type GrabbaBarcodeSymbologyQRCode
 */
GrabbaBarcodeSymbology.prototype.qrcode;
/**
 * Preferences for QRCode barcodes
 * @class GrabbaBarcodeSymbologyQRCode
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.qrcode</b>
 */
var GrabbaBarcodeSymbologyQRCode = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling QR Code symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyQRCode
 */
GrabbaBarcodeSymbologyQRCode.prototype.enabledBool = "Symb.QRCode.enabledBool true";

/**
 * Preferences for RSS14 (GS-1 Databar) barcodes
 * @type GrabbaBarcodeSymbologyRSS14
 */
GrabbaBarcodeSymbology.prototype.rss14;
/**
 * Preferences for RSS14 (GS-1 Databar) barcodes
 * @class GrabbaBarcodeSymbologyRSS14
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.rss14</b>
 */
var GrabbaBarcodeSymbologyRSS14 = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling RSS14 (GS1) symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyRSS14
 */
GrabbaBarcodeSymbologyRSS14.prototype.enabledBool = "Symb.RSS14.enabledBool true";

/**
 * Preferences for RSS14Expanded (GS-1 Databar Expanded) barcodes
 * @type GrabbaBarcodeSymbologyRSS14Expanded
 */
GrabbaBarcodeSymbology.prototype.rss14expanded;
/**
 * Preferences for RSS14Expanded (GS-1 Databar Expanded) barcodes
 * @class GrabbaBarcodeSymbologyRSS14Expanded
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.rss14expanded</b>
 */
var GrabbaBarcodeSymbologyRSS14Expanded = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling RSS14 Expanded (GS1 Expanded) symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyRSS14Expanded
 */
GrabbaBarcodeSymbologyRSS14Expanded.prototype.enabledBool = "Symb.RSS14Expanded.enabledBool true";

/**
 * Preferences for RSS14Limited (GS-1 Databar Limited) barcodes
 * @type GrabbaBarcodeSymbologyRSS14Limited
 */
GrabbaBarcodeSymbology.prototype.rss14limited;
/**
 * Preferences for RSS14Limited (GS-1 Databar Limited) barcodes
 * @class GrabbaBarcodeSymbologyRSS14Limited
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.rss14limited</b>
 */
var GrabbaBarcodeSymbologyRSS14Limited = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling RSS14 Limited (GS1 Limited) symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyRSS14Limited
 */
GrabbaBarcodeSymbologyRSS14Limited.prototype.enabledBool = "Symb.RSS14Limited.enabledBool true";

/**
 * Preferences for Telepen barcodes
 * @type GrabbaBarcodeSymbologyTelepen
 */
GrabbaBarcodeSymbology.prototype.telepen;
/**
 * Preferences for Telepen barcodes
 * @class GrabbaBarcodeSymbologyTelepen
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.telepen</b>
 */
var GrabbaBarcodeSymbologyTelepen = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling decoding Telepen as ASCII. Default: true
 * @memberOf GrabbaBarcodeSymbologyTelepen
 */
GrabbaBarcodeSymbologyTelepen.prototype.decodeAsASCIIBool = "Symb.Telepen.decodeAsASCIIBool true";
/**
 * Preference for enabling or disabling Telepen symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyTelepen
 */
GrabbaBarcodeSymbologyTelepen.prototype.enabledBool = "Symb.Telepen.enabledBool true";

/**
 * Preferences for TLC barcodes
 * @type GrabbaBarcodeSymbologyTLC
 */
GrabbaBarcodeSymbology.prototype.tlc;
/**
 * Preferences for TLC barcodes
 * @class GrabbaBarcodeSymbologyTLC
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.tlc</b>
 */
var GrabbaBarcodeSymbologyTLC = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling TLC symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyTLC
 */
GrabbaBarcodeSymbologyTLC.prototype.enabledBool = "Symb.TLC.enabledBool false";

/**
 * Preferences for Trioptic barcodes
 * @type GrabbaBarcodeSymbologyTrioptic
 */
GrabbaBarcodeSymbology.prototype.trioptic;
/**
 * Preferences for Trioptic barcodes
 * @class GrabbaBarcodeSymbologyTrioptic
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.trioptic</b>
 */
var GrabbaBarcodeSymbologyTrioptic = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling Trioptic symbology. Default: false
 * @memberOf GrabbaBarcodeSymbologyTrioptic
 */
GrabbaBarcodeSymbologyTrioptic.prototype.enabledBool = "Symb.Trioptic.enabledBool false";

/**
 * Preferences for UPCA barcodes
 * @type GrabbaBarcodeSymbologyUPCA
 */
GrabbaBarcodeSymbology.prototype.upca;
/**
 * Preferences for UPCA barcodes
 * @class GrabbaBarcodeSymbologyUPCA
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.upca</b>
 */
var GrabbaBarcodeSymbologyUPCA = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling UPCA symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyUPCA
 */
GrabbaBarcodeSymbologyUPCA.prototype.enabledBool = "Symb.UPCA.enabledBool true";
/**
 * Preference for enabling or disabling UPCA transfer check digit. Default: true
 * @memberOf GrabbaBarcodeSymbologyUPCA
 */
GrabbaBarcodeSymbologyUPCA.prototype.txCheckDigitBool = "Symb.UPCA.txCheckDigitBool true";
/**
 * Preference for enabling or disabling transferring UPCA number system digit. Default: true
 * @memberOf GrabbaBarcodeSymbologyUPCA
 */
GrabbaBarcodeSymbologyUPCA.prototype.txNumberSystemDigitBool = "Symb.UPCA.txNumberSystemDigitBool true";
/**
 * Preference for enabling or disabling reformatting UPCA to EAN13. Default: false
 * @memberOf GrabbaBarcodeSymbologyUPCA
 */
GrabbaBarcodeSymbologyUPCA.prototype.UPCAtoEAN13ReformatBool = "Symb.UPCA.UPCAtoEAN13ReformatBool false";

/**
 * Preferences for UPCE barcodes
 * @type GrabbaBarcodeSymbologyUPCE
 */
GrabbaBarcodeSymbology.prototype.upce;
/**
 * Preferences for UPCE barcodes
 * @class GrabbaBarcodeSymbologyUPCE
 * @classdesc   Access this class via <b>grabba.barcode.preferences.symbology.upce</b>
 */
var GrabbaBarcodeSymbologyUPCE = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Preference for enabling or disabling UPCE symbology. Default: true
 * @memberOf GrabbaBarcodeSymbologyUPCE
 */
GrabbaBarcodeSymbologyUPCE.prototype.enabledBool = "Symb.UPCE.enabledBool true";
/**
 * Preference for enabling or disabling UPCE check digit transfer. Default: true
 * @memberOf GrabbaBarcodeSymbologyUPCE
 */
GrabbaBarcodeSymbologyUPCE.prototype.txCheckDigitBool = "Symb.UPCE.txCheckDigitBool true";
/**
 * Preference for enabling or disabling UPCE number system digit transfer. Default: true
 * @memberOf GrabbaBarcodeSymbologyUPCE
 */
GrabbaBarcodeSymbologyUPCE.prototype.txNumberSystemDigitBool = "Symb.UPCE.txNumberSystemDigitBool true";
/**
 * Preference for enabling or disabling reformatting UPCE to UPCA. Default: false
 * @memberOf GrabbaBarcodeSymbologyUPCE
 */
GrabbaBarcodeSymbologyUPCE.prototype.UPCEtoUPCAReformatBool = "Symb.UPCE.UPCEtoUPCAReformatBool false";

module.exports.barcode = new GrabbaBarcode();
module.exports.barcode.preferences = new GrabbaBarcodePreferences();
module.exports.barcode.preferences.imager = new GrabbaBarcodePreferencesImager();
module.exports.barcode.preferences.imager.ship = new GrabbaBarcodePreferencesImagerShip();
module.exports.barcode.preferences.imager.snap = new GrabbaBarcodePreferencesImagerSnap();
module.exports.barcode.preferences.symbology = new GrabbaBarcodeSymbology();
module.exports.barcode.preferences.symbology.auspost = new GrabbaBarcodeSymbologyAusPost();
module.exports.barcode.preferences.symbology.aztec = new GrabbaBarcodeSymbologyAztec();
module.exports.barcode.preferences.symbology.bc412 = new GrabbaBarcodeSymbologyBC412();
module.exports.barcode.preferences.symbology.british = new GrabbaBarcodeSymbologyBritish();
module.exports.barcode.preferences.symbology.canadian = new GrabbaBarcodeSymbologyCanadian();
module.exports.barcode.preferences.symbology.chinapostage = new GrabbaBarcodeSymbologyChinaPostage();
module.exports.barcode.preferences.symbology.codabar = new GrabbaBarcodeSymbologyCodabar();
module.exports.barcode.preferences.symbology.codablocka = new GrabbaBarcodeSymbologyCodablockA();
module.exports.barcode.preferences.symbology.codablockf = new GrabbaBarcodeSymbologyCodablockF();
module.exports.barcode.preferences.symbology.code11 = new GrabbaBarcodeSymbologyCode11();
module.exports.barcode.preferences.symbology.code128 = new GrabbaBarcodeSymbologyCode128();
module.exports.barcode.preferences.symbology.code16k = new GrabbaBarcodeSymbologyCode16k();
module.exports.barcode.preferences.symbology.code26 = new GrabbaBarcodeSymbologyCode26();
module.exports.barcode.preferences.symbology.code39 = new GrabbaBarcodeSymbologyCode39();
module.exports.barcode.preferences.symbology.code49 = new GrabbaBarcodeSymbologyCode49();
module.exports.barcode.preferences.symbology.codeone = new GrabbaBarcodeSymbologyCodeOne();
module.exports.barcode.preferences.symbology.coupon = new GrabbaBarcodeSymbologyCoupon();
module.exports.barcode.preferences.symbology.d25 = new GrabbaBarcodeSymbologyD25();
module.exports.barcode.preferences.symbology.datamatrix = new GrabbaBarcodeSymbologyDataMatrix();
module.exports.barcode.preferences.symbology.ean13 = new GrabbaBarcodeSymbologyEAN13();
module.exports.barcode.preferences.symbology.ean8 = new GrabbaBarcodeSymbologyEAN8();
module.exports.barcode.preferences.symbology.eancomposite = new GrabbaBarcodeSymbologyEANComposite();
module.exports.barcode.preferences.symbology.industrial25 = new GrabbaBarcodeSymbologyIndustrial25();
module.exports.barcode.preferences.symbology.interleaved25 = new GrabbaBarcodeSymbologyInterleaved25();
module.exports.barcode.preferences.symbology.japanese = new GrabbaBarcodeSymbologyJapanese();
module.exports.barcode.preferences.symbology.korea = new GrabbaBarcodeSymbologyKorea();
module.exports.barcode.preferences.symbology.matrix25 = new GrabbaBarcodeSymbologyMatrix25();
module.exports.barcode.preferences.symbology.maxicode = new GrabbaBarcodeSymbologyMaxicode();
module.exports.barcode.preferences.symbology.micropdf417 = new GrabbaBarcodeSymbologyMicroPDF417();
module.exports.barcode.preferences.symbology.msi = new GrabbaBarcodeSymbologyMSI();
module.exports.barcode.preferences.symbology.netherlands = new GrabbaBarcodeSymbologyNetherlands();
module.exports.barcode.preferences.symbology.pdf417 = new GrabbaBarcodeSymbologyPDF417();
module.exports.barcode.preferences.symbology.planet = new GrabbaBarcodeSymbologyPlanet();
module.exports.barcode.preferences.symbology.plessey = new GrabbaBarcodeSymbologyPlessey();
module.exports.barcode.preferences.symbology.posi = new GrabbaBarcodeSymbologyPosi();
module.exports.barcode.preferences.symbology.postnet = new GrabbaBarcodeSymbologyPostnet();
module.exports.barcode.preferences.symbology.qrcode = new GrabbaBarcodeSymbologyQRCode();
module.exports.barcode.preferences.symbology.rss14 = new GrabbaBarcodeSymbologyRSS14();
module.exports.barcode.preferences.symbology.rss14expanded = new GrabbaBarcodeSymbologyRSS14Expanded();
module.exports.barcode.preferences.symbology.rss14limited = new GrabbaBarcodeSymbologyRSS14Limited();
module.exports.barcode.preferences.symbology.telepen = new GrabbaBarcodeSymbologyTelepen();
module.exports.barcode.preferences.symbology.tlc = new GrabbaBarcodeSymbologyTLC();
module.exports.barcode.preferences.symbology.trioptic = new GrabbaBarcodeSymbologyTrioptic();
module.exports.barcode.preferences.symbology.upca = new GrabbaBarcodeSymbologyUPCA();
module.exports.barcode.preferences.symbology.upce = new GrabbaBarcodeSymbologyUPCE();

//   _____           _     _          ______                              _   
//  |  __ \         | |   | |         | ___ \                            | |  
//  | |  \/_ __ __ _| |__ | |__   __ _| |_/ /_ _ ___ ___ _ __   ___  _ __| |_ 
//  | | __| '__/ _` | '_ \| '_ \ / _` |  __/ _` / __/ __| '_ \ / _ \| '__| __|
//  | |_\ \ | | (_| | |_) | |_) | (_| | | | (_| \__ \__ \ |_) | (_) | |  | |_ 
//   \____/_|  \__,_|_.__/|_.__/ \__,_\_|  \__,_|___/___/ .__/ \___/|_|   \__|
//                                                      | |                   
//                                                      |_|                   

/**
 * Access Grabba Passport MRZ reading capabilities via <b>grabba.passport</b>
 * 
 * @class       GrabbaPassport
 * @classdesc   Access this class via <b>grabba.passport</b>
 */
var GrabbaPassport = function () {
    "use strict";
    this.platforms = ["android", "ios", "windows"];
};

/**
 * Access Grabba passport MRZ reading capabilities through <b>grabba.passport</b>
 * 
 * @type GrabbaPassport
 */
Grabba.prototype.passport;

/**
 * Determines if the currently connected Grabba supports passport MRZ reading functionality.
 * 
 * @memberOf GrabbaPassport
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {boolean} Boolean indicating if GrabbaPassport is supported.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to check if the connected Grabba supports passport MRZ reading functionality.
 *  <button onclick="grabba.passport.isSupported(function(supported){
 *  alert('Grabba passport supported is ' + supported);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">Is passport supported?</button>
 */
GrabbaPassport.prototype.isSupported = function (onSuccess, onError) {
    var command = {
        command: "isSupported"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "GrabbaPassport", [command]);
};

/**
 * Register callbacks for passport MRZ reader related events.<br>
 * If no callbacks are passed to this function, all present callbacks will be cleared.
 * 
 * @memberOf GrabbaPassport
 * @param {function} callback Called when a passport is read with the following parameters:<br>
 * {String} Passport MRZ string.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //Register a passport callback
 *  grabba.passport.registerCallback(
 *  function (passportString){
 *      alert('Passport MRZ: ' + passportString);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });
 */
GrabbaPassport.prototype.registerCallback = function (callback, onError) {
    var command;
    if (!callback) {
        command = {
            command: "clearCallbacks"
        };
        exec(null, onError, "GrabbaPlugin", "GrabbaPassport", [command]);
        return;
    }

    command = {
        command: "registerCallback"
    };
    exec(callback, onError, "GrabbaPlugin", "GrabbaPassport", [command]);
};

/**
 * Grabba passport preference identifiers.
 * @type GrabbaPassportPreferences
 */
GrabbaPassport.prototype.preferences;

/**
 * Grabba passport preference identifiers.<br>
 * Please refer to the preference name suffix for the preference type.
 * 
 * @class       GrabbaPassportPreferences
 * @classdesc   Access this class via <b>grabba.passport.preferences</b>
 * @see Grabba#setBoolPref
 * @see Grabba#getBoolPref
 * @see Grabba#setIntPref
 * @see Grabba#getIntPref
 */
var GrabbaPassportPreferences = function () {
    "use strict";
    this.platforms = ["android"];
};

module.exports.passport = new GrabbaPassport();
module.exports.passport.preferences = new GrabbaPassportPreferences();

//   _____           _     _          ___  ___                _        _            
//  |  __ \         | |   | |         |  \/  |               | |      (_)           
//  | |  \/_ __ __ _| |__ | |__   __ _| .  . | __ _  __ _ ___| |_ _ __ _ _ __   ___ 
//  | | __| '__/ _` | '_ \| '_ \ / _` | |\/| |/ _` |/ _` / __| __| '__| | '_ \ / _ \
//  | |_\ \ | | (_| | |_) | |_) | (_| | |  | | (_| | (_| \__ \ |_| |  | | |_) |  __/
//   \____/_|  \__,_|_.__/|_.__/ \__,_\_|  |_/\__,_|\__, |___/\__|_|  |_| .__/ \___|
//                                                   __/ |              | |         
//                                                  |___/               |_|         

/**
 * Access Grabba magnetic stripe reading capabilities via <b>grabba.magstripe</b>
 * 
 * @class       GrabbaMagstripe
 * @classdesc   Access this class via <b>grabba.magstripe</b>
 */
var GrabbaMagstripe = function () {
    "use strict";
    this.platforms = ["android", "ios", "windows"];
};

/**
 * Access Grabba magnetic stripe reading capabilities via <b>grabba.magstripe</b>
 * 
 * @type GrabbaMagstripe
 */
Grabba.prototype.magstripe;

/**
 * Determines if the currently connected Grabba supports magnetic stripe reading functionality.
 * 
 * @memberOf GrabbaMagstripe
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {boolean} Boolean indicating if GrabbaMagstripe is supported.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to check if the connected Grabba supports magnetic stripe reading functionality.
 *  <button onclick="grabba.magstripe.isSupported(function(supported){
 *  alert('Grabba magstripe supported is ' + supported);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">Is magstripe supported?</button>
 */
GrabbaMagstripe.prototype.isSupported = function (onSuccess, onError) {
    var command = {
        command: "isSupported"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "GrabbaMagstripe", [command]);
};

/**
 * Register callbacks for magnetic stripe reader related events.<br>
 * If no callbacks are passed to this function, all present callbacks will be cleared.
 * 
 * @memberOf GrabbaMagstripe
 * @param {Object} callback An object which implements the following functions:<br>
 * <b>readEvent : function(magstripeData){}</b><br>
 * Called when the magnetic stripe is read.<br>
 * Returns a String for each track.<br><br>
 * <b>rawReadEvent : function(magstripeData){}</b><br>
 * Called when a raw magnetic stripe is read.<br>
 * Returns raw data as an integer array.<br><br>
 * The returned object contains properties as follows:<br>
 * magstripeData.track1 Magnetic stripe track 1<br>
 * magstripeData.track2 Magnetic stripe track 2<br>
 * magstripeData.track3 Magnetic stripe track 3<br>
 * If the track property is:
 * 1. A zero length string - this indicates that the track was not present on the card or the track data was present on the card but failed verification (was not read correctly).<br>
 * 2. A non-zero length array - this is the actual track data which was read correctly with no errors.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //An example of an implemented Magnetic stripe callback is as follows:
 * grabba.magstripe.registerCallback(magstripeCallback, onError);
 *  var rawReadCallback = function(magstripeData) {
 *      //Handle processing raw magstripe data here
 *  };
 *                      
 *  var magstripeCallback = {
 *      //Functions may also be declared inline as seen here.
 *      readEvent: function(magstripeData) {
 *      alert('Magstripe read event' + '\n' +
 *      'Track 1: ' + magstripeData.track1 + '\n' +
 *      'Track 2: ' + magstripeData.track2 + '\n' +
 *      'Track 3: ' + magstripeData.track3 + '\n');
 *      },
 *      //These functions are optional and unimplemented functions will simply not be called.
 *      //You may create a function separately as seen with rawReadCallback here.
 *      rawReadEvent: rawReadCallback
 *      };
 *  };
 */
GrabbaMagstripe.prototype.registerCallback = function (callback, onError) {
    var command;
    if (!callback || (!callback.readEvent && !callback.rawReadEvent)) {
        command = {
            command: "clearCallbacks"
        };
        exec(null, onError, "GrabbaPlugin", "GrabbaMagstripe", [command]);
        return;
    }
    if (callback.readEvent) {
        command = {
            command: "registerReadCallback"
        };
        exec(callback.readEvent, onError, "GrabbaPlugin", "GrabbaMagstripe", [command]);
    }

    if (callback.rawReadEvent) {
        command = {
            command: "registerRawReadCallback"
        };
        exec(callback.rawReadEvent, onError, "GrabbaPlugin", "GrabbaMagstripe", [command]);
    }
};

/**
 * Grabba magstripe preference identifiers.
 * @type GrabbaMagstripePreferences
 */
GrabbaMagstripe.prototype.preferences;

/**
 * Grabba magstripe preference identifiers.<br>
 * Please refer to the preference name suffix for the preference type.
 * 
 * @class       GrabbaMagstripePreferences
 * @classdesc   Access this class via <b>grabba.magstripe.preferences</b>
 * @see Grabba#setBoolPref
 * @see Grabba#getBoolPref
 * @see Grabba#setIntPref
 * @see Grabba#getIntPref
 */
var GrabbaMagstripePreferences = function () {
    "use strict";
    this.platforms = ["android"];
};

/**
 * Issue a beep upon successful scan. Default: true
 * @memberOf GrabbaMagstripePreferences
 */
GrabbaMagstripePreferences.prototype.beepOnScanBool = "GrabbaMagstripePreferences.beepOnScanBool true";
/**
 * Toggles reading of non-ISO magstripe cards (for example, cards which are encoded using ASCII 8 bit characters, as 
 * opposed to the regular 5 and 7 bit characters). Please note that when this preference is enabled, callbacks will 
 * be returned via the registered <b>callback.rawReadEvent</b> instead of the <b>callback.readEvent</b>.
 * @memberOf GrabbaMagstripePreferences
 */
GrabbaMagstripePreferences.prototype.nonISOmodeEnableBool = "GrabbaMagstripePreferences.nonISOmodeEnableBool false";
/**
 * Vibrate the phone upon successful scan. Default: true
 * @memberOf GrabbaMagstripePreferences
 */
GrabbaMagstripePreferences.prototype.vibrateOnScanBool = "GrabbaMagstripePreferences.vibrateOnScanBool true";

module.exports.magstripe = new GrabbaMagstripe();
module.exports.magstripe.preferences = new GrabbaMagstripePreferences();

//   _____           _     _          ______ _                                  _       _   
//  |  __ \         | |   | |         |  ___(_)                                (_)     | |  
//  | |  \/_ __ __ _| |__ | |__   __ _| |_   _ _ __   __ _  ___ _ __ _ __  _ __ _ _ __ | |_ 
//  | | __| '__/ _` | '_ \| '_ \ / _` |  _| | | '_ \ / _` |/ _ \ '__| '_ \| '__| | '_ \| __|
//  | |_\ \ | | (_| | |_) | |_) | (_| | |   | | | | | (_| |  __/ |  | |_) | |  | | | | | |_ 
//   \____/_|  \__,_|_.__/|_.__/ \__,_\_|   |_|_| |_|\__, |\___|_|  | .__/|_|  |_|_| |_|\__|
//                                                    __/ |         | |                     
//                                                   |___/          |_|                     

/**
 * Access Grabba fingerprint reading capabilities through <b>grabba.fingerprint</b>
 * 
 * @class       GrabbaFingerprint
 * @classdesc   Access this class via <b>grabba.fingerprint</b>
 */
var GrabbaFingerprint = function () {
    "use strict";
    this.platforms = ["android", "ios", "windows"];
};

/**
 * Grabba fingerprint template types.
 * 
 * @memberOf GrabbaFingerprint
 * @property {int} ISO_PK_DATA_ANSI_378 ANSI INCITS 378-2004 Template.
 * @property {int} ISO_PK_DATA_FMC_CS ISO/IEC 19794-2 Finger Minutiae Card Record, Compact Size.
 * @property {int} ISO_PK_DATA_FMC_NS ISO/IEC 19794-2 Finger Minutiae Card Record, Normal Size.
 * @property {int} ISO_PK_DATA_FMR ISO/IEC 19794-2 Finger Minutiae Record.
 * @property {int} ISO_PK_DATA_MINEX_A MINEX A Specification (Restricted ANSI INCITS 378-2004) Template.
 * @property {int} NO_TEMPLATE No template.
 * @property {int} PK_COMP_V2 Sagem Compressed Template.
 * @property {int} PK_COMP_V2_NORM Sagem Compressed Template (Normalised).
 * @property {int} PK_DIN_V66400 DIN V66400 fingerprint template which complies with the DIN-V66400 Compact Size.
 * @property {int} PK_MAT Sagem Uncompressed Template
 * @property {int} PK_MAT_NORM Sagem Uncompressed Template (Normalised)
 * @property {int} UNKNOWN Unknown template.
 */
GrabbaFingerprint.prototype.TemplateType = {
    'ISO_PK_DATA_ANSI_378': 5,
    'ISO_PK_DATA_FMC_CS': 9,
    'ISO_PK_DATA_FMC_NS': 8,
    'ISO_PK_DATA_FMR': 7,
    'ISO_PK_DATA_MINEX_A': 6,
    'NO_TEMPLATE': 0,
    'PK_COMP_V2': 1,
    'PK_COMP_V2_NORM': 2,
    'PK_MAT': 3,
    'PK_MAT_NORM': 4,
    'UNKNOWN': -1
};

/**
 * Grabba fingerprint image types.
 * 
 * @memberOf GrabbaFingerprint
 * @property {int} NO_IMAGE No image.
 * @property {int} IMG_NO_COMPRESSION Image without compression.
 * @property {int} IMG_V1_COMPRESSION Image with Sagem MorphoSmart(TM) Compression.
 * @property {int} IMG_WSQ_COMPRESSION Image with Wavelets Scalar Quantisation Compression.
 * @property {int} IMG_PREVIEW Preview image.
 * @property {int} UNKNOWN Unknown image.
 */
GrabbaFingerprint.prototype.ImageType = {
    'NO_IMAGE': 0,
    'IMG_NO_COMPRESSION': 1,
    'IMG_V1_COMPRESSION': 2,
    'IMG_WSQ_COMPRESSION': 3,
    'IMG_PREVIEW': 4,
    'UNKNOWN': -1
};

/**
 * Grabba fingerprint user message types
 * 
 * @memberOf GrabbaFingerprint
 * @property {int} PLACE_YOUR_FINGER Place your finger
 * @property {int} MOVE_UP Move up
 * @property {int} MOVE_DOWN Move down
 * @property {int} MOVE_LEFT Move left
 * @property {int} MOVE_RIGHT Move right
 * @property {int} PRESS_HARDER Press harder
 * @property {int} MOVE_YOUR_FINGER Move your finger
 * @property {int} REMOVE_YOUR_FINGER Remove your finger
 * @property {int} ACQUISITION_COMPLETE Acquisition complete
 * @property {int} IMAGE_MESSAGE Image message
 * @property {int} PLACE_FINGER_ACQUISITION Place finger for acquisition
 * @property {int} PLACE_1ST_FINGER_FOR_ACQUISITION Place 1st finger for acquisition
 * @property {int} PLACE_2ND_FINGER_FOR_ACQUISITION Place 2nd finger for acquisition
 * @property {int} MATCH_SUCCESSFUL Match successful
 * @property {int} MATCH_UNSUCCESSFUL_NOT_SAME_FINGER Match unsuccessful, not same finger
 * @property {int} MATCH_UNSUCCESSFUL_DATABASE_EMPTY Match unsuccessful, database empty
 * @property {int} MATCH_UNSUCCESSFUL_FALSE_FINGER_DETECTED Match unsuccessful, false finger detected
 * @property {int} MATCH_UNSUCCESSFUL_MOIST_FINGER Match unsuccessful, finger too moist or scanner is wet
 * @property {int} ERROR_ALREADY_ENROLLED This user is already enrolled
 * @property {int} ERROR_INVALID_USER_ID The user ID is invalid
 * @property {int} ERROR_INVALID_USER_DATA The user data is invalid
 * @property {int} IMAGE_PROGRESS Image progress message
 * @property {int} IMAGE_DETECT_QUALITY Image detect quality message
 * @property {int} IMAGE_CODE_QUALITY Image code quality message
 * @property {int} ERROR_TIMEOUT Timed out
 * @property {int} ERROR_SAME_FINGER Same finger detected
 * @property {int} ERROR_NO_DATABASE Local database was not found
 * @property {int} ERROR_COMMAND_IN_PROGRESS Command currently in progress
 * @property {int} ERROR_DATABASE_FULL Local database is full
 * @property {int} ERROR_ILV Received ILV error
 * @property {int} ERROR_NOT_SUPPORTED This function is not supported on this device
 * @property {int} ERROR_INVALID_TEMPLATE Invalid template identifier
 */
GrabbaFingerprint.prototype.UserMessageType = {
    'PLACE_YOUR_FINGER': 1,
    'MOVE_UP': 2,
    'MOVE_DOWN': 3,
    'MOVE_LEFT': 4,
    'MOVE_RIGHT': 5,
    'PRESS_HARDER': 6,
    'MOVE_YOUR_FINGER': 7,
    'REMOVE_YOUR_FINGER': 8,
    'ACQUISITION_COMPLETE': 9,
    'IMAGE_MESSAGE': 10,
    'PLACE_FINGER_ACQUISITION': 11,
    'PLACE_1ST_FINGER_FOR_ACQUISITION': 12,
    'PLACE_2ND_FINGER_FOR_ACQUISITION': 13,
    'MATCH_SUCCESSFUL': 14,
    'MATCH_UNSUCCESSFUL_NOT_SAME_FINGER': 15,
    'MATCH_UNSUCCESSFUL_DATABASE_EMPTY': 16,
    'MATCH_UNSUCCESSFUL_FALSE_FINGER_DETECTED': 17,
    'MATCH_UNSUCCESSFUL_MOIST_FINGER': 18,
    'ERROR_ALREADY_ENROLLED': 19,
    'ERROR_INVALID_USER_ID': 20,
    'ERROR_INVALID_USER_DATA': 21,
    'IMAGE_PROGRESS': 22,
    'IMAGE_DETECT_QUALITY': 23,
    'IMAGE_CODE_QUALITY': 24,
    'ERROR_TIMEOUT': 25,
    'ERROR_SAME_FINGER': 26,
    'ERROR_NO_DATABASE': 27,
    'ERROR_COMMAND_IN_PROGRESS': 28,
    'ERROR_DATABASE_FULL': 29,
    'ERROR_ILV': 30,
    'ERROR_NOT_SUPPORTED': 31,
    'ERROR_INVALID_TEMPLATE': 32
};

/**
 * Access Grabba fingerprint reading capabilities through <b>grabba.fingerprint</b>
 * 
 * @type GrabbaFingerprint
 */
Grabba.prototype.fingerprint;

/**
 * Determines if the currently connected Grabba supports fingerprint reading functionality.
 * 
 * @memberOf GrabbaFingerprint
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {boolean} Boolean indicating if GrabbaFingerprint is supported.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to check if the connected Grabba supports fingerprinting functionality.
 *  <button onclick="grabba.fingerprint.isSupported(function(supported){
 *  alert('Grabba fingerprint supported is ' + supported);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">Is fingerprint supported?</button>
 */
GrabbaFingerprint.prototype.isSupported = function (onSuccess, onError) {
    var command = {
        command: "isSupported"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "GrabbaFingerprint", [command]);
};

/**
 * Register callbacks for fingerprint related events.<br>
 * If no callbacks are passed to this function, all present callbacks will be cleared.
 * 
 * @memberOf GrabbaFingerprint
 * @param {Object} callback An object which implements the following functions:<br>
 * <b>templateDataEvent : function(template){}</b><br>
 * Called when a fingerprint template is captured.<br>
 * The returned object contains properties as follows:<br>
 * {Array.&lt;int&gt;} template.data Template data<br>
 * {String} template.type String representation of the [TemplateType]{@link GrabbaFingerprint#TemplateType}.<br>
 * {int} template.typeInt [TemplateType]{@link GrabbaFingerprint#TemplateType} of the template returned.<br><br>
 * 
 * <b>imageDataEvent : function(image){}</b><br>
 * Called when a fingerprint image is captured.<br>
 * The returned object contains properties as follows:<br>
 * {Array.&lt;int&gt;} image.data Image data.<br>
 * {int} image.numRows Number of rows in the image.<br>
 * {int} image.numColumns Number of columns in the image.<br>
 * {String} image.type String representation of the image type.<br>
 * {int} image.typeInt Integer representation of the image type.<br><br>
 * 
 * <b>userMessageEvent : function(message){}</b><br>
 * Called when a fingerprint event occurs.<br>
 * The returned object contains variables as follows:<br>
 * {String} message.text User message text.<br>
 * {int} message.id User message ID integer.<br>
 * {int} message.number Scan count in an enrolment/verify procedure or the progress for an image progress message.<br>
 * {int} message.total Total number of scans that will occur for the enrolment or verify procedure.<br>
 * {Object} message.userRecord This is a user record object associated with a successful match in an identify function call.<br>
 * This object contains the following properties:<br>
 * {userRecord.userID} Database user ID of the user record.<br>
 * {userRecord.userData} User record data.
 * 
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //Callbacks to alert the user of the template data type, display the image and user message text.
 *  var fingerprintCallbacks = {
 *      templateDataEvent: function(template) {
 *          alert('Template data event \n' + 'Template type: ' + template.type);
 *      },
 *      imageDataEvent: function(image) {
 *          grabba.fingerprint.convertImageToBase64(fingerprintDecoderCallback, onError, image);
 *      },
 *      userMessageEvent: function(message, number, total){
 *          document.getElementById("fingerprintMessage").innerHTML = message.text;
 *      }
 *  };
 *  
 *  //Callback used in the image data event to set the fingerprint image to a document element.
 *  var fingerprintDecoderCallback = function (imageBase64){
 *          document.getElementById("fingerprintImage").src = imageBase64;
 *  }; 
 */
GrabbaFingerprint.prototype.registerCallback = function (callback, onError) {
    var command;
    if (!callback || (!callback.templateDataEvent && !callback.imageDataEvent && !callback.userMessageEvent)) {
        command = {
            command: "clearCallbacks"
        };
        exec(null, onError, "GrabbaPlugin", "GrabbaFingerprint", [command]);
        return;
    }

    if (callback.templateDataEvent) {
        command = {
            command: "registerTemplateDataCallback"
        };
        exec(callback.templateDataEvent, onError, "GrabbaPlugin", "GrabbaFingerprint", [command]);
    }

    if (callback.imageDataEvent) {
        command = {
            command: "registerImageDataEventCallback"
        };
        exec(callback.imageDataEvent, onError, "GrabbaPlugin", "GrabbaFingerprint", [command]);
    }

    if (callback.userMessageEvent) {
        command = {
            command: "registerUserMessageEventCallback"
        };
        exec(callback.userMessageEvent, onError, "GrabbaPlugin", "GrabbaFingerprint", [command]);
    }
};

/**
 * Capture a fingerprint for fingerprint template or image data.<br>
 * To receive the fingerprint events and data, first register for callbacks using {@link GrabbaFingerprint#registerCallback}.
 * 
 * @memberOf GrabbaFingerprint
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @param {int} templateTypeInt [TemplateType]{@link GrabbaFingerprint#TemplateType} requested.
 * @param {int} imageTypeInt [ImageType]{@link GrabbaFingerprint#ImageType} requested.
 * @param {int} numAcquisitions Number of acquisitions requested - this must be 1 or 3.
 * @param {int} numFingers Number of fingers to capture.
 * 
 * @see GrabbaFingerprint#TemplateType
 * @see GrabbaFingerprint#ImageType
 * 
 * @example //A button which captures a fingerprint template (Sagem Uncompressed Template) and an image without compression.
 * <button onclick="grabba.fingerprint.enrolFingerprint(onError, grabba.fingerprint.TemplateType.PK_MAT, grabba.fingerprint.ImageType.IMG_NO_COMPRESSION, 1, 1)">Capture fingerprint</button>
 */
GrabbaFingerprint.prototype.enrolFingerprint = function (onError, templateTypeInt, imageTypeInt, numAcquisitions, numFingers) {
    var options = {
        command: "enrolFingerprint",
        templateType: templateTypeInt,
        imageType: imageTypeInt,
        numAcquisitions: numAcquisitions,
        numFingers: numFingers
    };
    exec(null, onError, "GrabbaPlugin", "GrabbaFingerprint", [options]);
};

/**
 * Capture a fingerprint for fingerprint template or image data and enrol it into the local database on the Grabba.<br>
 * To receive the fingerprint events and data, first register for callbacks using {@link GrabbaFingerprint#registerCallback}.<br>
 * This command will always request three acquisitions as a requirement of the local database.
 * 
 * @memberOf GrabbaFingerprint
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @param {int} templateTypeInt [TemplateType]{@link GrabbaFingerprint#TemplateType} requested.
 * @param {int} imageTypeInt [ImageType]{@link GrabbaFingerprint#ImageType} requested.
 * @param {int} numFingers Number of fingers to capture - either 1 or 2, for each user.
 * @param {String} userID The user ID for the record stored in the database.<br>
 * This is retrieved upon a successful match in the identify process. It must be less than or equal to 24 characters.
 * @param {int[]} userData A byte array of additional user data to be stored. Maximum size is 64 bytes.
 * 
 * @see GrabbaFingerprint#TemplateType
 * @see GrabbaFingerprint#ImageType
 * 
 * @example //A button which enrols a user, tester, with the data 0x01, 0x02, 0x03 and requests a fingerprint template (Sagem Uncompressed Template) in the process.
 * <button onclick="grabba.fingerprint.enrolFingerprintToDatabase(onError, grabba.fingerprint.TemplateType.PK_MAT, grabba.fingerprint.ImageType.IMG_PREVIEW, 1, 'tester', [1, 2, 3])">Enrol To Local Database</button>
 */
GrabbaFingerprint.prototype.enrolFingerprintToDatabase = function (onError, templateTypeInt, imageTypeInt, numFingers, userID, userData) {
    var options = {
        command: "enrolFingerprintToDatabase",
        templateType: templateTypeInt,
        imageType: imageTypeInt,
        numAcquisitions: 3,
        numFingers: numFingers,
        userRecord: {
            userID: userID,
            userData: userData
        }
    };
    exec(null, onError, "GrabbaPlugin", "GrabbaFingerprint", [options]);
};

/**
 * Identifies a user that is enrolled in the local fingerprint database on the Grabba.<br>
 * To receive the fingerprint events and data, first register for callbacks using {@link GrabbaFingerprint#registerCallback}.<br>
 * 
 * @memberOf GrabbaFingerprint
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //A button which starts an identify fingerprint in the local database process.
 * <button onclick="grabba.fingerprint.identifyFingerprint(onError)">Identify in local database</button>
 */
GrabbaFingerprint.prototype.identifyFingerprint = function (onError) {
    var command = {
        command: "identifyFingerprint"
    };
    exec(null, onError, "GrabbaPlugin", "GrabbaFingerprint", [command]);
};

/**
 * Verify the fingerprint presented against a fingerprint template.
 * 
 * @memberOf GrabbaFingerprint
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @param {int[]} templateData Array of integers representing template data bytes.
 * @param {int} templateTypeInt [TemplateType]{@link GrabbaFingerprint#TemplateType} of the template data.
 * 
 * @example //Callback used to verify a fingerprint template after receiving it in the templateDataEvent
 *      var fingerprintCallbacks = {
 *          templateDataEvent: function(template) {
 *          grabba.fingerprint.verifyFingerprint(onError, template.data, template.typeInt);
 *      },
 *      imageDataEvent: function(image) {
 *      },
 *      userMessageEvent: function(message, number, total, userRecord){
 *      }
 *  };
 */
GrabbaFingerprint.prototype.verifyFingerprint = function (onError, templateData, templateTypeInt) {
    var template = {
        command: "verifyFingerprint",
        data: templateData,
        typeInt: templateTypeInt
    };
    exec(null, onError, "GrabbaPlugin", "GrabbaFingerprint", [template]);
};

/**
 * Clear the local fingerprint database.<br>
 * <b>Warning: This is not reversible.</b>
 * 
 * @memberOf GrabbaFingerprint
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //A button which clears the local fingerprint database
 *  <button onclick="grabba.fingerprint.clearFingerprintDatabase(onError)">Clear database</button>
 */
GrabbaFingerprint.prototype.clearFingerprintDatabase = function (onError) {
    var command = {
        command: "clearFingerprintDatabase"
    };
    exec(null, onError, "GrabbaPlugin", "GrabbaFingerprint", [command]);
};

/**
 * Clear and reset the local fingerprint database.<br>
 * <b>Warning: This is not reversible.</b>
 * 
 * @memberOf GrabbaFingerprint
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //A button which resets the local database
 *  <button onclick="grabba.fingerprint.resetFingerprintDatabase(onError)">Reset database</button>
 */
GrabbaFingerprint.prototype.resetFingerprintDatabase = function (onError) {
    var command = {
        command: "resetFingerprintDatabase"
    };
    exec(null, onError, "GrabbaPlugin", "GrabbaFingerprint", [command]);
};

/**
 * Abort the current fingerprint operation.<br>
 * This function only applies to fingerprint operations which utilise the fingerprint sensor.
 * 
 * @memberOf GrabbaFingerprint
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //A button to abort the current fingerprint operation.
 * <button onclick="grabba.fingerprint.abort(onError)">Abort fingerprint operation</button>
 */
GrabbaFingerprint.prototype.abort = function (onError) {
    var command = {
        command: "abort"
    };
    exec(null, onError, "GrabbaPlugin", "GrabbaFingerprint", [command]);
};

/**
 * Convert image data to a base64 string with a "data:image/png;base64," header, ready for presentation.
 * 
 * @memberof GrabbaFingerprint
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {String} png image data encoded as a base64 String with "data:image/png;base64," header, ready for use as image source. 
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @param {type} image Image object returned by imageDataEvent fingerprint callback.
 * 
 * @see GrabbaFingerprint#registerCallback
 * 
 * @example //Display the image data after receiving it in a fingerprint callback
 *  var fingerprintCallbacks = {
 *      templateDataEvent: function(template) {
 *      },
 *      imageDataEvent: function(image) {
 *          grabba.fingerprint.convertImageToBase64(fingerprintDecoderCallback, onError, image);
 *      },
 *      userMessageEvent: function(message, number, total){
 *      }
 *  };
 *  
 *  //Callback used in the image data event to set the fingerprint image to a document element.
 *  var fingerprintDecoderCallback = function (imageBase64){
 *          document.getElementById("fingerprintImage").src = imageBase64;
 *  }; 
 */
GrabbaFingerprint.prototype.convertImageToBase64 = function (onSuccess, onError, image) {
    var command = {
        command: "convertImageToBase64",
        image: image
    };
    exec(onSuccess, onError, "GrabbaPlugin", "GrabbaFingerprint", [command]);
};

/**
 * Grabba fingerprint preference identifiers.
 * @type GrabbaFingerprintPreferences
 */
GrabbaFingerprint.prototype.preferences;

/**
 * Grabba fingerprint preference identifiers.<br>
 * Please refer to the preference name suffix for the preference type.
 * 
 * @class       GrabbaFingerprintPreferences
 * @classdesc   Access this class via <b>grabba.fingerprint.preferences</b>
 * @see Grabba#setBoolPref
 * @see Grabba#getBoolPref
 * @see Grabba#setIntPref
 * @see Grabba#getIntPref
 */
var GrabbaFingerprintPreferences = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Enrol fingerprint timeout in seconds. Acceptable values are 1 second to 65535 seconds. Default: 0 (no timeout).
 * @memberOf GrabbaFingerprintPreferences
 */
GrabbaFingerprintPreferences.prototype.enrollTimeoutInt = "GrabbaFingerprintPreferences.enrollTimeoutInt 0";
/**
 * Identify fingerprint timeout in seconds. Acceptable values are 1 second to 65535 seconds. Default: 0 (no timeout).
 * @memberOf GrabbaFingerprintPreferences
 */
GrabbaFingerprintPreferences.prototype.identifyTimeoutInt = "GrabbaFingerprintPreferences.identifyTimeoutInt 0";
/**
 * Minimum acquisition quality.<br>
 * The minimum value of fingerprint quality before a fingerprint is accepted - please note this is only available on 
 * striped fingerprint sensors.<br>
 * It is strongly recommended that this value is left as default (20).<br>
 * Acquisition is retried until threshold is reached.<br>
 * Acceptable values are 20 to 100.
 * @memberOf GrabbaFingerprintPreferences
 */
GrabbaFingerprintPreferences.prototype.qualityThresholdInt = "GrabbaFingerprintPreferences.qualityThresholdInt 20";
/**
 * Verify fingerprint timeout in seconds. Acceptable values are 1 second to 65535 seconds. Default: 0 (no timeout).
 * @memberOf GrabbaFingerprintPreferences
 */
GrabbaFingerprintPreferences.prototype.verifyTimeoutInt = "GrabbaFingerprintPreferences.verifyTimeoutInt 0";
/**
 * WSQ compression level.<br>
 * Acceptable values are 2 to 255. Default is 12.
 * @memberOf GrabbaFingerprintPreferences
 */
GrabbaFingerprintPreferences.prototype.wsqCompressionLevelInt = "GrabbaFingerprintPreferences.wsqCompressionLevelInt 12";

module.exports.fingerprint = new GrabbaFingerprint();
module.exports.fingerprint.preferences = new GrabbaFingerprintPreferences();

//   _____           _     _          ______                               _ 
//  |  __ \         | |   | |         | ___ \                             | |
//  | |  \/_ __ __ _| |__ | |__   __ _| |_/ / __ _____  _____ __ _ _ __ __| |
//  | | __| '__/ _` | '_ \| '_ \ / _` |  __/ '__/ _ \ \/ / __/ _` | '__/ _` |
//  | |_\ \ | | (_| | |_) | |_) | (_| | |  | | | (_) >  < (_| (_| | | | (_| |
//   \____/_|  \__,_|_.__/|_.__/ \__,_\_|  |_|  \___/_/\_\___\__,_|_|  \__,_|
//                                                                           
//                 

/**
 * Access Grabba proxcard capabilities via <b>grabba.proxcard</b>
 * 
 * @class       GrabbaProxcard
 * @classdesc   Access this class via <b>grabba.proxcard</b>
 */
var GrabbaProxcard = function () {
    "use strict";
    this.platforms = ["android", "ios", "windows"];
};

/**
 * Access Grabba proxcard reading capabilities through <b>grabba.proxcard</b>
 * 
 * @type GrabbaProxcard
 */
Grabba.prototype.proxcard;

/**
 * Determines if the currently connected Grabba supports proxcard functionality.
 * 
 * @memberOf GrabbaProxcard
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {boolean} Boolean indicating if GrabbaProxcard is supported.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @example //Button to check if the connected Grabba supports proxcard functionality.
 *  <button onclick="grabba.proxcard.isSupported(function(supported){
 *  alert('Grabba proxcard supported is ' + supported);
 *  },
 *  function(errorString) {
 *      alert('on error ' + errorString);
 *  });">Is proxcard supported?</button>
 */
GrabbaProxcard.prototype.isSupported = function (onSuccess, onError) {
    var command = {
        command: "isSupported"
    };
    exec(onSuccess, onError, "GrabbaPlugin", "GrabbaProxcard", [command]);
};

/**
 * Register callbacks for Proxcard related events.<br>
 * If no callbacks are passed to this function, all present callbacks will be cleared.
 * 
 * @memberOf GrabbaProxcard
 * @param {Object} callback An object which implements the following functions:<br>
 * <b>triggeredEvent : function(){}</b><br>
 * Called when the proxcard scanner is triggered.<br><br>
 * <b>timeoutEvent : function(){}</b><br>
 * Called when the proxcard scanner has timed out.<br><br>
 * <b>stoppedEvent : function(){}</b><br>
 * Called when the proxcard scanner has stopped.<br><br>
 * <b>scannedEvent : function(proxcard){}</b><br>
 * Called when a proxcard is scanned.<br>
 * The returned object contains properties as follows:<br>
 * {int[]} proxcard.data The scanned proxcard data.<br>
 * {String} proxcard.type The scanned proxcard's type.<br>
 * {int} proxcard.typeInt Integer representation of the proxcard's type.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //An example of an implemented proxcard callback is as follows:
 *  grabba.proxcard.registerCallback(proxcardCallbacks, onError);
 *  var proxcardTimeoutFunction = function() {
 *      alert('Proxcard timed out');
 *  };
 *  var proxcardCallbacks = {
 *  //Functions may also be declared inline as seen here.
 *  triggeredEvent: function() {
 *      alert('Proxcard triggered');
 *  },
 *  //These functions are optional and unimplemented functions will simply not be called.
 *  //stoppedEvent : function () {
 *  //alert('Proxcard scanning stopped');
 *  //},
 *  scannedEvent: function(proxcard) {
 *  //proxcard contains data fields
 *  //Convert the data to a base 16 hex string
 *  var hexString = ons.grabba.util.integerArrayToHexString(proxcard.data);
 *      alert('Proxcard scanned event\n Data: ' + hexString + '\n' + "Type: " + proxcard.type);
 *  },
 *  //You may create a function separately as seen with proxcardTimeoutFunction here.
 *  timeoutEvent: proxcardTimeoutFunction
 *  };
 */
GrabbaProxcard.prototype.registerCallback = function (callback, onError) {
    var command;
    if (!callback || (!callback.triggeredEvent && !callback.timeoutEvent && !callback.stoppedEvent && !callback.scannedEvent)) {
        command = {
            command: "clearCallbacks"
        };
        exec(null, onError, "GrabbaPlugin", "GrabbaProxcard", [command]);
        return;
    }

    if (callback.triggeredEvent) {
        command = {
            command: "registerCallbackTriggered"
        };
        exec(callback.triggeredEvent, onError, "GrabbaPlugin", "GrabbaProxcard", [command]);
    }

    if (callback.timeoutEvent) {
        command = {
            command: "registerCallbackTimeout"
        };
        exec(callback.timeoutEvent, onError, "GrabbaPlugin", "GrabbaProxcard", [command]);
    }

    if (callback.stoppedEvent) {
        command = {
            command: "registerCallbackStopped"
        };
        exec(callback.stoppedEvent, onError, "GrabbaPlugin", "GrabbaProxcard", [command]);
    }

    if (callback.scannedEvent) {
        command = {
            command: "registerCallbackScanned"
        };
        exec(callback.scannedEvent, onError, "GrabbaPlugin", "GrabbaProxcard", [command]);
    }
};

/**
 * Starts or stops proxcard scanning.<br>
 * To receive the proxcard events and scanned data, first register for callbacks using {@link GrabbaProxcard#registerCallback} and then call:<br>
 * <code>
 * grabba.proxcard.trigger(onError, true)
 * </code>
 * <br>
 * To start the proxcard scanner and scan the proxcard.
 * 
 * @memberOf GrabbaProxcard
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @param {boolean} enable Pass true to start scanning, false to stop.
 * 
 * @see GrabbaProxcard#registerCallback
 * 
 * @example <!--A button which starts the proxcard scanning process-->
 * <button onclick="grabba.proxcard.trigger(onError, true)">Trigger</button>
 */
GrabbaProxcard.prototype.trigger = function (onError, enable) {
    var command = {
        command: "trigger",
        enable: enable
    };
    exec(null, onError, "GrabbaPlugin", "GrabbaProxcard", [command]);
};

/**
 * Grabba proxcard preference identifiers.
 * @type GrabbaProxcardPreferences
 */
GrabbaFingerprint.prototype.preferences;

/**
 * Grabba proxcard preference identifiers.<br>
 * Please refer to the preference name suffix for the preference type.
 * 
 * @class       GrabbaProxcardPreferences
 * @classdesc   Access this class via <b>grabba.proxcard.preferences</b>
 * @see Grabba#setBoolPref
 * @see Grabba#getBoolPref
 * @see Grabba#setIntPref
 * @see Grabba#getIntPref
 */
var GrabbaProxcardPreferences = function () {
    "use strict";
    this.platforms = ["android"];
};
/**
 * Issue a beep upon successful scan. Default: true
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.beepOnScanBool = "GrabbaProxcardPreferences.beepOnScanBool true";
/**
 * Preference to remove the leading zero when scanning an EM4x05 RFID tag. Default: true
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.EM4x05_removeLeadingZeroBool = "GrabbaProxcardPreferences.EM4x05_removeLeadingZeroBool true";
/**
 * Controls the decoding of 35 bit Wiegand cards with HID Corporate 1000 encoding. (default: false)<br>
 * If this preference is false, a hex string representation of the data will be returned.<br>
 * If this preference is true, the 35-bit Wiegand cards will be automatically decoded as Corporate 1000 cards.<br>
 * By default, 26 bit wiegand cards are decoded automatically when iClass_readProgrammedIDBool is enabled.
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.hid_decodeCorporate1000Bool = "GrabbaProxcardPreferences.hid_decodeCorporate1000Bool false";
/**
 * Controls the decoding of 35 bit Wiegand cards for H10302 formatted cards. (default: false)<br>
 * If this preference is false, a hex string representation of the data will be returned.<br>
 * If this preference is true, the 35-bit Wiegand cards will be automatically decoded as H10302 cards.<br>
 * By default, 26 bit wiegand cards are decoded automatically when iClass_readProgrammedIDBool is enabled.
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.hid_decodeH10302Bool = "GrabbaProxcardPreferences.hid_decodeH10302Bool false";
/**
 * Controls the behaviour of iClass SE readers - when set to true, the iClass SE reader will return the raw 
 * samResponse in the GrabbaProxcardListener.proxcardScannedEvent(byte[], int) callback. (default: false)<br>
 * Please note the behaviour of the scan is also affected by iClass_readProgrammedIDBool as follows:<br>
 * iClass_readProgrammedIDBool true: samResponse from a "scan and process media" command<br>
 * iClass_readProgrammedIDBool false: samResponse from a "Scan field for card" command
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.hid_returnRawBool = "GrabbaProxcardPreferences.hid_returnRawBool false";
/**
 * Controls behaviour of iClass readers - when set to true the iClass reader will return the programmed ID (also 
 * known as Wiegand type ID). (default: true)<br>
 * The format of the programmed ID is "FFF NNNNN" where FFF is a 3 digit (0-9) facility code and NNNNN is a 5 digit 
 * (0-9) card number.<br>
 * When set to false the normal behaviour of reading the Card serial number (CSN) applies. The CSN is made up of 8 
 * binary bytes (64 bits).
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.iClass_readProgrammedIDBool = "GrabbaProxcardPreferences.iClass_readProgrammedIDBool true";
/**
 * The region code that is used to set the module to correct operating parameters for its particular location.
 * Acceptable values are as follows:
 * North American Region = 1 (default)<br>
 * Europe Region = 2<br>
 * Korea Region = 3<br>
 * India Region = 4<br>
 * Peoples Republic of China Region = 6<br>
 * Europe 2 Region = 7<br>
 * Europe 3 Region = 8<br>
 * Korea 2 Region = 9<br>
 * Australia Region = 11<br>
 * New Zealand Region = 12<br>
 * Open Region = 255
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.regionCodeInt = "GrabbaProxcardPreferences.RegionCodeInt 1";
/**
 * Proxcard scan timeout in milliseconds. Default: 5000
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.scanTimeoutInt = "GrabbaProxcardPreferences.scanTimeoutInt 5000";
/**
 * Vibrate the phone upon successful scan. Default: true
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.vibrateOnScanBool = "GrabbaProxcardPreferences.vibrateOnScanBool true";
/**
 * Preference to attempt to scan for iClass card serial numbers when using the xxx2 RFID technology.<br>
 * false = do not scan for iClass CSN (default).<br>
 * true = attempt to scan for iClass CSN.
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.x002_scaniClassCSNBool = "GrabbaProxcardPreferences.x002_scaniClassCSNBool false";
/**
 * Performance mode setting for x008 module.<br>
 * false = High performance mode (default)<br>
 * High performance mode optimises performance without regard to thermal characteristics or power consumption.<br>
 * true = Low power mode<br>
 * Low power mode minimises power consumption and optimises thermal characteristics without compromising performance in many, but not all, applications.<br>
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.x008_performanceModeBool = "GrabbaProxcardPreferences.x008_performanceModeBool false";
/**
 * Read and write transfer power for x008 in percentages. Default: 75
 * @memberOf GrabbaProxcardPreferences
 */
GrabbaProxcardPreferences.prototype.x008_transferPowerInt = "GrabbaProxcardPreferences.x008_transferPowerInt 75";

module.exports.proxcard = new GrabbaProxcard();
module.exports.proxcard.preferences = new GrabbaProxcardPreferences();

//  _____           _     _          ___  _________ ___________ 
// |  __ \         | |   | |         |  \/  || ___ \_   _|  _  \
// | |  \/_ __ __ _| |__ | |__   __ _| .  . || |_/ / | | | | | |
// | | __| '__/ _` | '_ \| '_ \ / _` | |\/| ||    /  | | | | | |
// | |_\ \ | | (_| | |_) | |_) | (_| | |  | || |\ \  | | | |/ / 
//  \____/_|  \__,_|_.__/|_.__/ \__,_\_|  |_/\_| \_| \_/ |___/  
//                                                              

/**
 * Access Grabba MRTD via <b>grabba.mrtd</b>
 * 
 * @class GrabbaMRTD
 * @classdesc Access this class via <b>grabba.mrtd</b>
 */
var GrabbaMRTD = function () {
    "use strict";
    this.platforms = ["android", "ios", "windows"];
};

Grabba.prototype.mrtd;

/**
 * Register callbacks for Passport MRTD related events.<br>
 * If no callbacks are passed to this function, all present callbacks will be cleared.
 * 
 * @memberOf GrabbaMRTD
 * @param {Object} callback An object which implements the following functions:<br>
 * <b>progressEvent : : function(progress){}</b><br>
 * Called when MRTD progress events occur with one variable as follows:<br>
 * {int} progress The progress percentage.<br>
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * 
 * @example //An example of an implemented MRTD callback is as follows:
 * var mrtdCallbacks = {
 *     progressEvent: function(percentage) {
 *     //This callback provides progress updates on the MRTD file transfer after authentication is complete.
 *     document.getElementById("statusMessage").textContent = "Progress: " + percentage + "%";
 *     }
 * };
 * grabba.mrtd.registerCallback(mrtdCallbacks, onError);
 */
GrabbaMRTD.prototype.registerCallback = function (callback, onError) {
    var command;
    if (!callback || (!callback.progressEvent)) {
        command = {
            command: "clearCallbacks"
        };
        exec(null, onError, "GrabbaPlugin", "GrabbaMRTD", [command]);
        return;
    }

    if (callback.progressEvent) {
        command = {
            command: "registerCallbackMRTDProgress"
        };
        exec(callback.progressEvent, onError, "GrabbaPlugin", "GrabbaMRTD", [command]);
    }
};

/**
 * Using the MRZ from a presented identity document, attempt to read a file on the smartcard using the ICAO9303 standard.
 * 
 * @param {function} onSuccess Called on success with the following parameter:<br>
 * {int[]} tlv raw array containing BER TLV data.<br>
 * This array can be parsed using the grabba.bertlv.processRawBerTlv(tlv) to create a parsed BerTlv representation.
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @param {String} trackData Passport MRZ data
 * @param {int} fileID File ID to be read
 * @example //An example of the getDataFromMRZ function
 * var successCallback = function(tlv) {
 *     //tlv contains the raw BER TLV. We can process this into a JSON object using grabba.bertlv utilities
 *     var tlv = grabba.bertlv.processRawBerTlv(tlv);
 *     //tlv now contains the BER-TLV object. Find the image tag - this is tag 0x5F2E or 0x7F2E as per the ICAO standard
 *     var jpeg = tlv.findObjectByTag(0x5F2E);
 *     if (jpeg === null)
 *     {
 *         jpeg = tlv.findObjectByTag(0x7F2E);
 *     }
 *     if (jpeg !== null)
 *     {
 *         //There is non-JPEG data before the JPEG image
 *         //Find the start of image marker
 *         var data = jpeg.primitiveValue;
 *         var offset = 0;
 *         for (offset = 0; offset < data.length - 12; offset++)
 *         {
 *             if (data[offset] === 0xFF && data[offset + 1] === 0xD8)
 *             {
 *                 break;
 *             }
 *             //check for JPEG2000 headers
 *             else if (data[offset] === 0x00 && data[offset + 1] === 0x00 && //
 *             data[offset + 2] === 0x00 && data[offset + 3] & 0xFF === 0x0C && //
 *             data[offset + 4] === 0x6A && data[offset + 5] === 0x50 && //
 *             data[offset + 6] === 0x20 && data[offset + 7] === 0x20 && //
 *             data[offset + 8] === 0x0D && data[offset + 9] === 0x0A && //
 *             data[offset + 10] === 0x87 && data[offset + 11] === 0x0A)
 *             {
 *                 // Found the Start of image marker
 *                 break;
 *             }
 *             else if (data[offset] === 0x0D && data[offset + 1] === 0x0A && //
 *             data[offset + 2] === 0x87 && data[offset + 3] === 0x0A)
 *             {
 *                 // Found the Start of image marker
 *                 break;
 *             }
 *             else if (data[offset] === 0xFF && data[offset + 1] === 0x4F && //
 *             data[offset + 2] === 0xFF && data[offset + 3] === 0x51)
 *             {
 *                 // Found the Start of image marker
 *                 break;
 *             }
 *         }
 *         
 *         //Convert image to Base64 using grabba.util
 *         grabba.util.convertJpegToBase64(function(imageBase64){
 *             //Display the image
 *             document.getElementById("photo").src = imageBase64;
 *         }, function(errorString) {
 *             alert('on error ' + errorString);
 *         }, data, offset);
 *     }
 * };
 * grabba.mrtd.getDataFromMRZ(successCallback, $scope.onError, document.getElementById("passportMRZData").textContent, 0x0102);
 */
GrabbaMRTD.prototype.getDataFromMRZ = function (onSuccess, onError, trackData, fileID) {
    var command = {
        command: "getDataFromMRZ",
        trackData: trackData,
        fileID: fileID
    };
    exec(onSuccess, onError, "GrabbaPlugin", "GrabbaMRTD", [command]);
};

module.exports.mrtd = new GrabbaMRTD();

// _____           _     _          ______         _____ _       
//|  __ \         | |   | |         | ___ \       |_   _| |      
//| |  \/_ __ __ _| |__ | |__   __ _| |_/ / ___ _ __| | | |_   __
//| | __| '__/ _` | '_ \| '_ \ / _` | ___ \/ _ \ '__| | | \ \ / /
//| |_\ \ | | (_| | |_) | |_) | (_| | |_/ /  __/ |  | | | |\ V / 
// \____/_|  \__,_|_.__/|_.__/ \__,_\____/ \___|_|  \_/ |_| \_/  

/**
 * Access GrabbaBerTlv via <b>grabba.bertlv</b>
 * 
 * @class       GrabbaBerTlv
 * @classdesc   Access this class via <b>grabba.bertlv</b>
 */
var GrabbaBerTlv = function () {
    "use strict";
    this.platforms = ["android", "ios", "windows"];
};

/**
 * Access GrabbaBerTlv through <b>grabba.bertlv</b>
 * 
 * @type GrabbaBerTlv
 */
Grabba.prototype.bertlv;

/**
 * Create a TLV object with utility functions.
 * This provides a very simple ASN.1 BER TLV representation which allows you to browse the data within the TLV.
 * 
 * @param {int[]} rawTLV
 * @returns {Object} tlv JSON object with BER TLV utility functions as follows:<br>
 * {tlv.findObjectByTag(tag)} Recurses through all nested BER-TLV objects, returns the first object found with matching tag.<br>
 * param {int} tag The tag to find.<br>
 * {return} The first BER-TLV object with matching tag, else null if matching object not found.<br>
 * <br>
 * {tlv.findNextObjectByTag(tag)} Recurses through all nested BER-TLV objects, returns the next object found with matching tag.<br>
 * You can call this function repeatedly until null is returned to enumerate all objects with a certain tag.<br>
 * param {int} tag The tag to find.<br>
 * {return} The first BER-TLV object with matching tag, else null if matching object not found.
 */
GrabbaBerTlv.prototype.processRawBerTlv = function (rawTLV) {
    var tlv = {
        tagLengthStream: [],
        /**
         * TLV tag
         */
        tag: 0,
        /**
         * Boolean flag indicating if the TLV is primitive
         */
        primitive: false,
        /**
         * Length value of the TLV
         */
        length: 0,
        /**
         * Array of nested BER TLV objects
         */
        bertlvValue: [],
        /**
         * Raw value of TLV
         */
        primitiveValue: [],
        objectFoundFlag: false,
        /**
         * Recurses through all nested BER-TLV objects, returns the first object found with matching tag.<br>
         * @param {int} tag The tag to find.
         * @returns {Object} The first BER-TLV object with matching tag, else undefined if matching object not found.
         */
        findObjectByTag: function (tag) {
            this.resetObjectFoundFlags();
            return this.findObjectByTagRecurse(tag);
        },
        /**
         * Recurses through all nested BER-TLV objects, returns the next object found with matching tag.<br>
         * You can call this function repeatedly until null is returned to enumerate all objects with a certain tag.<br>
         * @param {int} tag
         * @returns {Object} The next BER-TLV object with matching tag, else undefined if matching object not found.
         */
        findNextObjectByTag: function (tag) {
            return this.findObjectByTagRecurse(tag);
        },
        findObjectByTagRecurse: function (tag) {
            if (this.tag === tag) {
                //If found, don't return again
                if (!this.objectFoundFlag) {
                    //Mark this object as found to ignore on subsequent searches and return this object
                    this.objectFoundFlag = true;
                    return this;
                }
            }

            if (this.primitive) {
                return null;
            }

            //Recurse over nested objects
            for (var i = 0; i < this.bertlvValue.length; i++) {
                var found = this.bertlvValue[i].findObjectByTagRecurse(tag);
                if (found !== null) {
                    return found;
                }
            }

            return null;
        },
        resetObjectFoundFlags: function () {
            this.objectFoundFlag = false;

            //Recurse over nested objects
            for (var i = 0; i < this.bertlvValue.length; i++) {
                this.bertlvValue[i].resetObjectFoundFlags();
            }
        },
        size: function () {
            return (tlv.tagLengthStream.length + tlv.primitiveValue.length);
        }
    };

    //Start of process TLV function
    var tagLength = 0;
    var currentByte = 0;
    var offset = 0;

    //Parse the tag
    while (currentByte === 0) {
        currentByte = rawTLV[offset++];
        tlv.tagLengthStream.push(currentByte);
    }

    //Store the current tag
    tlv.tag = currentByte;
    tagLength++;

    //If bit 6 is zero, the value is primitive
    if ((currentByte & 0x20) === 0) {
        tlv.primitive = true;
    }

    //If bits 5 to 1 are set, there is at least another byte
    if ((currentByte & 0x1F) === 0x1F) {
        do {
            if (tagLength > 3) {
                //Error - tag length is greater than 3.
                return null;
            }

            //There is more tag to read
            currentByte = rawTLV[offset++];
            tlv.tagLengthStream.push(currentByte);
            tlv.tag = (tlv.tag << 8) | currentByte;
            tagLength++;

        }
        //Continue while there are more tag bytes
        while ((currentByte & 0x80) !== 0 && (currentByte & 0x7F) !== 0);
    }

    //Parse the length
    currentByte = rawTLV[offset++];
    tlv.tagLengthStream.push(currentByte);

    //If the first byte is below 128, it encodes the length directly
    if (currentByte < 0x80) {
        //This is the length, return as is
        tlv.length = currentByte;
    }
    else {
        //Check the length of the length field - we do not support more than 4 length bytes
        var fieldLength = (currentByte & 0x7F);
        if (fieldLength > 4) {
            //Length results in size greater than 2GB - this is unsupported
            return null;
        }

        //Read in field length bytes and compute the length
        var length = 0;
        for (var i = 0; i < fieldLength; i++) {
            currentByte = rawTLV[offset++];
            tlv.tagLengthStream.push(currentByte);
            //Append the new byte to the end of the length
            length = (length << 8) | currentByte;
        }
        tlv.length = length;
    }

    //Copy "length" bytes into the primitiveValue field
    //We do this even if the value is constructed from BER-TLV objects
    tlv.primitiveValue = new Array(tlv.length);
    for (var i = 0; i < tlv.length; i++) {
        tlv.primitiveValue[i] = rawTLV[offset++];
    }

    //Create array of BER-TLV objects
    tlv.bertlvValue = new Array();

    //If the value is constructed of BER-TLV objects, read them in until we run out of data
    if (!tlv.primitive) {
        var datastream = tlv.primitiveValue;
        offset = 0;
        while (offset < datastream.length) {
            //Create a BER-TLV using the data stream
            var tmpBerTlv = this.processRawBerTlv(datastream.slice(offset, datastream.length));
            tlv.bertlvValue.push(tmpBerTlv);
            offset += tmpBerTlv.size();
        }
    }

    return tlv;
};

module.exports.bertlv = new GrabbaBerTlv();


//   _____           _     _           _   _ _   _ _ 
//  |  __ \         | |   | |         | | | | | (_) |
//  | |  \/_ __ __ _| |__ | |__   __ _| | | | |_ _| |
//  | | __| '__/ _` | '_ \| '_ \ / _` | | | | __| | |
//  | |_\ \ | | (_| | |_) | |_) | (_| | |_| | |_| | |
//   \____/_|  \__,_|_.__/|_.__/ \__,_|\___/ \__|_|_|
//                                                   

/**
 * Access Grabba utilities via <b>grabba.util</b>
 * 
 * @class       GrabbaUtil
 * @classdesc   Access this class via <b>grabba.util</b>
 */
var GrabbaUtil = function () {
    "use strict";
    this.platforms = ["android", "ios", "windows"];
};

/**
 * Access Grabba utilities through <b>grabba.util</b>
 * 
 * @type GrabbaUtil
 */
Grabba.prototype.util;

/**
 * Convert an integer array to base 16 hex string.<br>
 * @memberOf GrabbaUtil
 * @param {int[]} array of integers to convert.
 *
 * @example 
 * //Generate a hex string from returned proxcard data
 * var hexString = ons.grabba.util.integerArrayToHexString(proxcard.data); 
 */
GrabbaUtil.prototype.integerArrayToHexString = function (array) {
    if (!array) {
        return "";
    }
    var hexString = "";
    var temp;
    for (var i = 0; i < array.length; i++) {
        //Calculate hex value
        temp = array[i].toString(16);
        //Zero pad to two digits
        hexString += ("00" + temp).substr(-2) + " ";
    }
    return hexString.toUpperCase().trim();
};

/**
 * Convert jpeg or JPEG2000 image data to a base64 string with a "data:image/png;base64," header, ready for presentation.
 * 
 * @memberof GrabbaUtil
 * @param {function} onSuccess Called on success with the following parameters:<br>
 * {String} png image data encoded as a base64 String with "data:image/png;base64," header, ready for use as image source. 
 * @param {function} onError Called on error with the following parameters:<br>
 * {String} error description.
 * @param {int[]} imageData Image data.
 * @param {int} offset Offset into the image data when the image begins.
 * 
 * @example //Convert a JPEG or JPEG2000 image to Base64
 * ons.grabba.util.convertJpegToBase64(function(imageBase64) {
 *     document.getElementById("photo").src = imageBase64;
 * }, function(errorString) {
 *     alert('on error ' + errorString);
 * }, data, offset);
 */
GrabbaUtil.prototype.convertJpegToBase64 = function (onSuccess, onError, imageData, offset) {
    var command = {
        command: "convertJpegToBase64",
        image: imageData,
        offset: offset
    };
    exec(onSuccess, onError, "GrabbaPlugin", "GrabbaUtil", [command]);
};

module.exports.util = new GrabbaUtil();