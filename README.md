# The_Invoked_One

Welcome in *The Invoked One*

This game ihas been made in Vanilla JS for a School Project.
We had to develop a JS game and ... here it is !
 
## Architecture 
 
In order to have an architecture fitting the context of an entire game made in Javascript, WITHOUT a framework, we first focused on the game architecture. 

### Game Engine
The game Engine is organised as following : 
- States
    - This is the States of the game. 
    - It separates the game in different states, regarding if it is on play mode or on the menu for example.
    - It allows us to handle and manage the changes of the values of certain variables depending on the state, for example the refresh rate of the frames.
    - It's made following a State pattern.
- Layouts
    - The layouts allow us to have a specific layout linked to a state, in order to manage the changes on the layouts easily.
    - This follows the State pattern of the states obviously.
- Handler
    - The handler folder is for the key handling. It means it's the part of the game that handles what happens when you specific key on your keyboard. 
    - Each State has it's own keys that are activated when entering the state and deactivated when exiting it.
- Canvas
    - The canvas folder is, as the name says, for the Canvas components. 
    - The Canvas.js is the class for the normal canvas.
    - The virtual Canvas is a type of canvas we use tin order to not regenerate every single part of the display when redrawing the Canvas. For example, in the play state, we display some information on the surrent state of the character. We dont need to redraw it every single time we redraw the frame, unlike the caracter itself. The Pause Button never changes so we don't nee to regenerate it. The virtual Canvas were made for that specific purpose. Those are transparent canvas.
- Interacter
    - The Interacter is for the button class. It could have other types of interacters but not in this specific case. 
- Player
    - The player part is specific to the player, not to the character.
    - It manages the cookies in order for the player to not loose their game information and settings. 

## Website

To have the website in react you have to:

$ npm install

in your terminal, and then run the command

$ npm start

The website may take a minute but then launches in localhost


## 

