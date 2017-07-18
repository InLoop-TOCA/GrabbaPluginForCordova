//
//  GRGrabbaHIDiClassSE.h
//  GrabbaDriver
//
//  Created by ray on 17/12/2013.
//  Copyright (c) 2013 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * Provides access to the advanced HID iClass SE capabilities of an attached Grabba device.
 */
@interface GRGrabbaHIDiClassSE : NSObject

/**
 * Get an instance of this class to invoke functions.
 *
 * @return an instance of this class through which HID iCLASS SE functionality can be used.
 */
+ (GRGrabbaHIDiClassSE*) sharedInstance;

/**
 * Determines if the currently connected Grabba supports HID iCLASS SE functionality.
 *
 * @return YES if the Grabba supports HID iCLASS functions, NO otherwise.
 */
-(BOOL) isGrabbaHIDiClassSESupported;

/**
 * Power down the module. <br>
 * <br>
 * This can be called once operations are completed to save power.<br>
 */
-(void) powerDown: (NSError**) error;

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
 * Select an iClass card book number and page.
 *
 * @param bookNumber Book number to be selected.
 * @param pageNumber Page number to be selected.
 * @param error error parameter.
 * @return The content of configuration block (block 1) of the selected page.
 */
-(NSData*) iClassSelect: (int) bookNumber pageNumber: (int) pageNumber error: (NSError**) error;

/**
 * Function to authenticate with an iClass card using a debit or credit key for application area 1 or 2 respectively. <br>
 * <br>
 * A book and page must be selected before using this command.<br>
 * Keys can be stored in either permanent or volatile memory using {@see loadKey} and the OID slots for keys are as follows:<br>
 * Book 0 Page 0 App 2 = 0x03, 0x00, 0x23<br>
 * Book 0 Page 1 App 1 = 0x03, 0x00, 0x24<br>
 * Book 0 Page 1 App 2 = 0x03, 0x00, 0x25<br>
 * Book 0 Page 2 App 1 = 0x03, 0x00, 0x26<br>
 * Book 0 Page 2 App 2 = 0x03, 0x00, 0x27<br>
 * Book 0 Page 3 App 1 = 0x03, 0x00, 0x28<br>
 * Book 0 Page 3 App 2 = 0x03, 0x00, 0x29<br>
 * Book 0 Page 4 App 1 = 0x03, 0x00, 0x2A<br>
 * Book 0 Page 4 App 2 = 0x03, 0x00, 0x2B<br>
 * Book 0 Page 5 App 1 = 0x03, 0x00, 0x2C<br>
 * Book 0 Page 5 App 2 = 0x03, 0x00, 0x2D<br>
 * Book 0 Page 6 App 1 = 0x03, 0x00, 0x2E<br>
 * Book 0 Page 6 App 2 = 0x03, 0x00, 0x2F<br>
 * Book 0 Page 7 App 1 = 0x03, 0x00, 0x30<br>
 * Book 0 Page 7 App 2 = 0x03, 0x00, 0x31<br>
 * Transport iClass App 1 = 0x03, 0x00, 0x32<br>
 * Transport iClass App 2 = 0x03, 0x00, 0x33<br>
 * Book 1 Page 0 App 1 = 0x03, 0x00, 0x34
 *
 * @param isDebitKey
 *            Boolean value indicating if this key is a debit key.
 * @param keyRefOID
 *            Reference OID of the current key.
 * @param prevKeyRefOID
 *            Optional previous key reference OID<br>
 *            For use if the key is to be rolled.<br>
 *            Pass empty NSData* if unused.
 * @param error error parameter.
 */
- (void) iClassAuthenticate: (BOOL) isDebitKey keyRefOID: (NSData*) keyRefOID prevKeyRefOID: (NSData*) prevKeyRefOID error: (NSError**) error;

/**
 * Function to read a block from an iClass card. <br>
 * <br>
 * A page must first be selected and authenticated to be read successfully.<br>
 * If the card has not been authenticated, the read will result in 8 bytes of 0xFF when attempting to read encrypted blocks.
 *
 * @param blockNumber Block number to be read.
 * @param error error parameter.
 */
- (NSData*) iClassReadBlock: (int) blockNumber error: (NSError**) error;

/**
 * Function to read 4 blocks of data. <br>
 * <br>
 * A page must first be selected and authenticated to be read successfully.<br>
 * If the card has not been authenticated, the read will result in 4 blocks of 0xFF when attempting to read encrypted blocks.
 *
 * @param blockNumber First block of 4 blocks to be read.
 * @param error error parameter.
 * @return Data read from card. If the card is read beyond its boundaries, FF's will be returned.
 */
- (NSData*) iClassRead4Block: (int) blockNumber error: (NSError**) error;

/**
 * Function to write one block of data (8 bytes) to a card.
 *
 * @param blockNumber Block number to be written to.
 * @param data Data to write, must be 8 bytes.
 * @param error error parameter.
 */
- (void) iClassWriteBlock: (int) blockNumber withData: (NSData*) data error: (NSError**) error;

/**
 * Transmit a command directly to the xxx3-SE module.<br>
 *
 * <b>Warning: This command is for advanced users only. Improper use of this command can result in damaging the Grabba reader.</b><br>
 * @param rawCommand This must be a fully wrapped HID iClass SE command, ready to be sent to the module.
 * @param error Error parameter.
 * @return The module's response
 */
- (NSData*) transmitRawChannel:(NSData*) rawCommand error:(NSError**) error;

@end
