<template>
    <div id="bmap"
         :style="mapStyle">
         <div id="Bmap"
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
let map;
let point;
export default {
    name: 'bmap',
    data() {
        return {
            mapStyle: {  //地图样式
                width: '100%',
                height: '50%',
                position: 'relative'
            },
            MapStyle: {  //地图样式
                width: '100%',
                height: '100%',
            },
            fixedStyle: {
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: 'rgba(195, 195, 195, 0.7)',
                borderRadius: '3px',
                color: '#324157',
                padding: '5px 10px',
            },

            adds : [  //临时地址
                "包河区金寨路1号（金寨路与望江西路交叉口）",
                "庐阳区凤台路209号（凤台路与蒙城北路交叉口）",
                "蜀山区金寨路217号(近安医附院公交车站)",
                "蜀山区梅山路10号(近安徽饭店) ",
                "蜀山区 长丰南路159号铜锣湾广场312室",
                "合肥市寿春路93号钱柜星乐町KTV（逍遥津公园对面）",
                "庐阳区长江中路177号",
                "新站区胜利路89"              
            ],
            ALREADY_SCHEDULING: 1,
            visitArray: [],  //准备排程列表
            readyVisit: [],
        }
    },
    props: {
        visitData: {  //外访任务列表
            type: Array
        }
    },
    mounted (){
        //百度地图初始化
        map = new BMap.Map('Bmap') //在百度地图容器内创建地图
        point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point,12);
        var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
        map.addControl(top_right_navigation);
        map.enableScrollWheelZoom(true)
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
            console.log(this.visitData);  //外访任务列表
            this.bdGEO(this.visitData);
            this.visitArray = [];
        },
        bdGEO(visitdate){
            // console.log(visitdate);
            let _this = this;
            visitdate.forEach(function (data,index) {
                data.address = _this.adds[index];  //地址
                let markerObj = data.address;  //零时地址
                let Index = index;
                let Status = data.status;   
                switch (Status){
                    case 0:
                        data.status_type = '未排程';
                        break;
                    case 1:
                        data.status_type = '已排程';
                        break;
                }
                //根据外访任务地址标记地图坐标    
                _this.geocodeSearch(markerObj,index,_this,data);  
            });
        },
        geocodeSearch(add,index,This,data){
            let icon; //标记
            map = new BMap.Map('Bmap') //在百度地图容器内创建地图
            //build时用的图片地址:   static/imgs/map_no_date.png    static/imgs/map_yes_date.png
            let notIcon = new BMap.Icon("static/imgs/map_no_date.png", new BMap.Size(20, 28),{
                imageSize : new BMap.Size(20,25)
            })
            let readyIcon = new  BMap.Icon("static/imgs/map_yes_date.png", new BMap.Size(28, 40),{
                imageSize : new BMap.Size(20,25)
            })
            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(add, function(point){
                if (point) {
                    let pointObj = new BMap.Point(point.lng, point.lat);
                    if(data.status == This.ALREADY_SCHEDULING){
                        icon = readyIcon;
                    } else {
                        icon = notIcon;
                    }
                    let marker_icon = new BMap.Marker(point,{icon:icon});  //编写自定义函数,创建标注
                    map.addOverlay(marker_icon);
                    map.centerAndZoom(point, 12);
                    var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
                    map.addControl(top_right_navigation);
                    map.enableScrollWheelZoom(true)
                    marker_icon.addEventListener("click",function(e){
                        This.vId = data.id;
                        This.attribute(e,data);
                    });
                }
            }, "中国");
        },
        attribute(e,content){
            let flag = false;   //判断是否添加数据
            var p = e.target;
            console.log(content);
            // this.visitArray = [];
            if(this.visitArray.length !=0){
                for(let i=0; i<this.visitArray.length; i++){
                    if(content.taskId== this.visitArray[i].taskId){
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
        visitList (r){
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
.notIconStyle {
    display: inline-block;
    width: 12px;
    height: 15px;
    background: url(../assets/map_no_date.png) no-repeat;
    background-size: 100%;
    margin-right: 5px;
}
.readyIconStyle {
    display: inline-block;
    width: 12px;
    height: 15px;
    background: url(../assets/map_yes_date.png) no-repeat;
    background-size: 100%;
    margin-right: 5px;
}

</style>
