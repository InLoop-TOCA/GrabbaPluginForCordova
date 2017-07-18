//
//  GRGrabbaISO1443A.h
//  
//
//  Created by Murray Hughes on 1/08/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
/**
 * Provides access to Grabba ISO14443A capabilities of an attached Grabba device.
 */
@interface GRGrabbaISO14443A : NSObject


+ (GRGrabbaISO14443A*) sharedInstance;


/**
 * Determines if the currently connected Grabba supports ISO14443A functionality.
 * 
 * @return true if the Grabba supports ISO14443A functions, false otherwise.
 */
- (BOOL) isISO14443ASupport;


/**
 * Returns the ID ISO14443A tag UID of a tag that is on the field.<br>
 * <br>
 * Finds a tag on the field and returns its UID. NOTE: RF field is turned on.<br>
 * 
 * @return The UID of the ISO14443A tag that is found on the field. If there is more than one the first resolved UID will be returned. nil if error
 */
- (NSData *) findPICC:(NSError **)error;


/**
 * Selects an ISO14443A tag on the field with a specific UID.<br>
 * <br>
 * Selects a tag on the field with the specified UID. And returns the SAK (Select Acknowledgement) the tag sends. If the PICC is determined to be ISO14443 Part 4 Compatible, then a RATS command is also sent to allow data exchange between the PICC and Grabba. NOTE: RF field is turned on.<br>
 * 
 * @param UID
 *            The UID of the ISO14443A tag to select.
 * @param error
 * 
 * @return the SAK of the selected PICC.
 */
- (int) selectPICCForUID:(NSData*) UID error:(NSError**) error;

/**
 * Selects an ISO14443A tag on the field with a specific UID.<br>
 * <br>
 * Selects a tag on the field with the specified UID. And returns the SAK (Select Acknowledgement) the tag sends. If the PICC is determined to be ISO14443 Part 4 Compatible, then a RATS command is also sent to allow data exchange between the PICC and Grabba. NOTE: RF field is turned on.<br>
 *
 * @param UID
 *            The UID of the ISO14443A tag to select.
 * @param ReturnATS
 *            Return the pointer of ATS
 * @param error
 *
 * @return the SAK of the selected PICC.
 */
- (int) selectPICCForUID:(NSData*) UID ATS:(NSData**) ReturnATS error:(NSError**) error;


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
- (NSData*) exchangeData:(NSData*) data error:(NSError**) error;


/**
 * Deselects the currently selected PICC.<br>
 * 
 * Deselects the currently selected PICC. This allows another PICC to be selected. NOTE: The RF field is left on.
 */
- (BOOL) deselectPICC:(NSError**) error;


/**
 * Powers down the RF field.<br>
 * 
 * Turns off the RF field. PICCs on the field will not hold their state once the RF field is turned off.
 */
+ (BOOL) powerdown:(NSError**)error;   //throws GrabbaFunctionNotSupportedException, GrabbaBusyException, GrabbaIOException, GrabbaNotConnectedException

@end
