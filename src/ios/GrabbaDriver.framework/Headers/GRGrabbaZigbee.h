//
//  GRGrabbaZigbee.h
//  GrabbaDriver
//
//  Created by Grabba Developer on 11/04/12.
//  Copyright (c) 2012 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaZigbeeDelegate.h"

@interface GRGrabbaZigbee : NSObject

/**
 * The receiver's delegate or nil if it doesn't have a delegate
 */
@property (weak) id<GRGrabbaZigbeeDelegate> delegate;


/**
 * The Grabba will start to listen to the zigbee modules.
 * 
 */
-(void) open;


/**
 * The Grabba will stop to listen to the zigbee modules.
 * 
 */
-(void) close;


/**
 * The Grabba will send data out through the zigbee module
 * 
 */
-(void) send: (NSData*) data withError:(NSError**)err;


/**
 * Edit the zigbee connection information.
 *
 */
- (void) setMyID: (uint8_t)myID
            Channel:(uint8_t)channel
            PanID:(uint16_t) panID
            DestinationHigh:(uint16_t)destinationHigh
            DestinationLow:(uint16_t)destinationLow
            PowerLevel:(uint8_t)powerLevel
            GuardTime:(uint8_t)guardTime;

/**
 * Get the zigbee connection information.
 *
 */
- (void) getMyID: (uint8_t*)myID
            Channel:(uint8_t*)channel
            PanID:(uint16_t*) panID
            DestinationHigh:(uint16_t*)destinationHigh
            DestinationLow:(uint16_t*)destinationLow
            PowerLevel:(uint8_t*)powerLevel
            GuardTime:(uint8_t*)guardTime
            Error:(NSError**)error;


/**
 * Determines if the currently connected Grabba supports zigbee functionality.
 */
-(BOOL) zigbeeSupported;

/**
 * Determines if the currently connected Grabba supports 802 functionality
 */
-(BOOL) is802Supported;

@end
