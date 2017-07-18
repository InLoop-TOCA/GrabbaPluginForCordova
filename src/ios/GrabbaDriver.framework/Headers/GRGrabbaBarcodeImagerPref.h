//
//  GRGrabbaBarcodeImagerPref.h
//  GrabbaDriver
//
//  Created by Grabba Developer on 21/11/2013.
//  Copyright (c) 2013 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaPreferencesProtocol.h"

/**
 * Provides access to x400 and x700 image capture preference of the Grabba driver.  This is the parent class of other imager preferences
 */
@interface GRGrabbaBarcodeImagerPref : NSObject <GRGrabbaPreferencesProtocol>
{
	NSString* imagerNamespace;
	NSString* nameSpaceAffix;
    BOOL enabled;
}

/** imager preference enabled */
@property BOOL enabled;

/** namespace of the imager preference */
@property (nonatomic, strong) NSString* imagerNamespace;

- (id) initWithNameSpaceAffix: (NSString*) newNameSpaceAffix;
- (void) setInitalValuesWithEnabled:(BOOL) isEnable revert:(BOOL) doRevert;

@end
