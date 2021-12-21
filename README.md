# Zork
Enter the world of interactive fiction, javascript style. 

![Zork Image](http://raeinblack.com/zork.png)

## Origins Of Zork
[Zork](https://en.wikipedia.org/wiki/Zork) is one of the earliest interactive fiction computer games. Originally written around 1977 it used the MDL Programming Language on a PDP-10 Computer. Since then programming has come a long way.

## :hammer: Play Zork
Zork is currently in beta, but you can play it in your browser here: [Beta Zork](https://raeinblack.com/projects/zork). There are a few minor bugs, and some rooms have yet to have been connected. But you can still travel around the map.

Alternatively, if you'd like to host your own version of Zork, you can! Get the project by cloning the repo, or grabbing a zip of the latest [release](https://github.com/DLzer/Zork/releases/latest). The build is intentionally not using packages to make it easy to drag and drop virtually anywhere that JS is supported.

## :satellite: Abstract

I am by no means a Javascript developer, nor do I use Javascript on a daily basis. This project is primarily aimed at practicing Javascript, and for fun.

## :mag_right: Layout

Being a non-compile project the layout is kept relatively simple.

* index.html
* /assets
    * /css
        * `style.css` The stylesheet
    * /js
        * /Domain
            * /CLI
                * `CLI.js` The DOM CLI interface class
            * /GameEngine
                * `GameEngine.js` The GameEngine class
            * /Item
                * `Item.js` The Item library class
            * /Player
                * `Player.js` The Player state class
            * /Room
                * `Room.js` The Room library class

### Class Documentation

- **CLI**
    -- The CLI is a command interface class for interacting with the DOM. The responsibility is to accept commands from the user, validate them, parse them and pass them back for execution. Additionally the CLI is responsbile for receiving output instructions to print to the DOM CLI.

- **Player**
    -- The Player class is responsible for managing the players state. When saved the players current class state is stored as a JSON string in local storage. When the app reloads, it checks for the saved game and hydrates the player model if it exists.

- **Item**
    -- The Item class is meant as a factory for creating items. Additionally the `Item.js` file holds a static list of referencable item objects.

- **Room**
    -- The Room class is meant as a factory for creating rooms and their exits using cardinal directions. Additionally the `Room.js` file holds a static list of referencable room objects.

- **GameEngine**
    -- The `GameEngine.js` file holds a single `GameEngine` object which is responsible for tying all other components together. A future goal is to abstract as much functionality to each domain as possible to keep the scope of the GameEngine strictly for interlacing other classes.


## :wrench: Contributing

1. Fork it
2. Modify it
3. Create your feature/fix branch (`git checkout -b feature/SomeFeature`)
4. Commit your changes ( be descriptive )
5. Push your branch
6. Create a new Pull Request to have your branch reviewed

Anyone is free to fork, modify and create PR's. If you're only interested in playing the game, you can help contribute by creating issues for any bugs you find. 
