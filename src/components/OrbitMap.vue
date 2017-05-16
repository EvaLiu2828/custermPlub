<template>
    <div id="orbitmap"
        :style="mapStyle">
    </div>
</template>
<script>
let map;
let point;
let top_right_navigation;
let opts;
export default {
    name: 'orbitmap',
    data(){
        return {
            mapStyle: {  //地图样式
                width: '100%',
                height: '100%'
            },
            orbitGPSMsg: {},
            GPSListArr: [],
            points: []
        }
    },
    props: {
        gpsList :{
            type: Object
        }
    },
    watch: {
        gpsList: function(){
            this.track();
        }
    },
    mounted (){
        //百度地图初始化
        map = new BMap.Map('orbitmap') //在百度地图容器内创建地图
        point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point,8);
        top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
        map.addControl(top_right_navigation);
        map.enableScrollWheelZoom(true);
    },
    methods: {
        track(msg){
            console.log('orbitMap从orbitMsgTab父组件接受到的数据');
            console.log(this.gpsList);
            this.GPSListArr = [];
            this.GPSListArr = this.gpsList.gpsList;
            let title = '<h5 style="margin-top: 0.3rem; margin-bottom: 0.5rem; color: #20a0ff">信息窗口</h5></br>';
            let userName = this.gpsList.userName;
            //百度地图初始化   
            map = new BMap.Map('orbitmap') //在百度地图容器内创建地图
            map.centerAndZoom(point, 8);
            top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
            map.addControl(top_right_navigation);
            map.enableScrollWheelZoom(true);

            this.points = [];  //points初始化
            let content = '';
            for(let i=0; i<this.GPSListArr.length; i++){
                let address = '<div style="line-height:18px; vertical-align: text-top; "><span style="float: left; color:#8391a5">地址：</span><span style="float: left; display: inline-block; width:184px;">'+ this.GPSListArr[i].gpsAddressOtherGPS +'</span></div></br>';
                let orbitTime = '<div style="line-height:18px; vertical-align: text-top; "><span style="float: left; color:#8391a5">时间：</span><span style="float: left; display: inline-block; width:184px;">'+ this.GPSListArr[i].operateTime +'</span></div></br>';
                content = title + address + orbitTime;
                let log = '{测试}index:'+i+'--人员:'+userName+'--lng:'+this.GPSListArr[i].gpsAddrEastLongitudeGPS+'--lat:'+this.GPSListArr[i].gpsAddrNorthernLatitudeGPS; //临时测试使用
                point = new BMap.Point(this.GPSListArr[i].gpsAddrEastLongitudeGPS, this.GPSListArr[i].gpsAddrNorthernLatitudeGPS);
                this.addMarker(point,i,content,log);
                this.points.push(point);
            }
            console.log('坐标List');
            console.log(this.points);
            console.log(this.points.length);
            this.addCurve(this.points);
        },
        addMarker(point,index,content,log){
            //创建点
            let notIcon = new BMap.Icon("static/imgs/map_orbit.png", new BMap.Size(22, 29),{
                imageSize : new BMap.Size(22,29)
            })

            let marker = new BMap.Marker(point,{icon: notIcon});
            marker.setTop(true);
            map.addOverlay(marker);            //增加点
            map.centerAndZoom(point, 8);
            let label = new BMap.Label(index+1,{ //增加标记顺序
                    offset:new BMap.Size(0,3),
                });
                label.setStyle({   //修改label样式
                    color: '#20a0ff',
                    textShadow:'#fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0,#fff 0 -1px 0',
                    background: 'none',
                    border: 'none',
                    fontSize: '6px',
                    textAlign: 'center',
                    width: '22px'
                });
            opts = {
                width : 200,     // 信息窗口宽度
                height: 90,     // 信息窗口高度
            };
            marker.setLabel(label);
            let _this = this;
            marker.addEventListener("click",function(e){
                _this.openInfo(content,e,log);
            });
        },
        addCurve(points){
            let polyline = new BMap.Polyline(points, {strokeColor:"#20a0ff", strokeWeight:2, strokeOpacity:0.6}); //创建弧线对象
            map.addOverlay(polyline); //添加到地图中
        },
        openInfo(content,e,log){
            console.log(content);
            console.log(e);
            console.log(log);
            let p = e.target;
            let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            let infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
            map.openInfoWindow(infoWindow,point); //开启信息窗口
        }
    }
}
</script>
<style lang="scss" scoped>
.BMapLabel {
    background: none;
    border: none;
    color: #fff;
}
.title {
    line-height: 1rem;
}
</style>