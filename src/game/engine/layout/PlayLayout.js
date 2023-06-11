import { Layout } from "./Layout.js";
export class PlayLayout extends Layout {
    constructor(game) {
      super(game);
      this.background = "grey";
      this.title = "Play in progress...";
      this.showUsernameInput = false; // Flag to control the display of the username input window
    }
  
    draw() {
      this.addBackground();
      this.addTitle();
  
      if (this.showUsernameInput) {
        this.addUsernameInput(); // Display the username input window
      }
  
      super.draw();
    }
  
    // Method to display the username input window 
    addUsernameInput() {
      const usernameForm = document.createElement("form");
      usernameForm.style.position = "absolute";
      usernameForm.style.top = "50%";
      usernameForm.style.left = "50%";
      usernameForm.style.transform = "translate(-50%, -50%)";
      usernameForm.style.backgroundColor = "white";
      usernameForm.style.padding = "20px";
      usernameForm.style.borderRadius = "5px";
  
      const usernameLabel = document.createElement("label");
      usernameLabel.textContent = "Username: ";
      usernameLabel.style.display = "block";
      usernameLabel.style.marginBottom = "10px";
  
      this.usernameInput = document.createElement("input");
      this.usernameInput.type = "text";
      this.usernameInput.required = true;
      this.usernameInput.style.width = "200px";
  
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.textContent = "Submit";
  
      usernameForm.appendChild(usernameLabel);
      usernameForm.appendChild(this.usernameInput);
      usernameForm.appendChild(submitButton);
  
      // Submit event listener to handle form submission
      usernameForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        const username = this.usernameInput.value;
        if (this.validateUsername(username)) {
          this.showUsernameInput = false; // Hide the username input window
          // Proceed with loading the background and character
          this.loadBackground();
          this.loadCharacter();
        } else {
          this.displayErrorMessage("Invalid username. Please try again."); // Display error message
          return false;
        }
      });

      this.game.canvas.element.appendChild(usernameForm);
    }

    loadBackground() {
      this.layout.setBackgroundImage("../../../ressources/game/background/background_dungeon_final_v1.png");
    }

    loadCharacter() {
      this.layout.setCharacterImage("../../../ressources/game/character/idle_front.png");
      // this.layout.setCharacterAppearance("color: blue; size: 32px;");
    }
  
    // Method to validate the entered username
    validateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9]{3,12}$/; // Regular expression pattern for validation
        return usernameRegex.test(username);
    }
  }
  
