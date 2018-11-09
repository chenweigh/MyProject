package com.myproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.myproject.BuildConfig;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new MyReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    //友盟配置
    UMShareAPI.get(this);
    UMConfigure.init(this, "5a0d3d6ea40fa349e5000135", "Umeng-progam-children", UMConfigure.DEVICE_TYPE_PHONE, "");
    UMConfigure.setLogEnabled(true);
    // children: wx9ab5f1ee47b4c93a  woyeshibeijingchengxuyuanmiyao12 
    // kids:      wxfa7914e0d839653a
    PlatformConfig.setWeixin("wx9ab5f1ee47b4c93a", "woyeshibeijingchengxuyuanmiyao12");
  }
}
