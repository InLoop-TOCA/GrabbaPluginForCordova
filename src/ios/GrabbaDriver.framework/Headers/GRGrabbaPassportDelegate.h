//
//  GRGrabbaPassportDelegate.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 22/12/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * The <VAR>GRGrabbaPassportDelegate</VAR> protocol defines the methods a delegate of an {@link GRGrabbaPassport}
 * object should implement. The delegate implements the events related to passport swipiing including 
 * the collected passport data.
 *
 */
@protocol GRGrabbaPassportDelegate  <NSObject> 


@optional

/**
 * Sent to the delegate when a passport is successfully swiped.
 * 
 * @param passportString The actual raw passport data collected.
 */
- (void) passportDidReceiveDataString: (NSString*) passportString;

/**
 * Sent to the delegate when a passport is successfully swiped.
 * 
 * @param passportString The actual formatted passport data collected
 */
- (void) passportDidReceiveFormattedDataString: (NSString*) passportString;

/**
 * Sent to the delegate when a passport is failed to swipe.
 * 
 * @param error Swipe error.
 */
- (void) passportDidFailWithError:(NSError*) error;

@end
