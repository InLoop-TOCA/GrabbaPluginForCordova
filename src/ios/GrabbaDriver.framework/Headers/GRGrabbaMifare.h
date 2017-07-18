//
//  GRGrabbaMifare.h
//  GrabbaDriver
//
//  Created by Iain McCowan on 12/07/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
@class GRProxcardPhilips ;

/**
* Provides access to Mifare capabilities of an attached Grabba device.
*/
@interface GRGrabbaMifare : NSObject {
	NSData *		selectedCardUID ;
}

/**
 * Determines if the currently connected Grabba supports Mifare functionality.<br>
 *
 * @return YES if the Grabba supports GrabbaMifare functions, NO otherwise.
 */
- (BOOL) isGrabbaMifareSupported;

/**
 * Get an instance of this class to invoke functions.
 *
 * @return an instance of this class through which GrabbaMifare functionality can be used.
 */
+ (GRGrabbaMifare*) sharedInstance;

/**
 * Function to load user keys (for x003-SE devices only).<br>
 * Please refer to mifareMutualAuth for x002 key mechanisms. <br>
 * <br>
 * <br>
 * <b>For x003-SE devices:</b><br>
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
- (void) loadKey: (BOOL) isPersistent keyRefOID:(NSData*) keyRefOID keyValue:(NSData*) keyValue error: (NSError**) error;

/**
 * Perform anti-collision and select a HF card in the RF field.<br>
 * Subsequent calls to this function will attempt to select the next card in the field.<br>
 * Please note that when using S-XXX3-SE devices, scanning a HF card using GRGrabbaProxcard is functionally equivalent to this function.
 *
 * @return the CSN of the card selected.
 */
- (NSData*) mifareSelectCard: (NSError**) error;

/**
 * Retrieve a random value from the Mifare card.<br>
 * This command is only for Mifare Classic cards and a Mifare card must first be selected before use on x003-SE devices.<br>
 * <br>
 * Not required by x002 devices. <br>
 * On first authentication, authenticated must be false. A successful request returns 4 bytes of a plain random number + 0xFF.<br>
 * Subsequent requests should set authenticated to true if authenticated for an encrypted response.
 *
 * @param blockIndex Index of block to be authenticated (1 byte)<br>
 * @param keyType Type of key to be used for authentication<br> MIFARE key A = 0<br> MIFARE key B = 1<br> Unused = any other value
 * @param authenticated Boolean value indicating if currently authenticated.
 * @param error error parameter.
 *
 * @return 4 bytes and 0xFF if unauthenticated, 5 bytes if authenticated.
 */
- (NSData*) mifareGetRandom: (int) blockIndex keyType:(int) keyType authenticated: (BOOL) authenticated error: (NSError**) error;

/**
 * Function to read data from a MIFARE card. <br>
 * <br>
 * <b>For x002 devices:</b><br>
 * The parameters readLength, requestMAC and requestEncryption do not apply to Mifare classic cards.<br>
 * <br>
 * <br>
 * <b>For x003-SE devices:</b><br>
 * The parameters for requestMAC and requestEncryption are only applicable to MIFARE plus cards.<br>
 * On MIFARE Plus 'S' cards, the returned data will always be encrypted and include a MAC.
 *
 * @param blockIndex Index of block to begin reading.<br> Valid range is 0-255 but may be limited by the memory available on the card.
 * @param readLength Number of blocks to read<br> Valid range is 0-15 blocks, resulting in 0 to 240 bytes returned.<br> This parameter does not apply to MIFARE Classic cards<br> Pass 0 if unused.
 * @param requestMAC Set to true to request a MAC for message integrity on MIFARE plus cards.<br> This incurs a small increase in processing time and is always true for MIFARE plus 'S' cards.
 * @param requestEncryption Set to true to request read encryption on MIFARE plus cards.<br> This incurs a small increase in processing time and is always true for MIFARE plus 'S' cards.
 * @param error error parameter.
 * @return 16 to 240 bytes of data.
 */
- (NSData*) mifareReadBlock: (int) blockIndex readLength:(int) readLength requestMAC:(BOOL) requestMAC requestEncryption:(BOOL) requestEncryption error:(NSError**) error;

/**
 * Perform mutual authentication with a MIFARE card. <br>
 * <b>For x002 devices:</b><br>
 * keyRefOID is the 6 byte MIFARE key<br>
 * The randomNumber is unused.<br>
 * blockIndex is the block to be authenticated.<br>
 * keyType should be set to 0 for Key A and 1 for Key B.<br>
 * <br>
 * <br>
 * <b>For x003-SE devices:</b><br>
 * This command can be used with both MIFARE Classic and MIFARE Plus cards.<br>
 * The parameter randomNumber is required for MIFARE classic cards.<br>
 * The parameters blockIndex and keyType are required for MIFARE plus cards.<br>
 * Keys can be stored in either permanent or volatile memory using {@see loadKey} and the OID slots for keys are as follows:<br>
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
 * @param keyRefOID <b>For x002 devices:</b><br> This must be the 6 byte key for the Mifare card.<br> <b>For x003-SE devices:</b><br> This is the OID key reference and the first byte must be 0x03.
 * @param randomNumber <b>Unused for x002 devices.</b><br> <b>For x003-SE devices:</b><br> 5 bytes of a random number retrieved from the card.<br> Optional, only required for MIFARE classic authentication.<br> Pass empty NSData* if unused.
 * @param blockNumber Index of block to be authenticated.<br> <b>For x003-SE devices:</b><br> Pass -1 if unused.
 * @param keyType Type of key to be used for authentication<br> Pass any value other than 0 or 1 if unused.<br> MIFARE key A = 0<br> MIFARE key B = 1
 * @param error error parameter.
 */
- (void) mifareMutualAuth: (NSData*) keyRefOID randomNumber: (NSData*) randomNumber blockNumber: (int) blockNumber keyType: (int) keyType error: (NSError**) error;

/**
 * Send a command to halt the MIFARE card.
 *
 */
- (void) mifareHalt: (NSError**) error;

/**
 * Write data to a MIFARE card. <br>
 * <b>For x002 devices:</b><br>
 * The requestMac and requestEncryption parameters are unused.<br>
 * <br>
 * <b>For x003-SE devices:</b><br>
 * This command can be used with both MIFARE Classic and MIFARE Plus cards. <br>
 *
 * The parameters requestMAC and requestEncryption are only applicable for MIFARE plus cards.<br>
 * For MIFARE Classic cards, blockData must be 16 bytes (1 block).<br>
 * For MIFARE plus, it is possible for blockData to be 16, 32 or 48 blocks.<br>
 * <br>
 * Write commands to MIFARE Plus cards always include a MAC.<br>
 * Encryption on Mifare Plus 'S' cards are only supported by certain blocks - refer to the card specifications for further details.
 *
 * @param blockIndex block index to write to.
 * @param blockData Block data to write.
 * @param requestMAC Set to true to request a MAC for message integrity on MIFARE plus cards.<br> This incurs a small increase in processing time and is always true for MIFARE plus 'S' cards.
 * @param requestEncryption Set to true to request read encryption on MIFARE plus cards.<br> This incurs a small increase in processing time and is always true for MIFARE plus 'S' cards.
 * @param error error parameter.
 */
- (void) mifareWriteBlock: (int) blockIndex blockData: (NSData*) blockData requestMAC: (BOOL) requestMAC requestEncryption: (BOOL) requestEncryption error:(NSError**) error;

/**
 *  Power down the module.
 *
 * This can be called once operations are complete to save power.
 */
- (void) powerdown:(NSError **)error;

@end

