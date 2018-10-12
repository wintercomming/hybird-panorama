var krpano = null;
setTimeout(function(){
    embedpano({
    swf: "krpano.swf",
    xml:a.tourXml,
    target: "panoramaConianer",
    html5: "auto",
    mobilescale: 1.0,
    passQueryParameters: true,
    id:"pano1",
    onready:krpano_onready_callback
  });
},10);
krpano_onready_callback = function(krpano_interface){
    krpano = krpano_interface;
}
backtoOrigin=function(){
    //alert(1);
    krpano.call("lookto(0,0,100)");
}
//$("#backtoOriginIcon").ontouchstart(function(){
    //$("#backtoOriginIcon").css("backgroundImage","url('static/icon2.png')");
//})
$(".meteorologicalDataName")
$("#meteorologicalDataIcon").click(function(){
    
    $(".meteorologicalDataDetail").fadeToggle(200);    
})
$("#shopInformationIcon").click(function(){
    
    $(".farm_information").fadeToggle(200);    
})
$(".closeicon").click(function(){
    
    $(".farm_information").fadeOut(200);    
})
$(".vrIcon").click(function(){
    var krpano = document.getElementById('pano1');
    krpano.call("webvr.enterVR()");  
})
var Data =decodeURIComponent('%7B%22contractorName%22%3A%22%E8%B0%A2%E9%91%91%E6%A0%87%22%2C%22shopUrl%22%3A%22https%3A%2F%2Fweidian.com%2Fi%2F2129204032%3Fwfr%3Dc%26ifr%3Ditemdetail%22%2C%22gpsX%22%3A40.5153497%2C%22gpsY%22%3A96.55247963333333%2C%22collectTime%22%3A%222018-04-03%2011%3A00%3A00%22%2C%22airHum%22%3A50.43%2C%22airPressure%22%3A1005.83%2C%22airTem%22%3A29.52%2C%22dewPointTem%22%3A18.13%2C%22lightIntensity%22%3A38383.75%2C%22windSpeed%22%3A1.15%2C%22farmName%22%3A%22%E9%98%B3%E5%85%89%E5%86%9C%E5%9C%BA%22%2C%22tourJs%22%3A%22http%3A%2F%2Fairag-aes.oss-cn-shenzhen.aliyuncs.com%2F11%2F19370855%2F20180929%2F19370855-20180929160443717%2Ftour.js%22%2C%22tourXml%22%3A%22http%3A%2F%2Fairag-aes.oss-cn-shenzhen.aliyuncs.com%2F11%2F19370855%2F20180929%2F19370855-20180929160443717%2Ftour.xml%22%2C%22picture%22%3A%22http%3A%2F%2Fae-images.oss-cn-shenzhen.aliyuncs.com%2F20160709%2F2016070915122860-farm.jpg%22%7D')
var a=JSON.parse(Data);
console.log(a);
$(".windSpeed").html("风速: "+a.windSpeed+"m/s");
$(".rainfall").html("降雨量: "+a.rainfall+"mm");
$(".lightIntensity").html("光照强度: "+a.lightIntensity+"lux");
$(".airTem").html("空气温度: "+a.airTem+"℃");
$(".airHum").html("空气湿度: "+a.airHum+"%");
$(".dewPointTem").html("露点温度: "+a.dewPointTem+"℃");
$(".airPressure").html("气压: "+a.airPressure+"hpa");
$(".date").html(a.collectTime);
$(".meteorologicalDataName").html(a.farmName);
$(".farm_name_title").html(a.farmName);
$(".farm_name_hostname").html(a.contractorName);
$("#shopUrl").attr("href",a.shopUrl);
$(".farm_picture").css("background-image","url("+a.picture+")");