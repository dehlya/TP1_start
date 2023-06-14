export class Player {
    constructor() {

        this.playedTime = 0;
        this.score = 0;
        this.level = 1;
        this.pseudo = "anonymous";
        this.sound = true;
        this.music = false; 

        this.getCookies();
       
    }
    
    getCookies() {
        if(document.cookie.length > 0) {
            this.playedTime = this.getCookie(this.playedTime);
            this.score = this.getCookie(this.score);
            this.level = this.getCookie(this.level);
            this.pseudo = this.getCookie(this.pseudo);
            this.sound = this.getCookie(this.sound);
            this.music = this.getCookie(this.music);
        }
        else {
            this.setCookies();
        }
    }
    setCookies()
    {
        this.setCookie("playedTime", this.playedTime, 365);
        this.setCookie("score", this.score, 365);
        this.setCookie("level", this.level, 365);
        this.setCookie("pseudo", this.pseudo, 365);
        this.setCookie("sound", this.sound, 365);
        this.setCookie("music", this.music, 365);
        console.log("set");
    }
    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }
    
    setPseudo(pseudo) {
        this.setCookie("pseudo", pseudo, 365)
    }
    getPseudo() {
        return this.getCookie("pseudo");
    }
    setPlayedTime(playedTime) {
        this.setCookie("playedTime", playedTime, 365)
    }
    getPlayedTime() {
        return this.getCookie("playedTime");
    }
    setLevel(level) {
        this.setCookie("level", level, 365)
    }
    getLevel() {
        return this.getCookie("level");
    }
    setScore(score) {
        this.setCookie("score", score, 365)
    }
    getScore() {
        return this.getCookie("score");
    }
    setSound(sound) {
        this.setCookie("sound", sound, 365)
    }
    getSound() {
        return this.getCookie("sound");
    }
    setMusic(music) {
        this.setCookie("music", music, 365)
    }
    getMusic() {
        return this.getCookie("music");
    }
    
}