/*
	Gneral Notes:
		1) A big array/object of possible characters
		2) An object/etc. of your character chosen
		3) An array/object of enemies
		4) each character will be its own object with the properties:
			name
			visual
			healthPoints
			attackPower
			counterAttackPower
		5) Characters
			javaTheHut
			yoda
			bobaFett
			darthMaul
			generalGrievous
			mazKanata
			darthVader
			lukeSkywalker

	Sections:
		
		1) Display all characters section
		2) Your Character section below that (empty div)
		3) Enemies Available to Attach
		4) Fight Section which houses the attack button
		5) Defender Section (will dynamically display enemy being attached) (empty div)
		6) Points Section
			<div class="game-attack-text">
				
			</div>
		Visual list of all possible characters
		Your character == object
		Enemies to fight == array of enemy objects
		Background image
		Audio tags (background music, attack noises, defeated noises, win noise)


	Vars:

	Initial Gameplay:
		1) Page loads, and modal displays "Do You Accept The Challenge?""  with button "Play" - need modal show instruction
		and displays the list of characters and empty sections (music begins)
		2) Modal goes away 
		3) user selects their character (click function)
			-Assign selection to yourCharacterObj
			-Character moves to Your Character section
			-Enemies Available To Attack updates
		4) User selects character to attack (click function)
			-Assign selection to yourEnemyObj
			-Initialize the enemy's
			-Selected enemy gets moved to defender section and is removed from enemies to attack section

	Attack Gameplay:
		1) User clicks attack (click function)
			-Initialize 

	Attack Button (Java (you) vs. Yoda (enemy))
		1) Your character's attack power reduces the enemy's health points
			Reduces yoda by 10 (attackPower. Note: next time, it would reduce yoda's by 20, etc.).  Yoda's healthPoints become 490, 470, etc.
			Java's attackPower is increased by the attackPowerFactor
		2) Your enemy counterattack (fixed) reduces your character's health points by their counterAttackPower
		3) You attackPower increases for every attack by your 


	Win Scenario:
		1) Remove defender, and reset yourEnemyObj;
*/
var game = {
	// The master array of all possible characters, stored as objects
	masterCharacterArray: [

		{
			name: "Jabba The Hut",
			visual: "assets/images/jabba.jpg",
			healthPoints: 180,
			attackPower: 10,
			counterAttackPower: 7
		},

		{
			name: "Yoda",
			visual: "assets/images/yoda.jpg",
			healthPoints: 500,
			attackPower: 25,
			counterAttackPower: 35
		},

		{
			name: "Boba Fett",
			visual: "assets/images/boba.jpg",
			healthPoints: 200,
			attackPower: 12,
			counterAttackPower: 10
		},

		{
			name: "Darth Maul",
			visual: "assets/images/darth-maul.jpg",
			healthPoints: 250,
			attackPower: 9,
			counterAttackPower: 10
		},

		{
			name: "General Grievous",
			visual: "assets/images/grievous.jpg",
			healthPoints: 300,
			attackPower: 25,
			counterAttackPower: 20
		},

		{
			name: "Maz Kanata",
			visual: "assets/images/maz.jpg",
			healthPoints: 170,
			attackPower: 11,
			counterAttackPower: 14
		},

		{
			name: "Darth Vader",
			visual: "assets/images/vader.jpg",
			healthPoints: 400,
			attackPower: 30,
			counterAttackPower: 24
		},

		{
			name: "Luke Skywalker",
			visual: "assets/images/luke.jpg",
			healthPoints: 500,
			attackPower: 36,
			counterAttackPower: 30
		}
	],
	// Array containing a single object, representing the character you chose
	yourCharacterArray: [],
	// Array of enemy character objects, displayed in the Enemies Available To Attach section
	enemiesAvailableArray: [],
	// Array containing a single object, representing the enemy you chose
	yourEnemyArray: [],
	// Store two currently battling characters as an array. May want to change the display later
	currentBattleArray: [],
	// Store temp value of protagonist's attackPower for use during battle.
	// Note: during gameply, original "attackPower" will stay fixed until game over
	// "yourTempAttackPower" will increase by base "attackPower" on each attack button click
	yourTempAttackPower: 0,
	// Set initial attack click to true.  Determines the setting of your temp attack power.  When false, does not reassign value (only increments)
	// Note: ONLY use inside of attack button click handler
	initialAttackClick: true,
	// Set the attack mode to false at initialization.  Will determine append instructions during battleplay.
	// If false, disallows any append action when enemy img is clicked.  If true, allows append instruction to follow enemy img click
	attackActiveMode: false,
	// This will be used in conjunction with initialAttackClick to determine the append instructions when selecting another enemy after defeating initial
	enemyAlreadyDefeated: false,
	// Set boolean value to determine action for Attack button click. If defeatActiveMode == true, then an enemy has just been defeated
	// Disallow any click to affect health points.  Reset to false inside of div#enemy-character click when a new enemy has been selected
	defeatActiveMode: false,
	// Keep track of enemies defeatd, so that you know when the character has won if total == length of enemiesAvailableArray
	// Value will be incremented in main program code, after an enemy has been defeated
	// Note: originally removed enemies from array after defeat.  However, this scrambles up the array indexes and mismatches them with li id
	enemiesDefeatedCount: 0,
	
	// Function to create section heading
	// Note: dataObj contains: parent_id, h4_text
	createSectionHeading: function(dataObj) {
		// Add new content to the your-character div.  First, get the parent element.
		var parent = document.getElementById(dataObj.parent_id);
		// First, add Your Character section
		var h4 = document.createElement("h4");
		// Create the text for the <h4>
		var text = document.createTextNode(dataObj.h4_text);
		// Append the <h4> to the div
		parent.appendChild(h4);
		// Put the text into the <h4>
		h4.appendChild(text);
	},

	// Function to dynamically create character list for each section
	// Note: dataObj contains: array, parent_id, ul_id, li_class, li_id, img_class, p1_class, p2_class, p2_id
	createCharacterList: function(dataObj) {
		this.log('dataObj: ' + dataObj);
		//var parent_id = dataObj.parent_id;
		// Get the parent div
		var parent = document.getElementById(dataObj.parent_id);
		// Now create the ul with class your-character
		var ul = document.createElement("ul");
		// Give the ul a class and id
		ul.setAttribute("class", dataObj.ul_id);
		ul.setAttribute("id", dataObj.ul_id);
		// Append the <ul> to the parent div
		parent.appendChild(ul);

		dataObj.array.forEach(function(object, i, arr) {
			// Create li tag for each object
			var li = document.createElement("li");
			// Add class li-character to each <li>
			li.setAttribute("class", dataObj.li_class);
			// Add dynamic id to each <li> for later click handling. Use class + number i to target items
			li.setAttribute("id", dataObj.li_id + i);
			// Append the <li> to the <ul>
			ul.appendChild(li);
			// Create an img tag
			var img = document.createElement("img");
			// Add class to image for bg color
			img.setAttribute("class", dataObj.img_class);
			// Create img src attribute
			img.setAttribute("src", arr[i].visual);
			// Create img alt attribute
			img.setAttribute("alt", arr[i].name);
			// Create a <p> element
			var p = document.createElement('p');
			// Add a class to the p element
			p.setAttribute("class", dataObj.p1_class);
			// Create a text node for inserting text into the <li>
			var text = document.createTextNode(arr[i].name);
			// Append the <p> to the <li>
			li.appendChild(p);
			// Insert the text node into the <li>
			p.appendChild(text);
			// Insert the img tag inside of the <li> tag
			li.appendChild(img);
			// Create another <p> element for display of character health
			var p = document.createElement('p');
			// Add a class to the p element
			p.setAttribute("class", dataObj.p2_class);
			// Add an id to the p element for easy targeting of healthPoints
			p.setAttribute("id", dataObj.p2_id);
			// Create a node for the health text
			var text = document.createTextNode(arr[i].healthPoints);
			// Append the new p element to the <li>
			li.appendChild(p);
			// Append the health text to the <li> element
			p.appendChild(text);
		});
	},
	// Function that calculates currentAttackPower

	// Function to console.log items
	log: function(msg) {
		console.log(msg + "\n");
	}
}

/* first program load list example */
$(document).ready(function() {
	// Create section heading for beginning gameplay
	var dataObj = { 
		parent_id: "display-characters", 
		h4_text:   "Choose Your Character To Begin..." 
	};
	game.createSectionHeading(dataObj);

	// Create select character list for beginning gameplay
	var dataObj = {
		array: game.masterCharacterArray,
		parent_id: "display-characters" ,
		ul_id: 	   "master-char-list"	,
		li_class:  "li-character"		,
		li_id:     "char"				,
		img_class: "bg-blue"			,
		p1_class:  "character-label"	,
		p2_class:  "character-health"   ,
		p2_id:     "character-health"
	}
	game.createCharacterList(dataObj);

	// When the user clicks a character, assign that character to them, and assign everyone else as enemies
	$('div#display-characters li').on('click', function(event) {
	//$(document.body).on('click', 'div#display-characters li', function(event) {
		// Set the character number based on the <li> id. Remove the words from the index number with slice()
		var index = $(this).attr('id').slice(-1);
		game.log('character index chosen: ' + index);
		// Assign your character to your array by accessing the index in the master array
		// Note: this is an array, and not an object, so that it may also be put through the loop function, for DRY purposes
		game.log('game.masterCharacterArray[index]: ' + game.masterCharacterArray[index]);
		var pushObj = game.masterCharacterArray[index];
		game.log('typeof pushObj: ' + typeof pushObj);
		// Push the character chosen onto your character array, and onto the current battle array (will be object)
		game.yourCharacterArray.push(pushObj);
		game.log('yourCharacterArray : ' + game.yourCharacterArray);
		game.currentBattleArray.push(pushObj);

		// Remove the character selected from the master array, so that only the enemies remain
		game.masterCharacterArray.splice(index, 1);
		game.log('masterCharacterArray after splice: ' + game.masterCharacterArray);

		// Rename the resulting array to enemiesAvailableArray for visual purposes
		// Note: this will not create a copy of the original array; it will point
		// to the same location in memory.  Any alterations will affect the master array
		game.enemiesAvailableArray = game.masterCharacterArray;

		// Set defeated count to determine later on if protagonish has won the entire game. Initial value == 7
		//game.enemiesDefeatedCount = game.enemiesAvailableArray.length;
		//game.log("enemies defeated count: " + game.enemiesDefeatedCount);

		// Remove the original character list from the DOM, before adding new content.
		var el = document.getElementById("display-characters");
		el.parentNode.removeChild(el);

		// Create section heading for your character selection
		var dataObj = { 
			parent_id: "display-protagonist", 
			h4_text:   "You Are Fighting As:" 
		};
		game.createSectionHeading(dataObj);
	
		// Create select character list for your character selection
		var dataObj = {
			array: game.yourCharacterArray,
			parent_id: "display-protagonist",
			ul_id: 	   "your-character"		,
			li_class:  "li-your-character"	,
			li_id:     "yourchar"			,
			img_class: "bg-blue"			,
			p1_class:  "character-label"	,
			p2_class:  "character-health"   ,
			p2_id:     "character-health"
		}
		game.createCharacterList(dataObj);

		// Create section heading for enemy display
		var dataObj = { 
			parent_id: "display-enemies", 
			h4_text:   "Select An Opponent To Attack" 
		};
		game.createSectionHeading(dataObj);
	
		// Create select character list from enemies
		var dataObj = {
			array: game.enemiesAvailableArray,
			parent_id: "display-enemies"	 ,
			ul_id: 	   "enemy-character"	 ,
			li_class:  "li-enemy-character"	 ,
			li_id:     "enemy"			 	 ,
			img_class: "bg-red"				 ,
			p1_class:  "character-label"	 ,
			p2_class:  "character-health"    ,
			p2_id:     "character-health"
		}
		game.createCharacterList(dataObj);
	});

	// When the user chooses an enemy, assign it to the defender array
	//$('div#display-enemies li').on('click', function(event) {
	$(document.body).on('click', 'div#display-enemies li', function(event) {
		game.log('enemy was just selected!');

		// If user selected a new enemy, another battle has begun. Set defeat active mode to false so that attack button functionality works
		// Might need to move this??  Shouldnt' it really be set inside of the attack section??
		//game.defeatActiveMode = false;

		// Set the character number based on the <li> id. Will always match position, as html is created dynamically from the array itself.
		// Use slice to remove the words before the index number, for later use of index position
		var index = $(this).attr('id').slice(-1);

		// Assign character to defender array by accessing the index in the enemy array
		var pushObj = game.enemiesAvailableArray[index];

		// If haven't attacked anybody yet, and thus no enemy has been defeated, append new content etc
		if(!game.attackActiveMode && !game.enemyAlreadyDefeated) {

			//game.defeatActiveMode = 

			// Push the character chosen onto defender character array, and current battle array (will be objects)
			game.yourEnemyArray.push(pushObj);
			game.currentBattleArray.push(pushObj);
			
			// Remove the character selected from the enemies available list, by clearing via innerHTML. Could not get removeChild to work.
			// Note: there will always only be one of these
			var ul = document.getElementsByClassName("enemy-character")[0];
			var li = document.getElementById("enemy" + index);
			ul.removeChild(li);
	
			// Insert content into the left-divide-section
			var parent = document.getElementById("left-divide-section");
			var p = document.createElement('p');
			p.setAttribute("class", "divide-label");
			var text = document.createTextNode("VS");
			parent.appendChild(p);
			p.appendChild(text);
	
			// Insert content into the attack section (button etc)
			var parent = document.getElementById("attack-section");
			var button = document.createElement('button');
			button.setAttribute("class", "btn btn-warning");
			button.setAttribute("type", "button");
			button.setAttribute("id", "attack-button");
			var text = document.createTextNode("Attack Now!");
			parent.appendChild(button);
			button.appendChild(text);
	
			// Now display the defender under your character display, on left of screen in the #display-defender <aside>
			// Create section heading for enemy display
			var dataObj = { 
				parent_id: "display-defender", 
				h4_text:   "Your Opponent Is:" 
			};
			game.createSectionHeading(dataObj);
		
			// Create select character list from enemies
			var dataObj = {
				array: game.yourEnemyArray,
				parent_id: "display-defender"	  ,
				ul_id: 	   "defender-character"	  ,
				li_class:  "li-defender-character",
				li_id:     "defender"			  ,
				img_class: "bg-black"			  ,
				p1_class:  "character-label"	  ,
				p2_class:  "character-health"     ,
				p2_id:     "character-health"
			}
			game.createCharacterList(dataObj);
	
			/*
			// Put something into #fight-results section
			var parent = document.getElementById("fight-results");
			var h4 = document.createElement('h4');
			var text = document.createTextNode("Battle Results");
			h4.appendChild(text);
			parent.appendChild(h4);*/
			// Create section heading for enemy display
			var dataObj = { 
				parent_id: "battle-ground", 
				h4_text:   "Battleground" 
			};
			game.createSectionHeading(dataObj);
		
			// Create select character list from enemies
			var dataObj = {
				array: game.currentBattleArray	  ,
				parent_id: "battle-ground"	  	  ,
				ul_id: 	   "battle-character"	  ,
				li_class:  "li-battle-character"  ,
				li_id:     "battle"				  ,
				img_class: "bg-blue"			  ,
				p1_class:  "character-label"	  ,
				p2_class:  "character-health"     ,
				p2_id:     "character-health"
			}
			game.createCharacterList(dataObj);
	
			// Now change the background color of the second li-battle-character to match enemy color. Will always be in 2nd position (1)
			var li = document.getElementsByClassName("li-battle-character")[1];
			var img = li.children[1];
			img.setAttribute("class", "bg-black");
	
			// Now set the game attackMode state to true, so that content is replaced instead of appended
			game.attackActiveMode = true;

		} else if (game.attackActiveMode && game.enemyAlreadyDefeated) {
			// If attack mode has been initialized, and an enemy has been defeated, replace old enemy content with new enemy content
			// First, remove the character selected from the enemies available list, by clearing via innerHTML. Could not get removeChild to work.
			//li = document.getElementsByClassName("li-enemy-character")[index];
			//li.innerHTML = '';
			// Note: there will always only be one of these
			var ul = document.getElementsByClassName("enemy-character")[0];
			var li = document.getElementById("enemy" + index);
			ul.removeChild(li);

			// Next, replace defender and battle enemy character array elements with new enemy character selected
			game.log('yourEnemyArray before splice: ' + game.yourEnemyArray);
			game.log('currentBattleArray before splice: ' + game.currentBattleArray);
			game.yourEnemyArray.splice(0, 1, pushObj);
			game.currentBattleArray.splice(1, 1, pushObj);
			game.log('yourEnemyArray after splice: ' + game.yourEnemyArray);
			game.log('currentBattleArray after splice: ' + game.currentBattleArray);

			// Empty the #display-defender content to make room for new content
			var parent = document.getElementById("display-defender");
			parent.innerHTML = "";

			// Empty the #battle-ground content to make room for new content
			var parent = document.getElementById("battle-ground");
			parent.innerHTML = "";

			// Now update left enemy area display with new content
			var dataObj = { 
				parent_id: "display-defender", 
				h4_text:   "Your Opponent Is:" 
			};
			game.createSectionHeading(dataObj);
		
			var dataObj = {
				array: game.yourEnemyArray,
				parent_id: "display-defender"	  ,
				ul_id: 	   "defender-character"	  ,
				li_class:  "li-defender-character",
				li_id:     "defender"			  ,
				img_class: "bg-black"			  ,
				p1_class:  "character-label"	  ,
				p2_class:  "character-health"     ,
				p2_id:     "character-health"
			}
			game.createCharacterList(dataObj);

			// Now update battle display with new contents of battle array.  DANGER: will this reset your character's health value back to initial??
			var dataObj = { 
				parent_id: "battle-ground", 
				h4_text:   "Battleground" 
			};
			game.createSectionHeading(dataObj);
		
			var dataObj = {
				array: game.currentBattleArray	  ,
				parent_id: "battle-ground"	  	  ,
				ul_id: 	   "battle-character"	  ,
				li_class:  "li-battle-character"  ,
				li_id:     "battle"			      ,
				img_class: "bg-blue"			  ,
				p1_class:  "character-label"	  ,
				p2_class:  "character-health"     ,
				p2_id:     "character-health"
			}
			game.createCharacterList(dataObj);

			// Now change the background color of the second li-battle-character to match enemy color. Will always be in 2nd position (1)
			var li = document.getElementsByClassName("li-battle-character")[1];
			var img = li.children[1];
			img.setAttribute("class", "bg-black");

		} else if (!game.attackActiveMode && !game.defeatActiveMode) {
			// If an attack is not in progress, and no character has recently been defeated (including you), do nothing on enemy image click
			alert("Sorry, but you can't run away from your fight! \nYou gotta finish to defend your rep, man!");
			console.log("entered game attack mode else");
		}
	});

	$('div#attack-section').on('click', 'button#attack-button', function(event) {
		// Note: poinst testing completed.  All working correctly.
		game.log("Attack button was clicked!");

		// If enemy was just defeated, and a new enemy has not yet been selected, do not allow attack button to do anything.
		// Maybe also put condition of attackActiveMode in here too?
		if(game.defeatActiveMode) {
			console.log("Entered false return of attack button, since defeatActiveMode == true");
			return false;
		}

		// Set var you == your character, and var enemy == your enemy, for ease of access
		var your = game.yourCharacterArray[0];
		var enemy = game.yourEnemyArray[0];

		// Set your character's temp attack power == initial attack power for very first attack only (Note: will increment up as fights progress)
		// Note: your enemy's attack power will not increment during gameplay; yourTempAttackPower is just a copy of attackPower
		if(game.initialAttackClick) {
			game.yourTempAttackPower = your.attackPower;
			game.log("Your initial temp attack power: " + game.yourTempAttackPower);
		}

		game.log("Your intial health before attack: " + your.healthPoints);
		game.log("Your enemy's health before attack: " + enemy.healthPoints);

		// Now reduce your health by your enemy's counter attack power
		your.healthPoints -= enemy.counterAttackPower;
		game.log("Your health was reduced by " + enemy.counterAttackPower + " points. \n Your health after attack: " + your.healthPoints);
		// Note: would need something here to check for < 1 healthpoints.  If so, game is over.

		// Now reduce your enemy's health by your temp attack power. Must do so before incrementing temp attack power, else unfair
		enemy.healthPoints -= game.yourTempAttackPower;
		game.log("Your enemy's health was reduced by " + game.yourTempAttackPower + " points.  \n Your enemy's health after attack: " + enemy.healthPoints);

		// Now increase your yourTempAttackPower by your attackPower base value
		game.yourTempAttackPower +=  your.attackPower;
		game.log("Your temp attack power after attack: " + game.yourTempAttackPower);


		// Need to put the below code blocks inside of a function instead
		// Now update the health displays.  Start with updating your character.
		// Note: your character position will always be index == 0, as it is always the only item in the array
		var parent = document.getElementById("display-protagonist");
		var p = parent.getElementsByTagName('p')[1];
		p.innerHTML = your.healthPoints;

		// Now update your health inside of the battle area
		var parent = document.getElementById("battle-ground");
		var p = parent.getElementsByTagName('p')[1];
		p.innerHTML = your.healthPoints;

		// Now update the enemy's health on the left of the screen
		var parent = document.getElementById("display-defender");
		var p = parent.getElementsByTagName('p')[1];
		p.innerHTML = enemy.healthPoints;

		// Now update the enemy's health inside of the battle area
		var parent = document.getElementById("battle-ground");
		var p = parent.getElementsByTagName('p')[3];
		p.innerHTML = enemy.healthPoints;

		// Now check health values, to see if anybody was defeated, or if fight needs to continue
		if(your.healthPoints > 0 && enemy.healthPoints < 1) {
			alert("Nice way to go for the juggular; you won the fight!\nPlease select another enemy.");
			// You won the fight.  First, set enemy already defeated val to true. Will dictate handling of next enemy selection
			game.enemyAlreadyDefeated = true;

			// Set defeat active mode to true so that attack button doesn't do anything
			game.defeatActiveMode = true;

			// Next, increment the enemies defeated count by 1. Once it reaches same value as enemies available array, game is over.
			game.enemiesDefeatedCount += 1;
			
			// Now remove the enemies from the screen. Start with the battleground area enemy
			var ul = document.getElementById("battle-character");
			var li = ul.getElementsByTagName('li')[1]; // Enemy will always be 2nd
			ul.removeChild(li);
			// Alse remove enemy img and enemy label from left side area and replace with <p class="side-defeat-label"> DEFEATED! </p>
			var li = document.getElementsByClassName("li-defender-character")[0]; // Will always be 1st, as is the only item in container
			var p1 = li.getElementsByTagName('p')[0];
			var text = document.createTextNode("DEFEATED!");
			var img = li.getElementsByTagName('img')[0];
			var p2 = li.getElementsByTagName('p')[1];
			p1.setAttribute("class", "side-defeat-label");
			p1.innerHTML = "";
			p1.appendChild(text);
			li.removeChild(img);
			li.removeChild(p2);

			// Continue fighting by selecting another enemy (only if there are enemies left in the enemiesAvailableArray)
			if(game.enemiesDefeatedCount == game.enemiesAvailableArray.length) {
				// No more enemies left, so you won the game! Congrats!
				game.log("Game is over!");
				alert("Congratulations, you won the game! You are Jedi Master!");
				return false;
			}
		} else if (your.healthPoints < 1 && enemy.healthPoints > 0) {
			// You lost the fight.  Game over!!
			// Set defeat active mode to true so that attack button doesn't do anything
			game.defeatActiveMode = true;
			alert("You lost the game; you need to work on your Jedi Master skills!");
			// Right here, you need to set something that disallows another enemy select action


		} else if (your.healthPoints < 1 && enemy.healthPoints < 1) {
			// Your health and enemy's health when below 0. You both died, but one character died more than the other...
			// Set defeat active mode to true so that attack button doesn't do anything
			game.defeatActiveMode = true;
			var character = (your.healthPoints > enemy.healthPoints) ? "your enemy" : "you";
			alert("Game over!  You both died, but " + character + " died more!");
		} else {
			// All other combinations being exhausted, now the only option left is to continue fighting
			game.defeatActiveMode = false;
			game.attackActiveMode = true;
		}

		// Set initialAttackClick == false so that next time attack is clicked, temp attack power does not get reset to initial attack power value
		game.initialAttackClick = false;
	});
	
	/* Orig Code (works)
	// When the user chooses an enemy, assign it to the defender array
	//$('div#display-enemies li').on('click', function(event) {
	$(document.body).on('click', 'div#display-enemies li', function(event) {
		// If game is not yet in attack mode, append new material for attack area, battle area and opponent area
		game.log('enemy was just selected!');
		// Set the character number based on the <li> id
		var characterIndex = $(this).attr('id');
		// Cast to integer, so that .push works below
		var index = parseInt(characterIndex);
		game.log('character index chosen: ' + index);
		// Assign character to defender array by accessing the index in the enemy array
		// Note: this is an array, and not an object, so that it may also be put through the loop function, for DRY purposes
		game.log('game.enemiesAvailableArray[index]: ' + game.enemiesAvailableArray[index]);
		var pushObj = game.enemiesAvailableArray[index];
		game.log('typeof pushObj: ' + typeof pushObj);
		// Push the character chosen onto defender character array, and current battle array (will be object)
		game.yourEnemyArray.push(pushObj);
		game.log('yourEnemyArray : ' + game.yourEnemyArray);
		game.currentBattleArray.push(pushObj);
		// Remove the character selected from the enemies available array, as they will now be the defender
		game.enemiesAvailableArray.splice(index, 1);
		game.log('masterCharacterArray after splice: ' + game.masterCharacterArray);
		// Remove the character selected from the enemies available list, by clearing via innerHTML. Could not get removeChild to work.
		li = document.getElementsByClassName("li-enemy-character")[index];
		li.innerHTML = '';
	
		// Insert content into the left-divide-section
		var parent = document.getElementById("left-divide-section");
		var p = document.createElement('p');
		p.setAttribute("class", "divide-label");
		var text = document.createTextNode("VS");
		parent.appendChild(p);
		p.appendChild(text);
	
		// Insert content into the attack section (button etc)
		var parent = document.getElementById("attack-section");
		var button = document.createElement('button');
		button.setAttribute("class", "btn btn-default");
		button.setAttribute("type", "button");
		var text = document.createTextNode("Attack Now!");
		parent.appendChild(button);
		button.appendChild(text);
	
		// Now display the defender under your character display, on left of screen in the #display-defender <aside>
		// Create section heading for enemy display
		var dataObj = { 
			parent_id: "display-defender", 
			h4_text:   "Your Opponent Is:" 
		};
		game.createSectionHeading(dataObj);
		
		// Create select character list from enemies
		var dataObj = {
			array: game.yourEnemyArray,
			parent_id: "display-defender"	  ,
			ul_id: 	   "defender-character"	  ,
			li_class:  "li-defender-character",
			img_class: "bg-black"			  ,
			p1_class:  "character-label"	  ,
			p2_class:  "character-health"
		}
		game.createCharacterList(dataObj);

		// Create section heading for enemy display
		var dataObj = { 
			parent_id: "battle-ground", 
			h4_text:   "Battleground" 
		};
		game.createSectionHeading(dataObj);
		
		// Create select character list from enemies
		var dataObj = {
			array: game.currentBattleArray	  ,
			parent_id: "battle-ground"	  	  ,
			ul_id: 	   "battle-character"	  ,
			li_class:  "li-battle-character"  ,
			img_class: "bg-blue"			  ,
			p1_class:  "character-label"	  ,
			p2_class:  "character-health"
		}
		game.createCharacterList(dataObj);
	
		// Now change the background color of the second li-battle-character to match enemy color. Will always be in 2nd position (1)
		var li = document.getElementsByClassName("li-battle-character")[1];
		var img = li.children[1];
		img.setAttribute("class", "bg-black");
	
		// Now set the game attackMode state to true, so that content is replaced instead of appended
		game.attackMode = true;
	});*/
});