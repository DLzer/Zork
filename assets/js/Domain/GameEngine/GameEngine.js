GameEngine = {

    roomView:       $('.room'),
    scoreBoard:     $('#score-int'),
    movesBoard:     $('#move-int'),

    /**
     * Start the game engine
     */
    init: () => {
        console.log('**GameEngine: Initializing...')
        // GameEngine.startCommandListener()
        GameEngine.initializeCLI();
        GameEngine.cli.startCommandListener();
        console.log('**GameEngine: Determining player state');
        GameEngine.loadSavedGame()
        console.log('**GameEngine: Last game state:', GameEngine.player);
        GameEngine.lookAction();
    },

    initializeCLI: () => {
        let outputElement =  $('.commandline');
        let inputElement =   $('input');
        let cliContainer =   $('#content-inner');
        GameEngine.cli = new CLI(inputElement, 
                                 outputElement, 
                                 cliContainer);
    },

    /**
     * Check for a previously saved game
     */
    loadSavedGame: () => {
        if(localStorage.getItem('zorkSaveGameState')) 
        {
            savedGame = JSON.parse(localStorage.getItem('zorkSaveGameState'));
            GameEngine.player = new Player(
                savedGame.inventory,
                savedGame.moves,
                savedGame.score,
                savedGame.currentRoom,
                savedGame.previousRoom,
                savedGame.gameIsSaved,
                savedGame.verbose
            )
        } 
        else 
        {
            GameEngine.player = new Player(
                [], 0, 0, "westOfHouse", null, false, false
            );
        }
    },

    /**
     * Save a current gameState object
     */
    saveGame: () => {
        GameEngine.player.gameIsSaved = true;
        localStorage.setItem('zorkSaveGameState', JSON.stringify(GameEngine.player));
        GameEngine.cli.output("Your game state has been saved.");
        console.log("**GameEngine: Game state saved");
    },

    /**
     * Reset a gameState object
     */
    resetGame: () => {
        GameEngine.player = new Player(
            [], 0, 0, "westOfHouse", null, false, false
        );
        localStorage.removeItem('zorkSaveGameState');
        GameEngine.cli.output("Your game state has been reset.");
        console.log("**GameEngine: Game state reset");
    },

    /********* CORE COMMANDS *********/

    // Outputs a help dialog to the player
    printHelp: () => {
        GameEngine.cli.output("Here is a list of acceptable commands:");
        var acceptedCommands = ['> go [direction]', '> north', '> east', '> south', '> west', '> up', '> down', '> look', '> open', '> enter', '> exit','> climb', '> brief [ short descriptions ]', '> verbose [ long descriptions ]', '> help', '> take', '> bag', '> save [ Save current game]', '> reset [ Reset game including save ]'];
        for(i = 0; i < acceptedCommands.length; i++) {
            GameEngine.cli.output(acceptedCommands[i]);
        }
    },

    printInventory: () => {
        let inventory = GameEngine.player.getPlayerInventory();

        if(inventory === undefined || inventory.length == 0) {
			GameEngine.cli.output("There is nothing in your bag!");
		} else {
			GameEngine.cli.output("Your bag contains:");
			for(j=0;j<inventory.length;j++) {
				GameEngine.cli.output(GameEngine.player.inventory[j]);
			}
		}
    },
    // Sets the output of items and rooms to verbose mode
    setVerboseOutput: () => {
        GameEngine.player.setVerboseMode(true);
        GameEngine.cli.output("ZORK is now in its \"verbose\" mode, which always gives long descriptions of locations (even if you've been there before).");
    },
    // Sets the output of items and rooms to brief mode
    setBriefOutput: () => {
        GameEngine.player.setVerboseMode(false);
        GameEngine.cli.output("ZORK is now in its normal \"brief\" printing mode, which gives long descriptions of places never before visited, and short descriptions otherwise.");
    },

    getCurrentRoom: () => {
        return GameEngine.player.getCurrentLocation();
    },
    
    getPreviousRoom: () => {
        return GameEngine.player.getPreviousLocation();
    },

    /********* DIRECTIONAL COMMANDS *********/

    lookAction: () => {

        let currentRoom = GameEngine.getCurrentRoom();

        if( !roomList[currentRoom].roomIsDark ) {

			GameEngine.cli.output("<strong>" + roomList[currentRoom].name + "</strong>");
			GameEngine.cli.output(roomList[currentRoom].look);
		
			GameEngine.showItems(roomList[currentRoom]);

		} else if(roomList[currentRoom].roomIsDark && !lantern.itemInUse) {

			GameEngine.cli.output("<strong>" + roomList[currentRoom].darkText + "</strong>");

		} else if(roomList[currentRoom].roomIsDark && lantern.itemInUse) {

			GameEngine.cli.output("<strong>" + roomList[currentRoom].name + "</strong>");
			GameEngine.cli.output(roomList[currentRoom].look);
		
			GameEngine.showItems(roomList[currentRoom]);

		}
    },

    showItems: (room) => {

        var itemlist = [];
	
		for (var i = 0; i < room.items.length; i++) {
			if (room.items[i].specialdesc) 
            {
				GameEngine.cli.output(room.items[i].specialdesc + "<br>");
			}
			else 
            {
				itemlist.push(room.items[i].description);
			}
		}

		if (itemlist.length === 1) 
        {
			GameEngine.cli.output("There is a " + itemlist[0] + " here.");
		}
		else if (itemlist.length > 1) 
        {
			var str = "";
			for (var i = 0; i < itemlist.length; i++) {
				if (!itemlist[i + 1]) {
					str.concat(itemlist[i]);
				}
				else {
					str.concat(itemlist[i] + ", ");
				}
			}
			GameEngine.cli.output("There is a " + str + " here.");
		}
    },

    goAction: (direction) => {

        let currentRoom = GameEngine.getCurrentRoom();
        let lDirection = direction.toLowerCase();

        if ( lDirection == "back" ) {
            console.log("**GameEngine: Moving "+lDirection);
            GameEngine.player.setCurrentLocation(GameEngine.player.getPreviousLocation());
            GameEngine.player.setPreviousLocation(roomList[currentRoom].varName);
            currentRoom = GameEngine.getCurrentRoom();
        } else {

            if (roomList[currentRoom][lDirection] === undefined) 
            {
                GameEngine.cli.output("You can't go that way.");
                return;
            }

            console.log("**GameEngine: Moving "+lDirection);
            GameEngine.player.setPreviousLocation(roomList[currentRoom].varName);
            GameEngine.player.setCurrentLocation(roomList[currentRoom][lDirection].varName);
            currentRoom = GameEngine.getCurrentRoom();
        }

        if (GameEngine.player.getVerboseMode()){
            if (currentRoom.visited) {
                GameEngine.cli.output("<strong>" + roomList[currentRoom].name + "</strong>");
                GameEngine.showItems(roomList[currentRoom]);
            }
            else {
                GameEngine.lookAction();
                roomList[currentRoom].visited = true;
            }
        }

        else {
            GameEngine.lookAction();
            roomList[currentRoom].visited = true;
        }
    },

    openAction: (direction) => {

        if ( direction == "EGG" ) {
            GameEngine.useAction("EGG");
            return;
        }

        let currentRoom = GameEngine.getCurrentRoom();

        if (roomList[currentRoom]["open"] === undefined || !roomList[currentRoom]["open"]) 
        {
            GameEngine.cli.output("You can't open that.");
        }
        else 
        {

        console.log("**GameEngine: Opening room");
        GameEngine.player.setPreviousLocation(roomList[currentRoom].varName);
        GameEngine.player.setCurrentLocation(roomList[currentRoom]["open"].varName);
        currentRoom = GameEngine.getCurrentRoom();

            if (GameEngine.player.getVerboseMode()){
                if (currentRoom.visited) {
                    GameEngine.cli.output("<strong>" + roomList[currentRoom].name + "</strong>");
                    GameEngine.showItems(roomList[currentRoom]);
                }
                else {
                    GameEngine.lookAction();
                    roomList[currentRoom].visited = true;
                }
            }

            else {
                GameEngine.lookAction();
                roomList[currentRoom].visited = true;
            }
        }
    },

    takeAction: (item) => {

        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];
        let currentRoom = GameEngine.getCurrentRoom();

        if ( !roomList[currentRoom].items.includes(itemObject) ) {
            GameEngine.cli.output("A "+lItem+" does not exist here.");
            return;
        }

        if ( GameEngine.player.inventory[itemObject] ) {
            GameEngine.cli.output("The "+lItem+" is already in your bag.");
            return;
        }

        GameEngine.player.addToInventory(lItem);
        GameEngine.cli.output("You put the "+lItem+" in your bag.");
        
    },

    readAction: (item) => {
        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];

        if (!GameEngine.player.inventory.includes(lItem))
        {
            GameEngine.cli.output("You don't own a "+lItem+ " to read.");
            return;
        }

        if (!itemObject.actionArray.includes("read"))
        {
            GameEngine.cli.output("This is not a readable item.");
            return;
        }

        GameEngine.cli.output(itemObject.contents);
    },

    dropAction: (item) => {

        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];

        if (!GameEngine.player.inventory.includes(lItem))
        {
            GameEngine.cli.output("You don't own a "+lItem+ " to drop.");
            return;
        }

        let currentRoom = GameEngine.getCurrentRoom();
        roomList[currentRoom].items.push(itemObject);

        GameEngine.player.removeFromInventory(lItem);
        GameEngine.cli.output("You have dropped the "+lItem);

    },

    useAction: (item) => {

        if ( !item ) {
            GameEngine.cli.output("Use what?");
        }

        let lItem = item.toLowerCase();

        if (!GameEngine.player.getPlayerInventory().includes(lItem)) {
            GameEngine.cli.output("You don't have a "+lItem+" to use!");
        }

        if (itemObjects[lItem].inUse) {
            GameEngine.cli.output("The item is already in use. Putting item away.");
            itemObjects[lItem].inUse = false;
            GameEngine.lookAction();
        } else {
            if ( lItem == "egg") {
                GameEngine.cli.output("<strong>"+itemObjects[lItem].openDesc+"</strong>");
                if ( GameEngine.getCurrentRoom() == "tree") {
                    GameEngine.goAction("back");
                    return;
                }
            } else {
                GameEngine.cli.output("<strong>"+itemObjects[lItem].useDesc+"</strong>");
            }
            itemObjects[lItem].inUse = true;
            GameEngine.lookAction();
        }

    },

}

$(window).on('load', function() {
    GameEngine.init();
})