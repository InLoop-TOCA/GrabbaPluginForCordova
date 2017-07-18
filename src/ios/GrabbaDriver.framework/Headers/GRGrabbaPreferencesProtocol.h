//
//  GRPreferences.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 8/04/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * Provides a common protocol for Grabba preferences. 
 */
@protocol GRGrabbaPreferencesProtocol <NSObject> 

- (NSString*) baseNamepace;

/** Updates the UserDefaults with any new preferences */
- (void) update;

/** Reverts the UserDefaults back to the inital values */
- (void) revert;

@end
