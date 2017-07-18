//
//  GRGrabbaCommandAPDU.h
//  GrabbaDriver
//
//  Created by Iain McCowan on 31/05/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

#define APDU_CASE_1 1
#define APDU_CASE_2 2
#define APDU_CASE_3 3
#define APDU_CASE_4 4


/**
 ** Class definition for a Smartcard Command APDU (Application Protocol Data Unit).  ISO 7816-4 defines Command APDUs.
 
 **+--------------------------------------+
 **
 **| CLA | INS | P1 | P2 | Lc Field | Data | Le Field |
 **
 **+--------------------------------------+
 **
 **The command header is composed of CLA, INS, P1, P2.
 **LcField = Length of data contained in the Data field
 **LeField = Length of data expected in the response
 **The body is composed of combinations of Lc Field, Data and Le Field as described below in the 4 cases.
 **
 **There are 4 structures of command APDUs as illustrated in ISO/IEC 7816-4:
 **
 **Case 1:
 **
 **+----------------+
 **
 **| Command Header |
 **
 **+----------------+
 **
 **Case 2:
 **
 **+------------------------+
 **
 **| Command Header | Le Field |
 **
 **+------------------------+
 **
 **Case 3:
 **
 **+----------------------------------+
 **
 **| Command Header | Lc Field | Data Field |
 **
 **+----------------------------------+
 **
 **
 **Case 4:
 **
 **+------------------------------------------+
 **
 **| Command Header | Lc Field | Data Field | Le Field |
 **
 **+------------------------------------------+
 **
 **
 **
 */
@interface GRGrabbaCommandAPDU : NSObject {
	UInt8	_cla;
	UInt8	_ins;
	UInt8	_p1;
	UInt8	_p2;
	NSData * _data;
    UInt8   _le ;
	UInt8   _apduCase;
    
}

@property UInt8 cla;
@property UInt8 ins;
@property UInt8 p1;
@property UInt8 p2;
@property (strong) NSData * data;
@property UInt8 le;
@property UInt8 apduCase;


/**
 * Initialise a new CommandAPDU object
 */
- (id) initWithCLA:(UInt8)cla INS:(UInt8)ins P1:(UInt8)p1 P2:(UInt8)p2;
- (id) initWithCLA:(UInt8)cla INS:(UInt8)ins P1:(UInt8)p1 P2:(UInt8)p2 Le:(UInt8)le Error:(NSError**)error;
- (id) initWithCLA:(UInt8)cla INS:(UInt8)ins P1:(UInt8)p1 P2:(UInt8)p2 Data:(NSData*)data Error:(NSError**)error;
- (id) initWithCLA:(UInt8)cla INS:(UInt8)ins P1:(UInt8)p1 P2:(UInt8)p2 Data:(NSData*)data Le:(UInt8)le Error:(NSError**)error;


/**
 * APDU case type (1, 2, 3, 4).
 */
- (int) APDUCase ;

/**
 * ADPU length
 */
- (NSNumber *) length ;

/**
 * APDU.
 */
- (NSData *) APDU ;

/**
 * Check if it is a Extended APDU
 */
- (bool) isExtended;

-(int) lc;


-(NSData*) APDUHeader;

@end
