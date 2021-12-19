GameEngine = {
    
    gameState: {
        player: {
            roomId: 0,
            inventory: [],
            score: 0
        },
        saved: false,
        moves: 0,
    },

    outputElement:  $('.commandline'),
    verbose:        false,
    roomView:       $('.room'),
    allowedVerbs: [
        "GO", "LOOK", "TAKE", "PUSH",
        "PULL", "DROP", "OPEN", "WAIT",
        "CLOSE", "INVENTORY", "ZYZZY", "HELP",
        "USE", "NORTH", "EAST", "SOUTH", "WEST",
        "UP", "DOWN", "LEFT", "RIGHT", "SAVE", "RESET"
    ],

    /**
     * Start the game engine
     */
    init: () => {
        console.log('**INITIALIZING GAME ENGINE**')
        GameEngine.startCommandListener()
        GameEngine.loadSavedGame()
        console.log('**GameEngine: Last game state:', GameEngine.gameState);
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
                break;
            }
        }
        // Command is valid
        $('input').val('');

        executableCommand = cmd[0];
        commandArgument   = (cmd[1]) ? cmd[1] : null;

        GameEngine.executeCommand(executableCommand, commandArgument);
        console.log(cmd);
    },

    /**
     * Validate that the parameter CMD is within the
     * allowed verbs array.
     * 
     * @param {string} cmd The input command
     * @returns {bool}
     */
    validateCommand: (cmd) => {
        if ( GameEngine.allowedVerbs.includes(cmd)) {
            return true;
        }
        return false;
    },

    invalidCommand: () => {
        $('.commandline').before("Oh no, that doesn't look right!<br>");
    },

    cliOutput: (output) => {
        $('.commandLine').before(output+"<br>");
    },

    /**
     * Set the values of the game state
     */
    setGameState: (roomId, inventory, score, saved, moves) => {
        GameEngine.gameState.player.roomId    = roomId;
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
                savedGame.player.roomId,
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
        localStorage.setItem('zorkSaveGameState', GameEngine.gameState);
        console.log("**GameEngine: Game state saved");
    },

    /**
     * Reset a gameState object
     */
    resetGame: () => {
        GameEngine.setGameState(0,[],0,false,0);
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
            "GO":         GameEngine.Go,
            "LOOK":       GameEngine.Look,
            "TAKE":       GameEngine.Take,
            "PUSH":       GameEngine.Push,
            "PULL":       GameEngine.Pull,
            "DROP":       GameEngine.Drop,
            "OPEN":       GameEngine.Open,
            "WAIT":       GameEngine.Wait,
            "CLOSE":      GameEngine.Close,
            "INVENTORY":  GameEngine.Inventory,
            "XYZZY":      function() { return true; },
            "HELP":       GameEngine.printHelp,
            "SAVE":       GameEngine.saveGame,
            "RESET":      GameEngine.resetGame,
            "STATE":      GameEngine.printState
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
    printHelp: () => {
        GameEngine.cliOutput("Here is a list of acceptable commands:");
        var acceptedCommands = ['> go [direction]', '> north', '> east', '> south', '> west', '> up', '> down', '> look', '> open', '> enter', '> exit','> climb', '> brief [ short descriptions ]', '> verbose [ long descriptions ]', '> help', '> take', '> bag', '> save [ Save current game]', '> reset [ Reset game including save ]'];
        for(i = 0; i < acceptedCommands.length; i++) {
            GameEngine.cliOutput(acceptedCommands[i]);
        }
    }

}

$(document).ready(function() {
    GameEngine.init();
})