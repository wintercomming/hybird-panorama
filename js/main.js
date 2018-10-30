var krpano = null;
krpano_onready_callback = function(krpano_interface){
    krpano = krpano_interface;
}
backtoOrigin=function(){
    //alert(1);
    krpano.call("lookto(0,0,100)");
}
var showmeteorologicalDataIcon = 0;
$("#meteorologicalDataIcon").click(function(){
    $(".meteorologicalDataDetail").fadeToggle(200);
    if(showmeteorologicalDataIcon%2==0){
        $("#meteorologicalDataIcon").css("background-image","url('static/icon4.png')");
        showmeteorologicalDataIcon++;
    }
    else{
        $("#meteorologicalDataIcon").css("background-image","url('static/icon3.png')");
        showmeteorologicalDataIcon++;
    }    
})
var showshopInformationIcon = 0;
$("#shopInformationIcon").click(function(){
    
    $(".farm_information").fadeToggle(200);
    if(showshopInformationIcon%2==0){
        $("#shopInformationIcon").css("background-image","url('static/icon6.png')");
        showshopInformationIcon++;
    }
    else{
        $("#shopInformationIcon").css("background-image","url('static/icon5.png')");
        showshopInformationIcon++;
    }        
})
$(".closeicon").click(function(){
    
    $(".farm_information").fadeOut(200); 
    if(showshopInformationIcon%2==0){
        $("#shopInformationIcon").css("background-image","url('static/icon6.png')");
        showshopInformationIcon++;
    }
    else{
        $("#shopInformationIcon").css("background-image","url('static/icon5.png')");
        showshopInformationIcon++;
    }           
})
var showvrIcon = 0;
$(".vrIcon").click(function(){
    var krpano = document.getElementById('pano1');

    if(showvrIcon%2==0){
        $(".vrIcon").css("background-image","url('static/icon8.png')");
        showvrIcon++;
        $(".meteorologicalDataDetail,.meteorologicalData,.farm_information,.shopInformationIcon,.meteorologicalDataIcon,.backtoOriginIcon,.logoimage").hide();
        krpano.call("webvr.enterVR()");
    }
    else{
        $(".vrIcon").css("background-image","url('static/icon7.png')");
        showvrIcon++;
        $(".meteorologicalData,.shopInformationIcon,.meteorologicalDataIcon,.backtoOriginIcon,.logoimage").show();
        if(showshopInformationIcon%2==1){
        $("#shopInformationIcon").css("background-image","url('static/icon5.png')");
        showshopInformationIcon++;
        }
        if(showmeteorologicalDataIcon%2==1){
        $("#meteorologicalDataIcon").css("background-image","url('static/icon3.png')");
        showmeteorologicalDataIcon++;
        }
        krpano.call("webvr.exitVR()");
    }
})
var Data=getQueryString("picture_id");
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
    return decodeURIComponent(r[2]);
    }
    return null;
    }
var a ={};
var url="http://api.airag.cn/ae/api/pic/panorama/details?picture_id="+Data;
    $.ajax({
        "url": url,
        "success": function(response) {
           a = response.obj;
           setTimeout(function(){
            embedpano({
            swf: "krpano.swf",
            xml: a.xml,
            target: "panoramaConianer",
            html5: "auto",
            mobilescale: 1.0,
            passQueryParameters: true,
            id:"pano1",
            onready:krpano_onready_callback
          });
        },10);
if(a.weather.light_intensity!=""){        
$(".lightIntensity").html("光照强度: "+a.weather.light_intensity+"lux");
}
if(a.weather.air_tem!=""){ 
$(".airTem").html("空气温度: "+a.weather.air_tem+"℃");
}
if(a.weather.air_hum!=""){
$(".airHum").html("空气湿度: "+a.weather.air_hum+"%");
}
if(a.weather.dew_point_tem!=""){
var dew_point_tem=a.weather.dew_point_tem.toFixed(2);
$(".dewPointTem").html("露点温度: "+dew_point_tem+"℃");
}
if(a.weather.air_pressure!=""){
$(".airPressure").html("气压: "+a.weather.air_pressure+"hpa");
}
$(".date").html(a.collect_time);
if(a.gps_x!=null&&a.gps_y!=null&&a.gps_x>=0&&a.gps_y>=0){
    var gpsX=a.gps_x.toFixed(2);
    var gpsY=a.gps_y.toFixed(2);
$(".meteorologicalDataLocation").html("坐标: "+gpsX+"N"+"  "+gpsY+"E");
}
if(a.gps_x!=null&&a.gps_y!=null&&a.gps_x>=0&&a.gps_y<0){
    let gpsX=Math.abs(a.gps_x.toFixed(2));
    let gpsY=Math.abs(a.gps_y.toFixed(2));
    $(".meteorologicalDataLocation").html("坐标: "+gpsX+"N"+"  "+gpsY+"W");
    }
if(a.gps_x!=null&&a.gps_y!=null&&a.gps_x<0&&a.gps_y>=0){
    let gpsX=Math.abs(a.gps_x.toFixed(2));
    let gpsY=Math.abs(a.gps_y.toFixed(2));
$(".meteorologicalDataLocation").html("坐标: "+gpsX+"S"+"  "+gpsY+"E");
}
if(a.gps_x!=null&&a.gps_y!=null&&a.gps_x<0&&a.gps_y<0){
    let gpsX=Math.abs(a.gps_x.toFixed(2));
    let gpsY=Math.abs(a.gps_y.toFixed(2));
$(".meteorologicalDataLocation").html("坐标: "+gpsX+"S"+"  "+gpsY+"W");
    }
$(".meteorologicalDataName").html(a.farm_name);
$(".farm_name_title").html(a.farm_name);
$(".farm_name_hostname").html(a.contractor_name);
if(a.shop_url==null){
    $("#shopUrl").hide();
}else{
$("#shopUrl").attr("href",a.shop_url);
}
$(".farm_picture").css("background-image","url("+a.farm_picture+")");
        },
"error": function(d,msg) {
            alert("Could not find user "+msg);
        }
    });
