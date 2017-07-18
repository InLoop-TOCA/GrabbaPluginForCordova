//
//  GrabbaBarcode.h
//  plugin
//
//  Created by rc on 23/09/2014.
//  Copyright (c) 2014 Grabba International Pty Ltd. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GrabbaCordovaInterface.h"
#import <Cordova/CDV.h>
#import <GrabbaDriver/GrabbaDriver.h>

@interface GrabbaBarcode : NSObject <GrabbaCordovaInterface, GRGrabbaBarcodeDelegate>
+(GrabbaBarcode*) sharedInstance;
- (void) handleOnResume;
- (void) handleOnPause;

- (BOOL) execute:(NSString*) function command:(CDVInvokedUrlCommand*) command;
@end