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

class RongCloudHome extends Component {
	static navigationOptions  = ({ navigation, screenProps }) => ({
        title: '融云功能列表',
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
        var array = ["单聊", "会话列表", "联系人", "群聊"];
        callback(array, 0, false);
    }
    clickTab(index){
        switch (index) {
            case 0:
                {
                    //单聊
                }
                break;
            case 1:
                {
                    //会话列表
                }
                break;
            case 2:
                {
                    //联系人
                }
                break;
            case 3:
                {
                    //群聊
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


export default RongCloudHome;