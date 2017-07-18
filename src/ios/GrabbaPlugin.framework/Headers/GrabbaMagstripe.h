//
//  GrabbaMagstripe.h
//  GrabbaPlugin
//
//  Created by rc on 24/10/2014.
//  Copyright (c) 2014 Grabba International Pty Ltd. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GrabbaCordovaInterface.h"
#import <Cordova/CDV.h>
#import <GrabbaDriver/GrabbaDriver.h>

@interface GrabbaMagstripe : NSObject <GrabbaCordovaInterface, GRGrabbaMagstripeDelegate>
+(GrabbaMagstripe*) sharedInstance;
- (void) handleOnResume;
- (void) handleOnPause;

- (BOOL) execute:(NSString*) function command:(CDVInvokedUrlCommand*) command;
@end
