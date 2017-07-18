//
//  GRGrabbaMRTDDelegate.h
//  GrabbaDriver
//
//  Created by Grabba Developer on 4/11/2013.
//  Copyright (c) 2013 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * The <VAR>GRGrabbaContactlessPaymentDelegate</VAR> protocol defines the methods a delegate of an {@link GRGrabbaContactlessPayment}
 * object should implement. The delegate implements the events related to procard/RFID scanning including
 * the collected serial number data, specificly for use with contactless payment cards.
 *
 */
@protocol GRGrabbaMRTDDelegate <NSObject>

@optional


/**
 * Sent to the delegate when MRTD is progressing.
 *
 * @param percentage Progress shown in percentage (0-100)
 */
- (void) mrtdProgressDidUpdate:(int) percentage;

/**
 * Send to the delegate when MRTD fails in the process
 *
 * @param error The error that occured during the process
 */
- (void) mrtdDidFailTriggerWithError:(NSError*) error;



@end