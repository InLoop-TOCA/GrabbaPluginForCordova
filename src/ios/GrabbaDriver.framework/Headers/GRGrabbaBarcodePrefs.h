//
//  GrabbaBarcodePrefs.h
//  GrabbaDemo
//
//  Created by Murray Hughes on 28/01/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GRGrabbaPreferencesProtocol.h"
#import "GRGrabbaSymbologyPref.h"
#import "GRGrabbaBarcodeImagerPref.h"


//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/** GRGrabbaSymbologyPref */
/*@interface GRGrabbaSymbologyPref : NSObject <GRGrabbaPreferencesProtocol>
{
	NSString* symbologyNamespace;
	NSString* nameSpaceAffix;
}

//enabled
@property BOOL enabled;
@property (nonatomic, retain) NSString* symbologyNamespace;

- (id) initWithNameSpaceAffix: (NSString*) newNameSpaceAffix;
- (void) setInitalValuesWithEnabled:(BOOL) isEnable revert:(BOOL) doRevert;

@end */

/** GRGrabbaSymbologyPrefDummy */
@interface GRGrabbaSymbologyPrefDummy : GRGrabbaSymbologyPref
{
}

- (void) setInitalValuesWithEnabled:(BOOL) isEnable revert:(BOOL) doRevert;

@end


//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/** GRGrabbaSymbologyPrefMinimumLength */
@interface GRGrabbaSymbologyPrefMinimumLength : GRGrabbaSymbologyPrefDummy
{
}

/** minimumLength */
@property NSInteger minimumLength;

- (void) setInitalValuesWithEnabled:(BOOL) isEnable minimumLength: (int) minLength revert:(BOOL) doRevert;

@end



//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/** GRGrabbaSymbologyPrefEAN13 */
@interface GRGrabbaSymbologyPrefEAN13 : GRGrabbaSymbologyPrefDummy
{
}
/** ISBNConversion */
@property BOOL ISBNConversion;
/** ISSNConversion */
@property BOOL ISSNConversion;
/** requireAddOns */
@property BOOL requireAddOns;
/** AddOn2Digit */
@property BOOL AddOn2Digit;
/** AddOn5Digit */
@property BOOL AddOn5Digit;
/** txCheckDigit */
@property BOOL txCheckDigit;

@end


//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
/** GRGrabbaSymbologyPrefEAN8 */
@interface GRGrabbaSymbologyPrefEAN8 : GRGrabbaSymbologyPrefDummy
{
}
/** EAN8toEAN13Reformat */
@property BOOL EAN8toEAN13Reformat;
/** txCheckDigit */
@property BOOL txCheckDigit;

@end

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
/** GRGrabbaSymbologyPrefUPCA */
@interface GRGrabbaSymbologyPrefUPCA : GRGrabbaSymbologyPrefDummy
{
	
}
/** UPCAtoEAN13Reformat */
@property BOOL UPCAtoEAN13Reformat;
/** txCheckDigit */
@property BOOL txCheckDigit;
/** txNumberSystemDigit */
@property BOOL txNumberSystemDigit;

@end

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/** GRGrabbaSymbologyPrefUPCE */
@interface GRGrabbaSymbologyPrefUPCE : GRGrabbaSymbologyPrefDummy
{
}
/** UPCEtoUPCAReformat */
@property BOOL UPCEtoUPCAReformat;
/** txCheckDigit */
@property BOOL txCheckDigit;
/** txNumberSystemDigit */
@property BOOL txNumberSystemDigit;

@end

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/** GRGrabbaSymbologyPrefCode128 */
@interface GRGrabbaSymbologyPrefCode128 : GRGrabbaSymbologyPrefMinimumLength
{
}
/** calcCheckDigit */
@property BOOL calcCheckDigit;
/** txCheckDigit */
@property BOOL txCheckDigit;
/** txEan128Identifier */
@property BOOL txEan128Identifier;

@end

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/** GRGrabbaSymbologyPrefCode39 */
@interface GRGrabbaSymbologyPrefCode39 : GRGrabbaSymbologyPrefMinimumLength
{
}
/** fullASCIIReformat */
@property BOOL fullASCIIReformat;
/** calcCheckDigit */
@property BOOL calcCheckDigit;
/** txCheckDigit */
@property BOOL txCheckDigit;
/** txStartStop */
@property BOOL txStartStop;

@end

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/** GRGrabbaSymbologyPrefPDF417 */
@interface GRGrabbaSymbologyPrefPDF417 : GRGrabbaSymbologyPrefDummy
{
}
/** txControlHeader */
@property BOOL txControlHeader;
/** txFileName */
@property BOOL txFileName;

@end

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/** GRGrabbaSymbologyPrefTelepen */
@interface GRGrabbaSymbologyPrefTelepen : GRGrabbaSymbologyPrefDummy
{
}

/** decodeAsASCII */
@property BOOL decodeAsASCII;

@end

/** GRGrabbaSymbologyPrefPlessey */
@interface GRGrabbaSymbologyPrefPlessey : GRGrabbaSymbologyPrefMinimumLength
{
}
/** Transfer check digit*/
@property BOOL txCheckDigit;
/** Convert X to A */
@property BOOL xToAConversion;
@end

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/**
 * Provides access to Barcode Symbology related preferences of the Grabba driver
 */
@interface GRGrabbaSymbologyPreferences : NSObject <GRGrabbaPreferencesProtocol>
{
	GRGrabbaSymbologyPrefEAN13* EAN13;
	GRGrabbaSymbologyPrefEAN8* EAN8;
	GRGrabbaSymbologyPrefUPCA* UPCA;
	GRGrabbaSymbologyPrefUPCE* UPCE;
	GRGrabbaSymbologyPrefCode128* code128;
	GRGrabbaSymbologyPrefCode39* code39;
	GRGrabbaSymbologyPrefMinimumLength* codabar;
	GRGrabbaSymbologyPrefMinimumLength* interleaved25;
	GRGrabbaSymbologyPrefMinimumLength* industrial25;
	GRGrabbaSymbologyPrefMinimumLength* matrix25;
	GRGrabbaSymbologyPref* code26;
	GRGrabbaSymbologyPrefMinimumLength* code93;
	GRGrabbaSymbologyPrefMinimumLength* code11;
	GRGrabbaSymbologyPrefMinimumLength* MSI;
	GRGrabbaSymbologyPrefPlessey* plessey;
	GRGrabbaSymbologyPrefMinimumLength* chinaPostage;
	GRGrabbaSymbologyPrefMinimumLength* BC412;
	GRGrabbaSymbologyPref* codablockA;
	GRGrabbaSymbologyPref* codablockF;
	GRGrabbaSymbologyPrefPDF417* PDF417;
	GRGrabbaSymbologyPref* MicroPDF417;
	GRGrabbaSymbologyPrefTelepen* telepen;
	GRGrabbaSymbologyPref* ausPost;
	GRGrabbaSymbologyPref* aztec;
	GRGrabbaSymbologyPref* british;
	GRGrabbaSymbologyPref* canadian;
	GRGrabbaSymbologyPref* codeOne;
	GRGrabbaSymbologyPref* code16k;
	GRGrabbaSymbologyPref* code49;
	GRGrabbaSymbologyPref* coupon;
	GRGrabbaSymbologyPref* D25;
	GRGrabbaSymbologyPref* dataMatrix;
	GRGrabbaSymbologyPref* EANComposite;
	GRGrabbaSymbologyPref* japanese;
	GRGrabbaSymbologyPref* korea;
	GRGrabbaSymbologyPref* maxicode;
	GRGrabbaSymbologyPref* netherlands;
	GRGrabbaSymbologyPref* planet;
	GRGrabbaSymbologyPref* posi;
	GRGrabbaSymbologyPref* postnet;
	GRGrabbaSymbologyPref* QRCode;
	GRGrabbaSymbologyPref* RSS14;
	GRGrabbaSymbologyPref* RSS14Limited;
	GRGrabbaSymbologyPref* RSS14Expanded;
	GRGrabbaSymbologyPref* TLC;
	GRGrabbaSymbologyPref* trioptic;
}

/**  EAN13 */
@property (strong) GRGrabbaSymbologyPrefEAN13* EAN13;
/**  EAN8 */
@property (strong) GRGrabbaSymbologyPrefEAN8* EAN8;
/**  UPCA */
@property (strong) GRGrabbaSymbologyPrefUPCA* UPCA;
/**  UPCE */
@property (strong) GRGrabbaSymbologyPrefUPCE* UPCE;
/**  code128 */
@property (strong) GRGrabbaSymbologyPrefCode128* code128;
/**  code39 */
@property (strong) GRGrabbaSymbologyPrefCode39* code39;
/**  codabar */
@property (strong) GRGrabbaSymbologyPrefMinimumLength* codabar;
/**  interleaved25 */
@property (strong) GRGrabbaSymbologyPrefMinimumLength* interleaved25;
/**  industrial25 */
@property (strong) GRGrabbaSymbologyPrefMinimumLength* industrial25;
/**  matrix25 */
@property (strong) GRGrabbaSymbologyPrefMinimumLength* matrix25;
/**  code26 */
@property (strong) GRGrabbaSymbologyPref* code26;
/**  code93 */
@property (strong) GRGrabbaSymbologyPrefMinimumLength* code93;
/**  code11 */
@property (strong) GRGrabbaSymbologyPrefMinimumLength* code11;
/**  MSI */
@property (strong) GRGrabbaSymbologyPrefMinimumLength* MSI;
/**  plessey */
@property (strong) GRGrabbaSymbologyPrefPlessey* plessey;
/**  chinaPostage */
@property (strong) GRGrabbaSymbologyPrefMinimumLength* chinaPostage;
/**  BC412 */
@property (strong) GRGrabbaSymbologyPrefMinimumLength* BC412;
/**  codablockA */
@property (strong) GRGrabbaSymbologyPref* codablockA;
/**  codablockF */
@property (strong) GRGrabbaSymbologyPref* codablockF;
/**  PDF417 */
@property (strong) GRGrabbaSymbologyPrefPDF417* PDF417;
/**  MicroPDF417 */
@property (strong) GRGrabbaSymbologyPref* MicroPDF417;
/**  telepen */
@property (strong) GRGrabbaSymbologyPrefTelepen* telepen;
/**  ausPost */
@property (strong) GRGrabbaSymbologyPref* ausPost;
/**  aztec */
@property (strong) GRGrabbaSymbologyPref* aztec;
/**  british */
@property (strong) GRGrabbaSymbologyPref* british;
/**  canadian */
@property (strong) GRGrabbaSymbologyPref* canadian;
/**  codeOne */
@property (strong) GRGrabbaSymbologyPref* codeOne;
/**  code16k */
@property (strong) GRGrabbaSymbologyPref* code16k;
/**  code49 */
@property (strong) GRGrabbaSymbologyPref* code49;
/**  coupon */
@property (strong) GRGrabbaSymbologyPref* coupon;
/**  D25 */
@property (strong) GRGrabbaSymbologyPref* D25;
/**  dataMatrix */
@property (strong) GRGrabbaSymbologyPref* dataMatrix;
/**  EANComposite */
@property (strong) GRGrabbaSymbologyPref* EANComposite;
/**  japanese */
@property (strong) GRGrabbaSymbologyPref* japanese;
/**  korea */
@property (strong) GRGrabbaSymbologyPref* korea;
/**  maxicode */
@property (strong) GRGrabbaSymbologyPref* maxicode;
/**  netherlands */
@property (strong) GRGrabbaSymbologyPref* netherlands;
/**  planet */
@property (strong) GRGrabbaSymbologyPref* planet;
/**  posi */
@property (strong) GRGrabbaSymbologyPref* posi;
/**  postnet */
@property (strong) GRGrabbaSymbologyPref* postnet;
/**  QRCode */
@property (strong) GRGrabbaSymbologyPref* QRCode;
/**  RSS14 */
@property (strong) GRGrabbaSymbologyPref* RSS14;
/**  RSS14Limited */
@property (strong) GRGrabbaSymbologyPref* RSS14Limited;
/**  RSS14Expanded */
@property (strong) GRGrabbaSymbologyPref* RSS14Expanded;
/**  TLC */
@property (strong) GRGrabbaSymbologyPref* TLC;
/**  trioptic */
@property (strong) GRGrabbaSymbologyPref* trioptic;

@end


//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/**
 * Provides access to barcode image capture related preferences of the Grabba driver
 */
@interface GRGrabbaBarcodeImagerCapturePreferences : GRGrabbaBarcodeImagerPref
{
}
/**
 * Decoding style preferences<br>
 * 0 = Decoding style imaging<br>
 * 1 = Photo style (default)<br>
 * 2 = Manual style, disables auto-exposure and makes use of other preferences for configuration
 */
@property NSInteger imagingStyle;
/**
 * LED state while taking images - not available when using decoding style imaging<br>
 * false = LED off, preferred when taking colour images (if supported by the device)<br>
 * true = LED on
 */
@property BOOL ledState;
/**
 * Exposure timing, only used in manual style imaging.<br>
 * Units are 127 microseconds<br>
 * The exposure time determines how long the engine takes to capture an image.<br>
 * Valid range of 1-7874<br>
 */
@property NSInteger exposure;
/**
 * Gain, only used in manual style imaging.<br>
 * The gain brightens images taken - as you increase gain, the noise in an image is also amplified.<br>
 * 1 = No gain<br>
 * 2 = Medium gain<br>
 * 4 = Heavy gain<br>
 * 8 = Maximum gain
 */
@property NSInteger gain;
/**
 * Target white value, only used in photo style imaging<br>
 * This sets the target for the median greyscale value in the captured image.<br>
 * For capturing close up images of high contrast images like documents, a lower setting such as 75 is recommended.<br>
 * Higher settings result in longer exposure times and brighter images.<br>
 * Valid range of 0-255.
 */
@property NSInteger whiteTargetValue;
/**
 * Delta for acceptance, only used when in photo style imaging<br>
 * This sets the allowable acceptable tolerance for the target white value.<br>
 * Valid range of 0-255.
 */
@property NSInteger deltaForAcceptance;
/**
 * Maximum number of frames allowed to be taken to reach the delta for acceptance, only used in photo style imaging<br>
 * Valid range of 0-10.
 */
@property NSInteger updateTries;
/**
 * Target set point percentage Sets the target point for light and dark values in the captured image.<br>
 * Valid range of 1-99.<br>
 * A setting of 75 means to aim for 75% of pixels at or below the target white value and 25% above the target white value.
 */
@property NSInteger targetSetPointPercentage;
@end

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/**
 * Provides access to barcode image transfer related preferences of the Grabba driver
 */
@interface GRGrabbaBarcodeImagerTransferPreferences : GRGrabbaBarcodeImagerPref
{
}
/**
 * Enhances pictures taken from distances greater than 3m (10 feet).<br>
 * false = infinity filter off<br>
 * true = infinity filter on
 */
@property BOOL infinityFilter;

/**
 * Preference to skip pixels to minimise file size.<br>
 * 1 = Ship every pixel<br>
 * 2 = Ship every second pixel<br>
 * 3 = Ship every third pixel<br>
 * Valid range of 0-10. Images may become unusable beyond this value.
 */
@property NSInteger skipPixel;
/**
 * Image compensation flattens the image to account for variations in illumination.<br>
 * false = compensation disabled<br>
 * true = compensation enabled
 */
@property BOOL compensation;
/**
 * Pixel depth sets the number of bits per pixel in the transmitted image (in KIM or BMP formats only) 8 = 8 bits per pixel, greyscale image<br>
 * 1 = 1 bit per pixel, black and white image<br>
 * 24 = 24 bits per pixel (BMP format)<br>
 * 32 = 32 bits per pixel (RGBX)<br>
 */
@property NSInteger pixelDepth;
/**
 * An edge sharpen filter to clean up the edges of an image.<br>
 * This may result in loss of fine detail from the original image.<br>
 * Valid range 0-24.
 */
@property NSInteger edgeSharpen;
/**
 * File format sets the desired image format.<br>
 * Changing this preference will result in no image if the file format is not supported.<br>
 * 0 = KIM format<br>
 * 1 = TIFF binary<br>
 * 2 = TIFF binary group 4, compressed<br>
 * 3 = TIFF greyscale<br>
 * 4 = Uncompressed binary (upper left to lower right, 1 pixel/bit, 0 padded end of line)<br>
 * 5 = Uncompressed greyscale (Upper left to lower right, bitmap format)<br>
 * 6 = JPEG format<br>
 * 8 = BMP format (Lower right to upper left, uncompressed)<br>
 * 10 = TIFF colour compressed image<br>
 * 11 = TIFF colour uncompressed image<br>
 * 12 = JPEG colour image<br>
 * 14 = BMP colour format<br>
 * 15 = BMP Uncompressed raw image<br>
 */
@property NSInteger fileFormat;
/**
 * Increases the contrast of the transmitted image. Not available with some image formats.
 */
@property BOOL histogramStretch;
/**
 * Invert image across X axis.
 */
@property BOOL invertImageXAxis;
/**
 * Invert image across Y axis.
 */
@property BOOL invertImageYAxis;
/**
 * Reduce salt and pepper noise in images. Not available on all scan engines.
 */
@property BOOL noiseReduction;
/**
 * Preferences to pre-rotate the image.<br>
 * 0 = Image as snapped (right side up)<br>
 * 1 = Rotate image 90 degrees to the right.<br>
 * 2 = Rotate images 180 degrees (upside down)<br>
 * 3 = Rotate image 90 degrees to the left.
 */
@property NSInteger rotateImage;
/**
 * Sets the desired image quality when using JPEG image format. Higher numbers result in higher quality but larger files.<br>
 * Smaller numbers result in greater amounts of lossy compression but faster transmission and smaller files.<br>
 * Valid range of 0-100.
 */
@property NSInteger jpegImageQuality;
/**
 * Gamma correction preference.<br>
 * Gamma measures the brightness of midtones produced by the image.<br>
 * Higher gamma correction yields an overall brighter image.<br>
 * 0 = turn off gamma correction.<br>
 * Optimal setting for typical document images is 50.<br>
 * Valid range of 0-1000.
 */
@property NSInteger gammaCorrection;
/**
 * Document image filter for sharpening document images.<br>
 * Valid range of 0-255.<br>
 * This preference is best used with the following preferences:<br>
 * ImagingStyle = 0<br>
 * LED state = false<br>
 * Target white value = 168<br>
 * Target set point percentage = 90
 */
@property NSInteger documentImageFilter;
/**
 * Blur images by smoothing transitions between hard edges, lines and shaded areas.
 */
@property BOOL blurImage;
/**
 * Preference to ship the histogram for an image.<br>
 * Provides a quick picture of the tonal range in an image.
 */
@property BOOL histogramShip;
/**
 * Ship a window of the image by specifying the left, right, top, and bottom pixel coordinates.<br>
 * Device columns are numbered 0 through 640, and device rows are numbered 0 through 480 for x400.<br>
 * Crop left default: 0. Crop left range 0 - 639.
 */
@property NSInteger cropLeft;
/**
 * Ship a window of the image by specifying the left, right, top, and bottom pixel coordinates.<br>
 * Device columns are numbered 0 through 640, and device rows are numbered 0 through 480 for x400.<br>
 * Crop right default: 0. Crop right range 0 - 639.
 */
@property NSInteger cropRight;
/**
 * Ship a window of the image by specifying the left, right, top, and bottom pixel coordinates.<br>
 * Device columns are numbered 0 through 640, and device rows are numbered 0 through 480.<br>
 * Crop top default: 0. Crop top range 0 - 479.
 */
@property NSInteger cropTop;
/**
 * Ship a window of the image by specifying the left, right, top, and bottom pixel coordinates.<br>
 * Device columns are numbered 0 through 640, and device rows are numbered 0 through 480.<br>
 * Crop bottom default: 0. Crop bottom range 0 - 479.
 */
@property NSInteger cropBottom;
/**
 * The number of pixels to cut from the outside margin of the image; thus only the center pixels are transmitted.<br>
 * Crop margin default: 0. Crop margin range 0 - 238.<br>
 */
@property NSInteger cropMargin;
@end

@interface GRGrabbaBarcodeImagerPreferences  : NSObject <GRGrabbaPreferencesProtocol>
{
    GRGrabbaBarcodeImagerCapturePreferences* capture;
    GRGrabbaBarcodeImagerTransferPreferences* transfer;
}

@property (strong) GRGrabbaBarcodeImagerCapturePreferences* capture;
@property (strong) GRGrabbaBarcodeImagerTransferPreferences* transfer;
@end
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/**
 * Provides access to Barcode related preferences of the Grabba driver
 */

@interface GRGrabbaBarcodePrefs : NSObject  <GRGrabbaPreferencesProtocol>
{
	GRGrabbaSymbologyPreferences *symbology;
    GRGrabbaBarcodeImagerPreferences *imager;
}

/** symbology */
@property (strong) GRGrabbaSymbologyPreferences *symbology;
/** Image capture and transfer preferences */
@property (strong) GRGrabbaBarcodeImagerPreferences *imager;
/** Scan timeout */
@property NSInteger scanTimeout;
/** Vibration on scan */
@property BOOL vibrateOnScan;
/** Beep on scan */
@property BOOL beepOnScan;
/** Formatting matching regular expression pattern */
@property (nonatomic, strong) NSString* formatMatchingRegularExpression;
/** Formatting string by substitution template */
@property (nonatomic, strong) NSString* formatSubstitutionTemplate;
/** Encoding */
/*Among the more commonly used encodings are:

NSASCIIStringEncoding                   1
NSUnicodeStringEncoding                 10
NSISOLatin1StringEncoding               5
NSISOLatin2StringEncoding               9
NSSymbolStringEncoding                  6
NSUTF8StringEncoding (Add by Alan)      4
 */
@property NSInteger encoding;
/** X300 - Sensor optimisation preference (Search Mode) */
/**
 *       Search mode for x300.
 *       0: No preference. (default)
 *       1: Prefer 1D barcode (can still scan stacked barcodes)
 *       2: Prefer stacked barcode (can still scan 1D barcodes)
 */
@property NSInteger x300searchMode;
/** X400 - Sensor optimisation preference (Search Mode) */
/** 0:  Full omnidirectional search (default)
        Searches for barcode features starting at the center of an image to the image limits.
        Can read all symbologies in any orientation in this mode.
 
    1:  Quick omnidirectional search
        Quick search for barcode around center of image. May miss off center symbols and larger data matrix/QR symbols.
        Can read all symbologies in any orientation in this mode.
 
    2:  Advanced linear decoding
        Quick horizontal linear scans in center band of image. Not omnidirectional, does not read in any orientation.
        Cannot read 2D, OCR or postal symbols.
 */
@property NSInteger x400searchMode;


/** Beep style */
/** 0: Long beep (2 seconds)
 *  1: Short beep (1.2 seconds)
 */
@property NSInteger beepStyle;

/** Turn on barcode scan illumination (red beam) on x400 while scanning */
/** (Default setting: YES) */
@property BOOL x400TurnOnIllumination;

@end