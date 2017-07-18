//
//  GRGrabbaSignatureCapturePoint.h
//  GrabbaDriver
//
//  Created by Tarindu Paranagama on 27/10/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * Object representing a signature capture point.
 */
@interface GRGrabbaSignatureCapturePoint : NSObject 
{
	float x;
	float y;
}

@property (readonly) float x;
@property (readonly) float y;

- (id) initWithX: (float) xVal Y: (float) yVal;

@end
