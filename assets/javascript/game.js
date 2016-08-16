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
	// This will be a single object, representing the character you chose
	yourCharacterArray: [],
	// This will be a single object, representing the enemy you chose, displayed in the Defender section
	yourEnemyArray: [],
	// Array of enemy character objects, displayed in the Enemies Available To Attach section
	enemiesAvailableArray: [],
	// Store current value of protagonist's attackPower for use during gameplay. Note: attackPower will stay fixed
	currentAttackPower: 0,

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

	// Function to create character list for each section
	// Note: dataObj contains: array, parent_id, ul_id, li_class, li_id, img_class, p1_class, p2_class
	createCharacterList: function(dataObj) {
		this.log('dataObj: ' + dataObj);
		//var parent_id = dataObj.parent_id;
		// Get the parent div
		var parent = document.getElementById(dataObj.parent_id);
		// Now create the ul with class your-character
		var ul = document.createElement("ul");
		// Give the ul an id
		ul.setAttribute("id", dataObj.ul_id);
		// Append the <ul> to the parent div
		parent.appendChild(ul);

		dataObj.array.forEach(function(object, i, arr) {
			// Create li tag for each object
			var li = document.createElement("li");
			// Add class li-character to each <li>
			li.setAttribute("class", dataObj.li_class);
			// Add dynamic id to each <li> for later click handling
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
		li_id: 	   "character"			,
		img_class: "bg-blue"			,
		p1_class:  "character-label"	,
		p2_class:  "character-health"
	}
	game.createCharacterList(dataObj);

	// When the user clicks a character, assign that character to them, and assign everyone else as enemies
	$('div#display-characters li').on('click', function(event) {
		// Set the character number based on the <li> id
		// Take substring, and record last item in string, as id #'s are proceeded by "character" for visual purposes
		var yourCharacterIndex = $(this).attr('id').substring(9);
		// Cast to integer, so that .push works below
		var index = parseInt(yourCharacterIndex);
		game.log('character index chosen: ' + index);
		// Assign your character to your array by accessing the index in the master array
		// Note: this is an array, and not an object, so that it may also be put through the loop function, for DRY purposes
		game.log('game.masterCharacterArray[index]: ' + game.masterCharacterArray[index]);
		var pushObj = game.masterCharacterArray[index];
		game.log('typeof pushObj: ' + typeof pushObj);
		// Push the character chosen onto your character array (will be object)
		game.yourCharacterArray.push(pushObj);
		game.log('yourCharacterArray : ' + game.yourCharacterArray);

		// Remove the character selected from the master array, so that only the enemies remain
		game.masterCharacterArray.splice(yourCharacterIndex, 1);
		game.log('masterCharacterArray after splice: ' + game.masterCharacterArray);

		// Rename the resulting array to enemiesAvailableArray for visual purposes
		// Note: this will not create a copy of the original array; it will point
		// to the same location in memory.  Any alterations will affect the master array
		game.enemiesAvailableArray = game.masterCharacterArray;

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
			li_id: 	   "your-character"		,
			img_class: "bg-blue"			,
			p1_class:  "character-label"	,
			p2_class:  "character-health"
		}
		game.createCharacterList(dataObj);
		/*
		// Add new content to the your-character div.  First, get the parent element.
		var parent = document.getElementById("display-protagonist");
		// First, add Your Character section
		var h4 = document.createElement("h4");
		// Create the text for the <h4>
		var text = document.createTextNode("Your Character");
		// Append the <h4> to the div
		parent.appendChild(h4);
		// Put the text into the <h4>
		h4.appendChild(text);
		// Now create the ul with class your-character
		var ul = document.createElement("ul");
		// Give the ul an id
		ul.setAttribute("id", "your-character");
		// Append the <ul> to the parent div
		parent.appendChild(ul);
		// Now create the <li> for your character, using the loop function.
		// Note: Even though length == 1, do it for DRY purposes
		game.yourCharacterArray.forEach(function(object, i, array) {
			// Create an <li> tag for each object
			var li = document.createElement("li");
			// Add class li-character to each <li>
			li.setAttribute("class", "li-your-character");
			// Add dynamic id to each <li> for later click handling. NOTE: may not need any clicks on it
			li.setAttribute("id", "your-character");
			// Append the <li> to the <ul>
			ul.appendChild(li);
			// Create an img tag
			var img = document.createElement("img");
			// Add bg to image
			img.setAttribute("class", "bg-blue");
			// Create img src attribute
			img.setAttribute("src", array[i].visual);
			// Create img alt attribute
			img.setAttribute("alt", array[i].name);
			// Create a <p> element
			var p = document.createElement('p');
			// Add a class to the p element
			p.setAttribute("class", "character-label");
			// Create a text node for inserting text into the <li>
			var text = document.createTextNode(array[i].name);
			// Append the <p> to the <li>
			li.appendChild(p);
			// Insert the text node into the <li>
			p.appendChild(text);
			// Insert the img tag inside of the <li> tag
			li.appendChild(img);
			// Create another <p> element for display of character health
			var p = document.createElement('p');
			// Add a class to the p element
			p.setAttribute("class", "your-character-health");
			// Create a node for the health text
			var text = document.createTextNode(array[i].healthPoints);
			// Append the new p element to the <li>
			li.appendChild(p);
			// Append the health text to the <li> element
			p.appendChild(text);
		});*/

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
			li_id: 	   "enemy-character"	 ,
			img_class: "bg-red"				 ,
			p1_class:  "character-label"	 ,
			p2_class:  "character-health"
		}
		game.createCharacterList(dataObj);
		/*
		// Now dynamically fill in the enemies to select section with remaining master array items
		var parent = document.getElementById("display-enemies");
		// Create and add the h4 heading
		var h4 = document.createElement('h4');
		var text = document.createTextNode("Select An Opponent To Attack");
		h4.appendChild(text);
		parent.appendChild(h4);
		// Create and append the ul element
		var ul = document.createElement('ul');
		ul.setAttribute("id", "enemy-list");
		parent.appendChild(ul);
		// Create and append the characters by going through loop
			game.enemiesAvailableArray.forEach(function(object, i, array) {
			// Create an <li> tag for each object
			var li = document.createElement("li");
			// Add class li-character to each <li>
			li.setAttribute("class", "li-enemy-character");
			// Add dynamic id to each <li> for later click handling. NOTE: may not need any clicks on it
			li.setAttribute("id", "enemy-character");
			// Append the <li> to the <ul>
			ul.appendChild(li);
			// Create an img tag
			var img = document.createElement("img");
			// Add bg to image
			img.setAttribute("class", "bg-red");
			// Create img src attribute
			img.setAttribute("src", array[i].visual);
			// Create img alt attribute
			img.setAttribute("alt", array[i].name);
			// Create a <p> element
			var p = document.createElement('p');
			// Add a class to the p element
			p.setAttribute("class", "character-label");
			// Create a text node for inserting text into the <li>
			var text = document.createTextNode(array[i].name);
			// Append the <p> to the <li>
			li.appendChild(p);
			// Insert the text node into the <li>
			p.appendChild(text);
			// Insert the img tag inside of the <li> tag
			li.appendChild(img);
			// Create another <p> element for display of character health
			var p = document.createElement('p');
			// Add a class to the p element
			p.setAttribute("class", "enemy-character-health");
			// Create a node for the health text
			var text = document.createTextNode(array[i].healthPoints);
			// Append the new p element to the <li>
			li.appendChild(p);
			// Append the health text to the <li> element
			p.appendChild(text);
		});*/
	});
});

/*
enemies.push(javaTheHut);

var c = characterObjects;

enemies = [c.javaTheHut, c.yoda, c.bubaFet];

yourCharacter = characterObject.yoda;
*/

























