'use strict';

import React, { Component } from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SectionList,
  FlatList,
  Alert,
  AsyncStorage,
  ScrollView,
  NativeModules,
  NativeEventEmitter,
  StatusBar,
  DeviceEventEmitter
} from 'react-native';

import BCFetchRequest from '../Utils/BCFetchRequest.js';
import Http from '../Utils/Http.js';

import BCFlatListView from '../Component/BCFlatListView.js';
import { SafeAreaView } from 'react-navigation';

var RNBridgeModule = NativeModules.RNBridgeModule;

class Home extends Component {
	static navigationOptions  = ({ navigation, screenProps }) => ({
        title: '功能列表',
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
        var array = ["友盟分享", "融云聊天", "保存图片到手机", "ping++支付", "友盟分享", "融云聊天", "保存图片到手机", "ping++支付", "友盟分享", "融云聊天", "保存图片到手机", "ping++支付"];
        callback(array, 0, false);
    }
    clickTab(index){
        switch (index) {
            case 0:
                {
                    this.props.navigation.navigate("UMengHome");
                }
                break;
            case 1:
                {
                    this.props.navigation.navigate("RongCloudHome");
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