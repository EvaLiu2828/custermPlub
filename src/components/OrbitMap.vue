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
        map.centerAndZoom(point,10);
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
            console.log('GPSList');
            console.log(this.GPSListArr);
            let userName = '<div><span>外访人员：</span>'+ this.gpsList.userName +'</div></br>';
            console.log(this.gpsList.userName);
            //百度地图初始化   
            map = new BMap.Map('orbitmap') //在百度地图容器内创建地图
            map.centerAndZoom(point, 10);
            top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
            map.addControl(top_right_navigation);
            map.enableScrollWheelZoom(true);

            this.points = [];  //points初始化
            let content = '';
            for(let i=0; i<this.GPSListArr.length; i++){
                let address = '<div><span>签到地址：</span>'+ this.GPSListArr[i].gpsAddressOtherGPS +'</div></br>';
                let orbitTime = '<div><span>签到时间：</span>'+ this.GPSListArr[i].operateTime +'</div></br>';
                let orbitOrder = '<div><span>外访顺序：</span>'+ (i+1) +'</div></br>';
                content = userName + orbitOrder + address + orbitTime;
                point = new BMap.Point(this.GPSListArr[i].gpsAddrEastLongitudeGPS, this.GPSListArr[i].gpsAddrNorthernLatitudeGPS);
                this.addMarker(point,i,content);
                this.points.push(point);
            }
            console.log('坐标List');
            console.log(this.points);
            this.addCurve(this.points);
        },
        addMarker(point,index,content){
            // console.log('创建点时的坐标值');
            // console.log(point);
            // console.log('创建点时的索引值');
            // console.log(index);
            //创建点
            let marker = new BMap.Marker(point);
            map.addOverlay(marker);            //增加点
            let label = new BMap.Label(index+1,{ //增加标记顺序
                    offset:new BMap.Size(5,4),
                });
                label.setStyle({   //修改label样式
                    color: '#fff',
                    background: 'none',
                    border: 'none'
                });
            opts = {
                width : 200,     // 信息窗口宽度
                height: 130,     // 信息窗口高度
                title : "信息窗口" , // 信息窗口标题
                // enableMessage:true//设置允许信息窗发送短息
            };
            marker.setLabel(label);
            let _this = this;
            marker.addEventListener("click",function(e){
                _this.openInfo(content,e)
            });
        },
        addCurve(points){
            // console.log('创建弧线对象时的坐标值');
            // console.log(points);
            let polyline = new BMap.Polyline(points, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.3}); //创建弧线对象
            map.addOverlay(polyline); //添加到地图中
        },
        openInfo(content,e){
            console.log(content);
            console.log(e)
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
</style>