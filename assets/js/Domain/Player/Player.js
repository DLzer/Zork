/**
 * Player Data Model
 */
class Player
{
    /**
     * The Constructor
     *  
     * @param {array}    inventory Player inventory
     * @param {integer}  moves     Player move counter
     * @param {intenger} score Player score
     * @param {object}   currentRoom Current room object
     * @param {object}   previousRoom Previous room object
     * @param {bool}     gameIsSaved Whether game has been saved  
     * @param {bool}     verbose Whether verbose mode is active 
     */
    constructor(inventory = [], 
                moves = 0, 
                score = 0, 
                currentRoom = "westOfHouse", 
                previousRoom = null, 
                gameIsSaved = false, 
                verbose = false
                )
    {
        this.inventory           = inventory;
        this.score               = score;
        this.moves               = moves;
        this.currentRoom         = currentRoom;
        this.previousRoom        = previousRoom;
        this.gameIsSaved         = gameIsSaved;
        this.verbose             = verbose;
    }

    getPlayer()
    {
        return this;
    }

    getPlayerInventory()
    {
        return this.inventory;
    }

    getCurrentLocation()
    {
        return this.currentRoom;
    }

    getPreviousLocation()
    {
        return this.previousRoom;
    }

    getPlayerMoves()
    {
        return this.moves;
    }

    getPlayerScore()
    {
        return this.score;
    }

    getSaveState()
    {
        return this.gameIsSaved;
    }

    getVerboseMode()
    {
        return this.verbose;
    }

    setCurrentLocation(currentRoom)
    {
        this.currentRoom = currentRoom;
    }

    setPreviousLocation(previousRoom)
    {
        this.previousRoom = previousRoom;
    }

    setSaveState(saved)
    {
        this.gameIsSaved = saved;
    }

    setVerboseMode(verbose)
    {
        this.verbose = verbose;
    }

    addMove()
    {
        this.moves = this.moves++;
    }

    addScore(score)
    {
        this.score+=score;
    }

    addToInventory(item)
    {
        this.inventory.push(item);
    }

    removeFromInventory(item)
    {
        this.inventory = this.inventory.filter(e => e !== item);
    }

    loadPlayerState()
    {
        if(localStorage.getItem('zorkSaveGameState')) 
        {
            let savedGame       = JSON.parse(localStorage.getItem('zorkSaveGameState'));
            this.inventory      = savedGame.inventory;
            this.moves          = savedGame.moves;
            this.score          = savedGame.score;
            this.currentRoom    = savedGame.currentRoom;
            this.previousRoom   = savedGame.previousRoom;
            this.gameIsSaved    = savedGame.gameIsSaved;
            this.verbose        = savedGame.verbose;
            return this;
        } 
        else 
        {
            this.inventory      = [];
            this.moves          = 0;
            this.score          = 0;
            this.currentRoom    = "westOfHouse";
            this.previousRoom   = null;
            this.gameIsSaved    = false;
            this.verbose        = false;
            return this;
        }
    }

    savePlayerState()
    {
        this.gameIsSaved = true;
        localStorage.setItem('zorkSaveGameState', JSON.stringify(this));
    }

    resetPlayerState()
    {
        localStorage.removeItem('zorkSaveGameState');
        this.inventory      = [];
        this.moves          = 0;
        this.score          = 0;
        this.currentRoom    = "westOfHouse";
        this.previousRoom   = null;
        this.gameIsSaved    = false;
        this.verbose        = false;
        return this;
    }
}