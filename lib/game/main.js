ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.orb',
	'game.entities.cursor',

	'game.levels.Level1',
    'impact.debug.debug' // <- Add this
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	cursor: null,
	orbArray: [[]],
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.initMouse();
		ig.input.bind( ig.KEY.MOUSE1, 'click' );

		this.loadLevel(LevelLevel1);
		this.spawnEntity(EntityCursor, ig.input.mouse.x, ig.input.mouse.y);

		//i = row
		for(var i = 0; i < 5;i++)
		{
			//adding columns
			//this is 5 rows of 6 columns
			this.orbArray[i] = new Array(6);
		}

		this.SpawnOrbs();

		//this.setupCamera();
	},	

	
	setupCamera: function() {
		// Set up the camera. The camera's center is at a third of the screen
		// size, i.e. somewhat shift left and up. Damping is set to 3px.		
		this.camera = new ig.Camera( ig.system.width, ig.system.height, 0 );
		
		// // The camera's trap (the deadzone in which the player can move with the
		// // camera staying fixed) is set to according to the screen size as well.
  //   	this.camera.trap.size.x = ig.system.width/10;
  //   	this.camera.trap.size.y = ig.system.height/3;
		
		// // The lookahead always shifts the camera in walking position; you can 
		// // set it to 0 to disable.
  //   	this.camera.lookAhead.x = ig.system.width/6;
		
		// // Set camera's screen bounds and reposition the trap on the player
  //   	this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
  //   	this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
    	this.camera.set( this.player );
	},

	SpawnOrbs: function() 
	{
		var row = 0, col = 0;
		var spacing = 32;//, buffer = 32;
		for(row =0; row< 5; row++) //row is y
		{
			for(col = 0; col < 6; col++) // col is x
			{
				this.orbArray[row][col] = this.spawnEntity(EntityOrb, (col * spacing), (row * spacing));
			}
		}
	},


	update: function() 
	{
		// Update all entities and backgroundMaps
		this.parent();
		// Re-sort Entities
		ig.game.sortEntitiesDeferred();

		if(ig.input.released('click'))
		{
			this.checkForMatch();
		}
	},

	checkForMatch: function()
	{
		var row = 0, col = 0;
		for(row = 0;row < 5; row++)
		{
			for(col = 0; col < 6; col++)
			{
				var thisOne = null, aboveOne = null, belowOne = null, leftOne = null, rightOne = null;
				thisOne = this.orbArray[row][col].type;
				if(row > 0)
				{
					aboveOne = this.orbArray[row - 1][col].type;
				}
				if(row < 3)
				{
					belowOne = this.orbArray[row + 1][col].type;
				}
				if(col > 0)
				{
					leftOne = this.orbArray[row][col - 1].type;
				}
				if(col < 4)
				{
					rightOne = this.orbArray[row][col + 1].type;
				}

				if(thisOne === aboveOne && thisOne === belowOne)
				{
					this.orbArray[row - 1][col].markedToDie = true;
					this.orbArray[row][col].markedToDie = true;
					this.orbArray[row + 1][col].markedToDie = true;					
				}

				if(thisOne === leftOne && thisOne === rightOne)
				{					
					this.orbArray[row][col - 1].markedToDie = true;
					this.orbArray[row][col].markedToDie = true;
					this.orbArray[row][col + 1].markedToDie = true;	
				}
			}
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	},

	spawn: function(name, x, y, settings)
	{
		ig.game.spawnEntity(name, x , y, settings);
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 192, 160, 2 );

});
/*
// Listen to the window's 'resize' event and set the canvas' size each time
// it changes.
window.addEventListener('resize', function(){
	// If the game hasn't started yet, there's nothing to do here
	if( !ig.system ) { return; }
	
	// Resize the canvas style and tell Impact to resize the canvas itself;
	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height = window.innerHeight + 'px';
	ig.system.resize( window.innerWidth * scale, window.innerHeight * scale );
	
	// Re-center the camera - it's dependend on the screen size.
	if( ig.game && ig.game.setupCamera ) {
		ig.game.setupCamera();
	}
}, false);*/
