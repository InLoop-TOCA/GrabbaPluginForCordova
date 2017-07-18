//
//  GRButtons.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 5/08/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaButtonsDelegate.h"


/**
 * Provides access to button capabilities of an attached Grabba device. 
 * 
 * To receive button event, implement the delegate {@link GRGrabbaButtonsDelegate} and set the {@link #delegate}
 */
@interface GRGrabbaButtons : NSObject 

/**
 * delegate
 */
@property (weak) id<GRGrabbaButtonsDelegate> delegate;

/**
 * Check the current left button state.
 */
+ (BOOL) getLeftButtonState;

/**
 * Check the current right button state.
 */
+ (BOOL) getRightButtonState;

@end
