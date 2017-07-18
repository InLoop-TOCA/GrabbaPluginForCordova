//
//  GRGrabbaPassportPrefs.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 23/12/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "GRGrabbaPreferencesProtocol.h"

/**
 * Provides access to Magstripe related preferences of the Grabba driver
 */

@interface GRGrabbaPassportPrefs : NSObject <GRGrabbaPreferencesProtocol>



/** vibrateOnScan */
@property BOOL vibrateOnScan;
/** beepOnScan */
@property BOOL beepOnScan;

/** track1MatchingRegularExpress */
@property (strong) NSString* formatMatchingRegularExpression;
/** track1SubstitutionTemplate */
@property (strong) NSString* formatSubstitutionTemplate;

@end
