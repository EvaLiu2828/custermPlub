<template>
    <div id="bmap" class="b-map">
         <div id="Bmap" class='B-map'
            :style="MapStyle"></div>
            <div :style="fixedStyle">
                <div style="margin-bottom: 5px">
                    <i class="notIconStyle"></i><span>未排程：{{notLength}}</span>
                </div>
                <div>
                    <i class="readyIconStyle"></i><span>已排程：{{readyLength}}</span>
                </div>
            </div>
            <div class="search-person">
                <el-input 
                    placeholder="查询客户姓名" 
                    icon="search"
                    size="small"
                    v-model="searchPersonName">
                    <el-button 
                        slot="append" 
                        icon="search"
                        @click="handleIconClick(searchPersonName)"></el-button>
                </el-input>
            </div>
    </div>
</template>

<script>
let map = new BMap.Map('Bmap');
let point;
let myGeo = new BMap.Geocoder();

export default {
    name: 'bmap',
    data() {
        return {
            MapStyle: {  //地图样式
                width: '100%',
                height: '92%',
                position: 'absolute'
            },
            fixedStyle: {
                position: 'absolute',
                bottom: '70px',
                right: '20px',
                background: 'rgba(195, 195, 195, 0.7)',
                borderRadius: '3px',
                color: '#324157',
                padding: '5px 10px',
            },
            ALREADY_SCHEDULING: '04',
            visitArray: [],  //准备排程列表
            readyVisit: [],
            index: 0,
            searchPersonName: '',
            notLength: 0,
            readyLength: 0,  

        }
    },
    props: {
        visitData: {  //外访任务列表
            type: Array
        }
    },
    mounted (){
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
            // this.restaurants = this.visitArray;
            this.bdGEO(this.visitData);
        },
        bdGEO(visitdata){
            // console.log(visitdata);
            let _this = this;
            this.notLength = 0;
            this.readyLength = 0;
            console.log(visitdata.length);

            for(var i=0; i < visitdata.length; i++){
                let markerObj = visitdata[i].address;  //零时地址
                let index = i;
                let Status = visitdata[i].status; 
                switch (Status){
                    case '03':
                        visitdata[i].status_type = '待排程';
                        this.notLength++;
                        break;
                    case '04':
                        visitdata[i].status_type = '已排程';
                        this.readyLength++;
                        break;
                }
                //根据外访任务地址标记地图坐标    
                _this.geocodeSearch(markerObj,index,_this,visitdata[i]);  
            }
            console.log(this.notLength);
            console.log(this.readyLength)
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
            
            let _this = this;
            map.clearOverlays();    //清除地图上所有覆盖物
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
                    // console.log('未解析出来的地址****index:'+index+'---add:'+add+'---data:'+data);
                    _this.visitArray.push(data);
                    console.log(_this.visitArray);
                    _this.visitList(_this.visitArray);
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
            this.readyVisit = r;
            this.$emit('readyVisitArray',this.readyVisit);  //向父组件推送数据
        },
        //检索客户
        handleIconClick(name){
            console.log(name);
            let readySearchName = name;
            let flag = false;   //判断是否添加数据
            let flag_name = false;   //判断是否存在此用户数据
            if(name){
                for(var i=0; i<this.visitData.length; i++){
                    if(this.visitData[i].customerName.indexOf(readySearchName) >= 0 ){
                        flag_name = true;
                        for(var j=0; j<this.visitArray.length; j++){
                            this.searchPersonName = '';
                            if(this.visitArray[j].taskId == this.visitData[i].taskId){
                                flag = true;
                                break;
                            } else {
                                flag = false;
                            }
                        }
                        if(flag == false){
                            this.visitArray.push(this.visitData[i]);
                            this.visitList(this.visitArray);
                        }
                    }
                }
                if(flag == true){
                    alert('此外访任务已添加');
                }
                if(flag_name == false){
                    alert('没有此客户');
                }
            }
        }
    }
}
</script>

<style scope>
.b-map {
    width: 100%;
    height: 65%;
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
    background: url(../../assets/map_no_date.png) no-repeat;
    background-size: 100%;
    margin-right: 5px;
}
.readyIconStyle {
    display: inline-block;
    width: 13px;
    height: 16px;
    background: url(../../assets/map_yes_date.png) no-repeat;
    background-size: 100%;
    margin-right: 5px;
}
.search-person {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 200px;
}

</style>
