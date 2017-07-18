//
//  GRGrabbaBerTLV.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 3/08/11.
//  Copyright 2011 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

@class GRDataReader;

/**
 * Grabba representation of a BER-TLV object
 */
@interface GRGrabbaBerTLV : NSObject


@property (assign, readonly) int tag;
@property (assign, readonly) BOOL isValuePrimitive;
@property (assign, readonly) BOOL isValueBerTlv;
@property (strong, readonly) NSData* primitiveValue;
@property (strong, readonly) NSArray* berTlvValue;

/**
 * Create a BER-TLV object with given data.
 */
+ (GRGrabbaBerTLV*) grabbaBerTLVWithData:(NSData*) data;
/**
 * Create a BER-TLV object with a given data reader.
 */
+ (GRGrabbaBerTLV*) grabbaBerTLVWithDataReader:(GRDataReader*) dataReader;

- (GRGrabbaBerTLV*) findObjectByTag:(int) tag;
- (NSArray*) listObjectsWithTag:(int) tag;

- (NSData*) getRawData;

@end
