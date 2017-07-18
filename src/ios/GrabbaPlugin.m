//
//  GrabbaPlugin.m
//  plugin
//
//  Created by rc on 15/10/2014.
//  Copyright (c) 2014 Grabba International Pty Ltd. All rights reserved.
//

#import "GrabbaPlugin.h"
#import <GrabbaPlugin/plugin.h>

@implementation GrabbaPlugin
- (void) pluginInitialize
{
    [GrabbaPluginAPI pluginInitialize:self];
}

- (void) handleOnResume
{
    [[GrabbaPluginAPI sharedInstance] handleOnResume];
}

- (void) handleOnPause
{
    [[GrabbaPluginAPI sharedInstance] handleOnPause];
}

- (void) Grabba:(CDVInvokedUrlCommand*) command
{
    [[GrabbaPluginAPI sharedInstance] Grabba:command];
}

- (void) GrabbaBarcode:(CDVInvokedUrlCommand*) command
{
    [[GrabbaPluginAPI sharedInstance] GrabbaBarcode:command];
}

- (void) GrabbaProxcard:(CDVInvokedUrlCommand*) command
{
    [[GrabbaPluginAPI sharedInstance] GrabbaProxcard:command];
}

- (void) GrabbaPassport:(CDVInvokedUrlCommand*) command
{
    [[GrabbaPluginAPI sharedInstance] GrabbaPassport:command];
}

- (void) GrabbaMagstripe:(CDVInvokedUrlCommand*) command
{
    [[GrabbaPluginAPI sharedInstance] GrabbaMagstripe:command];
}

- (void) GrabbaFingerprint:(CDVInvokedUrlCommand*) command
{
    [[GrabbaPluginAPI sharedInstance] GrabbaFingerprint:command];
}

- (void) GrabbaMRTD:(CDVInvokedUrlCommand*) command
{
    [[GrabbaPluginAPI sharedInstance] GrabbaMRTD:command];
}

- (void) GrabbaUtil:(CDVInvokedUrlCommand*) command
{
    [[GrabbaPluginAPI sharedInstance] GrabbaUtil:command];
}
@end
