//
//  GRGrabbaContactlessPaymentDelegate.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 1/08/11.
//  Copyright 2011 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * The <VAR>GRGrabbaContactlessPaymentDelegate</VAR> protocol defines the methods a delegate of an {@link GRGrabbaContactlessPayment}
 * object should implement. The delegate implements the events related to procard/RFID scanning including 
 * the collected serial number data, specificly for use with contactless payment cards.
 *
 */
@protocol GRGrabbaContactlessPaymentDelegate <NSObject>

@optional


/**
 * Sent to the delegate when proxcard/RFID scanning begins.
 */

- (void) paymentCardDidTrigger;


/**
 * Send to the delegate when parocard trigger fails including timeout
 *
 * @param error The error that occured during the trigger
 */
- (void) paymentCardDidFailTriggerWithError:(NSError*) error;



/**
 * Invoked when a proxcard or contactless credit card is found on the field.
 * 
 * @param pan
 *            The primary account number of a credit card - is valid if isCreditCard is true.
 * @param card
 *            The card ID of a non-credit card proxcard - could be ISO14443, Mifare, ISO15693, or HID iClass
 * @param isCreditCard
 *            This is a boolean to indicate if the card on the field is a credit card or not. True indicates credit card, false indicates proxcard.
 * @param cardType
 *            One of representing the type of RFID tag/proxcard which was found in the radio field.
 */
- (void) paymentCardDidReceivePanData:(NSData*) pan cardID:(NSData*) card isCreditCard:(BOOL) isCreditCard cardType:(int) cardType;

@end