//
//  GRGrabbaSmartcard.h
//  GrabbaDriver
//
//  Created by Iain McCowan on 31/05/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "GRGrabbaSmartcardDelegate.h"
#import "GRGrabbaSmartcardSession.h"

/**
 * Provides access to smartcard capabilities of an attached Grabba device.
 *
 * To receive button event, implement the delegate {@link GRGrabbaSmartcardDelegate} and set the {@link #delegate}
 */
@interface GRGrabbaSmartcard : NSObject

/**
 * The receiver's delegate or nil if it doesn't have a delegate
 */
@property (weak) id<GRGrabbaSmartcardDelegate> delegate;

/**
 * Determines if a smartcard is currently inserted into the Grabba.
 */
-(BOOL) smartcardInserted ;

/**
 * Starts a communication session with the smartcard currently inserted in the Grabba.
 */
-(GRGrabbaSmartcardSession *) startSession:(NSError**) error ;

/**
 * Determines if the currently connected Grabba supports smartcard functionality.
 */
-(BOOL) smartcardSupported ;


@end
