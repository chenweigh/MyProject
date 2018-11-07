'use strict';

import {
    Dimensions,
    AsyncStorage,
    Alert,
    Platform,
    Linking,
    Image,
    StatusBar,
} from 'react-native';

const deviceH = Dimensions.get('window').height
const deviceW = Dimensions.get('window').width

let Utils = {
    width:deviceW,
    height:deviceH,
    setValue:(key, value)=>{
        AsyncStorage.setItem(key,value);
    },
    getValue:(key, callback)=>{
        AsyncStorage.getItem(key, (err, result)=>{
            if (err) {
                callback(err, null);
            }else{
                callback(null, result);
            }
        })
    },
    removeValue:(key)=>{
        AsyncStorage.removeItem(key);
    },
    clearAllValue:()=>{
        AsyncStorage.clear();
    },
    showMessage:(message)=>{
        Alert.alert('提示', message);
    },
    showAlert:(title, message, okEvent, cancelEvent, submitText, cancelText)=>{
        var sText = submitText?submitText:"Ok",
            cText = cancelText?cancelText:"Cancel";
        Alert.alert(title, message, [
            {text:cText, onPress:()=>cancelEvent()},
            {text:sText, onPress:()=>okEvent()}
        ])
    },
    showAlertWithoutCancel:(title, message, okEvent, submitText)=>{
        var sText = submitText?submitText:"Ok"
        Alert.alert(title, message, [
            {text:sText, onPress:()=>okEvent()}
        ])
    },
    openURL:(url)=>{
        Linking.canOpenURL(url)
        .then((supported)=>{
            if (!supported) {
                console.log('无法打开: ' + url);
                Utils.showMessage('无法打开: ' + url);
            }else{
                return Linking.openURL(url);
            }
        })
        .catch((err)=>{
            console.log('一个错误被发现' + err);
            Utils.showMessage('一个错误被发现' + err);
        })
    },
}
export default Utils;
