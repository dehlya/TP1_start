import { State } from "./State.js";
import { SettingsLayout } from "../layout/SettingsLayout.js";
import { KeyHandler } from "../handler/KeyHandler.js";

export class SettingsState extends State {
  constructor(game) {
    super(game, "Settings");
    this.layout = new SettingsLayout(game);
    this.soundEnabled = true;
    this.musicEnabled = true;
    this.audio = new Audio(
      "../../../ressources/site/video/forest-lullaby-110624.mp3"
    );
    this.audio.loop = true;
    this.geolocationText = "Fetching location...";

    this.fetchGeolocation();
    this.keyHandler = new KeyHandler();
  }

  handleClick(event) {
    if (this.game.state !== this) return;
  
    let rect = this.game.canvas.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
  
    let startX = this.game.canvas.getWidth() * 0.5 - this.layout.buttonWidth / 2;
    const buttonMargin = this.game.canvas.getHeight() * 0.1; 
    let musicY = this.game.canvas.getHeight() * 0.5 + buttonMargin;
    let soundY = musicY - this.layout.buttonHeight - buttonMargin;
    const backY = this.game.canvas.getHeight() * 0.9;

    if (x >= startX && x <= startX + this.layout.buttonWidth && y >= soundY && y <= soundY + this.layout.buttonHeight) {
      this.layout.soundButton.onClick();
    } else if (x >= startX && x <= startX + this.layout.buttonWidth && y >= musicY && y <= musicY + this.layout.buttonHeight) {
      this.layout.musicButton.onClick();
    } else if (x >= startX && x <= startX + this.layout.buttonWidth && y >= backY && y <= backY + this.layout.buttonHeight) {
      this.game.goBack();
    }
  }
  
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
  }

  toggleMusic() {
    //TODO : move the variable to the player class
    //so it also changes it in the cookies and all the states
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.audio.play();
      console.log("MUSIC ON");
    } else {
      this.audio.pause();
      console.log("MUSIC OFF");
    }
  }

  fetchGeolocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const apiKey = "128f56106dba4193b50d8bb48e7d3d0d";
          const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              try {
                const data = JSON.parse(xhr.responseText);

                if (data.results && data.results.length > 0) {
                  this.geolocationText =
                    "Location: " + data.results[0].formatted;
                } else {
                  this.geolocationText = "Location not found";
                }
              } catch (error) {
                console.error(error);
                this.geolocationText = "Failed to fetch location";
              }

              this.game.state.render();
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
              console.error(`Request failed with status ${xhr.status}`);
              this.geolocationText = "Failed to fetch location";
              this.game.state.render();
            }
          };

          xhr.open("GET", apiUrl, true);
          xhr.send();
        },
        (error) => {
          console.error(error);
          this.geolocationText = "Geolocation error";
          this.game.state.render();
        }
      );
    } else {
      this.geolocationText = "Geolocation not supported";
      this.game.state.render();
    }
  }
  render() {
    this.layout.draw();
  }
  enter() {
    super.enter();
    this.handleClickBound = this.handleClick.bind(this);
    this.game.canvas.canvas.addEventListener('click', this.handleClickBound);
  }
  
  exit() {
    super.exit();
  }
  
  addCallbacks(){
  }
}
