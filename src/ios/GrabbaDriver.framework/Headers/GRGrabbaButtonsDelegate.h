//
//  GRGrabbaButtonsDelegate.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 5/08/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <UIKit/UIKit.h>

/**
 * Grabba Button Delegate 
 * 
 */
@protocol GRGrabbaButtonsDelegate  <NSObject>

@optional

/**
 * Invoked when the left hardware button is pressed or released. (Buttons may not be available on all grabba models).
 */
- (void) buttonsLeftDidChangeState: (BOOL) isPressed;

/**
 * Invoked when the right hardware button is pressed or released. (Buttons may not be available on all grabba models).
 */
- (void) buttonsRightDidChangeState: (BOOL) isPressed;

@end
