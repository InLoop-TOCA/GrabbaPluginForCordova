//
//  GRGrabbaContactlessPayment.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 1/08/11.
//  Copyright 2011 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaContactlessPaymentDelegate.h"

/**
 * Provides access to contactless payment capabilities of an attached Grabba device.
 */
@interface GRGrabbaContactlessPayment : NSObject


@property (weak) id<GRGrabbaContactlessPaymentDelegate> delegate;

/**
 * Get an instance of this class to invoke functions.
 * 
 * @return an instance of this class through which contactless payment functionality can be used.
 */

+ (GRGrabbaContactlessPayment*) sharedInstance;

/**
 * Starts searching for contactles paymentcard.
 * 
 * The proxcard module will attempt to read a card/tag until successful or the time limit set in the preferences expires
 * 
 * @see GRGrabbaContactlessPaymentDelegate
 */
- (void) trigger;

/**
 * Manually stops searching for contactles paymentcard.
 */
- (void) cancelTrigger;

/**
 * Attempt to read the track2 equivalent data from a payment card in the field. Not all cards supply track2 equivalent data.
 * 
 * @return The track2 equivalent data if present, zero length array otherwise.
 */
- (NSData*) getTrack2DataError:(NSError**) ptrError;

/**
 * Retrieve the name of the card holder
 */
- (NSString*) getCardHolderName;

/**
 * Retrieve the effective date of the card
 */
- (NSString*) getApplicationEffectiveDate;

/**
 * Retrieve the expiration date of the card.
 */
- (NSString*) getApplicationExpirationDate;

/**
 * Retrieve the service code of the card.
 */
- (NSString*) getServiceCode;

/**
 * Format the card into standard card nummber format (XXXX XXXX XXXX XXXX).
 */
- (NSString*) formatAsPAN:(NSData*) panData;



@end
