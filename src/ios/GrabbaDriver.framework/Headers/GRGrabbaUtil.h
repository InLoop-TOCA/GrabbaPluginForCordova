//
//  GRGrabbaUtil.h
//  GrabbaDriver
//
//  Created by Wayne Uroda on 23/07/2014.
//  Copyright (c) 2014 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface GRGrabbaUtil : NSObject
/**
 * Make the iOS device issue a standard Grabba beep.
 */
+ (void) beep;

/**
 * Make the iOS device issue a short Grabba beep.
 */
+ (void) beepShort;

/**
 * Make the iOS device vibrate briefly.
 */
+ (void) vibrate;
@end
