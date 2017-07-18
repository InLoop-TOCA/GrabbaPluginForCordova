//
//  GrabbaPreferences.h
//  GrabbaDemo
//
//  Created by Murray Hughes on 29/01/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaPreferencesProtocol.h"
#import "GRGrabbaBarcodePrefs.h"
#import "GRGrabbaProxcardPrefs.h"
#import "GRGrabbaMagstripePrefs.h"
#import "GRGrabbaFingerprintPrefs.h"
#import "GRGrabbaPassportPrefs.h"
#import "GRGrabbaSuppChargePrefs.h"

/**
 * Provides access to preferences of the Grabba driver
 * 
 * Preferences can allso be accessed using NSUserDefaults. Please ask Grabba support for more information if required.
 */
@interface GRGrabbaPreferences : NSObject <GRGrabbaPreferencesProtocol>
{
	GRGrabbaBarcodePrefs		* barcode;
	GRGrabbaProxcardPrefs		* proxcard;
	GRGrabbaFingerprintPrefs	* fingerprint;
	GRGrabbaPassportPrefs		* passport;
}

/** 
 * Current Grabba Driver Barcode preferences
 */ 
@property (strong) GRGrabbaBarcodePrefs *barcode ;

/** 
 * Current Grabba Driver Barcode preferences
 */ 
@property (strong) GRGrabbaProxcardPrefs *proxcard ;

/** 
 * Current Grabba Driver Barcode preferences
 */ 
@property (strong) GRGrabbaMagstripePrefs *magstripe ;

/** 
 * Current Grabba Driver Fignerprint preferences
 */ 
@property (strong) GRGrabbaFingerprintPrefs *fingerprint ;

/** 
 * Current Grabba Driver Passport preferences
 */ 
@property (strong) GRGrabbaPassportPrefs *passport ;

/**
 * Current Grabba Driver Supplementary Charging preferences
 */
@property (strong) GRGrabbaSuppChargePrefs *suppcharge ;

/**
 * A boolean value to set whether the TCP debug bridge access is enabled
 */
@property BOOL debugBridgeAccessEnabled;

/**
 * Commit any changed preferences to memory and also to the Grabba hardware.
 * Before calling this function, some (but not all) preferences values may be in effect so it is recommended 
 * to save the preferences as soon as possible after modification to ensure consistent behaviour.
 */
+ (void) savePreferences;

@end
