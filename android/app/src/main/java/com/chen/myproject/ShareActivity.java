package com.chen.myproject;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.PopupWindow;
import android.widget.Toast;

import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.media.UMImage;
import com.umeng.socialize.media.UMVideo;
import com.umeng.socialize.media.UMWeb;
import com.umeng.socialize.media.UMusic;
import com.umeng.socialize.shareboard.ShareBoardConfig;
import com.umeng.socialize.shareboard.SnsPlatform;
import com.umeng.socialize.utils.ShareBoardlistener;

import java.lang.ref.WeakReference;

public class ShareActivity extends Activity {
    private UMShareListener mShareListener;
    private ShareAction mShareAction;
    private ShareBoardConfig mShareBoardConfig;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_share);

        mShareListener = new CustomShareListener(this);
        mShareBoardConfig = new ShareBoardConfig();
        mShareBoardConfig.setOnDismissListener(new PopupWindow.OnDismissListener() {
            @Override
            public void onDismiss() {
                ShareActivity.this.finish();
            }
        });

        /*增加自定义按钮的分享面板*/
        mShareAction = new ShareAction(ShareActivity.this)
            .setDisplayList(SHARE_MEDIA.WEIXIN, SHARE_MEDIA.WEIXIN_CIRCLE)
            .setShareboardclickCallback(new ShareBoardlistener() {
                @Override
                public void onclick(SnsPlatform snsPlatform, SHARE_MEDIA share_media) {
                    if (snsPlatform.mShowWord.equals("复制文本")) {
                        Toast.makeText(ShareActivity.this, "复制文本按钮", Toast.LENGTH_LONG).show();
                    } else if (snsPlatform.mShowWord.equals("复制链接")) {
                        Toast.makeText(ShareActivity.this, "复制链接按钮", Toast.LENGTH_LONG).show();
                    } else {
                        startShare(share_media);
                    }
                }
            });
        showShareBoard();
    }
    private void showShareBoard(){
        final AlertDialog.Builder dialog = new AlertDialog.Builder(this);
        final AlertDialog alert = dialog.create();
        alert.show();

        final Handler handler  = new Handler();
        final Runnable runnable = new Runnable() {
            @Override
            public void run() {
                if (alert.isShowing()) {
                    alert.dismiss();
                }
            }
        };

        alert.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialog) {
                handler.removeCallbacks(runnable);
                ShareActivity.this.mShareAction.open(mShareBoardConfig);
            }
        });

        handler.postDelayed(runnable, 1000);
    }
    public void startShare(SHARE_MEDIA share_media){
        String SHARE_TYPE = "shareType",      //分享类型
            SHARE_TITLE = "shareTitle",       //分享标题
            SHARE_LOGO = "shareLogo",         //分享 logo(缩略图)
            SHARE_CONTENT = "shareContent",   //分享详情
            SHARE_URL = "shareUrl",           //分享地址(网页、视频、音乐、图片)
            SHARE_TEXT = "shareText";         //分享文本(纯文本)

        String shareType = getIntent().getStringExtra(SHARE_TYPE),
            shareTitle = getIntent().getStringExtra(SHARE_TITLE),
            shareLogo = getIntent().getStringExtra(SHARE_LOGO),
            shareContent = getIntent().getStringExtra(SHARE_CONTENT),
            shareText = "",
            shareUrl = "";


        if (getIntent().hasExtra(SHARE_TEXT)){
            shareText = getIntent().getStringExtra(SHARE_TEXT);
        }
        if (getIntent().hasExtra(SHARE_URL)){
            shareUrl = getIntent().getStringExtra(SHARE_URL);
        }

        ShareAction shareAction = new ShareAction(ShareActivity.this);

        if (shareType.equalsIgnoreCase("web")){
            //消息类型(分享链接)
            UMWeb web = new UMWeb(shareUrl);
            web.setTitle(shareTitle);
            web.setThumb(new UMImage(ShareActivity.this, shareLogo));
            web.setDescription(shareContent);
            shareAction.withMedia(web);
        }else if (shareType.equalsIgnoreCase("image")){
            //消息类型(分享图片)
            UMImage img = new UMImage(ShareActivity.this, shareUrl);
            img.setTitle(shareTitle);
            img.setThumb(new UMImage(ShareActivity.this, shareLogo));
            img.setDescription(shareContent);
            shareAction.withMedia(img);
        }else if (shareType.equalsIgnoreCase("music")){
            //消息类型(分享音乐)
            UMusic music = new UMusic(shareUrl);
            music.setTitle(shareTitle);
            music.setThumb(new UMImage(ShareActivity.this, shareLogo));
            music.setDescription(shareContent);
            shareAction.withMedia(music);
        }else if (shareType.equalsIgnoreCase("video")){
            //消息类型(分享视频)
            UMVideo video = new UMVideo(shareUrl);
            video.setTitle(shareTitle);
            video.setThumb(new UMImage(ShareActivity.this, shareLogo));
            video.setDescription(shareContent);
            shareAction.withMedia(video);
        }else if (shareType.equalsIgnoreCase("text")){
            //消息类型(分享文本)
            shareAction.withText(shareText);
        }else if (shareType.equalsIgnoreCase("image&text")){
            //消息类型(分享图文)
            UMImage img = new UMImage(ShareActivity.this, shareUrl);
            img.setTitle(shareTitle);
            img.setThumb(new UMImage(ShareActivity.this, shareLogo));
            img.setDescription(shareContent);
            shareAction.withText(shareText);
            shareAction.withMedia(img);
        }else{
            Log.d("友盟分享", "未知类型");
            ShareActivity.this.finish();
        }

        shareAction.setCallback(mShareListener);
        shareAction.share();
    }
    private class CustomShareListener implements UMShareListener {

        private WeakReference<ShareActivity> mActivity;

        private CustomShareListener(ShareActivity activity) {
            mActivity = new WeakReference(activity);
        }

        @Override
        public void onStart(SHARE_MEDIA platform) {

        }

        @Override
        public void onResult(SHARE_MEDIA platform) {
            ShareActivity.this.finish();
            Toast.makeText(mActivity.get(), platform + " 分享成功啦", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onError(SHARE_MEDIA platform, Throwable t) {
            ShareActivity.this.finish();
            Toast.makeText(mActivity.get(), platform + " 分享失败啦", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onCancel(SHARE_MEDIA platform) {
            ShareActivity.this.finish();
            Toast.makeText(mActivity.get(), platform + " 分享取消了", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        /** attention to this below ,must add this**/
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
        this.finish();
    }

    /**
     * 屏幕横竖屏切换时避免出现window leak的问题
     */
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        mShareAction.close();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        UMShareAPI.get(this).release();
    }

    @Override
    protected void onResume() {
        //Toast.makeText(this, "onResume", Toast.LENGTH_LONG).show();
        super.onResume();
    }

    @Override
    protected  void onPause() {
        //Toast.makeText(this, "onPause", Toast.LENGTH_LONG).show();
        Log.e("children", "onPause--->");
        super.onPause();
    }
}
