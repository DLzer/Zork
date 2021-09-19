GameEngine = {
    
    gameState = {
        player = {
            roomId: 0,
            inventory: [],
            score: 0
        },
        saved: false,
        moves: 0,
    },

    inputElement    = $('input'),
    outputElement   = $('.commandline'),
    verbose         = false,
    roomView        = $('.room'),
    allowedVerbs = [
        "GO", "LOOK", "TAKE", "PUSH",
        "PULL", "DROP", "OPEN", "WAIT",
        "CLOSE", "INVENTORY", "ZYZZY", "HELP"
    ],

    /**
     * Start the game engine
     */
    init: () => {
        GameEngine.startCommandListener()
        GameEngine.loadSavedGame()
    },

    /**
     * Start terminal command listener
     */
    startCommandListener: () => {
        GameEngine.inputElement.on('keypress', (event) => {
            if( event.which === 13 ) {
                GameEngine.submitCommand();
                GameEngine.scrollDown();
            }
        }
    },

    /**
     * Set the values of the game state
     */
    setGameState: (roomId, inventory, score, saved, moves) => {
        GameEngine.player.roomId    = roomId;
        GameEngine.player.inventory = inventory;
        GameEngine.player.score     = score;
        GameEngine.saved            = saved;
        GameEngine.moves            = moves;
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
    },

    /**
     * Reset a gameState object
     */
    resetGame: () => {
        GameEngine.setGameState(0,[],0,false,0)
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
            "HELP":       GameEngine.Help
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

}