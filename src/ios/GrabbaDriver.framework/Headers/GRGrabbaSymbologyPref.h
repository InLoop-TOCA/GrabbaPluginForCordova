//
//  GRGrabbaSymbologyPref.h
//  GrabbaDriver
//
//  Created by Grabba Developer on 21/11/11.
//  Copyright 2011 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaPreferencesProtocol.h"

/**
 * Provides access to basic technology symbology related preference of the Grabba driver.  This is the parent class of other symbology preferences 
 */

@interface GRGrabbaSymbologyPref : NSObject <GRGrabbaPreferencesProtocol>
{
	NSString* symbologyNamespace;
	NSString* nameSpaceAffix;
    NSString* technologyType;
    BOOL enabled;
}

/** symbology enabled */
@property BOOL enabled;

/** namespace of the symbology */
@property (nonatomic, strong) NSString* symbologyNamespace;

- (id) initWithNameSpaceAffix: (NSString*) inputTechnologyType : (NSString*) newNameSpaceAffix;
- (void) setInitalValuesWithEnabled:(BOOL) isEnable revert:(BOOL) doRevert;


@end
