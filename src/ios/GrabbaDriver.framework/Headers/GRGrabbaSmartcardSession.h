//
//  GRGrabbaSmartcardSession.h
//  GrabbaDriver
//
//  Created by Iain McCowan on 31/05/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

@class GRGrabbaSmartcard ;
@class GRGrabbaCommandAPDU ;
@class GRGrabbaResponseAPDU ;


/**
 * Object representing a Grabba Smartcard Session.
 */
@interface GRGrabbaSmartcardSession : NSObject {
	int						firmwareBitDelay ;
	int						firmwareExtraGuardTime ;
	int						firmwareWaitingTime ;
	int						firmwareSelectedCard ;
	
	NSMutableData *			ATR ;
	GRGrabbaSmartcard *		reader ;
}

@property (nonatomic) int firmwareBitDelay ;
@property (nonatomic) int firmwareExtraGuardTime ;
@property (nonatomic) int firmwareWaitingTime ;
@property (nonatomic) int firmwareSelectedCard ;

@property (strong) GRGrabbaSmartcard * reader ;
@property (strong) NSMutableData * ATR ;

@property (nonatomic) int protocol;
@property (nonatomic) int IFSC;
@property (nonatomic) int IFSD;
@property (nonatomic) bool useCRC;

@property (nonatomic) int iccNS;         // ICC current send sequence number (Ns)
@property (nonatomic) int ifdNS;         // Interface device current send Sequence number (Ns)

/**
 * Initialise Smartcard session with given smartcard information and ATR.
 * 
 * @param smartcardReader
 *            
 * @param cardATR
 */
- (id) initWithSmartcard:(GRGrabbaSmartcard *)smartcardReader andATR:(NSData *)cardATR ;

/**
 * Initialise Smartcard session with given ATR, Protocol IFSC and useCRC.
 *
 * @param cardATR
 * @param cardProtocol
 * @param cardIFSC
 * @param cardUseCRC
 */
- (id) initWithATR:(NSData*) cardATR andProtocol:(int) cardProtocol andIFSC:(int)cardIFSC andUseCRC:(bool)cardUseCRC;



/**
 * Exchanges a command and response APDU with the powered smartcard in the Grabba reader.
 * 
 * @param command
 *            The APDU to send to the card.
 * @param response
 *            The APDU returned from the card.
 * @param error
 *          Error return parameter.
 */
- (BOOL) exchangeAPDUCommand:(GRGrabbaCommandAPDU *)command withResponse:(GRGrabbaResponseAPDU *)response error:(NSError **)error;

/**
 * Returns the answer to reset provided by the powered smartcard in the Grabba reader
 */
- (NSData*) getATR;

/**
 * Change the custom baudrate
 *
 * @param pps1
 *          Custom bradrate.
 *
 * @param error
 *          Error return parameter.
 */
- (BOOL) exchangePPS:(uint8_t)pps1 error:(NSError **)error ;

-(void) incrementIccSequenceNumber;
-(void) incrementIfdSequenceNumber;

@end
