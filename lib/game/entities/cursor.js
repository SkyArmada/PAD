ig.module(
	'game.entities.cursor'
)
.requires(
	'impact.entity'
)
.defines(function()
{

	EntityCursor = ig.Entity.extend(
	{
		
		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {x: 1, y: 1},
		
		maxVel: {x: 400, y: 800},
		
		type: ig.Entity.TYPE.B, // Player friendly group
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		orb: null,
		prevClickState: false,
		clickState: false,
		
		animSheet: new ig.AnimationSheet( 'media/orb.png', 1, 1 ),	

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player

		
		init: function( x, y, settings ) 
		{
			this.parent( x, y, settings );
			ig.game.cursor = this;
		},
		
		
		update: function() 
		{
			if(ig.input.state('click'))
			{
				this.pos.x = ig.input.mouse.x;
				this.pos.y = ig.input.mouse.y;
				this.clickState = true;	

				var orbs = ig.game.getEntitiesByType( EntityOrb );

				for(var i = 0; i < orbs.length; i++)
				{
					var orbX = orbs[i].pos.x;
					var orbXEnd = (orbs[i].pos.x + orbs[i].size.x);

					var orbY = orbs[i].pos.y;
					var orbYEndY= (orbs[i].pos.y + orbs[i].size.y);

					if(this.pos.x > orbX && this.pos.x < orbXEnd)
					{
						if(this.pos.y > orbY && this.pos.y < orbYEndY)
						{
							if(this.orb === null && this.prevClickState === false)
							{
								orbs[i].selected = true;
								this.orb = orbs[i];
							}
						}
						else
						{
							orbs[i].selected = false;
							this.orb = null;
						}
					}
					else
					{
						orbs[i].selected = false;
						this.orb = null;
					}
				}
			}	
			else
			{
				if(this.orb != null)
				{
					this.orb.selected = false;
					this.orb = null;
				}
				this.clickState = false;
			}			
			this.prevClickState = this.clickState;
		},

		checkAgainst: function(other)
		{
			if(this.parent(other))
			{
				other.receiveDamage(0, this);
			}
		}
	});
});



