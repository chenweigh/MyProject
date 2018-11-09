package com.myproject;

import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
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

import java.util.Map;
import java.util.HashMap;

public class RNBridgeModule extends ReactContextBaseJavaModule {

    public RNBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNBridgeModule";
    }

    @ReactMethod
    public void umengShare(String shareType, ReadableMap shareDic, final Callback callback){
        String SHARE_TITLE = "shareTitle",    //分享标题
            SHARE_LOGO = "shareLogo",         //分享 logo(缩略图)
            SHARE_CONTENT = "shareContent",   //分享详情
            SHARE_URL = "shareUrl",           //分享地址(网页、视频、音乐、图片)
            SHARE_TEXT = "shareText";         //分享文本(纯文本)

        Log.d("友盟分享", shareType);
        Log.d("友盟分享", shareDic.getString(SHARE_TITLE));
        Log.d("友盟分享", shareDic.getString(SHARE_LOGO));
        Log.d("友盟分享", shareDic.getString(SHARE_CONTENT));
//        Log.d("友盟分享", shareDic.getString(SHARE_URL));
//        Log.d("友盟分享", shareDic.getString(SHARE_TEXT));

        ShareAction shareAction = new ShareAction(getCurrentActivity());
        shareAction.withText(shareDic.getString(SHARE_TITLE));
        shareAction.setDisplayList(SHARE_MEDIA.WEIXIN, SHARE_MEDIA.WEIXIN_CIRCLE);
        shareAction.setCallback(new UMShareListener() {
                @Override
                public void onStart(SHARE_MEDIA share_media) {
                    Log.e("友盟分享", "onStart");
                }

                @Override
                public void onResult(SHARE_MEDIA share_media) {
                    Log.e("友盟分享", "onResult");
                }

                @Override
                public void onError(SHARE_MEDIA share_media, Throwable throwable) {
                    Log.e("友盟分享", "onError");
                }

                @Override
                public void onCancel(SHARE_MEDIA share_media) {
                    Log.e("友盟分享", "onCancel");
                }
            });
//        shareAction.open();


        if (shareType == "web"){
            //消息类型(分享链接)
            UMWeb web = new UMWeb(shareDic.getString(SHARE_URL));
            web.setTitle(shareDic.getString(SHARE_TITLE));
            web.setThumb(new UMImage(getCurrentActivity(), shareDic.getString(SHARE_LOGO)));
            web.setDescription(shareDic.getString(SHARE_CONTENT));
            shareAction.withMedia(web);
        }else if (shareType == "image"){
            //消息类型(分享图片)
            UMImage img = new UMImage(getCurrentActivity(), shareDic.getString(SHARE_URL));
            shareAction.withMedia(img);
        }else if (shareType == "music"){
            //消息类型(分享音乐)
            UMusic music = new UMusic(shareDic.getString(SHARE_URL));
            music.setTitle(shareDic.getString(SHARE_TITLE));
            music.setThumb(new UMImage(getCurrentActivity(), shareDic.getString(SHARE_LOGO)));
            music.setDescription(shareDic.getString(SHARE_CONTENT));
            shareAction.withMedia(music);
        }else if (shareType == "video"){
            //消息类型(分享视频)
            UMVideo video = new UMVideo(shareDic.getString(SHARE_URL));
            video.setTitle(shareDic.getString(SHARE_TITLE));
            video.setThumb(new UMImage(getCurrentActivity(), shareDic.getString(SHARE_LOGO)));
            video.setDescription(shareDic.getString(SHARE_CONTENT));
            shareAction.withMedia(video);
        }else if (shareType == "text"){
            //消息类型(分享文本)
            shareAction.withText(shareDic.getString(SHARE_TEXT));
        }else if (shareType == "image&text"){
            //消息类型(分享图文)
            shareAction.withText(shareDic.getString(SHARE_TEXT));
            UMImage img = new UMImage(getCurrentActivity(), shareDic.getString(SHARE_URL));
            shareAction.withMedia(img);
        }
        shareAction.open();

        /*
        shareAction = new ShareAction(getCurrentActivity())
            .withText("cc")
            .setDisplayList(SHARE_MEDIA.WEIXIN, SHARE_MEDIA.WEIXIN_CIRCLE)
            .setCallback(new UMShareListener() {
                @Override
                public void onStart(SHARE_MEDIA share_media) {

                }

                @Override
                public void onResult(SHARE_MEDIA share_media) {

                }

                @Override
                public void onError(SHARE_MEDIA share_media, Throwable throwable) {

                }

                @Override
                public void onCancel(SHARE_MEDIA share_media) {

                }
            })
            .open();
          */
    }
}
