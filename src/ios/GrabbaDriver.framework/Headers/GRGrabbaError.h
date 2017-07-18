//
//  GRGrabbaError.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 29/04/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

/**
 * Grabba Error Domain
 */
extern NSString* const kGRGrabbaErrorDomain;
extern NSString* const kGRSagemErrorDomain;

/**
 * Grabba Error Codes
 */
enum GRGrabbaErrorCodes
{
	kGRGrabbaErrorNotOpen = -1,
	kGRGrabbaErrorNotConnected = -2,
	kGRGrabbaErrorFunctionNotSupported = -3,
	kGRGrabbaErrorIO = -4,
	kGRGrabbaErrorBusy = -5,
	kGRGRabbaErrorInvalidParemeter = -6,

	kGRGrabbaErrorSmartcard = -7,
	kGRGrabbaErrorSmartcardNotInserted = -8,
	kGRGrabbaErrorSmartcardProtocol = -9,
	kGRGrabbaErrorSmartcardNotPowered = -10,
	kGRGrabbaErrorSmartcardTimeout = -11,
	kGRGrabbaErrorSmartcardUnsupportedBaudRate = -12,

	kGRGrabbaErrorModuleNotReady = -13,
	
	kGRGrabbaErrorTimeout = -14,
	
	kGRGrabbaErrorFingerprintDatabaseFull = -15,

	kGRGrabbaErrorProxcardNoCardInField = -16 ,

	kGRGrabbaErrorPassportReadFail = -17,
    
    kGRGrabbaProxcardCollisionException = -18,
    
	kGRGrabbaErrorNoExclusiveAccess = -19,
};


