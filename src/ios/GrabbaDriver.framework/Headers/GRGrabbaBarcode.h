//
//  GrabbaBarcode.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 9/12/09.
//  Copyright 2009 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "GRGrabbaBarcodeDelegate.h"
#import "GRGrabbaBarcodeSymbology.h"


/**
 * Provides access to barcode capabilities of an attached Grabba device. 
 * 
 * To scan a barcode implement the delegate {@link GRGrabbaBarcodeDelegate} and set the {@link #delegate}, then call {@link #trigger} and pass true to begin scanning.
 */
@interface GRGrabbaBarcode : NSObject 

//////////////////////////////////////////////////////////////////////////////////////////
/// @name Properties
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * The receiver's delegate or nil if it doesn't have a delegate
 */
@property (weak) id<GRGrabbaBarcodeDelegate> delegate;


//////////////////////////////////////////////////////////////////////////////////////////
/// @name Checking supported functions
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * A Boolean value that indicates whether the connected Grabba supports barcode functionality
 */
- (BOOL) barcodeSupported;


/**
 * A Boolean value that indicates whether the connected Grabba support image capture functionality
 */
- (BOOL) imagerSupported;

//////////////////////////////////////////////////////////////////////////////////////////
/// @name Scanning Barcodes
//////////////////////////////////////////////////////////////////////////////////////////


/**
 * Starts barcode scanning.
 * 
 * The barcode scanner will attempt to read a barcode until successful or the time limit set in the preferences expires
 * 

 * @see GRGrabbaBarcodeDelegate
 */
- (void) trigger;


/**
 * Stops barcode scanning.
 *
 * The barcode scanner will stop the scanning process immediately
 *
 */
- (void) triggerStop;

/**
 * Take a photo using the 2D barcode engine.
 *
 * @see GRGrabbaBarcodeDelegate
 */
- (NSData*) takePhoto: (NSError**) error;


//////////////////////////////////////////////////////////////////////////////////////////
/// @name Formating Helpers
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a string representing the barcode symbology name from a given barcode GRGrabbaBarcodeSymbologys
 */
+ (NSString*) stringFromSymbologyType:(NSInteger) symbology;


/**
 * Returns a formated string based of the barcode formatting set in the preferences
 */
+ (NSString*) formatBarcodeString:(NSString*) aBarcodeString symbologyType:(NSInteger) symbologyType;

@end
