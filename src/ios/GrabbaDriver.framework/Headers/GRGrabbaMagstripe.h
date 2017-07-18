
#import <Foundation/Foundation.h>
#import "GRGrabbaMagstripeDelegate.h"


/**
 * Provides access to magstripe capabilities of an attached Grabba device. 
 * 
 * To read a magstripe card implement the delegate GRGrabbaMagstripeDelegate and set the delegate.
 * Then simply swipe a magstripe card through the Grabba.
 */
@interface GRGrabbaMagstripe : NSObject 

/**
 * delegate
 */
@property (weak) id<GRGrabbaMagstripeDelegate> delegate;

/**
 * A Boolean value that indicates whether the connected Grabba supports magstripe functionality
 */
- (BOOL) magstripeSupported;



/**
 * Returns formatted strings of the track data based on the Magstripe preferences.
 */
+ (NSString*) formatMastripeTrack1:(NSData *)track1Data track2:(NSData *)track2Data track3:(NSData *)track3Data;

@end
