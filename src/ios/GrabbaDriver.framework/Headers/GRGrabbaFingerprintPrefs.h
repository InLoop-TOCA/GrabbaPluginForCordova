//
//  GRGrabbaFingerprintPrefs.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 18/11/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "GRGrabbaPreferencesProtocol.h"

/**
 * Provides access to Fingerprint related preferences of the Grabba driver
 */

@interface GRGrabbaFingerprintPrefs : NSObject <GRGrabbaPreferencesProtocol>
{

}

/**
 * Enrol fingerprint timeout.<br><br>
 *
 * The time in seconds enrol functions will wait for an acceptable fingerprint to be presented before timing out.<br>
 * Acceptable values are 1 to 65535 seconds.<br>
 * Default value is 0 (no timeout).
 */
@property NSInteger enrolTimeout;

/**
 * Identify fingerprint timeout.<br><br>
 *
 * The time in seconds identify functions will wait for an acceptable fingerprint to be presented before timing out.<br>
 * Acceptable values are 1 to 65535 seconds.<br>
 * Default value is 0 (no timeout).
 */
@property NSInteger identifyTimeout;


/**
 * verify fingerprint timeout.<br><br>
 *
 * The time in seconds verify functions will wait for an acceptable fingerprint to be presented before timing out.<br>
 * Acceptable values are 1 to 65535 seconds.<br>
 * Default value is 0 (no timeout).
 */
@property NSInteger verifyTimeout;

/**
 * WSQ compression ration (2 to 255). recommended value is "15".
 */
@property NSInteger wsqCompressionRatio;

/**
 * Minimum acquisition threshold.<br>
 * The minimum value of fingerprint quality before a fingerprint is accepted - please note this is only available on striped fingerprint sensors.<br>
 * It is strongly recommended that this value is left as the default (20).<br>
 * Acquisition is retried until the threshold is reached.<br>
 * Acceptable values are 20-100.
 */
@property NSInteger qualityThreshold;
@end
