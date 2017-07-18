//
//  GRGrabbaIClass.h
//  GrabbaDriver
//
//  Created by Grabba Developer on 11/08/11.
//  Copyright (c) 2011 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * Provides access to HID iClass capabilities of an attached Grabba device.
 */
@interface GRGrabbaHIDiClass : NSObject

/**
 * Get an instance of this class to invoke functions.
 * 
 * @return an instance of this class through which HID iCLASS functionality can be used.
 */
+ (GRGrabbaHIDiClass*) sharedInstance;

/**
 * Determines if the currently connected Grabba supports HID iCLASS functionality.
 * 
 * @return YES if the Grabba supports HID iCLASS functions, NO otherwise.
 */
-(BOOL) isGrabbaHIDiClassSupported;

/**
 * Turn off power to the iClass reader when it is no longer in use.
 *  
 */
-(BOOL) powerdown:(NSError**) error;

/**
 * Select an iCLASS card in the field, with optional authentication.  it cannot be called on the event thread.
 *
 * @param authentication Pass 0 for no authentication, 1 to authenticate with Block 3 (application area 1), or 2 to authenticate with block 4 (application area 2).
 * @param cardType Pass 0 for both types of card, 1 for iClass card and 2 for mifare classic card
 * @param error return error message if there is any.  Nil otherwise.
 * @return The selected card's 8-byte card serial number
 */
-(NSData*) selectCard :(int)authentication : (int)cardType : (NSError **)error;

/**
 * Select a key inside the iClass reader to become the current key used for authentication.  It cannot be called on the event thread.
 * 
 * @param keySlot A number between 1 and 16 inclusive, the key to select as the current key.
 * @param error return error message if there is any.  Nil otherwise.
 *  
 */
-(void) selectReaderKey :(int) keySlot : (NSError **)error;

/**
 * Load a new key into a specified key slot in the iClass reader.  It cannot be called on the event thread. 
 * 
 * @param keySlot A number between 1 and 16 inclusive - the destination of the new loaded key.
 * @param key 8 byte array - the new 64bit key to load.
 * @param error return error message if there is any.  Nil otherwise.
 *  
 */
-(void) loadKey :(int)keySlot : (NSData*)key : (NSError **)error;

/**
 * Read a block from the currently selected iClass card.  It cannot be called on the event thread.
 * You should first authenticate with the correct application area before reading block data.
 * 
 * @param blockAddress The block to read data from.
 * @param error return error message if there is any.  Nil otherwise.
 * @return 8 bytes of data read from the given block.
 *  
 */
-(NSData*) readBlock :(int) blockAddress : (NSError **)error;

@end
