//
//  GRGrabbaResponseAPDU.h
//  GrabbaDriver
//
//  Created by Iain McCowan on 31/05/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 ** Represents a response Application Protocol Data Unit. ISO 7816-4 defines the structure of the ResponseAPDU. The reponse contains two mandatory bytes called status words, SW1, SW2, preceeded by some data.
 **
 **+-----------------+
 **
 **|           Data           | SW1 | SW2 |
 **
 **+-----------------+
 **
 */
@interface GRGrabbaResponseAPDU : NSObject {
	UInt8	_sw1 ;
	UInt8	_sw2 ;
	NSData * _rData ;
}

@property UInt8 sw1 ;
@property UInt8 sw2 ;
@property (strong) NSData * rData ;

/**
 * Initialise a new ResponseAPDU object
 */
- (id) initWithData:(NSData *)data SW1:(UInt8)status1 SW2:(UInt8)status2 ;

/**
 * Create a response APDU from a given serial stream.<br>
 * The 'data' portion of the created APDU will be all but the last two bytes of the stream.<br>
 * The SW1 and SW2 status bytes will be read from the last two bytes of the stream.
 *
 * @param stream
 *            Stream to read the response APDU from. This stream must be at least 2 bytes long.
 * @param error
 *            Error that might be returned from the initialisation.
 */
-(id) initWithStream:(NSData *)stream withError:(NSError**)error;

/**
 * Length of the response
 */
- (NSNumber *) length ;

/**
 * APDU data
 */
- (NSData *) APDU ;

/**
 * Use to check if the command completed successfully. Equivalent to (SW1 == 0x90 && SW2 == 0x00).
 *
 * @return true if this APDU represents a successful reply, false otherwise.
 */
-(bool) isSuccessful;

/**
 * Function to return a string based on APDU SW values
 *
 */
-(NSString*) getAPDUStatus;


@end
