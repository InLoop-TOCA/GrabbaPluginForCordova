//
//  GRWedgeIt.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 8/02/11.
//  Copyright 2011 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>


@interface GRGrabbaWedgeIt : NSObject 
{
	BOOL enabled;
}

+ (GRGrabbaWedgeIt *) sharedGrabbaWedgeIt;

-(BOOL) enabled;
-(void) setEnabled:(BOOL) enable;

- (void) presentPreferencesPopUp;


@end
