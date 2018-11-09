package com.chen.myproject;

import android.app.Application;

import com.chen.myproject.BuildConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
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
    UMConfigure.init(this, "5bd81a66b465f573c300008d", "Umeng-myproject", UMConfigure.DEVICE_TYPE_PHONE, "");
    UMConfigure.setLogEnabled(true);
    // children: wx9ab5f1ee47b4c93a  woyeshibeijingchengxuyuanmiyao12 
    // kids:      wxfa7914e0d839653a
    PlatformConfig.setWeixin("wxfe449bd67ab28846", "cca55a892108754affee239771e4cc36");
  }
}
