import { State } from "./State.js";
import { SettingsLayout } from "../layout/SettingsLayout.js";
import { KeyHandler } from "../handler/KeyHandler.js";

export class SettingsState extends State {
  constructor(game) {
    super(game);
    this.layout = new SettingsLayout(game);
    this.soundEnabled = true;
    this.musicEnabled = true;
    this.audio = new Audio(
      "../../../ressources/site/video/forest-lullaby-110624.mp3"
    );
    this.audio.loop = true;
    this.geolocationText = "Fetching location...";

    game.canvas.canvas.addEventListener("click", (event) =>
      this.handleClick(event)
    );

    this.fetchGeolocation();
    this.keyHandler = new KeyHandler();
  }

  handleMouseMove(event) {
    let rect = this.game.canvas.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let buttonMargin = 10;
    let startX = (this.game.canvas.getWidth() - this.layout.buttonWidth) / 2;
    let soundY =
      this.game.canvas.getHeight() / 2 -
      this.layout.buttonHeight -
      buttonMargin;
    let musicY = this.game.canvas.getHeight() / 2 + buttonMargin;
    let backY =
      this.game.canvas.getHeight() - this.layout.buttonHeight - buttonMargin;

    this.layout.soundButton.hover = this.isHover(x, y, startX, soundY);
    this.layout.musicButton.hover = this.isHover(x, y, startX, musicY);
    this.layout.backButton.hover = this.isHover(x, y, startX, backY);
  }

  isHover(x, y, startX, startY) {
    return (
      x >= startX &&
      x <= startX + this.layout.buttonWidth &&
      y >= startY &&
      y <= startY + this.layout.buttonHeight
    );
  }

  handleClick(event) {
    if (this.game.state !== this) return;

    let rect = this.game.canvas.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let buttonMargin = 10;
    let startX = (this.game.canvas.getWidth() - this.layout.buttonWidth) / 2;
    let soundY =
      this.game.canvas.getHeight() / 2 -
      this.layout.buttonHeight -
      buttonMargin;
    let musicY = this.game.canvas.getHeight() / 2 + buttonMargin;
    let backY =
      this.game.canvas.getHeight() - this.layout.buttonHeight - buttonMargin;

    if (this.isHover(x, y, startX, soundY)) {
      this.layout.soundButton.onClick();
    } else if (this.isHover(x, y, startX, musicY)) {
      this.layout.musicButton.onClick();
    } else if (this.isHover(x, y, startX, backY)) {
      this.layout.backButton.onClick();
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

  toMenu() {
    this.game.setCurrentState("Menu");
  }

  //   async fetchGeolocation() {
  //     if ('geolocation' in navigator) {
  //         navigator.geolocation.getCurrentPosition(async (position) => {
  //             const latitude = position.coords.latitude;
  //             const longitude = position.coords.longitude;

  //             const apiKey = '128f56106dba4193b50d8bb48e7d3d0d';
  //             const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  //             try {
  //                 const response = await fetch(apiUrl);
  //                 const data = await response.json();

  //                 if (data.results && data.results.length > 0) {
  //                     this.geolocationText = data.results[0].formatted;
  //                 } else {
  //                     this.geolocationText = 'Location not found';
  //                 }
  //             } catch (error) {
  //                 console.error(error);
  //                 this.geolocationText = 'Failed to fetch location';
  //             }

  //             this.game.state.render();
  //         }, (error) => {
  //             console.error(error);
  //             this.geolocationText = 'Geolocation error';
  //             this.game.state.render();
  //         });
  //     } else {
  //         this.geolocationText = 'Geolocation not supported';
  //         this.game.state.render();
  //     }
  // }

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
    this.addCallbacks();
  }

  exit() {
    super.exit();
    this.keyHandler.removeAllCallbacks();
  }
  addCallbacks(){
    this.keyHandler.addCallback('KeyM', 'keypress', () => {
      this.toMenu();
    })
  }
}
