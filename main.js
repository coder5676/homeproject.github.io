 let temppopup=document.getElementById("temppop");
   document.addEventListener("click",()=>{
         document.documentElement.requestFullscreen();
    });
    /*open temp popup*/
    function opentemp(){
        readout(speakgreet);
        readout(speaktemp);
        temppopup.classList.add("open-temppop");
    };
    function closetemp(){
        temppopup.classList.remove("open-temppop");
    };
    var rem="none";
    var about="none";
    var speakreminder="You dont have any current reminders";
    function config(){
        var remh=document.getElementById("hr").value;
        var remm=document.getElementById("mi").value;
        if(remh<=9 && String(remh)!="00"){
            remh="0"+remh;
        }
        if(remm<=9 && String(remm)!="00"){
            remm="0"+remm;
        }
        document.getElementById("remindertime").value=remh+"∶"+remm;
        var remtime=document.getElementById("remindertime").value;
        var remabout=document.getElementById("remabout").value;
        return [remtime,remabout];
    } function save(){
        [rem,about]=config();
        document.getElementById("setreminder").classList.remove("opensetreminder");
        speakreminder="you have a reminder that says : "+about;
    }
    function stop(){
         rem="none";
         about="none";
         document.getElementById("remainderbox").classList.remove("openremainder");
         document.getElementById("reminderaudio").pause();
         readout("this reminder will not play again")
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
        readout("reminder is paused for 5 minutes");
        document.getElementById("reminderaudio").pause();
    }
    var speakday="none";
    var speaktime="none";
    var show="00:00"
    var speakgreet="hello";
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
        let currenttime=hours+"∶"+min;
        var currtime=String(hours)+"∶"+String(min);
        show=currtime;
        week=["Sun","Mon","Tue","Wed","Thr","Fri","Sat"];
        montharr=["january","february","march","April","May","june","july","august","september","october","november","december"]
        speakday=week[day]+""+date+""+montharr[month];
        speaktime=hours+"hours"+min+"minutes";
        document.getElementById("time").innerHTML=currenttime;
        document.getElementById("daydate").innerHTML=week[day]+" "+date;
        document.getElementById("hm").innerHTML=hours+"∶"+min;
        
        if (hours>=7 && hours < 12) {
        text="Good morning";
        document.getElementById("temppop").style.backgroundColor="#A5BDEF";
            document.getElementById("bgimage").innerHTML="🦚";
            document.getElementById("sun").innerHTML="🌴";
            document.getElementById("info1").style.background="linear-gradiant(150deg,rgb(119, 148, 183),rgb(70, 20, 234))";
        }      
        else if (hours>=12 && hours <16) {
            text='Good afternoon ';
            document.getElementById("temppop").style.backgroundColor="#5A90E2";
            document.getElementById("bgimage").innerHTML="🌾";
            document.getElementById("sun").innerHTML="☀️";
            document.getElementById("info1").style.background="linear-gradient(150deg,rgb(115, 235, 201),rgb(1, 217, 120))";  }
            else if(hours>=16 && hours<19){
            text='Good evening';
            document.getElementById("temppop").style.backgroundColor="#F0B865";
            document.getElementById("bgimage").innerHTML="🐛";
            document.getElementById("sun").innerHTML="🌻";
            document.getElementById("info1").style.background="linear-gradient(150deg,rgb(228, 233, 102),rgb(209, 164, 73))";  }
            

        else {
            text="Good night";
            document.getElementById("temppop").style.backgroundColor="#1D1632";
            document.getElementById("bgimage").innerHTML="🌑";
            document.getElementById("sun").innerHTML="✨";
            document.getElementById("info1").style.background="linear-gradient(150deg,rgb(89, 89, 103),rgb(0, 0, 0))";
           
        }
        document.getElementById("greet").innerHTML=text;
        document.getElementById("greet2").innerHTML=text;
        document.getElementById("greet3").innerHTML=text;
       
        speakgreet=text;
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
    var speaktemp="sorry the temperature is not available";
    async function checkweather(city){
        const response=await fetch(apiurl+`&appid=${apikey}`+`&q=${city}`);
        var data= await response.json();
        console.log(data);
        temp=Math.round(data.main.temp)+"°";
        const desc=["clear sky","few clouds","scattered clouds","broken clouds","shower rain","rain","thunderstorm","snow","mist","overcast clouds","light rain","moderate rain","heavy intensity rain"];
        const descicon=["🪂","🌤️","🌨️","🌥️","🌧️","☔","⚡","☃️","😶‍🌫️","☁️","🌧️","☔","⛈️"];
        const anim=["nul","nul","nul","nul","raining","raining","raining","nul","nul","null","raining","raining","raining"];
        const quote=[" it's a nice day ","Clouds are beautiful outside","Don't forget your umbrella","Winds are speedy today","Look plants are so happy","Weather is wet today","Avoid going out it's lightning","Nice day for a snowman","Drive safe low visibility","It could rain just wait","Nice time for a tea","Outside is beautiful in rain.","Heavy rain avoid going out today"];

        document.getElementById("tempno").innerHTML=temp;
        document.getElementById("tempfont").innerHTML=temp;

        document.getElementById("windspeed").innerHTML=data.wind.speed+" km/h";
        document.getElementById("humidity").innerHTML=data.main.humidity+"%";
        document.getElementById("visibility").innerHTML=data.visibility;
        document.getElementById("description").innerHTML=data.weather[0].description;
        document.getElementById("location").innerHTML=city;
        document.getElementById("feelslike").innerHTML="Feels like : "+data.main.feels_like+"°";
        speaktemp =" it is "+temp+" today with"+data.weather[0].description;
        const d=data.weather[0].description;
        let position=desc.indexOf(d);
        console.log(position);
        document.getElementById("condition").innerHTML=data.weather[0].main;
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
        document.getElementById("newsframe").classList.remove("opennewsframe");
        document.getElementById("newsframe").src="";
        document.getElementById("swipe").innerHTML="⌂";
        document.getElementById("swipe").style.color="white";
        document.getElementById("swipe").style.backgroundColor=" rgba(5, 5, 5, 0)";
        
    } ;
    function openrecipe(){
        document.getElementById("ambientbox").classList.add("openambientbox");
        document.getElementById("swipe").innerHTML="⌂";

    };
    function closeambient(){
        document.getElementById("ambientbox").classList.remove("openambientbox");


    };
    function opennews(){
        readout("opening news on n d t v")
        document.getElementById("newsframe").classList.add("opennewsframe");
        document.getElementById("newsframe").src="https://www.ndtv.com/";
        document.getElementById("swipe").style.fontSize="40px";
        document.getElementById("swipe").style.color="white";
        document.getElementById("swipe").style.backgroundColor="black";


    };
    function openclock(){
        document.getElementById("clockbox").classList.add("openclockbox");
        document.getElementById("remainderinfo").innerHTML=speakreminder;
        
        readout("The time is "+speaktime);
        
    };
    function closeclock(){
        document.getElementById("clockbox").classList.remove("openclockbox");
    };
    function ta(){
        document.getElementById("remainderbox").style.background="linear-gradient(140deg,#C4E759,#6DE195)";
        document.getElementById("themeswindow").classList.remove("openthemewindow");
        document.getElementById("clockbox").style.background="linear-gradient(140deg,#C4E759,#6DE195)";
        
       
    };
    function tb(){
        document.getElementById("remainderbox").style.background="linear-gradient(240deg,#C1E3FF,#41C7AF)";
        document.getElementById("clockbox").style.background="linear-gradient(240deg,#C1E3FF,#41C7AF)";

        document.getElementById("themeswindow").classList.remove("openthemewindow");
       

    };
    function tc(){
        document.getElementById("remainderbox").style.background="linear-gradient(200deg,#8DEBFF,#6CACFF)";
        document.getElementById("themeswindow").classList.remove("openthemewindow");
        document.getElementById("clockbox").style.background="linear-gradient(200deg,#8DEBFF,#6CACFF)";
       
    };
    function td(){
        document.getElementById("remainderbox").style.background="linear-gradient(240deg,#DEB0DF,#A16BFE)";
        document.getElementById("themeswindow").classList.remove("openthemewindow");
        document.getElementById("clockbox").style.background="linear-gradient(240deg,#DEB0DF,#A16BFE)";
        
        
    };
    function te(){
        document.getElementById("remainderbox").style.background="linear-gradient(140deg,#FDEB82,#F78FED)";
        document.getElementById("themeswindow").classList.remove("openthemewindow");
        document.getElementById("clockbox").style.background="linear-gradient(140deg,#FDEB82,#F78FED)";
        
        
    };function openthemewindow(){
        document.getElementById("themeswindow").classList.add("openthemewindow");
    };
    function openmusic(){
        const a=document.getElementById("musican");
        a.setAttribute("href","https://www.jiosaavn.com/");
        readout("opening jio saavan ");
    };
    function openyoutube(){
       const b= document.getElementById("youtubeopen");
       b.setAttribute("href","https://www.youtube.com/");
        readout("opening youtube");
    };
   function openremainder(){
        document.getElementById("setreminder").classList.add("opensetreminder");
        readout(speakreminder);
    };
    function closerem(){
        document.getElementById("setreminder").classList.remove("opensetreminder");

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
        document.getElementById("a").style.backgroundImage="url('img4.jpg')";

    };
    function we(){
        document.getElementById("a").style.backgroundImage="url('img5.webp')";

    };
    const searchform=document.getElementById("searchform");
    const searchforminput=searchform.querySelector("input");
    const speechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    const recognition=new speechRecognition();

    function openassistant(){
        recognition.start();
        };
    recognition.onstart=function(){ 
        console.log("started");
        document.getElementById("assistantbox").classList.add("openassistantbox");
        document.getElementById("assistanton").play();

            
        };
    
    recognition.onend=function(){
        document.getElementById("assistantbox").classList.remove("openassistantbox");
        document.getElementById("assistantoff").play();
        searchform.focus();

        

    };
    const result=document.getElementById("request");
    recognition.onresult=(event)=>{
        const transcript=String(event.results[0][0].transcript).toLowerCase();
        result.value=transcript;
        var ind=-1;
        const keywords=["temperature","time","skype","date","day","they","hello"];
        const words=[speaktemp,speaktime,speaktime,speakday,speakday,speakday,speakgreet];
        ind=keywords.indexOf(transcript);
        console.log(ind);
        if(ind>=0){
            readout(words[ind]);
            

        }
        else if(ind==-1){
        searchforminput.value=transcript;
        searchform.focus();
        setTimeout(()=>{
            searchform.submit();
        }

        )

        }
        else{
            readout("Sorry cant hear you");
        }



    }
    
    function closeassistant(){
        recognition.stop();
    }
    

    

    
    function readout(message){
        let speech= new SpeechSynthesisUtterance();
        let voices=speechSynthesis.getVoices();
        speech.voice=voices[3];
        speech.text=message;
        window.speechSynthesis.speak(speech);

    };
    function openview(){
        document.getElementById("info1").classList.toggle("openinfo1");
        document.getElementById("time").classList.toggle("timestyle");
        document.getElementById("info2").classList.toggle("openinfo2");
        document.getElementById("info3").classList.toggle("openinfo3");
        document.getElementById("weathericon1").classList.toggle("removeelement");
        document.getElementById("temp").classList.toggle("tempstyle");
        document.getElementById("daydate").classList.toggle("daydatestyle");
    }
    function pa1(){

        if(document.getElementById("b1").innerHTML=="RAINING"){
            document.getElementById("b1").innerHTML="▷";
            document.getElementById("mainbutton").innerHTML="||";
            document.getElementById("a1").play();
            document.getElementById("a2").pause();
            document.getElementById("a3").pause();
            document.getElementById("a4").pause();
            document.getElementById("a5").pause();
            document.getElementById("b2").innerHTML="PIANO";
            document.getElementById("b3").innerHTML="FOREST";
            document.getElementById("b4").innerHTML="MOUNTAIN";
            document.getElementById("b5").innerHTML="AMBIENT MUSIC";
            document.getElementById("t").innerHTML="RAINING";





        }
        else{
            document.getElementById("b1").innerHTML="RAINING";
            document.getElementById("mainbutton").innerHTML="▷";
            document.getElementById("a1").pause();
        }

    }
    function pa2(){
        if(document.getElementById("b2").innerHTML=="PIANO"){
            document.getElementById("b1").innerHTML="RAINING";
            document.getElementById("mainbutton").innerHTML="||";
            document.getElementById("a1").pause();
            document.getElementById("a2").play();
            document.getElementById("a3").pause();
            document.getElementById("a4").pause();
            document.getElementById("a5").pause();
            document.getElementById("b2").innerHTML="▷";
            document.getElementById("b3").innerHTML="FOREST";
            document.getElementById("b4").innerHTML="MOUNTAIN";
            document.getElementById("b5").innerHTML="AMBIENT MUSIC";
            document.getElementById("t").innerHTML="PIANO";

        }
        else{
            document.getElementById("b2").innerHTML="PIANO";
            document.getElementById("a2").pause();
            document.getElementById("mainbutton").innerHTML="▷";


        }

    }
    function pa3(){
        if(document.getElementById("b3").innerHTML=="FOREST"){
            document.getElementById("b1").innerHTML="RAINING";
            document.getElementById("mainbutton").innerHTML="||";
            document.getElementById("a1").pause();
            document.getElementById("a2").pause();
            document.getElementById("a3").pause();
            document.getElementById("a4").pause();
            document.getElementById("a5").play();
            document.getElementById("b2").innerHTML="PIANO";
            document.getElementById("b3").innerHTML="▷";
            document.getElementById("b4").innerHTML="MOUNTAIN";
            document.getElementById("b5").innerHTML="AMBIENT MUSIC";
            document.getElementById("t").innerHTML="FOREST";

        }
        else{
            document.getElementById("b3").innerHTML="FOREST";
            document.getElementById("a5").pause();
            document.getElementById("mainbutton").innerHTML="▷";


        }

    }
    function pa4(){
        if(document.getElementById("b4").innerHTML=="MOUNTAIN"){
            document.getElementById("b1").innerHTML="RAINING";
            document.getElementById("mainbutton").innerHTML="||";
            document.getElementById("a1").pause();
            document.getElementById("a2").pause();
            document.getElementById("a3").pause();
            document.getElementById("a4").play();
            document.getElementById("a5").pause();
            document.getElementById("b2").innerHTML="PIANO";
            document.getElementById("b3").innerHTML="FOREST";
            document.getElementById("b4").innerHTML="▷";
            document.getElementById("b5").innerHTML="AMBIENT MUSIC";
            document.getElementById("t").innerHTML="MOUNTAIN";

        }
        else{
            document.getElementById("b4").innerHTML="MOUNTAIN";
            document.getElementById("a4").pause();
            document.getElementById("mianbutton").innerHTML="▷";

           
        }

    }
    function pa5(){
        if(document.getElementById("b5").innerHTML=="AMBIENT MUSIC"){
            document.getElementById("b1").innerHTML="RAINING";
            document.getElementById("mainbutton").innerHTML="||";
            document.getElementById("a1").pause();
            document.getElementById("a2").pause();
            document.getElementById("a3").play();
            document.getElementById("a4").pause();
            document.getElementById("a5").pause();
            document.getElementById("b2").innerHTML="PIANO";
            document.getElementById("b3").innerHTML="FOREST";
            document.getElementById("b4").innerHTML="MOUNTAIN";
            document.getElementById("b5").innerHTML="▷";
            document.getElementById("t").innerHTML="AMBIENT MUSIC";

        }
        else{
            document.getElementById("b5").innerHTML="AMBIENT MUSIC";
            document.getElementById("a3").pause();
            document.getElementById("mainbutton").innerHTML="▷";
            

        }

    };
    function mainplay(){
        const n=["RAINING","PIANO","FOREST","MOUNTAIN","AMBIENT MUSIC","Happy"];
        const song=["a1","a2","a5","a4","a3","a6"];
        const l=document.getElementById("t").innerHTML;
        let p=n.indexOf(l);
        if(document.getElementById("mainbutton").innerHTML=="▷"){
            document.getElementById("mainbutton").innerHTML="||";
            document.getElementById(song[p]).play();
        }
        else{
            document.getElementById("mainbutton").innerHTML="▷";
            document.getElementById(song[p]).pause();


        }

    }
