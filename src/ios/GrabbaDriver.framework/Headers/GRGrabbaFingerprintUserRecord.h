//
//  GRGrabbaFingerprintUserRecord.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 17/06/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * Object representing a Grabba fingerprint user record
 */
@interface GRGrabbaFingerprintUserRecord : NSObject

+ (GRGrabbaFingerprintUserRecord*) GrabbaFingerprintUserRecordWithID:(NSString*) userID userData:(NSData*) userData;

@property (readwrite, retain) NSString* userID;
@property (readwrite, retain) NSData* userData;

@end
