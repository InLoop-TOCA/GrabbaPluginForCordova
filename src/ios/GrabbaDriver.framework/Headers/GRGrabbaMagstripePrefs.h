//
//  GRGrabbaMagstripePrefs.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 3/11/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaPreferencesProtocol.h"

/**
 * Provides access to Magstripe related preferences of the Grabba driver
 */

@interface GRGrabbaMagstripePrefs : NSObject <GRGrabbaPreferencesProtocol>
{

}

/** vibrateOnScan */
@property BOOL vibrateOnScan;
/** beepOnScan */
@property BOOL beepOnScan;

/** track1Enabled */
@property BOOL track1Enabled;
/** track1MatchingRegularExpress */
@property (strong) NSString* track1MatchingRegularExpression;
/** track1SubstitutionTemplate */
@property (strong) NSString* track1SubstitutionTemplate;

/** track2Enabled */
@property BOOL track2Enabled;
/** track2MatchingRegularExpress */
@property (strong) NSString* track2MatchingRegularExpression;
/** track2SubstitutionTemplate */
@property (strong) NSString* track2SubstitutionTemplate;

/** track3Enabled */
@property BOOL track3Enabled;
/** track3MatchingRegularExpress */
@property (strong) NSString* track3MatchingRegularExpression;
/** track3SubstitutionTemplate */
@property (strong) NSString* track3SubstitutionTemplate;

/** NonISO Mode */
@property BOOL nonISOMode;

@end
