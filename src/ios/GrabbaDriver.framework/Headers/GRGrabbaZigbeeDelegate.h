//
//  GRGrabbaZigbeeDelegate.h
//  GrabbaDriver
//
//  Created by Grabba Developer on 10/04/12.
//  Copyright (c) 2012 Grabba International. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol GRGrabbaZigbeeDelegate <NSObject>

/**
 * Sent to the delegate when zigbee module opens and starts listening
 *
 */
- (void) zigbeeDidOpen;

/**
 * Sent to the delegate when zigbee module closes and stops listening
 *
 */
- (void) zigbeeDidClose;

/**
 * Sent to the delegate when zigbee module receives data.
 *
 */
- (void) zigbeeDidReceiveData:(NSData*) data;

/**
 * Sent to the delegate when zigbee module returns error.
 *
 */
- (void) zigbeeDidFailWithError:(NSError*) error;


@end