

#import <Foundation/Foundation.h>

/**
 * The <VAR>GRGrabbaBarcodeDelegate</VAR> protocol defines the methods a delegate of an {@link GRGrabbaBarcode}
 * object should implement. The delegate implements the events related to barcode scanning including 
 * the collected barcode data.
 *
 */
@protocol GRGrabbaBarcodeDelegate <NSObject>

@optional


//////////////////////////////////////////////////////////////////////////////////////////
/// @name Scanning Barcodes
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Sent to the delegate when barcode scanning begins.
 *
* @see GRGrabbaBarcode#trigger:
 */
- (void) barcodeDidTrigger;


/**
 * Sent to the delegate when a barcode is successfully scanned.
 * 
 * @param barcode The actual barcode data collected.
 * @param symbologyType A GRGrabbaBarcodeSymbology representing the type of the barcode scanned.
 */
- (void) barcodeDidReceiveData:(NSString*) barcode symbologyType:(NSInteger) symbologyType;

/**
 * Sent to the delegate when a barcode is successfully scanned and formated.
 * 
 * @param barcode The actual barcode data collected formated as per barcode preferences.
 * @param symbologyType A GRGrabbaBarcodeSymbology representing the type of the barcode scanned.
 */
- (void) barcodeDidReceiveFormattedData:(NSString*) barcode symbologyType:(NSInteger) symbologyType;

/**
 * Sent to the delegate when a barcode is successfully scanned.
 * 
 * @param rawBarcode The actual barcode data collected.
 * @param symbologyType A GRGrabbaBarcodeSymbology representing the type of the barcode scanned.
 */
- (void) barcodeDidReceiveRawData:(NSData*) rawBarcode symbologyType:(NSInteger) symbologyType;


/**
 * Send to the delegate when barcode trigger fails including timeout
 *
 * @param error The error that occured during the trigger
 */
- (void) barcodeDidFailTriggerWithError:(NSError*) error;

@end
