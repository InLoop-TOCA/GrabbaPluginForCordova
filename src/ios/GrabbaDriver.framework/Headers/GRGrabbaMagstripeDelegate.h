
#import <Foundation/Foundation.h>

/**
 * The <VAR>GRGrabbaMagstripeDelegate</VAR> protocol defines the methods a delegate of an {@link GRGrabbaMagstripe}
 * object should implement. The delegate implements the events related to reading magstripe cards, 
 * including collected magstripe data
 */
@protocol GRGrabbaMagstripeDelegate <NSObject>

@optional


- (void) magstripeWillReceiveTracks;

/**
 * Sent to the delegate when a magstripe is swipped through the Grabba's reading slot and one or more tracks are successfully read.
 *
 * 5 bit and 7 bit tracks will automatically be converted to 8 bit ASCII according to standard magstripe encoding rules, and each track's embedded checksum is verified.
 * 
 * The NSData object representing each track can be passed in three different ways:<BR/>
 * 1. <VAR>nil</VAR> - this indicates that the track data was present on the card, but failed verification (was not read correctly)<BR/>
 * 2. zero length data - this indicates that the track was not present on the card<BR/>
 * 3. non-zero length data - this is the actual track data which was read correctly with no errors<BR/>
 * 
 * @param track1 - Track 1 data, as described above.
 * @param track2 - Track 2 data, as described above.
 * @param track3 - Track 3 data, as described above.
 */
- (void) magstripeDidReceiveTrack1:(NSData*) track1 
							track2:(NSData*) track2 
							track3:(NSData*) track3;


/**
 * Sent to the delegate when a magstripe is swipped through the Grabba's reading slot and one or more tracks are successfully read in non-ISO mode.
 *
 *
 * @param rawTrack1 - Raw track 1 data in non-ISO mode
 * @param rawTrack2 - Raw track 2 data in non-ISO mode
 * @param rawTrack3 - Raw track 3 data in non-ISO mode
 */

- (void) magstripeDidReceiveNonIsoModeTrack1:(NSData*) rawTrack1
                               track2:(NSData*) rawTrack2
                               track3:(NSData*) rawTrack3;



/**
 * Sent to the delegate when a magstripe is swipped through the Grabba's reading slot and one or more tracks are successfully read.
 * All tracks are formatted and combined based of the Magstripe Formatting Preferences.
 *
 */
- (void) magstripeDidReceiveFormattedTracks: (NSString*) formatedTracks;

@end