
#import <Foundation/Foundation.h>

#import "GRGrabbaProxcardDelegate.h"
#import "GRGrabbaMifare.h"
#import "GRGrabbaDesfire.h"
#import "GRGrabbaContactlessPayment.h"
#import "GRGrabbaHIDiClass.h"
#import "GRGrabbaHIDiClassSE.h"
#import "GRGrabbaUHF.h"

#define	PROXCARD_TYPE_UNKNOWN  -1
#define	PROXCARD_TYPE_ICLASS 0

#define	PROXCARD_TYPE_MIFARE  1
#define	PROXCARD_TYPE_MIFARE4K  2
#define	PROXCARD_TYPE_MIFAREUL  3
#define	PROXCARD_TYPE_MIFAREPROX  4

#define	PROXCARD_TYPE_SLE55RXX  5
#define	PROXCARD_TYPE_SLE66CL160S  6

#define	PROXCARD_TYPE_ICODE  7
#define	PROXCARD_TYPE_ICODESLI  8
#define	PROXCARD_TYPE_TAGIT  9
#define	PROXCARD_TYPE_TAGITHFI  10
#define	PROXCARD_TYPE_ICODEEPC  11
#define	PROXCARD_TYPE_ICODEUID  12
#define	PROXCARD_TYPE_ISO15693  13

#define	PROXCARD_TYPE_LRI512  14
#define	PROXCARD_TYPE_SRF55VXXP  15
#define	PROXCARD_TYPE_SRF55VXXS  16
#define	PROXCARD_TYPE_TEMPSENSE  17
#define	PROXCARD_TYPE_SR176 18
#define	PROXCARD_TYPE_FELICA  19

#define	PROXCARD_TYPE_EM4X02  20
#define	PROXCARD_TYPE_EM4X05  21
#define	PROXCARD_TYPE_EM4X50  22
#define	PROXCARD_TYPE_HITAG1  23
#define	PROXCARD_TYPE_HITAG2  24
#define	PROXCARD_TYPE_Q5  25

#define	PROXCARD_TYPE_HIDPROX  26

#define	PROXCARD_TYPE_ISO14443A  27
#define	PROXCARD_TYPE_ISO14443B  28
#define	PROXCARD_TYPE_ISO14443C  29

#define PROXCARD_TYPE_ICLASS_PROGRAMMED_ID 30

#define PROXCARD_TYPE_TIRFID 31

#define PROXCARD_TYPE_ICLASS_PROGRAMMED_26BIT_WIEGAND_ID 32

#define PROXCARD_TYPE_UHF 33

#define PROXCARD_TYPE_DESFIRE 34

#define PROXCARD_TYPE_HDX 35
#define PROXCARD_TYPE_FDXB 36

#define PROXCARD_TYPE_SATO_PJM 37

/**
 * Provides access to proxcard/RFID capabilities of an attached Grabba device.
 * 
 * To scan a proxcard implement the delegate {@link GRGrabbaProxcardDelegate} and set the {@link #delegate}, then call {@link #trigger} and pass true to begin scanning.
 */
@interface GRGrabbaProxcard : NSObject 


/**
 * The receiver's delegate or nil if it doesn't have a delegate
 */
@property (weak) id<GRGrabbaProxcardDelegate> delegate;

/**
 * Obtain an instance of the Grabba Desfire object for Desfire specific functions.
 */
- (GRGrabbaDesfire*) desfire;

/**
 * Obtain an instance of the Grabba Mifare object for Mifare specific functions.
 */
- (GRGrabbaMifare*) mifare;

/**
 * Obtain an instance of the Grabba Contactless payments object for contactless payments specific functions.
 */
- (GRGrabbaContactlessPayment *)contactlessPayment;

/**
 * Obtain an instance of the Grabba iClass object for iClass specific functions.
 */
- (GRGrabbaHIDiClass*) iClass;

/**
 * Obtain an instance of the Grabba iClass SE object for iClass SE specific functions.
 */
- (GRGrabbaHIDiClassSE*) iClassSE;

/**
 * Obtain an instance of the Grabba UHF object for UHF specific functions.
 */
- (GRGrabbaUHF*) UHF;

/**
 * Starts proxcard scanning.
 * 
 * The proxcard module will attempt to read a card/tag until successful or the time limit set in the preferences expires
 * 
 
 * @see GRGrabbaProcardDelegate
 */
- (void) trigger;

/**
 * Stops proxcard scanning.
 *
 * The proxcard module will stop attempting to read cards/tags.
 *
 * @see GRGrabbaProxcardDelegate
 */
- (void) triggerStop;

/**
 * Determines if the currently connected Grabba supports proxcard/RFID functionality.
 */
-(BOOL) proxcardSupported ;

/**
 * Formats proxcard number as string.
 */
- (NSString *) formatAsString:(NSData *)serialNumber ;


/**
 * Returns a display string for a given proxcard type
 */
- (NSString*) stringForProxcardType:(NSInteger) proxType;


@end

