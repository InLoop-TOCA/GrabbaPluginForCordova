//
//  GRGrabbaProxcardUHFPrefs.h
//  GrabbaDriver
//
//  Created by Grabba Developer on 10/05/12.
//  Copyright (c) 2012 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaPreferencesProtocol.h"

#define REGION_NA   1
#define REGION_EU   2
#define REGION_EU2  7
#define REGION_EU3  8
#define REGION_KR   3
#define REGION_PRC  6
// Paul says "I don't want to export it" - 20110815
//#define REGION_OPEN 255;

@interface GRGrabbaProxcardUHFPrefs : NSObject  <GRGrabbaPreferencesProtocol>

/** regionCode */
@property NSInteger regionCode;

/** ReadTX Power */
@property NSInteger readTXPower;

/** WriteTX Power */
@property NSInteger writeTXPower;


@end
