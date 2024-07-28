let temppopup=document.getElementById("temppop");
    document.addEventListener("click",()=>{
         document.documentElement.requestFullscreen();
    });
    /*open temp popup*/
       
    function opentemp(){
        temppopup.classList.add("open-temppop");
    }
    function closetemp(){
        temppopup.classList.remove("open-temppop");
    }
    
    var rem="none";
    var about="none";
    function config(){
        var remh=document.getElementById("hr").value;
        var remm=document.getElementById("mi").value;
        if(remh<=9 && String(remh)!="00"){
            remh="0"+remh;
        }
        if(remm<=9 && String(remm)!="00"){
            remm="0"+remm;
        }
        document.getElementById("remindertime").value=remh+":"+remm;
        var remtime=document.getElementById("remindertime").value;
        var remabout=document.getElementById("remabout").value;
        return [remtime,remabout];
    } function save(){
        [rem,about]=config();
    }
    function stop(){
         rem="none";
         about="none";
         document.getElementById("remainderbox").classList.remove("openremainder");
    }
    function snooze(){
        document.getElementById("remainderbox").classList.remove("openremainder");
        let time=new Date;
        let hours=time.getHours();
        let minutes=time.getMinutes();
        if(hours<=9 ){
            hours="0"+hours;
        }
        if(minutes<=9){
            minutes="0"+minutes;
        }
        later=String(hours)+":"+String((minutes+5)%60);
        if(hours<=9 ){
            hours="0"+hours;
        }
        if(minutes<=9){
            minutes="0"+minutes;
        }
        rem=String(later);
    }
    function showtime(){
        let time=new Date;
        let day=time.getDay();
        let date=time.getDate();
        let month=time.getMonth();
        let year=time.getFullYear();
        let min=time.getMinutes();
        let hours=time.getHours();
        if(min<=9){
            min="0"+min;
        }
        if(hours<=9){
            hours="0"+hours;
        }
        let currenttime=hours+":"+min;
        var currtime=String(hours)+":"+String(min);
        let fulldate=date+"-"+month+"-"+year;
        week=["Sun","Mon","Tue","Wed","Thr","Fri","Sat"];
        document.getElementById("time").innerHTML=currenttime;
        document.getElementById("daydate").innerHTML=week[day]+" "+date;
        document.getElementById("hm").innerHTML=hours+":"+min;
        
        if (hours>=7 && hours < 12) {
        text="Good morning";
        document.getElementById("temppop").style.backgroundColor="#A5BDEF";
            document.getElementById("bgimage").innerHTML="🦚";
            document.getElementById("sun").innerHTML="🌴"
        }      
        else if (hours>=12 && hours <16) {
            text='Good afternoon ';
            document.getElementById("temppop").style.backgroundColor="#5A90E2";
            document.getElementById("bgimage").innerHTML="⛱️";
            document.getElementById("sun").innerHTML="☀️";
        }else if(hours>=16 && hours<19){
            text='Good evening';
            document.getElementById("temppop").style.backgroundColor="#F0B865";
            document.getElementById("bgimage").innerHTML="🐛";
            document.getElementById("sun").innerHTML="🌻";

        }
        else {
            text="Good night";
            document.getElementById("temppop").style.backgroundColor="#1D1632";
            document.getElementById("bgimage").innerHTML="🏕️";
            document.getElementById("sun").innerHTML="✨";
        }
        document.getElementById("greet").innerHTML=text;
        if(String(currtime)==String(rem)){
            document.getElementById("remainderbox").classList.add("openremainder");
            document.getElementById("mainarea").innerHTML=about;
        }
       
    }
    setInterval (showtime,1000);
    /*const apikey="771268cf58226d55a8385e574cac8de9";*/
    const apikey="9f75e97e657f0c97be3d8528384cef21";
    const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric";
    
    async function checkweather(city){
        const response=await fetch(apiurl+`&appid=${apikey}`+`&q=${city}`);
        var data= await response.json();
        console.log(data);
        temp=Math.round(data.main.temp)+"°";
        const desc=["clear sky","few clouds","scattered clouds","broken clouds","shower rain","rain","thunderstorm","snow","mist","overcast clouds","light rain"];
        const descicon=["🪂","🌤️","🌨️","🌥️","🌧️","☔","⛈️","☃️","😶‍🌫️","☁️","🌧️"];
        const classlst=["shineday","backblur","mayrain","wow","raining","hugerain","fear","snow","mistview","teabreak","shower"];
        const anim=["","","","","raining","raining","raining","","","","raining"];

        document.getElementById("tempno").innerHTML=temp;
        document.getElementById("tempfont").innerHTML=temp;

        document.getElementById("windspeed").innerHTML=data.wind.speed+" km/h";
        document.getElementById("humidity").innerHTML=data.main.humidity+"%";
        document.getElementById("visibility").innerHTML=data.visibility;
        document.getElementById("description").innerHTML=data.weather[0].description;
        document.getElementById("location").innerHTML=city;
        document.getElementById("feelslike").innerHTML="Feels like : "+data.main.feels_like+"°";
        const d=data.weather[0].description;
        let position=desc.indexOf(d);
        console.log(position);
        if(position>-1){
        document.getElementById("weathericon1").innerHTML=descicon[position];
        document.getElementById("weathericon2").innerHTML=descicon[position];
        document.getElementById("temp").classList.add(classlst[position]);
        document.getElementById("r1").classList.add(anim[position]);
        document.getElementById("r2").classList.add(anim[position]);
        document.getElementById("r3").classList.add(anim[position]);
        document.getElementById("r4").classList.add(anim[position]);
        document.getElementById("r5").classList.add(anim[position]);
       }
        else{
            document.getElementById("temp").style.backgroundColor="#9695E8";
        }

       
      
}
    checkweather("Raebareli");
    function openswipebox(){
        document.getElementById("swipebox").classList.toggle("openswipe");
        document.getElementById("recipesbox").classList.remove("openrecipebox");
        document.getElementById("newsframe").classList.remove("opennewsframe");
        document.getElementById("newsframe").src="";
        document.getElementById("swipe").innerHTML="&#8592";
        
    } 
    function openrecipe(){
        document.getElementById("recipesbox").classList.add("openrecipebox");
        document.getElementById("swipe").innerHTML="&#8594";
    }
    function opennews(){
        document.getElementById("newsframe").classList.add("opennewsframe");
        document.getElementById("newsframe").src="https://www.ndtv.com/";
       
        document.getElementById("swipe").innerHTML="&#8594";
    }
    function openclock(){
        document.getElementById("clockbox").classList.add("openclockbox");
    }
    function closeclock(){
        document.getElementById("clockbox").classList.remove("openclockbox");
    }function ta(){
        document.getElementById("clockbox").style.backgroundImage="url('https://i.pinimg.com/736x/d8/6f/86/d86f8678fc65bb7ca9cf2f5f035b1702.jpg')";
        document.getElementById("clockbox").style.backgroundPosition="center";
        document.getElementById("clockbox").style.backgroundSize="cover";
        document.getElementById("clockbox").style.backgroundRepeat="no-repeat";
    }
    function tb(){
        document.getElementById("clockbox").style.backgroundImage="url('https://th.bing.com/th/id/OIP.Pxq2-VbQ71lXQQ0_TY-wOwAAAA?w=474&h=296&rs=1&pid=ImgDetMain')";
        document.getElementById("clockbox").style.backgroundPosition="center";
        document.getElementById("clockbox").style.backgroundSize="cover";
        document.getElementById("clockbox").style.backgroundRepeat="no-repeat";

    }
    function tc(){
        document.getElementById("clockbox").style.backgroundImage="url('https://wallpapercave.com/wp/wp5269759.jpg')";
        document.getElementById("clockbox").style.backgroundPosition="center";
        document.getElementById("clockbox").style.backgroundSize="cover";
        document.getElementById("clockbox").style.backgroundRepeat="no-repeat";
    }
    function td(){
        document.getElementById("clockbox").style.backgroundImage="url('https://i.pinimg.com/originals/f1/8a/cc/f18accd5b2ee2932940fc5d24dfc81ec.jpg')";
        document.getElementById("clockbox").style.backgroundPosition="center";
        document.getElementById("clockbox").style.backgroundSize="cover";
        document.getElementById("clockbox").style.backgroundRepeat="no-repeat";
        
    }
    function te(){
        document.getElementById("clockbox").style.backgroundImage="url('https://th.bing.com/th/id/OIP.lDLjIoXr0JFxYus9aANjtAHaEK?w=480&h=270&rs=1&pid=ImgDetMain')";
        document.getElementById("clockbox").style.backgroundPosition="center";
        document.getElementById("clockbox").style.backgroundSize="cover";
        document.getElementById("clockbox").style.backgroundRepeat="no-repeat";
        
    }function openthemewindow(){
        document.getElementById("themeswindow").classList.toggle("openthemewindow");
    }
    function openmusic(){
        const a=document.getElementById("musican");
        a.setAttribute("href","https://www.jiosaavn.com/");
    }
   function openremainder(){
        document.getElementById("setreminder").classList.add("opensetreminder");
    };
    function closerem(){
        document.getElementById("setreminder").classList.remove("opensetreminder");

    };
    function openassistant(){
        document.getElementById("assistantbox").classList.toggle("openassistantbox");
    }
    
    
    
    