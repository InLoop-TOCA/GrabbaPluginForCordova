//
//  GrabbaCordovaInterface.h
//  GrabbaPlugin
//
//  Created by rc on 10/09/2014.
//  Copyright (c) 2014 Grabba International Pty Ltd. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol GrabbaCordovaInterface <NSObject>
- (void) handleOnPause;
- (void) handleOnResume;
@end