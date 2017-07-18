//
//  GRGrabbaUI.h
//  GrabbaDriver
//
//  Created by Murray Hughes on 14/07/10.
//  Copyright 2010 Grabba International. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>


@interface GRGrabbaUI : NSObject {

}


+ (UIColor*) colorGrabbaBlue;

+ (UIViewController*) preferencesWedgeItViewController;

+ (UIViewController*) preferencesBarcodeViewController;

+ (UIViewController*) preferencesMagstripeViewController;

+ (UIViewController*) preferencesProxcardViewController;

+ (UIViewController*) preferencesPassportViewController;

+ (UIViewController*) preferencesFingerprintViewController;

+ (UIView*) connectionStatusView;

+ (UIView*) connectionStatusWithBatteryLevelView;

+ (UIView*) connectionStatusWithBatteryLevelSemiTransparentView;

@end
