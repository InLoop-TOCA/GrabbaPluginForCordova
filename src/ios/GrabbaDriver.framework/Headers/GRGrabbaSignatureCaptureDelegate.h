//
//  GRGrabbaSignatureCaptureDelegate.h
//  GrabbaDriver
//
//  Created by Tarindu Paranagama on 25/10/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "GRGrabbaSignatureCapturePoint.h"

/**
 * Delegate for Grabba Signature capture events.
 */
@protocol GRGrabbaSignatureCaptureDelegate <NSObject>

/**
 * Sent to the delegate when the module returns the pen points in array
 *
 * @param points Return the points array
 */
- (void) signatureCapturePenPoints: (NSArray*) points;

/**
 * Sent to the delegate when the pen leave the panel
 *
 */
- (void) signatureCapturePenUp;

/**
 * Sent to the delegate when user taps the start capture area at the bottom left corner of the panel
 *
 */
- (void) signatureCaptureStartPressed;

/**
 * Sent to the delegate when user taps the stop capture area at the bottom right corner of the panel
 *
 */
- (void) signatureCaptureStopPressed;

/**
 * Sent to the delegate when parocard trigger fails including timeout
 *
 * @param error The error that occured
 */
- (void) signatureCaptureDidFailCaptureWithError:(NSError*) error;

@end
