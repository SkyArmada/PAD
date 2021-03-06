ig.module(
	'game.entities.orb'
)
.requires(
	'impact.entity'
)
.defines(function()
{

	EntityOrb = ig.Entity.extend(
	{
		
		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {x: 32, y: 32},
		
		maxVel: {x: 400, y: 800},
		
		type: ig.Entity.TYPE.A, // Player friendly group
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NEVER,
		name: 'Orb',
		
		animSheet: new ig.AnimationSheet( 'media/orb.png', 32, 32 ),	

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,
		type:"None",
		currentTile: {x:0,y:0},
		colors:['blue', 'red', 'yellow', 'green', 'purple', 'pink'],
		selected: false,
		num: null,
		offsetX: null,
		offsetY: null,
		prevSelected: false,
		savedX: null,
		savedY: null,
		savedTile: null,
		previousTile: null,
		markedToDie:false,
		
		init: function( x, y, settings ) 
		{
			this.parent( x, y, settings );
			this.savedX = x;
			this.savedY = y;
			this.savedTile = this.getCurrentTile();
			//this.addAnim( 'idle', 1, [6] );
			
			// Add the animations
			this.num = this.getRandomNum(0, 3);//6
			this.type = this.colors[this.num];
			this.addAnim( 'idle', 1, [this.num] );
			this.addAnim( 'select', 1, [6] );

			// Set a reference to the player on the game instance
			ig.game.player = this;
			this.zIndex = 1;
		},
		
		
		update: function() 
		{					
			// Move!
			if(this.markedToDie === true)
			{
				this.kill();
			}
			this.parent();
			this.HandleInput();
			this.currentTile = this.getCurrentTile();

			if(this.selected === true)
			{
				if(this.prevSelected === false)
				{
					this.offsetX = ig.game.cursor.pos.x - this.pos.x;
					this.offsetY = ig.game.cursor.pos.y - this.pos.y;					
				}
				this.pos.x = ig.game.cursor.pos.x - this.offsetX;
				this.pos.y = ig.game.cursor.pos.y - this.offsetY;
			}
			else
			{
				if(ig.game.cursor.orb !== null && (this.currentTile.x === ig.game.cursor.orb.savedTile.x && this.currentTile.y === ig.game.cursor.orb.savedTile.y))
				{					
					this.snapToTile(ig.game.cursor.orb.previousTile);
					this.savedTile = ig.game.cursor.orb.previousTile;
				}
				else
				{
					this.snapToTile(this.savedTile);
				}

				if(this.prevSelected === true)
				{
					this.snapToTile(ig.game.cursor.savedTile);
				}
			}

			this.prevSelected = this.selected;
		},

		HandleInput: function()
		{
		},

		receiveDamage: function(amount, other)
		{
			console.log('ouch');
		},
        snapToTile:function (pos) 
        {
            var tilesize = ig.game.backgroundMaps[0].tilesize;
            this.pos.x = pos.x * tilesize;
            this.pos.y = pos.y * tilesize;
        },


        getCurrentTile:function () 
        {
            var tilesize = ig.game.backgroundMaps[0].tilesize;
            var tileX = this.pos.x / tilesize;
            var tileY = this.pos.y / tilesize;
            return { x:Math.floor(tileX), y:Math.floor(tileY) };
        },

        getRandomNum:function (min, max)
        {
        	return Math.floor((Math.random() * max) + min);
        }
	});
});