
#import <Foundation/Foundation.h>

/**
 * The <VAR>GRGrabbaDelegate</VAR> protocol defines the methods a delegate of a {@link GRGrabba}
 * object should implement. The delegate implements the events related to the grabba beding connected/disconnect 
 *
 */

@protocol GRGrabbaDelegate <NSObject>

@optional

/**
 * Sent to the delegate when a Grabba is attached to or detached from the iPhone. 
 * When this fuction is received, it is recomended you check the {@link GRGrabba#connected} property 
 * and handle the connection or disconnection appropriately.
 */
- (void) grabbaConnectionEvent;

/**
 * Sent to the delegate when a catastrophic error occurs during the connection sequence.
 * Sometimes this can be resolved by reconnected the Grabba, or it could indicate
 * hardware failure
 *
 * @see GRGrabbaError for possible error codes
 */
- (void) grabbaConnectionDidFailWithError:(NSError*) error;




@end
