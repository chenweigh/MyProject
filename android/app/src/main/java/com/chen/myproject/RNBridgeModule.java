package com.chen.myproject;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.media.UMImage;
import com.umeng.socialize.media.UMVideo;
import com.umeng.socialize.media.UMWeb;
import com.umeng.socialize.media.UMusic;

public class RNBridgeModule extends ReactContextBaseJavaModule {

    public RNBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNBridgeModule";
    }

    @ReactMethod
    public void umengShare1(String shareType, ReadableMap shareDic, final Callback callback){
        String SHARE_TITLE = "shareTitle",    //分享标题
            SHARE_LOGO = "shareLogo",         //分享 logo(缩略图)
            SHARE_CONTENT = "shareContent",   //分享详情
            SHARE_URL = "shareUrl",           //分享地址(网页、视频、音乐、图片)
            SHARE_TEXT = "shareText";         //分享文本(纯文本)

        Log.d("友盟分享--类型", shareType);
        Log.d("友盟分享--标题", shareDic.getString(SHARE_TITLE));
        Log.d("友盟分享--缩略图", shareDic.getString(SHARE_LOGO));
        Log.d("友盟分享--详情描述", shareDic.getString(SHARE_CONTENT));
        if (shareDic.hasKey(SHARE_URL)){
            Log.d("友盟分享--地址", shareDic.getString(SHARE_URL));
        }
        if (shareDic.hasKey(SHARE_TEXT)){
            Log.d("友盟分享--文本分享", shareDic.getString(SHARE_TEXT));
        }

        ShareAction shareAction = new ShareAction(getCurrentActivity());
        shareAction.withText(shareDic.getString(SHARE_TITLE));

        if (shareType.equalsIgnoreCase("web")){
            //消息类型(分享链接)
            UMWeb web = new UMWeb(shareDic.getString(SHARE_URL));
            web.setTitle(shareDic.getString(SHARE_TITLE));
            web.setThumb(new UMImage(getCurrentActivity(), shareDic.getString(SHARE_LOGO)));
            web.setDescription(shareDic.getString(SHARE_CONTENT));
            shareAction.withMedia(web);
        }else if (shareType.equalsIgnoreCase("image")){
            //消息类型(分享图片)
            UMImage img = new UMImage(getCurrentActivity(), shareDic.getString(SHARE_URL));
            img.setTitle(shareDic.getString(SHARE_TITLE));
            img.setThumb(new UMImage(getCurrentActivity(), shareDic.getString(SHARE_LOGO)));
            img.setDescription(shareDic.getString(SHARE_CONTENT));
            shareAction.withMedia(img);
        }else if (shareType.equalsIgnoreCase("music")){
            //消息类型(分享音乐)
            UMusic music = new UMusic(shareDic.getString(SHARE_URL));
            music.setTitle(shareDic.getString(SHARE_TITLE));
            music.setThumb(new UMImage(getCurrentActivity(), shareDic.getString(SHARE_LOGO)));
            music.setDescription(shareDic.getString(SHARE_CONTENT));
            shareAction.withMedia(music);
        }else if (shareType.equalsIgnoreCase("video")){
            //消息类型(分享视频)
            UMVideo video = new UMVideo(shareDic.getString(SHARE_URL));
            video.setTitle(shareDic.getString(SHARE_TITLE));
            video.setThumb(new UMImage(getCurrentActivity(), shareDic.getString(SHARE_LOGO)));
            video.setDescription(shareDic.getString(SHARE_CONTENT));
            shareAction.withMedia(video);
        }else if (shareType.equalsIgnoreCase("text")){
            //消息类型(分享文本)
            shareAction.withText(shareDic.getString(SHARE_TEXT));
        }else if (shareType.equalsIgnoreCase("image&text")){
            //消息类型(分享图文)
            UMImage img = new UMImage(getCurrentActivity(), shareDic.getString(SHARE_URL));
            img.setTitle(shareDic.getString(SHARE_TITLE));
            img.setThumb(new UMImage(getCurrentActivity(), shareDic.getString(SHARE_LOGO)));
            img.setDescription(shareDic.getString(SHARE_CONTENT));
            shareAction.withText(shareDic.getString(SHARE_TEXT));
            shareAction.withMedia(img);
        }else{
            Log.d("友盟分享", "未知类型");
        }

        shareAction.setDisplayList(SHARE_MEDIA.WEIXIN, SHARE_MEDIA.WEIXIN_CIRCLE);
        shareAction.setCallback(new UMShareListener() {
            @Override
            public void onStart(SHARE_MEDIA share_media) {
                Log.e("友盟分享", "onStart");
                callback.invoke("start");
            }

            @Override
            public void onResult(SHARE_MEDIA share_media) {
                Log.e("友盟分享", "onResult");
                callback.invoke("success");
            }

            @Override
            public void onError(SHARE_MEDIA share_media, Throwable throwable) {
                Log.e("友盟分享", "onError");
                callback.invoke("fail");
            }

            @Override
            public void onCancel(SHARE_MEDIA share_media) {
                Log.e("友盟分享", "onCancel");
                callback.invoke("cancel");
            }
        });
        shareAction.open();
    }
}
