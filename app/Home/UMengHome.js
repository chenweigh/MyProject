'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

import BCFlatListView from '../Component/BCFlatListView.js';
import { SafeAreaView } from 'react-navigation';
import Utils from '../Utils/Utils.js';

var RNBridgeModule = NativeModules.RNBridgeModule;

class Home extends Component {
	static navigationOptions  = ({ navigation, screenProps }) => ({
        title: '友盟分享列表',
        headerTitleStyle: {
          fontWeight: '400'
        },
        headerTintColor: '#201f1f',
        headerStyle: { backgroundColor: '#fff',borderBottomColor:'#fff',borderBottomWidth:1},
    })
    constructor(props) {
      	super(props);
      	this.state = {
      	};
    }
    // -----------------------------网络请求
	fetchData(pagenum, dataSource, callback){
        var array = ["分享网页", "分享图片", "分享音乐", "分享视频", "分享文本", "分享图文"];
        callback(array, 0, false);
    }
    clickTab(index){
        switch (index) {
            case 0:
                {
                    //网页
                    var thumb = "https://mmbiz.qpic.cn/mmbiz_jpg/wVhXVTnvSnic2DGkmXiafpp8tZfUPJVqibJ8mSuicKiaNicicF7rsort0ibCvibut68WqtibaExYV0hwPzW7IFbicBOMIkbRQ/0?wx_fmt=jpeg";
                    var webUrl = "https://www.baidu.com";
                    var type = "web",
                        url = webUrl;
                    var dic1 = {"shareTitle":"分享标题", "shareContent":"分享介绍", "shareLogo":thumb, "shareUrl":url};   //web、image、music、video
                    RNBridgeModule.umengShare(type, dic1, (status)=>{
                        if(status === "success"){
                            Utils.showMessage("分享成功");
                        }else{
                            Utils.showMessage("分享失败");
                        }
                    })
                }
                break;
            case 1:
                {
                    //图片
                    var thumb = "https://mmbiz.qpic.cn/mmbiz_jpg/wVhXVTnvSnic2DGkmXiafpp8tZfUPJVqibJ8mSuicKiaNicicF7rsort0ibCvibut68WqtibaExYV0hwPzW7IFbicBOMIkbRQ/0?wx_fmt=jpeg";
                    var ImgUrl = thumb;
                    var type = "image",
                        url = ImgUrl;
                    var dic1 = {"shareTitle":"分享标题", "shareContent":"分享介绍", "shareLogo":thumb, "shareUrl":url};   //web、image、music、video
                    RNBridgeModule.umengShare(type, dic1, (status)=>{
                        if(status === "success"){
                            Utils.showMessage("分享成功");
                        }else{
                            Utils.showMessage("分享失败");
                        }
                    })
                }
                break;
            case 2:
                {
                    //音乐
                    var thumb = "https://mmbiz.qpic.cn/mmbiz_jpg/wVhXVTnvSnic2DGkmXiafpp8tZfUPJVqibJ8mSuicKiaNicicF7rsort0ibCvibut68WqtibaExYV0hwPzW7IFbicBOMIkbRQ/0?wx_fmt=jpeg";
                    var musicUrl = "https://y.qq.com/n/yqq/song/000sghFV3F2WXp.html";
                    var type = "music",
                        url = musicUrl;
                    var dic1 = {"shareTitle":"分享标题", "shareContent":"分享介绍", "shareLogo":thumb, "shareUrl":url};   //web、image、music、video
                    RNBridgeModule.umengShare(type, dic1, (status)=>{
                        if(status === "success"){

                        }else{

                        }
                    })
                }
                break;
            case 3:
                {
                    //视频
                    var thumb = "https://mmbiz.qpic.cn/mmbiz_jpg/wVhXVTnvSnic2DGkmXiafpp8tZfUPJVqibJ8mSuicKiaNicicF7rsort0ibCvibut68WqtibaExYV0hwPzW7IFbicBOMIkbRQ/0?wx_fmt=jpeg";
                    var videoUrl = "https://v.qq.com/x/cover/fmygmh1duo4b035.html";
                    var type = "video",
                        url = videoUrl;
                    var dic1 = {"shareTitle":"分享标题", "shareContent":"分享介绍", "shareLogo":thumb, "shareUrl":url};   //web、image、music、video
                    RNBridgeModule.umengShare(type, dic1, (status)=>{
                        if(status === "success"){

                        }else{

                        }
                    })
                }
                break;
            case 4:
                {
                    //文本
                    var thumb = "https://mmbiz.qpic.cn/mmbiz_jpg/wVhXVTnvSnic2DGkmXiafpp8tZfUPJVqibJ8mSuicKiaNicicF7rsort0ibCvibut68WqtibaExYV0hwPzW7IFbicBOMIkbRQ/0?wx_fmt=jpeg";
                    var type = "text";
                    var text = "Pumas are large, cat-like animals which are found in America.";
                    var dic1 = {"shareTitle":"分享标题", "shareContent":"分享介绍", "shareLogo":thumb, "shareText":text};    //text
                    RNBridgeModule.umengShare(type, dic1, (status)=>{
                        if(status === "success"){

                        }else{

                        }
                    })
                }
                break;
            case 5:
                {
                    //图文(微信暂时不支持)
                    var thumb = "https://mmbiz.qpic.cn/mmbiz_jpg/wVhXVTnvSnic2DGkmXiafpp8tZfUPJVqibJ8mSuicKiaNicicF7rsort0ibCvibut68WqtibaExYV0hwPzW7IFbicBOMIkbRQ/0?wx_fmt=jpeg";
                    var ImgUrl = thumb;
                    var type = "image&text";
                    var text = "Pumas are large, cat-like animals which are found in America.";
                    var dic1 = {"shareTitle":"分享标题", "shareContent":"分享介绍", "shareLogo":thumb, "shareUrl":url, "shareText":text};   //image&text
                    RNBridgeModule.umengShare(type, dic1, (status)=>{
                        if(status === "success"){

                        }else{

                        }
                    })
                }
                break;
            default:
                break;
        }
    }
    //cell
    renderItem(item, index){
    	return(
    		<TouchableOpacity onPress={this.clickTab.bind(this, index)} activeOpacity={1} style={{height:70, justifyContent:'center', paddingHorizontal:15, borderBottomColor:'#e1e1e1', borderBottomWidth:1}}>
                <Text style={{fontSize:18}}>{index+1}.{item}</Text>
    		</TouchableOpacity>
    	)
    }
  	render() {
    	return (
            <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
                <View style={{flex:1, backgroundColor: '#fff'}}>
                    <BCFlatListView   
                        type='none'
                        fetchData={this.fetchData.bind(this)} 
                        renderItem={this.renderItem.bind(this)} 
                    />
                </View>
            </SafeAreaView>
    	);
  	}
}

const styles = StyleSheet.create({
	
});


export default Home;