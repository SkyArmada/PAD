ig.module( 'game.levels.Level1' )
.requires( 'impact.image' )
.defines(function(){
LevelLevel1=/*JSON[*/{
	"entities": [],
	"layer": [
		{
			"name": "new_layer_0",
			"width": 6,
			"height": 5,
			"linkWithCollision": true,
			"visible": 1,
			"tilesetName": "media/tiles.png",
			"repeat": false,
			"preRender": true,
			"distance": "1",
			"tilesize": 32,
			"foreground": false,
			"data": [
				[2,1,2,1,2,1],
				[1,2,1,2,1,2],
				[2,1,2,1,2,1],
				[1,2,1,2,1,2],
				[2,1,2,1,2,1]
			]
		}
	]
}/*]JSON*/;
LevelLevel1Resources=[new ig.Image('media/tiles.png')];
});