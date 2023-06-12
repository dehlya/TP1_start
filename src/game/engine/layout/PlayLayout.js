import { Layout } from "./Layout.js";
import { Character } from "../../character/Character.js";

export class PlayLayout extends Layout {
    constructor(game) {
        super(game);
        this.background = "grey"
        this.title = "Play in progress...";
        this.showUsernameInput = false; // Flag to control the display of the username input window
        this.character = new Character(
            this.game.canvas.getWidth() / 2,
            this.game.canvas.getHeight() / 2,
            this.game.canvas.getCanvas(),
            this.game.canvas.getContext()
        );

        this.img = new Image();
        this.img.src = "../../../ressources/game/background/background_dungeon_final_v2.png";
    }

    draw() {
        this.addBackground();
        this.addCharacter();
        this.addTitle();

        /*if (this.showUsernameInput) {
            this.addUsernameInput(); // Display the username input window
        }*/

        super.draw();
    }

    addBackground() {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
        this.context.drawImage(this.img, 0, 0, this.game.canvas.getWidth(), this.game.canvas.getHeight());
    }

    // Method to display the username input window
    /*
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
    }*/

    addTitle() {
        // Add your title rendering logic here
    }

    addCharacter() {
        const character = this.character;

        const img = new Image();
        img.src = character.currentImage;
        img.onload = () => {
            character.render();
        };
    }
}
