//
//  RNBridgeModule.m
//  ProgramGirl
//
//  Created by chen on 2017/9/11.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RNBridgeModule.h"
@implementation RNBridgeModule
{
    bool hasListeners;
}

+ (id)allocWithZone:(NSZone *)zone
{
    static RNBridgeModule *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

//导出这个类，不然js不能使用 默认导出当前类名
RCT_EXPORT_MODULE()   //RNBridgeModule实现模块协议方法

//友盟分享
RCT_EXPORT_METHOD(umengShare:(NSString *)shareType andShareDic:(NSDictionary *)shareDic andCallback:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        //定制分享面板
        [UMSocialUIManager setPreDefinePlatforms:@[@(UMSocialPlatformType_WechatSession), @(UMSocialPlatformType_WechatTimeLine)]];
        //显示分享面板
        [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
            //创建分享消息对象 shareDic = @{@"shareTitle":"", @"shareContent":"", @"shareLogo":"", @"shareUrl":""}
            UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
            id shareObject1;
            if ([shareType isEqualToString:@"web"]) {
                //消息类型(分享网页)
                UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:shareDic[@"shareTitle"] descr:shareDic[@"shareContent"] thumImage:shareDic[@"shareLogo"]];
                shareObject.webpageUrl = shareDic[@"shareUrl"];
                shareObject1 = shareObject;
            } else if ([shareType isEqualToString:@"image"]) {
                //消息类型(分享图片)
                UMShareImageObject *shareObject = [UMShareImageObject shareObjectWithTitle:shareDic[@"shareTitle"] descr:shareDic[@"shareContent"] thumImage:shareDic[@"shareLogo"]];
                [shareObject setShareImage:shareDic[@"shareUrl"]];
                shareObject1 = shareObject;
            } else if ([shareType isEqualToString:@"music"]) {
                //消息类型(分享音乐)
                UMShareMusicObject *shareObject = [UMShareMusicObject shareObjectWithTitle:shareDic[@"shareTitle"] descr:shareDic[@"shareContent"] thumImage:shareDic[@"shareLogo"]];
                shareObject.musicUrl = shareDic[@"shareUrl"];
                shareObject1 = shareObject;
            } else if ([shareType isEqualToString:@"video"]) {
                //消息类型(分享视频)
                UMShareVideoObject *shareObject = [UMShareVideoObject shareObjectWithTitle:shareDic[@"shareTitle"] descr:shareDic[@"shareContent"] thumImage:shareDic[@"shareLogo"]];
                shareObject.videoUrl = shareDic[@"shareUrl"];
                shareObject1 = shareObject;
            } else if ([shareType isEqualToString:@"text"]) {
                //消息类型(分享文本)
                messageObject.text = shareDic[@"shareText"];
            } else if ([shareType isEqualToString:@"image&text"]) {
                //消息类型(分享图文)
                messageObject.text = shareDic[@"shareText"];
                UMShareImageObject *shareObject = [[UMShareImageObject alloc] init];
                shareObject.thumbImage = shareDic[@"shareLogo"];
                [shareObject setShareImage:shareDic[@"shareUrl"]];
                shareObject1 = shareObject;
            }

            messageObject.shareObject = shareObject1;
            [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:nil completion:^(id result, NSError *error) {
                if (error) {
                    NSLog(@"************Share fail with error %@*********", error);
                    callback(@[@"fail"]);
                } else {
                    NSLog(@"result:=========%@", result);
                    callback(@[@"success"]);
                }
            }];
        }];
    });
}

#pragma mark - 监听相关，iOS-》JS
//在添加第一个监听函数时触发
- (void)startObserving
{
    hasListeners = YES;
}

//取消监听时触发
- (void)stopObserving
{
    hasListeners = NO;
}

//这里注册一个退出登录的事件(通知名)
- (NSArray<NSString *> *)supportedEvents
{
    return @[@"appPurchaseMessage"];
}

#pragma mark - 发送监听方法
/**
 应用内购买状态的监听
 @param msg 状态标识
 */
- (void)appPurchaseMessage:(NSString *)msg
{
    if (hasListeners) {
        //发送事件，可以携带数据
        [self sendEventWithName:@"appPurchaseMessage" body:@{ @"message": msg }];
    }
}

@end
