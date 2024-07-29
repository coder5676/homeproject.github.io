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
        document.getElementById("setreminder").classList.remove("opensetreminder");
    }
    function stop(){
         rem="none";
         about="none";
         document.getElementById("remainderbox").classList.remove("openremainder");
         document.getElementById("reminderaudio").pause();
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
        document.getElementById("reminderaudio").pause();
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
        week=["Sun","Mon","Tue","Wed","Thr","Fri","Sat"];
        document.getElementById("time").innerHTML=currenttime;
        document.getElementById("daydate").innerHTML=week[day]+" "+date;
        document.getElementById("hm").innerHTML=hours+":"+min;
        
        if (hours>=7 && hours < 12) {
        text="Good morning";
        document.getElementById("temppop").style.backgroundColor="#A5BDEF";
            document.getElementById("bgimage").innerHTML="🦚";
            document.getElementById("sun").innerHTML="🌴";
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
            document.getElementById("temp").classList.add("nightsky");
        }
        document.getElementById("greet").innerHTML=text;
        if(String(currtime)==String(rem)){
            document.getElementById("remainderbox").classList.add("openremainder");
            document.getElementById("mainarea").innerHTML=about;
            document.getElementById("reminderaudio").play();
        }
       
    }
    setInterval (showtime,1000);
    const apikey="771268cf58226d55a8385e574cac8de9";
    /*const apikey="9f75e97e657f0c97be3d8528384cef21";*/
    const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric";
    
    async function checkweather(city){
        const response=await fetch(apiurl+`&appid=${apikey}`+`&q=${city}`);
        var data= await response.json();
        console.log(data);
        temp=Math.round(data.main.temp)+"°";
        const desc=["clear sky","few clouds","scattered clouds","broken clouds","shower rain","rain","thunderstorm","snow","mist","overcast clouds","light rain"];
        const descicon=["🪂","🌤️","🌨️","🌥️","🌧️","☔","⛈️","☃️","😶‍🌫️","☁️","🌧️"];
        const anim=["nul","nul","nul","nul","raining","raining","raining","nul","nul","nul","raining"];

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
        document.getElementById("r1").classList.add(anim[position]);
        document.getElementById("r2").classList.add(anim[position]);
        document.getElementById("r3").classList.add(anim[position]);
        document.getElementById("r4").classList.add(anim[position]);
        document.getElementById("r5").classList.add(anim[position]);
       }
        else{
            document.getElementById("temp").style.backgroundColor="#9695E8";
        }}
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
        document.getElementById("clockbox").style.background="linear-gradient(140deg,#C4E759,#6DE195)";
       
    }
    function tb(){
        document.getElementById("clockbox").style.background="linear-gradient(240deg,#C1E3FF,#41C7AF)";
       

    }
    function tc(){
        document.getElementById("clockbox").style.background="linear-gradient(200deg,#8DEBFF,#6CACFF)";
       
    }
    function td(){
        document.getElementById("clockbox").style.background="linear-gradient(240deg,#DEB0DF,#A16BFE)";
        
        
    }
    function te(){
        document.getElementById("clockbox").style.background="linear-gradient(140deg,#FDEB82,#F78FED)";
        
        
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
    };
    function openwallpaper(){
        document.getElementById("wallpaperpopup").classList.add("openwallpaperwindow");
    };
    function closewallpaperpopup(){
        document.getElementById("wallpaperpopup").classList.remove("openwallpaperwindow");
    };
    function wa(){
        document.getElementById("a").style.backgroundImage="url('img1.jpg')";

    };
    function wb(){
        document.getElementById("a").style.backgroundImage="url('img2.webp')";
        

    };
    function wc(){
        document.getElementById("a").style.backgroundImage="url('img3.jpg')";
        

    };
    function wd(){
        document.getElementById("a").style.backgroundImage="url('img4.jpeg')";

    };
    function we(){
        document.getElementById("a").style.backgroundImage="url('img5.jpeg')";

    };

    
    
