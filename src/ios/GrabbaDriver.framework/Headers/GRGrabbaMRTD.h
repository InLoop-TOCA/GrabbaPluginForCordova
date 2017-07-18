//
//  GRGrabbaMRTD.h
//  GrabbaDriver
//
//  Created by Grabba Developer on 1/11/2013.
//  Copyright (c) 2013 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaMRTDDelegate.h"
#import "GRGrabbaBerTLV.h"
/**
 * Provides access to MRTD capabilities of an attached Grabba device.
 */
@interface GRGrabbaMRTD : NSObject
{
}

@property (weak) id<GRGrabbaMRTDDelegate> delegate;

/**
 * Get an instance of this class to invoke functions.
 *
 * @return an instance of this class through which GrabbaMRTD functionality can be used.
 */
+ (GRGrabbaMRTD*) sharedInstance;

/**
 * Determines if the currently connected Grabba supports MRTD functionality.
 *
 * @return YES if the Grabba supports MRTD functions, NO otherwise.
 */
- (BOOL) isGrabbaMRTDSupported;

/**
 * Get data through the MRZ track data and then RFID tag.
 *
 * @return GRGrabbaBerTLV data object
 */
-(GRGrabbaBerTLV*) getDataFromMRZ :(NSString*) trackData withFileID:(int)fileID withError:(NSError**)error;


@end
