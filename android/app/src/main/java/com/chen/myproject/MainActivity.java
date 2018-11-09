package com.chen.myproject;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.v4.app.ActivityCompat;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.umeng.socialize.UMShareAPI;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MyProject";
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
        checkPermission();
    }

    /**
     * 检查各种权限
     *
     * @return true, 已经获取权限;false,没有权限,尝试获取
     */
    public  boolean checkPermission(){
        if (Build.VERSION.SDK_INT >= 23) {
            String[] mPermissionList = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.READ_LOGS, Manifest.permission.READ_PHONE_STATE, Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.SET_DEBUG_APP, Manifest.permission.SYSTEM_ALERT_WINDOW, Manifest.permission.GET_ACCOUNTS, Manifest.permission.WRITE_APN_SETTINGS};
            ActivityCompat.requestPermissions(this, mPermissionList, 123);
            return false;
        }
        return true;
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode){
            case 123:{
                try {
                    boolean isGrant = true;
                    for (int i=0; i < grantResults.length; i++){
                        //判断权限结果,如果有被拒绝，就 return
                        if (grantResults[i] != PackageManager.PERMISSION_GRANTED){
                            //有权限没同意授权
                            isGrant = false;
                            break;
                        }
                    }
                    if (isGrant == false){
                        Log.d("友盟分享", "您拒绝了部分授权");
                    }
                } catch (Exception e){

                }
                break;
            }
        }
    }
}
