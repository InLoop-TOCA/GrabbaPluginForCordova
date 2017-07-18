//
//  GrabbaPlugin.h
//  plugin
//
//  Created by rc on 15/10/2014.
//  Copyright (c) 2014 Grabba International Pty Ltd. All rights reserved.
//

#import <Cordova/CDV.h>

@interface GrabbaPlugin : CDVPlugin
- (void) Grabba:(CDVInvokedUrlCommand*) command;
- (void) GrabbaBarcode:(CDVInvokedUrlCommand*) command;
- (void) GrabbaProxcard:(CDVInvokedUrlCommand*) command;
- (void) GrabbaPassport:(CDVInvokedUrlCommand*) command;
- (void) GrabbaMagstripe:(CDVInvokedUrlCommand*) command;
- (void) GrabbaFingerprint:(CDVInvokedUrlCommand*) command;
- (void) GrabbaMRTD:(CDVInvokedUrlCommand*) command;
- (void) GrabbaUtil:(CDVInvokedUrlCommand*) command;
@end
