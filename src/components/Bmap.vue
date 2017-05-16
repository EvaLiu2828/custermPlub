<template>
    <div id="bmap" class="b-map">
         <div id="Bmap" class='B-map'
            :style="MapStyle"></div>
            <div :style="fixedStyle">
                <div style="margin-bottom: 5px">
                    <i class="notIconStyle"></i><span>未排程</span>
                </div>
                <div>
                    <i class="readyIconStyle"></i><span>已排程</span>
                </div>
            </div>
    </div>
</template>

<script>
let map = new BMap.Map('Bmap');
let point;
let myGeo = new BMap.Geocoder();

import bus from '../assets/eventBus';    //引入eventBus事件总线
export default {
    name: 'bmap',
    data() {
        return {
            MapStyle: {  //地图样式
                width: '100%',
                height: '90%',
                position: 'absolute'
            },
            fixedStyle: {
                position: 'absolute',
                bottom: '50px',
                right: '20px',
                background: 'rgba(195, 195, 195, 0.7)',
                borderRadius: '3px',
                color: '#324157',
                padding: '5px 10px',
            },
            ALREADY_SCHEDULING: '04',
            visitArray: [],  //准备排程列表
            readyVisit: [],
            index: 0
        }
    },
    props: {
        visitData: {  //外访任务列表
            type: Array
        }
    },
    mounted (){
        //百度地图初始化
        // map = new BMap.Map('Bmap') //在百度地图容器内创建地图
        // point = new BMap.Point(116.404, 39.915);
        // map.centerAndZoom(point,12);
        // var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
        // map.addControl(top_right_navigation);
        // map.enableScrollWheelZoom(true);
        // // 创建地址解析器实例
        // myGeo = new BMap.Geocoder();
        this.track();
    },
    watch: {
        visitData: function() {
            this.$nextTick(function(){
                this.track()
            })
        }
    },
    methods: {
        track () {
            map = new BMap.Map('Bmap') //在百度地图容器内创建地图
            point = new BMap.Point(116.404, 39.915);
            map.centerAndZoom(point,12);
            var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
            map.addControl(top_right_navigation);
            map.enableScrollWheelZoom(true);
            // 创建地址解析器实例
            myGeo = new BMap.Geocoder();

            this.visitArray = [];   //初始化
            console.log(this.visitData);  //外访任务列表
            this.bdGEO(this.visitData);
        },
        bdGEO(visitdata){
            // console.log(visitdata);
            let _this = this;
            for(var i=0; i < visitdata.length; i++){
                // console.log(visitdata[i].address);
                let markerObj = visitdata[i].address;  //零时地址
                let index = i;
                let Status = visitdata[i].status;   
                switch (Status){
                    case '03':
                        visitdata[i].status_type = '待排程';
                        break;
                    case '04':
                        visitdata[i].status_type = '已排程';
                        break;
                }
                //根据外访任务地址标记地图坐标    
                _this.geocodeSearch(markerObj,index,_this,visitdata[i]);  
            }
        },
        geocodeSearch(add,index,This,data){
            let icon; //标记
            //build时用的图片地址:   static/imgs/map_no_date.png    static/imgs/map_yes_date.png
            let notIcon = new BMap.Icon("static/imgs/map_no_date.png", new BMap.Size(22, 29),{
                imageSize : new BMap.Size(20,27)
            })
            let readyIcon = new  BMap.Icon("static/imgs/map_yes_date.png", new BMap.Size(22, 29),{
                imageSize : new BMap.Size(20,27)
            })
            let notIcon2 = new BMap.Icon("static/imgs/map_no_date2.png", new BMap.Size(22, 29),{
                imageSize : new BMap.Size(20,27)
            })
            let readyIcon2 = new BMap.Icon("static/imgs/map_yes_date2.png", new BMap.Size(22, 29),{
                imageSize : new BMap.Size(20,27)
            })
            
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(add, function(point){
                if (point) {
                    // console.log('解析出来的地址~~~index:'+index+'---add:'+add+'---lng:'+point.lng+'---lat:'+point.lat);
                    let pointObj = new BMap.Point(point.lng, point.lat);
                    if(data.status == This.ALREADY_SCHEDULING){
                        icon = readyIcon;
                    } else {
                        icon = notIcon;
                    }
                    let marker_icon = new BMap.Marker(pointObj,{icon:icon});  //编写自定义函数,创建标注
                    map.addOverlay(marker_icon);
                    map.centerAndZoom(pointObj,12);

                    marker_icon.addEventListener("click",function(e){
                        console.log(data);
                        //往列表插入选中的数据
                        This.vId = data.id;
                        This.attribute(e,data);

                        //更改坐标icon
                        // marker_icon.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        if(data.status == This.ALREADY_SCHEDULING){
                            icon = readyIcon2;
                        } else {
                            icon = notIcon2;
                        }
                        marker_icon.setIcon(icon)
                    });
                } else {
                    // console.log('未解析出来的地址****index:'+index+'---add:'+add);
                }
            }, "中国");
        },
        attribute(e,content){
            let flag = false;   //判断是否添加数据
            var p = e.target;
            if(this.visitArray.length !=0){
                for(let i=0; i<this.visitArray.length; i++){
                    if(content.taskId == this.visitArray[i].taskId){
                        alert('此外访任务已添加');
                        flag = true;
                        break;
                    } else {
                        flag = false;
                    }
                }
                if(flag == false){
                    this.visitArray.push(content);
                }
            } else {
                this.visitArray.push(content);
            }
            this.visitList(this.visitArray);
        },
        visitList(r){
            console.log('子组件传递的数据----');
            console.log(r);
            this.readyVisit = [];
            this.readyVisit = r;
            this.$emit('readyVisitArray',this.readyVisit);  //向父组件推送数据
        }
    }
}
</script>

<style scope>
.b-map {
    width: 100%;
    height: 50%;
    position: relative;
    top: 4rem;
}
.B-map {
    width: 100%;
    height: 100%;
    position: absolute;
}
.notIconStyle {
    display: inline-block;
    width: 13px;
    height: 16px;
    background: url(../assets/map_no_date.png) no-repeat;
    background-size: 100%;
    margin-right: 5px;
}
.readyIconStyle {
    display: inline-block;
    width: 13px;
    height: 16px;
    background: url(../assets/map_yes_date.png) no-repeat;
    background-size: 100%;
    margin-right: 5px;
}

</style>
