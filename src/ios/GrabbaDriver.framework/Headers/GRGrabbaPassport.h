//
//  GRGrabbaPassport.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 22/12/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "GRGrabbaPassportDelegate.h"
/**
 * Provides access to passport MRZ reading capabilities of an attached Grabba device.
 *
 * To read a passport MRZ implement the delegate GRGrabbaPassportDelegate and set the delegate.
 * Then simply swipe a passport through the Grabba
 */
@interface GRGrabbaPassport : NSObject 

/**
 * The receiver's delegate or nil if it doesn't have a delegate
 */
@property (weak) id<GRGrabbaPassportDelegate> delegate;


/**
 * A Boolean value that indicates whether the connected Grabba supports passport OCR functionality
 */
- (BOOL) passportSupported;


/**
 * Returns a formatted passport MRZ string based on the passport preferences.
 */
+ (NSString*) formatPassportString:(NSString*) aPassportString;


@end
