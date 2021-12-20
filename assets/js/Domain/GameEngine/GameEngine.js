GameEngine = {

    outputElement:  $('.commandline'),
    roomView:       $('.room'),
    scoreBoard:     $('#score-int'),
    movesBoard:     $('#move-int'),
    allowedVerbs: [
        "GO", "LOOK", "TAKE", "PUSH", "BACK",
        "PULL", "DROP", "OPEN", "WAIT", "ENTER",
        "CLOSE", "INVENTORY", "BAG", "ZYZZY", "HELP",
        "USE", "NORTH", "EAST", "SOUTH", "WEST", "MAILBOX",
        "UP", "DOWN", "LEFT", "RIGHT", "SAVE", "RESET",
        "HELP", "STATE", "BRIEF", "VERBOSE", "READ"
    ],
    openableInstances: [
        "WINDOW", "DOOR", "TRAPDOOR", "TRAP"
    ],

    /**
     * Start the game engine
     */
    init: () => {
        console.log('**GameEngine: Initializing...')
        GameEngine.startCommandListener()
        console.log('**GameEngine: Determining player state');
        GameEngine.loadSavedGame()
        console.log('**GameEngine: Last game state:', GameEngine.player);
        GameEngine.lookAction();
    },

    /**
     * Start terminal command listener
     */
    startCommandListener: () => {
        $('input').on('keypress', (event) => {
            if( event.which === 13 ) {
                GameEngine.submitCommand();
                GameEngine.scrollDown();
            }
        });
    },

    /**
     * Parse the entered command
     */
    submitCommand: () => {
        // Get command input
        let cmd = $('input').val();
        // Drop command to lower case
        // This function is easier to implement and still runs in O(n)
        cmd = cmd.toUpperCase();
        // Split any words separated by a space into array parts.
        // This function is based off the similar python implementation.
        cmd = cmd.split(/(\s+)/).filter( e => e.trim().length > 0);
        // Validate that the command is within the acceptable commands array.
        for ( var i=0; i < cmd.length; i++ ) {
            if ( !GameEngine.validateCommand(cmd[i]) ) {
                GameEngine.invalidCommand();
                $('input').val('');
                return;
            }
        }
        // Command is valid
        $('input').val('');

        executableCommand = cmd[0];
        commandArgument   = (cmd[1]) ? cmd[1] : null;
        GameEngine.executeCommand(executableCommand, commandArgument);
    },

    /**
     * Validate that the parameter CMD is within the
     * allowed verbs array.
     * 
     * @param {string} cmd The input command
     * @returns {bool}
     */
    validateCommand: (cmd) => {
        if ( GameEngine.allowedVerbs.includes(cmd) || 
             itemArray.includes(cmd.toLowerCase()) ||
             GameEngine.openableInstances.includes(cmd)
            ) 
        {
            return true;
        }
        return false;
    },

    invalidCommand: () => {
        GameEngine.cliOutput("Oh no, that doesn't look right!");
    },

    cliOutput: (output) => {
        $('.commandLine').before(output+"<br><br>");
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
        GameEngine.cliOutput("Your game state has been saved.");
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
        GameEngine.cliOutput("Your game state has been reset.");
        console.log("**GameEngine: Game state reset");
    },

    printState: () => {
        console.log("**GameEngine: Current player state", GameEngine.player);
    },

    /**
     * Retrieve a command and determine the function
     */
    executeCommand: (cmd, arg = null) => {

        var verbMap = {
            "GO":         GameEngine.goAction,
            "LOOK":       GameEngine.lookAction,
            "TAKE":       GameEngine.takeAction,
            "ENTER":      GameEngine.goAction,
            // "PUSH":       GameEngine.Push,
            // "PULL":       GameEngine.Pull,
            "DROP":       GameEngine.dropAction,
            "OPEN":       GameEngine.openAction,
            "READ":       GameEngine.readAction,
            // "WAIT":       GameEngine.Wait,
            // "CLOSE":      GameEngine.Close,
            "INVENTORY":  GameEngine.printInventory,
            "BAG":        GameEngine.printInventory,
            "HELP":       GameEngine.printHelp,
            "SAVE":       GameEngine.saveGame,
            "RESET":      GameEngine.resetGame,
            "STATE":      GameEngine.printState,
            "BRIEF":      GameEngine.setBriefOutput,
            "VERBOSE":    GameEngine.setVerboseOutput,
        }
 
        verbMap[ cmd ]( arg );

    },

    scrollDown: () => {
		$('#content-inner').scrollTop(10000);
    },

    /********* CORE COMMANDS *********/

    // Outputs a help dialog to the player
    printHelp: () => {
        GameEngine.cliOutput("Here is a list of acceptable commands:");
        var acceptedCommands = ['> go [direction]', '> north', '> east', '> south', '> west', '> up', '> down', '> look', '> open', '> enter', '> exit','> climb', '> brief [ short descriptions ]', '> verbose [ long descriptions ]', '> help', '> take', '> bag', '> save [ Save current game]', '> reset [ Reset game including save ]'];
        for(i = 0; i < acceptedCommands.length; i++) {
            GameEngine.cliOutput(acceptedCommands[i]);
        }
    },
    printInventory: () => {
        let inventory = GameEngine.player.getPlayerInventory();

        if(inventory === undefined || inventory.length == 0) {
			GameEngine.cliOutput("There is nothing in your bag!");
		} else {
			GameEngine.cliOutput("Your bag contains:");
			for(j=0;j<inventory.length;j++) {
				GameEngine.cliOutput(GameEngine.player.inventory[j]);
			}
		}
    },
    // Sets the output of items and rooms to verbose mode
    setVerboseOutput: () => {
        GameEngine.player.setVerboseMode(true);
        GameEngine.cliOutput("ZORK is now in its \"verbose\" mode, which always gives long descriptions of locations (even if you've been there before).");
    },
    // Sets the output of items and rooms to brief mode
    setBriefOutput: () => {
        GameEngine.player.setVerboseMode(false);
        GameEngine.cliOutput("ZORK is now in its normal \"brief\" printing mode, which gives long descriptions of places never before visited, and short descriptions otherwise.");
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

			GameEngine.cliOutput("<strong>" + roomList[currentRoom].name + "</strong>");
			GameEngine.cliOutput(roomList[currentRoom].look);
		
			GameEngine.showItems(roomList[currentRoom]);

		} else if(roomList[currentRoom].roomIsDark && !lantern.itemInUse) {

			GameEngine.cliOutput("<strong>" + roomList[currentRoom].darkText + "</strong>");

		} else if(roomList[currentRoom].roomIsDark && lantern.itemInUse) {

			GameEngine.cliOutput("<strong>" + roomList[currentRoom].name + "</strong>");
			GameEngine.cliOutput(roomList[currentRoom].look);
		
			GameEngine.showItems(roomList[currentRoom]);

		}
    },

    showItems: (room) => {

        var itemlist = [];
	
		for (var i = 0; i < room.items.length; i++) {
			if (room.items[i].specialdesc) 
            {
				GameEngine.cliOutput(room.items[i].specialdesc + "<br>");
			}
			else 
            {
				itemlist.push(room.items[i].description);
			}
		}

		if (itemlist.length === 1) 
        {
			GameEngine.cliOutput("There is a " + itemlist[0] + " here.");
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
			GameEngine.cliOutput("There is a " + str + " here.");
		}
    },

    goAction: (direction) => {

        let currentRoom = GameEngine.getCurrentRoom();
        let lDirection = direction.toLowerCase();

        if (lDirection === undefined) 
        {
            output.before("You can't go that way.");
        }
        else 
        {

            if ( lDirection == "back" ) {
                console.log("**GameEngine: Moving "+lDirection);
                GameEngine.player.setCurrentLocation(GameEngine.player.getPreviousLocation());
                GameEngine.player.setPreviousLocation(roomList[currentRoom].varName);
                currentRoom = GameEngine.getCurrentRoom();
            } else {
                console.log("**GameEngine: Moving "+lDirection);
                GameEngine.player.setPreviousLocation(roomList[currentRoom].varName);
                GameEngine.player.setCurrentLocation(roomList[currentRoom][lDirection].varName);
                currentRoom = GameEngine.getCurrentRoom();
            }

            if (GameEngine.player.getVerboseMode()){
                if (currentRoom.visited) {
                    GameEngine.cliOutput("<strong>" + roomList[currentRoom].name + "</strong>");
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

    openAction: (direction) => {

        let currentRoom = GameEngine.getCurrentRoom();

        if (roomList[currentRoom]["open"] === undefined || !roomList[currentRoom]["open"]) 
        {
            GameEngine.cliOutput("You can't open that.");
        }
        else 
        {

        console.log("**GameEngine: Opening room");
        GameEngine.player.setPreviousLocation(roomList[currentRoom].varName);
        GameEngine.player.setCurrentLocation(roomList[currentRoom]["open"].varName);
        currentRoom = GameEngine.getCurrentRoom();

            if (GameEngine.player.getVerboseMode()){
                if (currentRoom.visited) {
                    GameEngine.cliOutput("<strong>" + roomList[currentRoom].name + "</strong>");
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
            GameEngine.cliOutput("A "+lItem+" does not exist here.");
            return;
        }

        if ( GameEngine.player.inventory[itemObject] ) {
            GameEngine.cliOutput("The "+lItem+" is already in your bag.");
            return;
        }

        GameEngine.player.addToInventory(lItem);
        GameEngine.cliOutput("You put the "+lItem+" in your bag.");
        
    },

    readAction: (item) => {
        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];

        if (!GameEngine.player.inventory.includes(lItem))
        {
            GameEngine.cliOutput("You don't own a "+lItem+ " to read.");
            return;
        }

        if (!itemObject.actionArray.includes("read"))
        {
            GameEngine.cliOutput("This is not a readable item.");
            return;
        }

        GameEngine.cliOutput(itemObject.contents);
    },

    dropAction: (item) => {

        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];

        if (!GameEngine.player.inventory.includes(lItem))
        {
            GameEngine.cliOutput("You don't own a "+lItem+ " to drop.");
            return;
        }

        let currentRoom = GameEngine.getCurrentRoom();
        roomList[currentRoom].items.push(itemObject);

        GameEngine.player.removeFromInventory(lItem);
        GameEngine.cliOutput("You have dropped the "+lItem);

    },

}

$(window).on('load', function() {
    GameEngine.init();
})