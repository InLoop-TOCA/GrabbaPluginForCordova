//
//  GRGrabbaProxcardPrefs.h
//  GrabbaDriver
//
//  Created by Iain McCowan on 15/07/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaSymbologyPref.h"
#import "GRGrabbaPreferencesProtocol.h"
#import "GRGrabbaProxcardUHFPrefs.h"


/**
 * Provides access to Proxcard Symbology related preferences of the Grabba driver
 */

@interface GRGrabbaProxcardSymbologyPreferences : NSObject <GRGrabbaPreferencesProtocol>
{
    
	GRGrabbaSymbologyPref* iClass;
	GRGrabbaSymbologyPref* mifare;
    GRGrabbaSymbologyPref* mifare4K;
	GRGrabbaSymbologyPref* mifareUl;
	GRGrabbaSymbologyPref* mifareProx;
	GRGrabbaSymbologyPref* sle55rxx;
	GRGrabbaSymbologyPref* sle66cl1605;
	GRGrabbaSymbologyPref* iCode;
	GRGrabbaSymbologyPref* iCodeSli;
	GRGrabbaSymbologyPref* tagit;
	GRGrabbaSymbologyPref* tagitHfi;
	GRGrabbaSymbologyPref* iCodeEpc;
	GRGrabbaSymbologyPref* iCodeUid;
	GRGrabbaSymbologyPref* iso15693;
	GRGrabbaSymbologyPref* lri512;
	GRGrabbaSymbologyPref* srf55vxxp;
	GRGrabbaSymbologyPref* srf55vxxs;
	GRGrabbaSymbologyPref* tempSense;
	GRGrabbaSymbologyPref* sr176;
	GRGrabbaSymbologyPref* felica;
	GRGrabbaSymbologyPref* em4x02;
	GRGrabbaSymbologyPref* em4x05;
	GRGrabbaSymbologyPref* em4x50;
	GRGrabbaSymbologyPref* hiTag1;
	GRGrabbaSymbologyPref* hiTag2;
	GRGrabbaSymbologyPref* q5;
	GRGrabbaSymbologyPref* hidProx;
	GRGrabbaSymbologyPref* iso14443A;
    GRGrabbaSymbologyPref* iso14443B;
	GRGrabbaSymbologyPref* iClassProgrammedID;
    GRGrabbaSymbologyPref* iClassSEHIDCorporate1000;
	GRGrabbaSymbologyPref* iClassSEReadProgrammedIDandCSN;
    GRGrabbaSymbologyPref* tiRFID;
}

@property (strong) GRGrabbaSymbologyPref* iClass;
@property (strong) GRGrabbaSymbologyPref* mifare;
@property (strong) GRGrabbaSymbologyPref* mifare4K;
@property (strong) GRGrabbaSymbologyPref* mifareUl;
@property (strong) GRGrabbaSymbologyPref* mifareProx;
@property (strong) GRGrabbaSymbologyPref* sle55rxx;
@property (strong) GRGrabbaSymbologyPref* sle66cl1605;
@property (strong) GRGrabbaSymbologyPref* iCode;
@property (strong) GRGrabbaSymbologyPref* iCodeSli;
@property (strong) GRGrabbaSymbologyPref* tagit;
@property (strong) GRGrabbaSymbologyPref* tagitHfi;
@property (strong) GRGrabbaSymbologyPref* iCodeEpc;
@property (strong) GRGrabbaSymbologyPref* iCodeUid;
@property (strong) GRGrabbaSymbologyPref* iso15693;
@property (strong) GRGrabbaSymbologyPref* lri512;
@property (strong) GRGrabbaSymbologyPref* srf55vxxp;
@property (strong) GRGrabbaSymbologyPref* srf55vxxs;
@property (strong) GRGrabbaSymbologyPref* tempSense;
@property (strong) GRGrabbaSymbologyPref* sr176;
@property (strong) GRGrabbaSymbologyPref* felica;
@property (strong) GRGrabbaSymbologyPref* em4x02;
@property (strong) GRGrabbaSymbologyPref* em4x05;
@property (strong) GRGrabbaSymbologyPref* em4x50;
@property (strong) GRGrabbaSymbologyPref* hiTag1;
@property (strong) GRGrabbaSymbologyPref* hiTag2;
@property (strong) GRGrabbaSymbologyPref* q5;
@property (strong) GRGrabbaSymbologyPref* hidProx;
@property (strong) GRGrabbaSymbologyPref* iso14443A;
@property (strong) GRGrabbaSymbologyPref* iso14443B;
@property (strong) GRGrabbaSymbologyPref* iClassProgrammedID;
@property (strong) GRGrabbaSymbologyPref* iClassSEHIDCorporate1000;
@property (strong) GRGrabbaSymbologyPref* iClassSEReadProgrammedIDandCSN;
@property (strong) GRGrabbaSymbologyPref* tiRFID;

@end

/**
 * Provides access to Proxcard related preferences of the Grabba driver
 */

@interface GRGrabbaProxcardPrefs : NSObject  <GRGrabbaPreferencesProtocol>
{
    GRGrabbaProxcardSymbologyPreferences *symbologyPrefs;
    GRGrabbaProxcardUHFPrefs *uhf;
}

/** symbology */
@property (strong) GRGrabbaProxcardSymbologyPreferences *symbologyPrefs;
/** vibrateOnScan */
@property BOOL vibrateOnScan;
/** beepOnScan */
@property BOOL beepOnScan;
/** scanTimeout */
@property NSInteger scanTimeout;
/** iClass read programmed ID */
@property BOOL iClass_readProgrammedID;
/** iClass format programmed ID into standard 26-bit wiegand */
@property BOOL iClass_formatIdAs26BitWiegand;

/** Convert corporate 1000 cards **/
@property BOOL iClassSE_HIDCorporate1000;

/** iClass SE read Programmed ID and CSN */
@property BOOL iClassSE_readProgrammedIDandCSN;

@property BOOL EM4x05_removeLeadingZero;

@property BOOL ISO14443A;
@property BOOL ISO14443B;
@property BOOL ISO15693;
@property BOOL ICLASSCSN;

/** Contactless payment - accept non-payment card */
@property BOOL contactlessPaymentAcceptNonPayment;

/** uhf */
@property (strong) GRGrabbaProxcardUHFPrefs * uhf;

@end


