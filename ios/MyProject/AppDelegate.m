/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"MyProject"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
#pragma mark - 1.友盟分享相关
  [self configUMShareSettings];
  
  return YES;
}
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options{
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url options:options];
  if (!result) {
    // 其他等SDK的回调
  }
  return result;
}

#pragma mark - 2.友盟分享相关
- (void)configUMShareSettings{
  //打开调试日志
  [[UMSocialManager defaultManager] openLog:YES];
  [UMConfigure setLogEnabled:YES];
  //设置友盟 appkey
  [UMConfigure initWithAppkey:@"5bd80fd1b465f5bb17000115" channel:@"App Store"];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wx9ab5f1ee47b4c93a" appSecret:@"woyeshibeijingchengxuyuanmiyao12" redirectURL:nil];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatTimeLine appKey:@"wx9ab5f1ee47b4c93a" appSecret:@"woyeshibeijingchengxuyuanmiyao12" redirectURL:nil];
}

@end
