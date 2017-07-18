//
//  GRGrabbaISO14443Part4.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 1/08/11.
//  Copyright 2011 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * Provides access to ISO14443 Part 4 capabilities of an attached Grabba device.
 */
@interface GRGrabbaISO14443Part4 : NSObject


+ (GRGrabbaISO14443Part4*) sharedInstance;

/**
 * Determines if the currently connected Grabba supports ISO14443 Part 4 functionality.
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>This function CAN be called on the event thread. </b> <br>
 * 
 * @return true if the Grabba supports ISO14443 Part 4 functions, false otherwise.
 */
- (BOOL) isISO14443Part4Supported;


/**
 * Selects an an ISO14443A or B type card which is on the field.
 * 
 * @return true if card is successfully selected, false otherwise.
 */
+ (NSError*) selectCard;


/**
 * Exchanges data with the currently selected PICC.<br>
 * 
 * Exchanges data with the currently selected PICC. Data is sent to the PICC, and the response is returned.
 * 
 * @param data
 *            The data which is to be sent to the PICC.<br>
 * @param error
 * 
 * @return The data returned by the PICC in response to the sent data. nil if error
 */
+(NSData*) exchangeData:(NSData*) data error:(NSError**) error;

/**
 * Power down the RFID module.
 *
 */
+(BOOL) powerDown:(NSError**) error;

@end
