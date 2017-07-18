//
//  GrabbaPlugin.h
//  GrabbaPlugin
//
//  Created by Ray Chang on 5/09/2014.
//  Copyright (c) 2014 Grabba International Pty Ltd. All rights reserved.
//

#import "GrabbaCordovaInterface.h"
#import <Cordova/CDV.h>

@interface GrabbaPluginAPI : CDVPlugin <GrabbaCordovaInterface>
+ (void) pluginInitialize: (CDVPlugin*) plugin;
- (void) handleOnResume;
- (void) handleOnPause;

+(GrabbaPluginAPI*) sharedInstance;

- (NSString*) setCallback:(NSString*) oldCallbackId newCallback:(NSString*) newCallbackId;
- (NSString*) clearCallback:(NSString*) callback;

- (void) Grabba:(CDVInvokedUrlCommand*) command;
- (void) GrabbaBarcode:(CDVInvokedUrlCommand*) command;
- (void) GrabbaProxcard:(CDVInvokedUrlCommand*) command;
- (void) GrabbaPassport:(CDVInvokedUrlCommand*) command;
- (void) GrabbaMagstripe:(CDVInvokedUrlCommand*) command;
- (void) GrabbaFingerprint:(CDVInvokedUrlCommand*) command;
- (void) GrabbaMRTD:(CDVInvokedUrlCommand*) command;
- (void) GrabbaUtil:(CDVInvokedUrlCommand*) command;
@end
