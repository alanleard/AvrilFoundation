/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"18O0mMH4Qza0Dqlu2JVLqiNGzFYySJet"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"EwUX5FfqhIHxcvqmtRmr2J8p6UdQD0Be"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"ijnNqEjp7hNhfUTMvOUauFnJoNJipwN7"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"eQYCIGDeIAHYS9DxK1LKNt8I7uxVHWpL"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"OHI1EjO34cOpKzDVhK0JwPHH93afLuN5"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"UYv8bXnzPDys4FQTuMTpOnKOk0F8anpT"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
