//
//  GRGrabbaFingerprint.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 24/05/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "GRGrabbaFingerprintDelegate.h"
#import "GRGrabbaFingerprintUserRecord.h"
#import <UIKit/UIKit.h>

/**
 * Provides access to fingeprint capabilities of an attached Grabba device. <br>
 * <br>
 * To use a Grabba fingerprint reader first implement the interface {@link GRGrabbaFingerprintDelegate} and then use the required functions (enrol, verify, etc).
 *
 * @see GRGrabbaFingerprintDelegate
 */
@interface GRGrabbaFingerprint : NSObject

/**
 * The receiver's delegate or nil if it doesn't have a delegate
 */
@property (weak) id<GRGrabbaFingerprintDelegate> delegate;

/**
 * Grabba fingerprint template type enumeration
 */
enum GRGrabbaFingerprintTemplateType
{
    kGRGrabbaFingerprintTemplateTypeNoTemplate  = 0,
    
    kGRGrabbaFingerprintTemplateTypePK_COMP_V2  = 1,
    kGRGrabbaFingerprintTemplateTypePK_COMP_V2_NORM  = 2,
    kGRGrabbaFingerprintTemplateTypePK_MAT  = 3,
    kGRGrabbaFingerprintTemplateTypePK_MAT_NORM  = 4,
    
    kGRGrabbaFingerprintTemplateTypeISO_PK_DATA_ANSI_378  = 5,
    kGRGrabbaFingerprintTemplateTypeISO_PK_DATA_MINEX_A  = 6,
    kGRGrabbaFingerprintTemplateTypeISO_PK_DATA_FMR  = 7,
    kGRGrabbaFingerprintTemplateTypeISO_PK_DATA_FMC_NS  = 8,
    kGRGrabbaFingerprintTemplateTypeISO_PK_DATA_FMC_CS  = 9,
    kGRGrabbaFingerprintTemplateTypePK_DIN_V66400  = 10,
    
    kGRGrabbaFingerprintTemplateTypeUnkown  = -1,
};

/**
 * Grabba fingerprint user message type enumeration
 */
enum GRGrabbaFingerprintUserMessageType
{
    kGRGrabbaFingerprintUserMessageTypeUnknown = -1,
    kGRGrabbaFingerprintUserMessageTypePlaceYourFinger = 1,
    kGRGrabbaFingerprintUserMessageTypeMoveUp = 2,
    kGRGrabbaFingerprintUserMessageTypeMoveDown = 3,
    kGRGrabbaFingerprintUserMessageTypeMoveLeft = 4,
    kGRGrabbaFingerprintUserMessageTypeMoveRight = 5,
    kGRGrabbaFingerprintUserMessageTypePressHarder = 6,
    kGRGrabbaFingerprintUserMessageTypeMoveYourFinger = 7,
    kGRGrabbaFingerprintUserMessageTypeRemoveYourFinger = 8,
    kGRGrabbaFingerprintUserMessageTypeAcquisitionComplete = 9,
    kGRGrabbaFingerprintUserMessageTypeImageMessage = 10,
    kGRGrabbaFingerprintUserMessageTypePlaceFingerForAcquisition = 11,
    kGRGrabbaFingerprintUserMessageTypePlace1stFingerForAcquisition = 12,
    kGRGrabbaFingerprintUserMessageTypePlace2ndFingerForAcquisition = 13,
    kGRGrabbaFingerprintUserMessageTypeMatchSuccessful = 14,
    kGRGrabbaFingerprintUserMessageTypeMatchUnsuccessfulNotSameFinger = 15,
    kGRGrabbaFingerprintUserMessageTypeMatchUnsuccessfulDatabaseEmpty = 16,
    kGRGrabbaFingerprintUserMessageTypeMatchUnsuccessfulFalseFingerDetected = 17,
    kGRGrabbaFingerprintUserMessageTypeMatchUnsuccessfulMoistFinger = 18,
    kGRGrabbaFingerprintUserMessageTypeErrorAlreadyEnrolled = 19,
    kGRGrabbaFingerprintUserMessageTypeErrorInvalidUserID = 20,
    kGRGrabbaFingerprintUserMessageTypeErrorInvalidUserData = 21,
    kGRGrabbaFingerprintUserMessageTypeImageProgress = 22,
    kGRGrabbaFingerprintUserMessageTypeImageDetectQuality = 23,
    kGRGrabbaFingerprintUserMessageTypeImageCodeQuality = 24,
    kGRGrabbaFingerprintUserMessageTypeErrorTimeout = 25,
    kGRGrabbaFingerprintUserMessageTypeErrorSameFinger = 26,
    kGRGrabbaFingerprintUserMessageTypeErrorNoDatabase = 27,
    kGRGrabbaFingerprintUserMessageTypeErrorCommandInProgress = 28,
    kGRGrabbaFingerprintUserMessageTypeErrorDatabaseFull = 29,
    kGRGrabbaFingerprintUserMessageTypeErrorILV = 30,
    kGRGrabbaFingerprintUserMessageTypeErrorNotSupported = 31,
    kGRGrabbaFingerprintUserMessageTypeErrorInvalidTemplate = 32,
    kGRGrabbaFingerprintUserMessageTypeError = 33,
	kGRGrabbaFingerprintUserMessageTypeTemplateStored = 34
};

/**
 * GRGrabbaFingerprintImageType enumeration
 */
enum GRGrabbaFingerprintImageType
{
    kGRGrabbaFingerprintImageTypeNoImage = 0,
    kGRGrabbaFingerprintImageTypeImgNoCompression = 1,
    kGRGrabbaFingerprintImageTypeImgV1Compression = 2,
    kGRGrabbaFingerprintImageTypeImgWSQCompression = 3,
    kGRGrabbaFingerprintImageTypeUnknown = -1,
    kGRGrabbaFingerprintImageTypePreview = 4,
};

/**
 * Determines if the currently connected Grabba supports fingerprint reading functionality.
 */
- (BOOL) isFingerprintSupported;

/**
 * Erase all user records from the local fingerprint database.
 * @param error Error variable.
 */
- (void) clearFingerprintDatabase:(NSError**) error;

/**
 * Remeovs all fingerprint records from the local fingerprint database and resets the database.
 * @param error Error variable.
 */
- (void) resetFingerprintDatabase:(NSError**) error;

/**
 * Abort a fingerprint scan operation which is currently in progress.
 * @param error Error variable.
 */
- (void) abort:(NSError**) error;

/**
 * Enrols a fingerprint to the internal local fingerprint database. <br>
 * Fingerprint events are returned via {@link GRGrabbaFingerprintDelegate}. <br>
 * This function can be used in conjunction with the identify function to identify a user in the local database.<br>
 * This function is not available on -WSQ devices as there is no local database on a -WSQ device.
 *
 * @param templateType Template type identifier of template to return after enrolment.
 * @param imageType Image type identifier fo image to return after enrolment.
 * @param numAcquisitions Number of acquisitions to take for each finger. This must be set to 3 for enrolment to the local database.
 * @param numFingers Number of fingers to enrol, either 1 or 2, for each user.
 * @param userRecord A GRGrabbaFingerprintUserRecord indicating information to be stored into the enrolled record.
 * @param error Error variable.
 *
 * @see GRGrabbaFingerprintDelegate
 */
- (void) enrolFingerprintToDatabaseWithTemplateType:(int) templateType imageType:(int) imageType numAcquisitions:(int) numAcquisitions numFingers:(int) numFingers userRecord:(GRGrabbaFingerprintUserRecord*) userRecord error:(NSError**) error;

/**
 * Capture a fingerprint template and/or fingerprint image.
 * Fingerprint events are returned via {@link GRGrabbaFingerprintDelegate}. <br>
 * @param templateType Template type identifier of template to return after enrolment.
 * @param imageType Image type identifier fo image to return after enrolment.
 * @param numAcquisitions Number of acquisitions to take for each finger.
 * @param numFingers Number of fingers to enrol.
 * @param error Error variable.
 * @see GRGrabbaFingerprintDelegate
 */
- (void) enrolFingerprintWithTemplateType:(int) templateType imageType:(int) imageType numAcquisitions:(int) numAcquisitions numFingers:(int) numFingers error:(NSError**) error;

/**
 * Verify a presented finger against a fingerprint template.
 * Fingerprint events are returned via {@link GRGrabbaFingerprintDelegate}. <br>
 * @param templateData Data for the template to be matched against.
 * @param templateType Template type identifier of template data.
 * @param error Error variable.
 * @see GRGrabbaFingerprintDelegate
 */
- (void) verifyFingerprintWithTemplateData:(NSData*) templateData templateType:(int) templateType error:(NSError**) error;

/**
 * Identify a fingerprint inside the local database.
 * Fingerprint events are returned via {@link GRGrabbaFingerprintDelegate}. <br>
 * This function is not available on -WSQ devices as there is no local database on a -WSQ device.
 * @param error Error variable.
 * @see GRGrabbaFingerprintDelegate
 */
- (void) identifyFingerprint:(NSError**) error;

/**
 * Compare a given fingerprint template against a list of fingerprint templates (maximum 20).
 * @param inputTemplate Template data for the fingerprint template to search for.
 * @param templateList An NSArray* of NSData* objects containing template data to compare against.
 * @param templateType An integer representing the template type of the fingerprint templates.
 * @param error Error variable.
 */
- (int) compareTemplates:(NSData*) inputTemplate templateArray:(NSArray*) templateList templateType:(int) templateType error:(NSError**) error;

/**
 * Store a fingerprint template inside the local database.<br>
 * This function is not available on -WSQ devices as there is no local database on a -WSQ device.
 *
 * @param inputTemplate Template data for the fingerprint template to store.
 * @param templateType An integer representing the template type of the fingerprint template.
 * @param userRecord A GRGrabbaFingerprintUserRecord indicating information to be stored with the store template.
 * @param error Error variable
 */
- (void) storeTemplate:(NSData*) inputTemplate templateType:(int) templateType userRecord:(GRGrabbaFingerprintUserRecord*) userRecord error:(NSError**) error;

/**
 * Identify a fingerprint template inside the local database.<br>
 * This function is not available on -WSQ devices as there is no local database on a -WSQ device.
 *
 * @param inputTemplate Template data for the fingerprint template to store.
 * @param templateType An integer representing the template type of the fingerprint template.
 * @param error Error variable
 */
- (void) identifyTemplate:(NSData*) inputTemplate templateType:(int) templateType error:(NSError**) error;

/**
 * Obtain a UIImage from a preview, uncompressed or WSQ compressed image.
 * @param imageData Image data to be processed.
 * @param imageType Image type identifier.
 * @param numRows Number of rows in the image.
 * @param numColumns Number of columns in the image.
 */
- (UIImage*) getUIImageFromImageData:(NSData*) imageData imageType:(int) imageType numRows:(int) numRows numColumns:(int) numColumns;

/**
 * Decode WSQ compressed data into an uncompressed bitmap.
 * @param wsqData Image data to be processed.
 * @param row Number of rows in the image.
 * @param column Number of columns in the image.
 * @param error Error variable.
 */
- (NSData*) WSQ_DecodeWithData: (NSData*) wsqData andRow:(NSInteger*)row andColumn:(NSInteger*)column andError:(NSError**) error;

/**
 * Obtain a template type string from a template type identifier.
 */
+ (NSString*) getStringFromTemplateType:(int) templateType;

/**
 * Obtain an image type string from an image type identifier.
 */
+ (NSString*) getStringFromImageType:(int) imageType;

/**
 * Obtain a user message for a given user message identifier.
 */
+ (NSString*) getStringFromUserMessageType:(int) userMessageType;

@end
