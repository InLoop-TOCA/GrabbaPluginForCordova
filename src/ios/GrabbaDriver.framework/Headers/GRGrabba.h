
#import <Foundation/Foundation.h>

#import "GRGrabbaDelegate.h"

#import "GRGrabbaMagstripe.h"
#import "GRGrabbaProxcard.h"
#import "GRGrabbaBarcode.h"
#import "GRGrabbaSmartcard.h"
#import "GRGrabbaPreferences.h"
#import "GRGrabbaFingerprint.h"
#import "GRGrabbaButtons.h"
#import "GRGrabbaPassport.h"
#import "GRGrabbaSignatureCapture.h"
#import "GRGrabbaZigbee.h"

#import "GRGrabbaError.h"

/**
 * Provides access to an attached Grabba peripheral. 
 * 
 * To get an instance of the Grabba class, you must call the static function {@link #sharedGrabba}. 
 * 
 * In order to get notification when the Grabba is attached or detached, implement the delegate {@link GRGrabbaDelegate} 
 * 
 * You can also call {@link #connected} to determine if the grabba is connected at any time - it is recommended you do this when your screen using the Grabba first starts to get the correct connected state.
 * 
 * Once the grabba is connected you can access its functionality through one of the various technology fields: {@link #barcode}, {@link #magstripe} and {@link #proxcard}. You can also find out if the connected grabba supports a certain technology by using the function provided through these fields.
 * 
 * You should call {@link #close} when your program exits or you are not going to use the grabba functionality again.
 * 
 * If you have any questions please don't hesitate to seek help at <a href="mailto:support@grabba.com">support@grabba.com</a>.
 * 
 */
@interface GRGrabba: NSObject
{
	
	@private
	
	BOOL opened_;

	NSString* serialNumber_;
	
	GRGrabbaPreferences* preferences_;
	GRGrabbaMagstripe* magstripe_;
	GRGrabbaProxcard* proxcard_;
	GRGrabbaBarcode* barcode_;
	GRGrabbaSmartcard* smartcard_;
	GRGrabbaFingerprint* fingerprint_;
	GRGrabbaButtons* buttons_;
	GRGrabbaPassport* passport_;
    GRGrabbaSignatureCapture* signatureCapture_;
    GRGrabbaZigbee* zigbee_;
}

/**
 * Use this to get the shared instance of the Grabba driver.
 */
+ (GRGrabba*) sharedGrabba;

/**
 * preferences
 */
@property (nonatomic, readonly) 	GRGrabbaPreferences	*preferences;


/**
 * delegate
 */
@property (weak) id<GRGrabbaDelegate> delegate;


/**
 * Determines if a Grabba is connected to the iPhone
 * 
 * @return YES indicates a Grabba is attached to the iPhone, NO otherwise.
 */
@property (readonly, assign) BOOL connected;

/** 
 * Determines if the Grabba driver is open
 *
 * @return YES indicates is open, NO otherwise
 */
@property (readonly, assign) BOOL opened;

/**
 * Provides access to magstripe reading functions.
 */
@property (strong,readonly)   GRGrabbaMagstripe *			magstripe;

/**
 * Provides access to proxcard serial number scanning and contactless smartcard protocols.
 */
@property (strong,readonly)   GRGrabbaProxcard *			proxcard;

/**
 * Provides access to barcode scanning functions.
 */
@property (strong,readonly)	  GRGrabbaBarcode*			barcode;

/**
 * Provides access to smartcard functions.
 */
@property (strong,readonly)	  GRGrabbaSmartcard*			smartcard;

/**
 * Provides access to fingerprint functions.
 */
@property (strong,readonly)	  GRGrabbaFingerprint*			fingerprint;

/**
 * Provides access to button functions.
 */
@property (strong,readonly)	  GRGrabbaButtons*			buttons;

/**
 * Provides access to passport functions.
 */
@property (strong,readonly)	  GRGrabbaPassport*			passport;

/**
 * Provides access to signature capture functions.
 */
@property (strong,readonly)	  GRGrabbaSignatureCapture*			signatureCapture;

/**
 * Provides access to zigbee functions.
 */
@property (strong,readonly)	  GRGrabbaZigbee*			zigbee;


/**
 * Returns the Grabba driver version.
 * 
 * @return The driver version in the form vX.Y.Z
 */
@property (readonly,copy) NSString* driverVersion;


/**
 * Returns the Grabba firmware version.
 *
 * @return The firmware version in the form vX.Y.Z or "Not connected"
 */
@property (readonly, copy) NSString* grabbaFirmwareVersion;

/**
 * Returns the connected Grabba's hardware version.
 *
 * @return The hardware version in the form X.Y or "Not connected"
 */
@property (readonly, copy) NSString* grabbaHardwareVersion;

/**
 * Returns the connected Grabba's hardware version in a pretty string format
 *
 * @return The hardware version in human readable format or "Not connected"
 */
@property (readonly, copy) NSString* grabbaHardwareVersionDescription;


/**
 * Returns the Model number of the currently connected Grabba.
 * 
 * @return The Grabba model or nil if Grabba not connected
 */
@property (readonly,copy) NSString* model;

/**
 * Returns the iOS Platform of the current UIDevice. Sometimes called Model ID.
 * 
 * @return String of a the current iOS platform, eg iPhone2,1
 */
@property (readonly,copy) NSString* platform;

/**
 * Returns the iOS Platform of the current UIDevice in readable string.
 * 
 * @return String of a the current iOS platform, eg ipod touch 4G
 */
@property (readonly,copy) NSString* platformString;



/**
 * Returns the serial number of the currently connected Grabba.
 * 
 * @return The the serial number or nil if Grabba not connected
 */
@property (readonly,copy) NSString* serialNumber;


/**
 * Returns the level of the connected Grabba's built in battery, in percent.
 * 
 * @return The battery level in percent (0-100) or 0 if Grabba not connected
 */
- (NSInteger) batteryLevel;	

/**
 * Starts a new session grabba driver.
 * 
 * @return A Grabba object.
 */
- (void) open;

/**
 * Closes the current session with the grabba driver.
 */
- (void) close;

@end
