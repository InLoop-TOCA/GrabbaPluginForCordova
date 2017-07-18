#import <Foundation/Foundation.h>

/**
 * The <VAR>GRGrabbaProxcardDelegate</VAR> protocol defines the methods a delegate of an {@link GRGrabbaProxcard}
 * object should implement. The delegate implements the events related to procard/RFID scanning including 
 * the collected serial number data.
 *
 */
@protocol GRGrabbaProxcardDelegate <NSObject>

@optional

/**
 * Sent to the delegate when a procard/RFID tag is successfully found in the radio field.
 * 
 * @param serialNumber
 *            The proxcard/RFID tag serial number or unique identifier
 * @param tagType
 *			  Type of the proxcard/RFID tag scanned
 */
- (void) proxcardDidReceiveData:(NSData*) serialNumber tagType:(NSInteger) tagType;


- (void) proxcardDidReceiveFormattedData:(NSString*) serialNumber tagType:(NSInteger) tagType;

/**
 * Send to the delegate when parocard trigger fails including timeout
 *
 * @param error The error that occured during the trigger
 */
- (void) proxcardDidFailTriggerWithError:(NSError*) error;


/**
 * Sent to the delegate when proxcard/RFID scanning begins.
 */
- (void) proxcardDidTrigger;


@end
