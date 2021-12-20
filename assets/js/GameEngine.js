GameEngine = {
    
    gameState: {
        player: {
            room: westOfHouse,
            inventory: [],
            score: 0,
            previousRoom: null
        },
        saved: false,
        moves: 0,
        verbose: false,
    },

    outputElement:  $('.commandline'),
    verbose:        false,
    roomView:       $('.room'),
    allowedVerbs: [
        "GO", "LOOK", "TAKE", "PUSH", "BACK",
        "PULL", "DROP", "OPEN", "WAIT",
        "CLOSE", "INVENTORY", "BAG", "ZYZZY", "HELP",
        "USE", "NORTH", "EAST", "SOUTH", "WEST", "MAILBOX",
        "UP", "DOWN", "LEFT", "RIGHT", "SAVE", "RESET",
        "HELP", "STATE", "BRIEF", "VERBOSE", "READ"
    ],

    /**
     * Start the game engine
     */
    init: () => {
        console.log('**INITIALIZING GAME ENGINE**')
        GameEngine.startCommandListener()
        GameEngine.loadSavedGame()
        console.log('**GameEngine: Last game state:', GameEngine.gameState);
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
        console.log("**Game Engine: Command raw input:",cmd);
        console.log("**Game Engine: Command executables:", [executableCommand, commandArgument]);
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
        if ( GameEngine.allowedVerbs.includes(cmd) || itemArray.includes(cmd.toLocaleLowerCase())) {
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
     * Set the values of the game state
     */
    setGameState: (room, inventory, score, saved, moves) => {
        GameEngine.gameState.player.room      = room;
        GameEngine.gameState.player.inventory = inventory;
        GameEngine.gameState.player.score     = score;
        GameEngine.gameState.saved            = saved;
        GameEngine.gameState.moves            = moves;
    },

    /**
     * Check for a previously saved game
     */
    loadSavedGame: () => {
        if(localStorage.getItem('zorkSaveGame')) {
            savedGame = JSON.parse(localStorage.getItem('zorkSaveGameState'));
            GameEngine.setGameState(
                savedGame.player.room,
                savedGame.player.inventory,
                savedGame.player.score,
                savedGame.saved,
                savedGame.moves
            )
        }
    },

    /**
     * Save a current gameState object
     */
    saveGame: () => {
        GameEngine.gameState.saved = true;
        localStorage.setItem('zorkSaveGameState', GameEngine.gameState);
        GameEngine.cliOutput("Your game state has been saved.");
        console.log("**GameEngine: Game state saved");
    },

    /**
     * Reset a gameState object
     */
    resetGame: () => {
        GameEngine.setGameState(westOfHouse,[],0,false,0);
        GameEngine.cliOutput("Your game state has been reset.");
        console.log("**GameEngine: Game state reset");
    },

    printState: () => {
        console.log("**GameEngine: Current game state", GameEngine.gameState);
    },

    /**
     * Replace verb with a known alias
     */
    sanitizeCommand: (string) => {
        string  = string.trim(string.toUpperCase());
        string  = string.split(" ");
        return string;
    },

    /**
     * Match input with a command
     */
    matchCommandAlias: (string) => {
        string.forEach(
            (element) => {
                if ( element == GameEngine.allowedVerbs ) {
                    return element;
                } else {
                    return false;
                }
            }
        )
    },

    /**
     * Retrieve a command and determine the function
     */
    executeCommand: (cmd, arg = null) => {

        var verbMap = {
            "GO":         GameEngine.goAction,
            "LOOK":       GameEngine.lookAction,
            "TAKE":       GameEngine.takeAction,
            "PUSH":       GameEngine.Push,
            "PULL":       GameEngine.Pull,
            "DROP":       GameEngine.dropAction,
            "OPEN":       GameEngine.openAction,
            "READ":       GameEngine.readAction,
            "WAIT":       GameEngine.Wait,
            "CLOSE":      GameEngine.Close,
            "INVENTORY":  GameEngine.printInventory,
            "BAG":        GameEngine.printInventory,
            "XYZZY":      function() { return true; },
            "HELP":       GameEngine.printHelp,
            "SAVE":       GameEngine.saveGame,
            "RESET":      GameEngine.resetGame,
            "STATE":      GameEngine.printState,
            "BRIEF":      GameEngine.setBriefOutput,
            "VERBOSE":    GameEngine.setVerboseOutput,
        }
 
        verbMap[ cmd ]( arg );

    },

    /**
     * Scroll the terminal down
     */
    scrollDown: () => {
		// var objDiv = document.getElementById("content");
		// objDiv.scrollTop = objDiv.scrollHeight;
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
        if(GameEngine.gameState.player.inventory === undefined || GameEngine.gameState.player.inventory == 0) {
			GameEngine.cliOutput("There is nothing in your bag!");
		} else {
			GameEngine.cliOutput("Your bag contains:");
			for(j=0;j<GameEngine.gameState.player.inventory.length;j++) {
				GameEngine.cliOutput(GameEngine.gameState.player.inventory[j]);
			}
		}
    },
    // Sets the output of items and rooms to verbose mode
    setVerboseOutput: () => {
        GameEngine.gameState.verbose = true;
        GameEngine.cliOutput("ZORK is now in its \"verbose\" mode, which always gives long descriptions of locations (even if you've been there before).");
    },
    // Sets the output of items and rooms to brief mode
    setBriefOutput: () => {
        GameEngine.gameState.verbose = false;
        GameEngine.cliOutput("ZORK is now in its normal \"brief\" printing mode, which gives long descriptions of places never before visited, and short descriptions otherwise.");
    },

    getCurrentRoom: () => {
        return GameEngine.gameState.player.room;
    },

    /********* DIRECTIONAL COMMANDS *********/

    lookAction: () => {

        let currentRoom = GameEngine.getCurrentRoom();

        if( !currentRoom.roomIsDark ) {

			GameEngine.cliOutput("<strong>" + currentRoom.name + "</strong>");
			GameEngine.cliOutput(currentRoom.look);
		
			GameEngine.showItems(currentRoom);

		} else if(currentRoom.roomIsDark && !lantern.itemInUse) {

			GameEngine.cliOutput("<strong>" + currentRoom.darkText + "</strong>");

		} else if(currentRoom.roomIsDark && lantern.itemInUse) {

			GameEngine.cliOutput("<strong>" + currentRoom.name + "</strong>");
			GameEngine.cliOutput(currentRoom.look);
		
			GameEngine.showItems(currentRoom);

		}
    },

    showItems: (room) => {

        let itemlist = [];
	
		for (var i = 0; i < room.items.length; i++) {
			if (room.items[i].specialdesc) {
				GameEngine.cliOutput(room.items[i].specialdesc + "<br>");
			}
			else {
				itemlist.push(room.items[i].desc);
			}
		}
	
		if (itemlist.length === 1) {
			GameEngine.cliOutput("There is a " + itemlist[0]);
		}
		else if (itemlist.length > 1) {
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
                console.log("**GameEngine: New Room - ", GameEngine.gameState.player.previousRoom);
                GameEngine.gameState.player.room = GameEngine.gameState.player.previousRoom;
                GameEngine.gameState.player.previousRoom = currentRoom;
                currentRoom = GameEngine.gameState.player.room;
            } else {
                console.log("**GameEngine: Moving "+lDirection);
                console.log("**GameEngine: New Room - ", currentRoom[lDirection]);
                GameEngine.gameState.player.previousRoom = currentRoom;
                GameEngine.gameState.player.room = currentRoom[lDirection];
                currentRoom = GameEngine.gameState.player.room;
            }

            if (GameEngine.gameState.verbose){
                if (currentRoom.visited) {
                    GameEngine.cliOutput("<strong>" + currentRoom.name + "</strong>");
                    GameEngine.showItems(currentRoom);
                }
                else {
                    GameEngine.lookAction();
                    currentRoom.visited = true;
                }
            }

            else {
                GameEngine.lookAction();
                currentRoom.visited = true;
            }
        }
    },

    openAction: (direction) => {

        let currentRoom = GameEngine.getCurrentRoom();

        if (currentRoom["open"] === undefined || !currentRoom["open"]) 
        {
            output.before("You can't open that.");
        }
        else 
        {

        console.log("**GameEngine: Opening");
        console.log("**GameEngine: New Room - ", currentRoom["open"]);
        GameEngine.gameState.player.previousRoom = currentRoom;
        GameEngine.gameState.player.room = currentRoom["open"];
        currentRoom = GameEngine.gameState.player.room;

            if (GameEngine.gameState.verbose){
                if (currentRoom.visited) {
                    GameEngine.cliOutput("<strong>" + currentRoom.name + "</strong>");
                    GameEngine.showItems(currentRoom);
                }
                else {
                    GameEngine.lookAction();
                    currentRoom.visited = true;
                }
            }

            else {
                GameEngine.lookAction();
                currentRoom.visited = true;
            }
        }
    },

    takeAction: (item) => {

        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];
        let currentRoom = GameEngine.getCurrentRoom();

        if ( !currentRoom.items.includes(itemObject) ) {
            GameEngine.cliOutput("A "+lItem+" does not exist here.");
            return;
        }

        if ( GameEngine.gameState.player.inventory[itemObject] ) {
            GameEngine.cliOutput("The "+lItem+" is already in your bag.");
            return;
        }

        console.log(itemObject);
        GameEngine.gameState.player.inventory.push(lItem);
        GameEngine.cliOutput("You put the "+lItem+" in your bag.");
        
    },

    readAction: (item) => {
        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];

        if (!GameEngine.gameState.player.inventory.includes(lItem))
        {
            GameEngine.cliOutput("You don't own a "+lItem+ " to read.");
            return;
        }

        if (!itemObject.actionArr.includes("read"))
        {
            GameEngine.cliOutput("This is not a readable item.");
            return;
        }

        GameEngine.cliOutput(itemObject.contents);
    },

    dropAction: (item) => {

        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];

        if (!GameEngine.gameState.player.inventory.includes(lItem))
        {
            GameEngine.cliOutput("You don't own a "+lItem+ " to drop.");
            return;
        }

        let currentRoom = GameEngine.getCurrentRoom();
        currentRoom.items.push(itemObject);

        let playerInventory = GameEngine.gameState.player.inventory;
        GameEngine.gameState.player.inventory = playerInventory.filter(e => e !== lItem);

        GameEngine.cliOutput("You have dropped the "+lItem);

    },

}

$(document).ready(function() {
    GameEngine.init();
})