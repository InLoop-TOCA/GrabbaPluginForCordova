//
//  GRGrabbaSuppChargePrefs.h
//  GrabbaDriver
//
//  Created by Paul McGougan on 8/07/2015.
//  Copyright (c) 2015 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaPreferencesProtocol.h"

/**
 * Provides access to Fingerprint related preferences of the Grabba driver
 */

@interface GRGrabbaSuppChargePrefs : NSObject <GRGrabbaPreferencesProtocol>

/**
 * Supplementary charging enabled.<br><br>
 *
 * Enables supplementary charing.<br>
 * Acceptable values are FALSE and TRUE.<br>
 * Default value is FALSE (not enabled).
 */
@property BOOL enableSupplementaryCharging;

@end
