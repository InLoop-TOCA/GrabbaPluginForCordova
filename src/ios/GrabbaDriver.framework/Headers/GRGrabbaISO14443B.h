//
//  GRGrabbaISO14443B.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 2/08/11.
//  Copyright 2011 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
/**
 * Provides access to Grabba ISO14443B capabilities of an attached Grabba device.
 */
@interface GRGrabbaISO14443B : NSObject


+ (GRGrabbaISO14443B*) sharedInstance;


- (NSData*) getATQBFromResponse:(NSData*) response error:(NSError**)error; //throws GrabbaProxcardNoCardInFieldException, GrabbaProxcardCollisionException, 

- (NSData*) sendATTRIB:(NSData*) atqB error:(NSError**)error;    // throws GrabbaFunctionNotSupportedException, GrabbaBusyException, GrabbaIOException,

/**
 * Powers down the RF field.<br>
 *
 * Turns off the RF field. PICCs on the field will not hold their state once the RF field is turned off.
 */
+ (BOOL) powerdown:(NSError**)error;   //throws GrabbaFunctionNotSupportedException, GrabbaBusyException, GrabbaIOException, GrabbaNotConnectedException
@end
