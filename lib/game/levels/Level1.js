ig.module( 'game.levels.Level1' )
.requires( 'impact.image' )
.defines(function(){
LevelLevel1=/*JSON[*/{
	"entities": [],
	"layer": [
		{
			"name": "new_layer_0",
			"width": 8,
			"height": 7,
			"linkWithCollision": true,
			"visible": 1,
			"tilesetName": "media/tiles.png",
			"repeat": false,
			"preRender": true,
			"distance": "1",
			"tilesize": 32,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0],
				[0,1,2,1,2,1,2,0],
				[0,2,1,2,1,2,1,0],
				[0,1,2,1,2,1,2,0],
				[0,2,1,2,1,2,1,0],
				[0,1,2,1,2,1,2,0],
				[0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
LevelLevel1Resources=[new ig.Image('media/tiles.png')];
});