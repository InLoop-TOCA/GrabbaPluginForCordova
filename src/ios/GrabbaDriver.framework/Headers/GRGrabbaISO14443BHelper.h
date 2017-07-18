//
//  GRGrabbaISO14443BHelper.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 2/08/11.
//  Copyright 2011 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
/**
 * Helper functions for ISO14443B capabilities.
 */
@interface GRGrabbaISO14443BHelper : NSObject


+ (GRGrabbaISO14443BHelper*) sharedInstance;

- (BOOL) isSO14443BHelperSupport;

- (NSData*) findPICC:(NSError**)error;

- (NSData*) selectPICC:(NSData*) appDataProtocolInfo error:(NSError**) error;

@end
