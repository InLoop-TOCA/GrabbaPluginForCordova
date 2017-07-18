//
//  GRGrabbaISO15693.h
//  GrabbaDriver
//
//  Created by Grabba Developer on 4/10/12.
//  Copyright (c) 2012 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

#define FIND_VICC_RETRY     5
#define READ_BLOCK_RETRY    10

/**
 * Provides access to ISO15693 capabilities of an attached Grabba device.
 */
@interface GRGrabbaISO15693 : NSObject

/**
 * Get an instance of this class to invoke functions.
 *
 * @return an instance of this class through which ISO15693 functionality can be used.
 */
+ (GRGrabbaISO15693*) sharedInstance;

/**
 * Determines if the currently connected Grabba supports ISO15693 functionality.
 *
 * @return YES if the Grabba supports ISO15693 functions, NO otherwise.
 */
- (BOOL) isISO15693Supported;

/**
 * Look for the Vicinity Integrated Circuit Card (VICC)
 *
 * @param error return error message if there is any.  Nil otherwise.
 * @return Card Unique identifier (UID)
 */
-(NSData*) findVICC: (NSError**) error;

/**
 * Select ISO15693 card.
 *
 * @param UID Card unique ID.
 * @param error return error message if there is any.  Nil otherwise.
 * @return Card response.
 */
-(NSData*) selectVICC: (NSData*) UID : (NSError**) error;

/**
 * Read a single block from the card.
 *
 * @param blockNumber Block index of the card
 * @param error return error message if there is any.  Nil otherwise.
 * @return Block data read.
 */
-(NSData*) readBlock: (uint8_t) blockNumber : (NSError**) error;

/**
 * Write a single block into the card.
 *
 * @param blockNumber Block index of the card
 * @param data Block data
 * @param error return error message if there is any.  Nil otherwise.
 */
-(void) writeBlock: (uint8_t) blockNumber : (NSData*) data : (NSError**) error;


/**
 * This function let users to communiate with the card with specific flag, command and parameters.  For example, Set EAS, Write AFI.  Please read the datasheets for ISO15693 carefully before you apply this procedure into your code.
 *
 * @param flag Flag
 * @param command Command code
 * @param parameter Parameters
 * @param error return error message if there is any.  Nil otherwise.
 * @return Raw response from the card.
 */
-(NSData*) exchangeCommand: (uint8_t) flag : (uint8_t) command : (NSData*) parameter : (NSError**) error;

/**
 * Powers down the RF field.<br>
 *
 * Turns off the RF field. PICCs on the field will not hold their state once the RF field is turned off.
 */
+ (BOOL) powerdown:(NSError**)error;

@end