//
//  GRGrabbaSmartcardDelegate.h
//  GrabbaDriver
//
//  Created by Iain McCowan on 31/05/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>


/**
 * The GRGrabbaSmartcardDelegate protocol defines the methods a delegate of an {@link GRGrabbaSmartcard} object should implement.<br>
 * The delegate receives notification of smartcard insertion and removal events.<br>
 * It is recommended that you manually query the card inserted state at the time of registering a delegate, since if the card was inserted previously you will not receive a SmartcardInsertedEvent.
 */
@protocol GRGrabbaSmartcardDelegate <NSObject>

@optional

/**
 * Invoked when a smartcard is inserted into the Grabba.
 */
- (void) smartcardInsertedEvent;

/**
 * Invoked when a smartcard is removed from the Grabba.
 */
- (void) smartcardRemovedEvent;


@end
