//
//  GRGrabbaUHF.h
//  GrabbaDriver
//
//  Created by Grabba Developer on 25/06/13.
//  Copyright (c) 2013 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * Provides access to UHF capabilities of an attached Grabba device.
 */
@interface GRGrabbaUHF : NSObject

/**
 * Get an instance of this class to invoke functions.
 *
 * @return an instance of this class through which UHF functionality can be used.
 */
+ (GRGrabbaUHF*) sharedInstance;

/**
 * Determines if the currently connected Grabba supports UHF functionality.
 *
 * @return YES if the Grabba supports UHF functions, NO otherwise.
 */
- (BOOL) isUHFSupported;

/**
 * Read data from the tag
 *
 * @return the data read through the given parameters
 */
-(NSData*) readCardWithMembank:(int) memBank andAddress:(int) address andWordCount:(int) wordCount andPassword:(int) password andError:(NSError**)error;

/**
 * Write data to the tag
 */
-(void) writeCardWithMembank:(int) memBank andAddress:(int) address andData:(NSData*) data andPassword:(int) password andError:(NSError**)error;



@end
