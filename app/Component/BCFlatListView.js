/**
 * @author: chenwei
 * @description: 分组列表视图
 * @time: 2017-07-18
 */
 /**
  *  fetchData(pagenum, datasource, callback)          分组视图里的数据源获取(必填)
  *  renderItem,                                       item 组件(必填)
  *  footerComponent                                   底部组件(可选)
  *  headerComponent                                   头部组件(可选)
  *  hasHeaderRefresh                                  是否有下拉刷新组件(可选), 默认:true
  *  hasEmptyRefresh                                   是否有空视图重新加载组件(可选), 默认:false
  *  showLoading                                       是否显示加载动画(可选), 默认:true
  *  type                                              列表底部加载更多数据的方式scroll(滚动加载)、click(点击加载)、none(空)、distance(到底部)(可选)，默认:scroll
  *  showsVerticalScrollIndicator                      是否展示垂直滚动条,(可选)
  *  showsHorizontalScrollIndicator                    是否展示水平滚动条,(可选)
  *  CBRefresh                                         回调刷新, refresh, norefresh(可选)
  *  numColumns                                        一行几个视图,比如双排列表(可选)
  *  horizontal                                        是否设置水平滚动(可选)
  */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

import LoadingView from '../Component/LoadingView.js';
import EmptyView from '../Component/EmptyView.js';

const LoadMore = 1;           //点击加载更多(还有尚未加载数据)
const LoadNoMore = 0;         //已经到尾了(没有尚未加载数据)
const LoadMoreIng = -1;       //加载中(数据正在加载中)
const LoadMoreFail = 2;       //失败(数据加载失败)

const LoadMoreForClick = {
    [LoadMore]:"点击加载更多",
    [LoadNoMore]:"已经到尾了",
    [LoadMoreIng]:"加载中...",
    [LoadMoreFail]:""
}
const LoadMoreForScroll = {
    [LoadMore]:"正在加载中...",
    [LoadNoMore]:"数据全部加载完毕",
    [LoadMoreIng]:"正在加载中...",
    [LoadMoreFail]:""
}

const EmptyText = 0;
const FailText = -1;
const SuccessText = 1;

const EmptyDataText = {
    [EmptyText]:"暂无数据",
    [FailText]:"网络状态不好,点击重试",
    [SuccessText]:""
}

class BCFlatListView extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
        failEmptyText:EmptyText,     //当请求的数据为空时或请求失败，展示的文字
        isLoaded:false,              //是否发起网络请求，并得到响应
	  	dataSource:[],               //数据源
		loading:true,                //是否显示加载动画
		footerLoadTag:LoadMore,      //默认是点击加载更多, FlatList，列表底部
        isRefresh:false,             //FlatList，头部是否处于下拉刷新
        pagenum:1,                   //列表第几页。默认1
        type:this.props.type,        //列表底部加载更多数据的方式，是滚动触发、用户点击来触发、滚动到底部、不加载
        CBRefresh:'norefresh'        //callbackRefresh, 返回刷新问题，是否刷新，默认否
	  };
	}
    static defaultProps = {
        type: 'scroll',
        showLoading:true,      //是否显示等待视图，默认显示
        hasHeaderRefresh:true, //是否有头部刷新功能，默认有
        hasEmptyRefresh:false, //是否有数据为空时，点击重新加载
    };
    static propTypes = {
        type: PropTypes.oneOf(['scroll', 'click', 'none', 'distance']).isRequired,    //类型
    }
	componentWillMount() {
	    this.props.fetchData(1, this.state.dataSource, this.loadData);
	}
	componentDidMount() {
	  
	}
    componentWillReceiveProps(nextProps) {
        if (nextProps.CBRefresh) {
            // 回调,刷新页面
            this.setState({
                CBRefresh: nextProps.CBRefresh
            }, ()=>{
                if (this.state.CBRefresh === "refresh") {
                    console.log("回调,刷新页面");
                    this.setState({
                        pagenum:1
                    }, ()=>{
                        this.props.fetchData(this.state.pagenum, this.state.dataSource, this.loadData);
                    }) 
                }
            });
        }
    }
    // 请求失败，重新加载数据
    reloadEvent(){
        this.setState({
            pagenum:1,
            loading:true,
            isLoaded:false,
        }, ()=>{
            this.props.fetchData(1, this.state.dataSource, this.loadData);
        })
    }
	loadData = (array, footerLoadTag, fail)=>{
		var that = this;
		if (fail) {
            that.setState({
                failEmptyText:FailText
            })
			that.setState({
                isLoaded:true,
                loading:false,
                isRefresh:false,
                footerLoadTag:LoadMoreFail,
                CBRefresh:'norefresh'
            })
		}else{
            if (array.length) {
                that.setState({
                    failEmptyText:SuccessText
                })
            }else{
                that.setState({
                    failEmptyText:EmptyText
                })
            }
			that.setState({
                isLoaded:true,
				footerLoadTag:footerLoadTag,
				isRefresh:false,
                loading:false,
                dataSource:array,
                CBRefresh:'norefresh'
			})
		}
	}
    // -----------------------------------点击事件
	_clickLoadMore(){
    	// 上拉加载更多
        if (this.state.footerLoadTag != LoadMore) {
            return;
        }
        
        // 请求下一页数据
        this.setState({
            footerLoadTag:LoadMoreIng    //加载更多->加载中
        });

        this.timer = setTimeout(() => {
            this.setState({
                pagenum:this.state.pagenum+1
            }, ()=>{
                this.props.fetchData(this.state.pagenum, this.state.dataSource, this.loadData);
            })
        }, 500);
    }
    _pullToRefresh(){
    	// 下拉刷新
        this.setState({isRefresh:true});
        this.timer = setTimeout(() => {
            this.setState({
                pagenum:1
            }, ()=>{
                this.props.fetchData(this.state.pagenum, this.state.dataSource, this.loadData);
            }) 
        }, 500);
    }
    // ------------------------------------------兑换记录列表
    _renderItem = ({item, index}) => (
        this.props.renderItem(item, index)
    )
    _renderHeaderView = ()=>{
        return (
            this.props.headerComponent?this.props.headerComponent():null
        )
    }
    _renderFooterView = ()=>{
        var this_ = this;
        var defaultFooterUI = function(){
            // 默认底部视图，下拉加载更多
            return (
                this_.props.type==="scroll" || this_.props.type === "distance"?
                    <View>
                        <Text style={styles.footerLoadMore}>{LoadMoreForScroll[this_.state.footerLoadTag]}</Text>
                    </View>
                :
                    <TouchableOpacity onPress={this_._clickLoadMore.bind(this)}>
                        <Text style={styles.footerLoadMore}>{LoadMoreForClick[this_.state.footerLoadTag]}</Text>
                    </TouchableOpacity>
            )
        }
        return  (
            this.props.footerComponent?this.props.footerComponent() : this.props.type==="none" || this.state.failEmptyText === EmptyText || this.props.horizontal===true?null:defaultFooterUI()
        )
    }
    _keyExtractor = (item, index) => index.toString();
    _renderFlatList(){
    	return (
    		<View style={{flex:1}}>
	    		{
                    this.state.isLoaded?
                        this.state.type === "scroll"?
                            <FlatList 
                                ref={(flatlist)=>this._flatList=flatlist}
                                style={{flex:1,}}
                                data={this.state.dataSource}
                                renderItem={this._renderItem}
                                extraData={this.state}
                                keyExtractor={this._keyExtractor}
                                ListHeaderComponent={this._renderHeaderView}
                                ListFooterComponent={this._renderFooterView}
                                ListEmptyComponent={this.state.failEmptyText === FailText?<EmptyView type="reload" reloadEvent={this.reloadEvent.bind(this)} failTxt={EmptyDataText[this.state.failEmptyText]}/>:<EmptyView failTxt={EmptyDataText[this.state.failEmptyText]}/>}
                                refreshing={this.props.hasHeaderRefresh?this.state.isRefresh:null}
                                onRefresh={this.props.hasHeaderRefresh?this._pullToRefresh.bind(this):null}
                                showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
                                showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
                                horizontal={this.props.horizontal}

                                onEndReached={this._clickLoadMore.bind(this)}
                                onEndReachedThreshold={0.3}
                                numColumns={this.props.numColumns?this.props.numColumns:1}
                            />
                        :
                            this.state.type == "distance"?
                                <FlatList 
                                    ref={(flatlist)=>this._flatList=flatlist}
                                    style={{flex:1,}}
                                    data={this.state.dataSource}
                                    renderItem={this._renderItem}
                                    extraData={this.state}
                                    keyExtractor={this._keyExtractor}
                                    ListHeaderComponent={this._renderHeaderView}
                                    ListFooterComponent={this._renderFooterView}
                                    ListEmptyComponent={this.state.failEmptyText === FailText?<EmptyView type="reload" reloadEvent={this.reloadEvent.bind(this)} failTxt={EmptyDataText[this.state.failEmptyText]}/>:<EmptyView failTxt={EmptyDataText[this.state.failEmptyText]}/>}
                                    refreshing={this.props.hasHeaderRefresh?this.state.isRefresh:null}
                                    onRefresh={this.props.hasHeaderRefresh?this._pullToRefresh.bind(this):null}
                                    showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
                                    showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
                                    horizontal={this.props.horizontal}

                                    numColumns={this.props.numColumns?this.props.numColumns:1}
                                    onScroll={(e)=>{
                                        // console.log(e.nativeEvent);
                                        if(e.nativeEvent.contentSize.height <= e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height +30){
                                            // console.log("列表到达底部，开始加载下一页数据");
                                            this._clickLoadMore();
                                        }
                                    }}
                                />
                            :
                                <FlatList 
                                    ref={(flatlist)=>this._flatList=flatlist}
                                    style={{flex:1,}}
                                    data={this.state.dataSource}
                                    renderItem={this._renderItem}
                                    extraData={this.state}
                                    keyExtractor={this._keyExtractor}
                                    ListHeaderComponent={this._renderHeaderView}
                                    ListFooterComponent={this._renderFooterView}
                                    ListEmptyComponent={this.state.failEmptyText === FailText?<EmptyView type="reload" reloadEvent={this.reloadEvent.bind(this)} failTxt={EmptyDataText[this.state.failEmptyText]}/>:<EmptyView failTxt={EmptyDataText[this.state.failEmptyText]}/>}
                                    refreshing={this.props.hasHeaderRefresh?this.state.isRefresh:null}
                                    onRefresh={this.props.hasHeaderRefresh?this._pullToRefresh.bind(this):null}
                                    showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
                                    showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
                                    horizontal={this.props.horizontal}
                                    
                                    numColumns={this.props.numColumns?this.props.numColumns:1}
                                    
                                />
                    :   null
		        }
            </View>
    	)
    }
  	render() {
    	return (
      		<View style={{flex:1}}>
      			{this._renderFlatList()}
      			{
      				this.state.loading && this.props.showLoading ?<LoadingView />:null
      			}
      		</View>
    	);
  	}
}

const styles = StyleSheet.create({
	// --------------FlatList 的尾部
    footerLoadMore:{
        height:30, 
        lineHeight:30, 
        color:'gray', 
        textAlign:'center',
        marginBottom:10
    },
});


export default BCFlatListView;