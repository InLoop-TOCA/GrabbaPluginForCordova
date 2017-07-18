//
//  GRGrabbaDesfire.h
//  GrabbaDriver
//
//  Created by rc on 17/09/2014.
//  Copyright (c) 2014 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface GRGrabbaDesfire : NSObject

/**
 * Determines if the currently connected Grabba supports DESFIRE functionality.<br>
 *
 * @return YES if the Grabba supports GrabbaDesfire functions, NO otherwise.
 */
- (BOOL) isGrabbaDesfireSupported;

/**
 * Get an instance of this class to invoke functions.
 *
 * @return an instance of this class through which GrabbaDesfire functionality can be used.
 */
+ (GRGrabbaDesfire*) sharedInstance;

/**
 * Function to load user keys. <br>
 * <br>
 * These keys are used with iClass, Mifare and Desfire card commands.<br>
 * Keys can be stored in either permanent or volatile memory and the OID slots for keys are as follows:<br>
 * Book 0 Page 0 App 2 = 0x03, 0x00, 0x23<br>
 * Book 0 Page 1 App 1 = 0x03, 0x00, 0x23<br>
 * Book 0 Page 1 App 2 = 0x03, 0x00, 0x24<br>
 * Book 0 Page 2 App 1 = 0x03, 0x00, 0x25<br>
 * Book 0 Page 2 App 2 = 0x03, 0x00, 0x26<br>
 * Book 0 Page 3 App 1 = 0x03, 0x00, 0x27<br>
 * Book 0 Page 3 App 2 = 0x03, 0x00, 0x28<br>
 * Book 0 Page 4 App 1 = 0x03, 0x00, 0x29<br>
 * Book 0 Page 4 App 2 = 0x03, 0x00, 0x2A<br>
 * Book 0 Page 5 App 1 = 0x03, 0x00, 0x2B<br>
 * Book 0 Page 5 App 2 = 0x03, 0x00, 0x2C<br>
 * Book 0 Page 6 App 1 = 0x03, 0x00, 0x2D<br>
 * Book 0 Page 6 App 2 = 0x03, 0x00, 0x2E<br>
 * Book 0 Page 7 App 1 = 0x03, 0x00, 0x2F<br>
 * Book 0 Page 7 App 2 = 0x03, 0x00, 0x30<br>
 * Transport iClass App 1 = 0x03, 0x00, 0x32<br>
 * Transport iClass App 2 = 0x03, 0x00, 0x33<br>
 * Book 1 Page 0 App 1 = 0x03, 0x00, 0x34
 *
 * @param isPersistent Flag to indicate if key is persistent or volatile.<br> <b>Warning: Setting this to true will permanently alter the keys stored on your device</b>
 * @param keyRefOID Key reference OID of user key (3 bytes, starting with 0x03 0x00)<br>
 * @param keyValue Optional value of key.<br> Used when updating or loading keys<br> Pass an empty NSData* if unused.
 * @param error error parameter.
 */
- (void) loadKey: (BOOL) isPersistent keyRefOID: (NSData*) keyRefOID keyValue: (NSData*)keyValue error: (NSError**) error;


/**
 * Perform anti-collision and select a HF card in the RF field.<br>
 * Subsequent calls to this function will attempt to select the next card in the field.<br>
 * Please note that when using S-XXX3-SE devices, scanning a HF card using GRGrabbaProxcard is functionally equivalent to this function.
 *
 * @return the CSN of the card selected.
 */
- (NSData*) desfireSelectCard:(NSError**) error;

/**
 * Select a pre-existing application on a MIFARE DESFire card.
 *
 * @param appID The application ID to be selected (3 bytes).
 * @param error error parameter.
 */
- (void) desfireSelectApp:(NSData*) appID error:(NSError**)error;

/**
 * Authenticate with a MIFARE DESFire card.
 *
 * @param keyNumber The number of the key to be used in authentication (Application key or master key of the MIFARE DESFire card).
 * @param keyRefOID Key reference OID of user key (3 bytes, starting with 0x03 0x00)<br>See loadKey function for details.
 * @param keyDivAlgo Optional key diversification algorithm. Algorithms available are as follows:<br>
 * NONE = 0x00<br>
 * 1 key triple DES = 0x01 (Loaded key must be 16 bytes)<br>
 * 2 key triple DES = 0x02 (Loaded key must be 16 bytes)<br>
 * 3 key triple DES = 0x03 (Loaded key must be 24 bytes)<br>
 * Set to 0x04 or higher if unspecified (initValue will also be unused).
 * @param initValue Optional initial value used for the diversification algorithm (8 bytes minimum).<br>If this is absent, the keyNumber concatenated with the 7-byte card UID is used as the initial value.
 * @param isISO Set to false if using backwards compatible Native communications (for use with MIFARE DESFire v0.6 or EV1 cards) or set to true for ISO communication (for use with MIFARE DESFire EV1 cards).
 * @param authAlgorithm Algorithm to be used in authentication when communicating in ISO mode (isISO must be set to true). Algorithms available are as follows:<br>
 * 2 Key triple DES = 0x02 (Loaded key must be 16 bytes)<br>
 * 3 Key triple DES = 0x04 (Loaded key must be 24 bytes)<br>
 * AES = 0x09 (Loaded key must be 16 bytes)
 * @param error error parameter.
 */
- (void) desfireAuthenticate: (uint8_t) keyNumber keyRefOID: (NSData*) keyRefOID keyDivAlgorithm:(uint8_t) keyDivAlgo initValue:(NSData*) initValue isISO:(BOOL) isISO authAlgorithm:(uint8_t) authAlgorithm error:(NSError**)error;

/**
 * Read data from the Mifare DESFire card.
 *
 * @param fileNumber Number of the file to be read (0x00 to 0x0F).
 * @param fileOffset Offset into the file to start reading.
 * @param readLength Length of data to be read (Limited to a maximum of 255 bytes).
 * @param commMode Communication mode of the read operation. Modes available are as follows:<br>
 * Plain = 0x00<br>
 * Verify MAC/CMAC = 0x01<br>
 * Encrypted = 0x03 (Decrypt and verify CRC16/CRC32).
 * @param error error parameter.
 */
- (NSData*) desfireReadData: (uint8_t) fileNumber fileOffset:(int) fileOffset readLength:(int) readLength commMode:(uint8_t) commMode error:(NSError**)error;

/**
 * Write data to the MIFARE DESFire card.
 *
 * @param fileNumber Number of the file to be read (0x00 to 0x0F).
 * @param fileOffset Offset into the file to start writing.
 * @param data File data to be written.
 * @param commMode Communication mode of the read operation. Modes available are as follows:<br>Plain = 0x00<br>Verify MAC/CMAC = 0x01<br>Encrypted = 0x03 (Decrypt and verify CRC16/CRC32).
 * @param commitFlag Boolean flag indicating if the data should be committed (only relevant for backup files).
 * @param error Error variable.
 */
- (void) desfireWriteData: (uint8_t) fileNumber fileOffset:(int) fileOffset data:(NSData*) data commMode:(uint8_t) commMode commit:(BOOL) commitFlag error:(NSError**) error;

/**
 * Power down the module. <br>
 * <br>
 * This can be called once operations are completed to save power.<br>
 */
-(void) powerDown: (NSError**) error;

@end
