ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.orb',
	'game.entities.cursor',

	'game.levels.Level1'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	cursor: null,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.initMouse();
		ig.input.bind( ig.KEY.MOUSE1, 'click' );

		this.loadLevel(LevelLevel1);

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
		var spacing = 32;
		for(row = 0;row < 6; row++)
		{
			for(col = 0; col < 5; col++)
			{
				this.spawnEntity(EntityOrb, row * spacing, col * spacing);
			}
		}
	},


	update: function() 
	{
		// Update all entities and backgroundMaps
		this.parent();
		// Re-sort Entities
		ig.game.sortEntitiesDeferred();

		if(this.cursor === null)
		{
			if(ig.input.pressed('click'))
			{
				this.spawnEntity(EntityCursor, ig.input.mouse.x, ig.input.mouse.y);
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
ig.main( '#canvas', MyGame, 60, 256, 160, 2 );

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
