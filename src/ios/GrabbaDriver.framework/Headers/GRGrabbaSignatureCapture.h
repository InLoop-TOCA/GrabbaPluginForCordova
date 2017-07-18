//
//  GRGrabbaSignatureCapture.h
//  GrabbaDriver
//
//  Created by Tarindu Paranagama on 25/10/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaSignatureCaptureDelegate.h"


/**
 * Provides access to signature capture capabilities of an attached Grabba device. 
 * 
 * To capture signatures implement the delegate {@link GRGrabbaSignatureCaptureDelegate} and set the {@link #delegate}.
 */
@interface GRGrabbaSignatureCapture : NSObject

/**
 * The receiver's delegate or nil if it doesn't have a delegate
 */
@property (weak) id<GRGrabbaSignatureCaptureDelegate> delegate;


/**
 * The Grabba will begin the signature capture process.
 * 
 * @see GRGrabbaSignatureCaptureDelegate
 */
-(void) startCapture;


/**
 * The Grabba will stop the signature capture process.
 * 
 * @see GRGrabbaSignatureCaptureDelegate
 */
-(void) stopCapture;


/**
 * Return the signature image in UIImage* format
 * 
 */
-(UIImage*) getSignatureBitmap;

/**
 * Determines if the currently connected Grabba supports signature capture functionality.
 */
-(BOOL) signatureCaptureSupported;

@end
