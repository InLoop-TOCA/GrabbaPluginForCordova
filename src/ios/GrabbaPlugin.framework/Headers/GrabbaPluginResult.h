//
//  CDVPluginResult+GrabbaPluginResult.h
//  plugin
//
//  Created by rc on 22/09/2014.
//  Copyright (c) 2014 Grabba International Pty Ltd. All rights reserved.
//

#import <Cordova/CDV.h>

@interface CDVPluginResult (GrabbaPluginResult)
+(CDVPluginResult*) resultWithStatus:(CDVCommandStatus) statusOrdinal keepCallback:(BOOL) keepCallback;
+(CDVPluginResult*) resultWithStatus:(CDVCommandStatus) statusOrdinal messageAsString:(NSString*) message keepCallback:(BOOL) keepCallback;
+(CDVPluginResult*) resultWithStatus:(CDVCommandStatus) statusOrdinal messageAsArray:(NSArray*) message keepCallback:(BOOL) keepCallback;
+(CDVPluginResult*) resultWithStatus:(CDVCommandStatus) statusOrdinal messageAsInt:(int) message keepCallback:(BOOL) keepCallback;
+(CDVPluginResult*) resultWithStatus:(CDVCommandStatus) statusOrdinal messageAsDouble:(double) message keepCallback:(BOOL) keepCallback;
+(CDVPluginResult*) resultWithStatus:(CDVCommandStatus) statusOrdinal messageAsBool:(BOOL) message keepCallback:(BOOL) keepCallback;
+(CDVPluginResult*) resultWithStatus:(CDVCommandStatus) statusOrdinal messageAsDictionary:(NSDictionary*) message keepCallback:(BOOL) keepCallback;
+(CDVPluginResult*) resultWithStatus:(CDVCommandStatus) statusOrdinal messageAsArrayBuffer:(NSData*) message keepCallback:(BOOL) keepCallback;
+(CDVPluginResult*) resultWithStatus:(CDVCommandStatus) statusOrdinal messageAsMultipart:(NSArray*) message keepCallback:(BOOL) keepCallback;
+(CDVPluginResult*) resultWithStatus:(CDVCommandStatus) statusOrdinal messageToErrorObject:(int) errorCode keepCallback:(BOOL) keepCallback;

@end
