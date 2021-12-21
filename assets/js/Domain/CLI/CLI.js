/**
 * CLI Service Class
 */
class CLI
{
    /**
     * 
     * @param {element} inputElement The input element 
     * @param {element} outputElement The output element
     * @param {element} cliContainer The cli containing element
     */
    constructor(inputElement, outputElement, cliContainer) {
        this.inputElement  = inputElement;
        this.outputElement = outputElement;
        this.cliContainer  = cliContainer;
        this.allowedVerbs = [
            "GO", "LOOK", "TAKE", "PUSH", "BACK",
            "PULL", "DROP", "OPEN", "WAIT", "ENTER",
            "CLOSE", "INVENTORY", "BAG", "ZYZZY", "HELP",
            "USE", "NORTH", "EAST", "SOUTH", "WEST", "MAILBOX",
            "UP", "DOWN", "LEFT", "RIGHT", "SAVE", "RESET",
            "HELP", "STATE", "BRIEF", "VERBOSE", "READ",
            "CLIMB", "UP", "DOWN",
        ];
        this.openableInstances = [
            "WINDOW", "DOOR", "TRAPDOOR", "TRAP", "TREE", "KITCHEN",
            "CHIMNEY",
        ];
    }

    /**
     * Add event listener for input commands
     */
    startCommandListener() 
    {
        this.inputElement.on('keypress', (event) => {
            if( event.which === 13 ) {
                this.submitCommand();
                this.scrollDown();
            }
        });
    }

    /**
     * Receive, parse and return valid commands
     * 
     * @returns {array}
     */
    submitCommand() 
    {
        // Get command input
        let cmd = this.inputElement.val();
        // Drop command to lower case
        // This function is easier to implement and still runs in O(n)
        cmd = cmd.toUpperCase();
        // Split any words separated by a space into array parts.
        // This function is based off the similar python implementation.
        cmd = cmd.split(/(\s+)/).filter( e => e.trim().length > 0);
        // Validate that the command is within the acceptable commands array.
        for ( var i=0; i < cmd.length; i++ ) {
            if ( !this.validateCommand(cmd[i]) ) {
                this.invalidCommand();
                $('input').val('');
                return;
            }
        }
        // Command is valid
        $('input').val('');

        let executableCommand = cmd[0];
        let commandArgument   = (cmd[1]) ? cmd[1] : null;
        this.executeCommand(executableCommand, commandArgument);
    }

    /**
     * Validate that the parameter CMD is within the
     * allowed verbs array.
     * 
     * @param {string} cmd The input command
     * @returns {bool}
     */
    validateCommand(cmd) 
    {
        if ( this.allowedVerbs.includes(cmd) || 
                itemArray.includes(cmd.toLowerCase()) ||
                this.openableInstances.includes(cmd)
            ) 
        {
            return true;
        }
        return false;
    }

    /**
     * Outputs an invalid command statement
     */
    invalidCommand() 
    {
        this.output("Oh no, that doesn't look right!");
    }

    /**
     * Prints output strings to the DOM CLI
     * 
     * @param {string} output The output 
     */
    output(output)
    {
        this.outputElement.before(output+"<br><br>");
    }

    /**
     * Scrolls the CLI Container down when a command is submitted
     */
    scrollDown() 
    {
		this.cliContainer.scrollTop(10000);
    }

    /**
     * Receives a command and determine the output function
     * 
     * @param {string} cmd The command
     * @param {string|null} arg The command arguments ( if any )
     */
    executeCommand(cmd, arg = null)
    {

        var verbMap = {
            "GO":         GameEngine.goAction,
                "NORTH":  GameEngine.goAction,
                "SOUTH":  GameEngine.goAction,
                "EAST":   GameEngine.goAction,
                "WEST":   GameEngine.goAction,
                "BACK":   GameEngine.goAction,
            "CLIMB":      GameEngine.goAction,
            "UP":         GameEngine.goAction,
            "DOWN":       GameEngine.goAction,
            "ENTER":      GameEngine.goAction,
            "LOOK":       GameEngine.lookAction,
            "TAKE":       GameEngine.takeAction,
            "USE":        GameEngine.useAction,
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
            "BRIEF":      GameEngine.setBriefOutput,
            "VERBOSE":    GameEngine.setVerboseOutput,
        }
    
        if ( ["NORTH", "SOUTH", "EAST", "WEST", "BACK", "CLIMB", "ENTER", "UP", "DOWN"].includes(cmd) ) {
            verbMap[ cmd ]( cmd );
        } else {
            verbMap[ cmd ]( arg );
        }

    }

}