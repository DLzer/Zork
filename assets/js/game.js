$(document).ready(function() {

    let moves = 0,
        score = 0,
        input = $('input'),
        output = $('.commandline'),
		verbose = false,
		roomView = $('.room');

	// Loading game checking for previous save	
	if(localStorage.getItem('zorkSaveGame')) {
		// Get Saved Game
		var savedGame = JSON.parse(localStorage.getItem('zorkSaveGame'));
		// Create our blank player object
		player = {
			inventory:[],
			location: null,
			stringLocation: ""
		};
		// Fill our players inventory
		for(sv = 0; sv < savedGame.inventory.length; sv++) {
			player.inventory.push(stringVar(savedGame.inventory[sv].var_string));
		}
		// Set our players location
		player.location = stringVar(savedGame.stringLocation);

		// Set our moves variable
		moves = savedGame.moves;
		$('.moves').html("Moves: <span id='move-int'>" + savedGame.moves + "</span>");

		//Set our room view
		roomView.text(player.location.name);

		// View our room
		room = player.location;
		look();
		room.visited = true;
	} else {
		player = {
			inventory: [],
			location: westOfHouse,
			stringLocation: 'westOfHouse'
		};
		room = player.location;
		look();
		room.visited = true;
	}


	// console.log(typeof(player.location));
	// console.log(player.inventory);
    /**
     * 
     * Player is an object defines the initial inventory and location of player.
     * 
     * @param {array} inventory
     * @param {string} location 
     */


	var room = player.location;

    /**
     * 
     * Commands
     * 
     */

	var restGameEntered = 0;
	function reset() {
		restGameEntered++;
		if(restGameEntered != 2) {
			output.before("Get lost? If you'd like to start over, type reset once more.<br /><br />");
		} else if( restGameEntered == 2 ) {
			output.before("Your game has been reset.<br /><br />");
			localStorage.clear();
			window.location.reload();
		} else {
			output.before("Issue resetting game. Good Luck.<br /><br />");
		}
	}

	var saveHasBeenEntered = 0;
	function save(player) {
		saveHasBeenEntered++;
		if(localStorage.getItem('zorkSaveGame') && saveHasBeenEntered != 2) {
			output.before("You have an existing save! If you'd like to overwrite it, type save again.<br /><br />");
		} else if(!localStorage.getItem('zorkSaveGame') || saveHasBeenEntered == 2) {
			var savePlayer = {};

			savePlayer.inventory = player.inventory;
			savePlayer.stringLocation = player.location.var_name;
			savePlayer.moves = moves;
			console.log(savePlayer);
			localStorage.setItem('zorkSaveGame', JSON.stringify(savePlayer));

			output.before("Your game has been saved.<br /><br />");

			saveHasBeenEntered = 0;
		} else {
			output.before("Issue saving game. Good Luck.<br /><br />");
		}
	}

	 // Shows item list in current room
	function showItems() {
		var itemlist = [];
	
		for (var i = 0; i < room.items.length; i++) {
			if (room.items[i].specialdesc) {
				output.before(room.items[i].specialdesc + "<br />");
			}
			else {
				itemlist.push(room.items[i].desc);
			}
		}
	
		if (itemlist.length === 1) {
			output.before("There is a " + itemlist[0] + " here.<br /><br />");
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
			output.before("There is a " + str + " here.<br /><br />");
		}
	
		scrollDown();
	
	}
	
	// Defines looking in a certain direction
	function look() {

		// console.log('Is lantern on?', lantern.itemInUse);
		// console.log('Is room dark?', room.roomIsDark);
	
		if( !room.roomIsDark ) {

			output.before("<strong>" + room.name + "</strong><br />");
			output.before(room.look + "<br /><br />");
		
			showItems();
			scrollDown();

		} else if(room.roomIsDark && !lantern.itemInUse) {

			output.before("<strong>" + room.darkText + "</strong><br />");
			scrollDown();

		} else if(room.roomIsDark && lantern.itemInUse) {

			output.before("<strong>" + room.name + "</strong><br />");
			output.before(room.look + "<br /><br />");
		
			showItems();
			scrollDown();

		}

	}

	function read(item) {
		if (Array.isArray(item)){
	
			// If the array has length of 1, the player didn't specify a direction
			if (item.length == 1) {
				output.before("What do you want to read?<br /><br />");
			}
			else {
				read(item[1]);
			}
		} else {

			let itemObj = stringVar(item);

			if(!player.inventory.includes(itemObj) || itemObj == undefined) {
				output.before("You don't have a "+itemObj.name+" in your bag!<br /><br />");
			} else {
				if(itemObj.readable) {
					output.before(itemObj.contents+"<br /><br />");
				}
			}
		}
	
		scrollDown();
	}
	
	function take(item) {
		if (Array.isArray(item)){
	
			// If the array has length of 1, the player didn't specify a direction
			if (item.length == 1) {
				output.before("What do you want to take?<br /><br />");
			}
			else {
				take(item[1]);
			}
		} 
		else {

			let itemObj = stringVar(item);
			
			if (itemObj === null || !itemArray.includes(item) || !player.location.items.includes(itemObj)) {
				switch(Math.floor(Math.random() * 4) + 1) {
					case 1:
						output.before("You can't see any "+item+" here!<br /><br />");
						break;
					case 2:
						output.before("Valient Attempt.<br /><br />");
						break;
					case 3:
						output.before("What a concept!<br /><br />");
						break;
					case 3:
						output.before("I don't know the word "+item+".<br /><br />");
						break;
					default:
						output.before("I'm not sure i get it!.<br /><br />");
				}
			}

			else if(player.inventory.includes(itemObj)) {
				output.before("You already have the "+itemObj.name+" in your bag!<br /><br />");
			}
	
			else {

				player.inventory.push(itemObj);
	
				if (!verbose){
					if (room.visited) {
						output.before("<strong>You put the " + itemObj.name + " in your bag.</strong><br /><br />");
						item.taken = true;
					}
					else {
						output.before("<strong>You have collected a" + item.disc + " containing "+ item.contents+ "</strong><br /><br />");
						item.taken = true;
					}
				}
	
				else {
					look();
					item.taken = true;
				}
			}
		}
	
		scrollDown();
	}

	function use(item) {

		if (Array.isArray(item)){
	
			// If the array has length of 1, the player didn't specify an item
			if (item.length == 1) {
				output.before("Use what?<br /><br />");
			}
			else {
				use(item[1]);
			}
		} else {

		let itemObj = stringVar(item);

		console.log('Using item', item);
			
		if (itemObj === null || !itemArray.includes(item) || !player.inventory.includes(itemObj)) {
			switch(Math.floor(Math.random() * 4) + 1) {
				case 1:
					output.before("You can't use the "+item+" here!<br /><br />");
					break;
				case 2:
					output.before("Valient Attempt.<br /><br />");
					break;
				case 3:
					output.before("What a concept!<br /><br />");
					break;
				case 3:
					output.before("I don't know the word "+item+".<br /><br />");
					break;
				default:
					output.before("I'm not sure i get it!.<br /><br />");
			}
		}

		else {

			console.log('Item in use already?', itemObj.itemInUse);
			if( !itemObj.itemInUse ) {

				if (!verbose){
					if (room.visited) {
						output.before("<strong>" + itemObj.useDesc + ".</strong><br /><br />");
						itemObj.itemInUse = true;
					}
					else {
						output.before("<strong>"+ itemObj.useDesc +"</strong><br /><br />");
						itemObj.itemInUse = true;
					}
					look();
				}

				else {
					look();
					itemObj.itemInUse = true;
				}

			} else if ( itemObj.itemInUse ) {

				if (!verbose){
					if (room.visited) {
						output.before("<strong>You put away the " + itemObj.name + ".</strong><br /><br />");
						itemObj.itemInUse = false;
					}
					else {
						output.before("<strong>You put away the"+ itemObj.name +"</strong><br /><br />");
						itemObj.itemInUse = false;
					}
					look();
				}

				else {
					look();
					itemObj.itemInUse = false;
				}

			}


		}

	}
	

	}
	
	
	// If player typed "go -direction-", this function receives an array
	// as a parameter. The item at the array index 1 should be the direction
	// entered. This function will recursively call itself, passing that
	// direction as a parameter.
	function go(direction) {
	
		if (Array.isArray(direction)){
	
			// If the array has length of 1, the player didn't specify a direction
			if (direction.length == 1) {
				output.before("Which direction?<br /><br />");
			}
			else {
				go(direction[1]);
			}
		}
	
		else {

			if (room[direction] === undefined) {
				output.before("You can't go that way.<br /><br />");
			}
	
			else {
				player.location = room[direction];
				player.stringLocation = player.location.var_name;
				room = player.location;
				roomView.text(player.location.name);
	
				if (!verbose){
					if (room.visited) {
						output.before("<strong>" + room.name + "</strong><br /><br />");
						showItems();
					}
					else {
						look();
						room.visited = true;
					}
				}
	
				else {
					look();
					room.visited = true;
				}
			}
		}
	
		scrollDown();
	
	}
	
	function bag() {
	
		if(player.inventory === undefined || Array.length == 0) {
			output.before("There is nothing in your bag!.<br /><br />");
		} else {
			output.before("Your bag contains:<br />");
			console.log(player.inventory);
			for(j=0;j<player.inventory.length;j++) {
				output.before(player.inventory[j].name+'<br />');
			}
		}
	
	}


    // Define Invalid Command text    
    function invalidCommand(cmd) {
		console.log('Invalid Command', cmd);
		switch(Math.floor(Math.random() * 4) + 1) {
			case 1:
				output.before("I don't know the word \""+cmd+"\".<br />");
				break;
			case 2:
				output.before("We're not going down that road again!<br /><br />");
				break;
			case 3:
				output.before("What a concept!<br /><br />");
				break;
			case 3:
				output.before("Sorry, my memory is poor. Please give a direction.<br /><br />");
				break;
			default:
				output.before("I'm not sure i get it!.<br /><br />");
		}
		scrollDown();
	}

    // Defines brief mode
	function brief() {
		verbose = false;
		output.before("ZORK is now in its normal \"brief\" printing mode, which gives long descriptions of places never before visited, and short descriptions otherwise.<br /><br />");
		scrollDown();
    }
    
    function help() {
        output.before("Here is a list of acceptable commands:<br />");
        var acceptedCommands = ['> go [direction]', '> north', '> east', '> south', '> west', '> up', '> down', '> look', '> open', '> enter', '> exit','> climb', '> brief [ short descriptions ]', '> verbose [ long descriptions ]', '> help', '> take', '> bag', '> save [ Save current game]', '> reset [ Reset game including save ]'];
        for(i = 0; i < acceptedCommands.length; i++) {
            output.before(acceptedCommands[i]+'<br />');
        }
    }

    // Defines verbose mode
	function verboseOn() {
		verbose = true;
		output.before("ZORK is now in its \"verbose\" mode, which always gives long descriptions of locations (even if you've been there before).<br /><br />");
		scrollDown();
    }

	function parseCommand(command){

		command = command.toLowerCase();
		command = command.split(" ");

		switch(command[0]) {

			case "bag":
			case "inventory":
				bag();
				break;

			case "use":
                use(command);
				break;

			case "read":
				read(command);
				break;

			case "take":
				take(command);
				break;

			case "go":
				go(command);
				break;

			case "north":
			case "n":
				go("north");
				break;

			case "south":
			case "s":
				go("south");
				break;

			case "east":
			case "e":
				go("east");
				break;

			case "west":
			case "w":
				go("west");
				break;

			case "up":
			case "u":
				go("up");
				break;

			case "down":
			case "d":
				go("down");
				break;

			case "open":
				go("open");
				break;

			case "enter":
				go("enter");
				break;

			case "exit":
				go("exit");
				break;

			case "climb":
				go("climb");
				break;

			case "look":
			case "l":
				look();
				break;

			case "brief":
				brief();
				break;

			case "verbose":
				verboseOn();
                break;
                
            case "help":
                help();
				break;
			case "move":
                go("move");
				break;
				
			case "save":
                save(player);
				break;
				
			case "reset":
                reset();
                break;

			default:
				invalidCommand(command);	

		}

	}
	
	function scrollDown() {
		// var objDiv = document.getElementById("content");
		// objDiv.scrollTop = objDiv.scrollHeight;
		$('#content-inner').scrollTop(10000);
    }

    input.on('keypress', function(event) {
		if(event.which === 13){
			submitCommand();
			scrollDown();
		}
    });

    function submitCommand() {

		moves++;
		$('.moves').html("Moves: <span id='move-int'>" + moves + "</span>");


		var command = input.val();
		input.val('');
		output.before("> " + command + "<br /><br />");
		parseCommand(command);
	}

	function stringVar(string) {
		if(!eval(string) || eval(string) === null) {
			invalidCommand(string);
			return;
		} else {
			var tmp = eval(string);
			return tmp;
		}
	}
    
    // CRT Toggle
    $('#crt-toggle').click(function() {
        $('#crt-screen').toggleClass("crt");
        $('#led').toggleClass("red");
        $('#crt-text').toggleClass("crt-text-off");
	});
	
	// Focus Click
	$('#content').click(function(){
		$('#user_in').focus();
	});
    
});
