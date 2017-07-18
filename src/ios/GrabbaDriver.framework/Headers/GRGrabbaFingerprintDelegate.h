//
//  GRGrabbaFingerprintDelegate.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 24/05/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "GRGrabbaFingerprintUserRecord.h"

/**
 * Delegate for Grabba Fingerprint events.
 */
@protocol GRGrabbaFingerprintDelegate<NSObject>

@optional

/**
 * Invoked when there is feedback available for the user.
 * @param messageId This is the ID of the message that needs to be displayed. Refer to kGRGrabbaFingerprintUserMessageType constants.
 * @param number This is the scan count in an enrolment/verify operation or the progress in a kGRGrabbaFingerprintUserMessageTypeImageProgress message.
 * @param total This is the total number of scans that will occur for the enrolment/verify procedure.
 * @param userRecord This is a user record asociated with a successful match in an identify function call.
 * @param error This callback may contain an error message in the event of unexpected errors.
 */
- (void) fingerprintUserMessageEvent:(int) messageId number:(int) number total:(int) total UserRecord:(GRGrabbaFingerprintUserRecord*) userRecord error:(NSError*) error;

/**
 * Invoked when the template data is returned.
 *
 * @param templateData The fingerprint template data of the captured fingerprint.
 * @param templateType The format of the template. Refer to kGRGrabbaFingerprintTemplateType constants.
 */
- (void) fingerprintTemplateDataEvent:(NSData*) templateData templateType:(int) templateType;

/**
 * Invoked when image data is returned.
 *
 * @param imageData The image data of the captured fingerprint.
 * @param imageType The image type of the captured fingerprint. Refer to kGRGrabbaFingerprintImageType constants.
 * @param numRows The number of rows in the image data.
 * @param numColumns The number of columns in the image data.
 */
- (void) fingerprintImageEvent:(NSData*) imageData imageType:(int) imageType numRows:(int) numRows numColumns:(int) numColumns;

@end
