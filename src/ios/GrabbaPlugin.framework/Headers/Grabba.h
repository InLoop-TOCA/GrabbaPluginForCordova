//
//  Grabba.h
//  GrabbaPlugin
//
//  Created by rc on 10/09/2014.
//  Copyright (c) 2014 Grabba International Pty Ltd. All rights reserved.
//

#import "GrabbaCordovaInterface.h"
#import <Cordova/CDV.h>
#import <GrabbaDriver/GrabbaDriver.h>

@interface Grabba : NSObject <GrabbaCordovaInterface, GRGrabbaButtonsDelegate, GRGrabbaDelegate>
+(Grabba*) sharedInstance;
+ (NSError*) createInvalidPreferenceError;
- (void) handleOnResume;
- (void) handleOnPause;

- (BOOL) execute:(NSString*) function command:(CDVInvokedUrlCommand*) command;
@end
