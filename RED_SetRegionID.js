/*:
 * @plugindesc v1.01 A simple plug-in designed to allow the setting of Region ID's in-game
 * @author Hikitsune-Red 火狐
 *
 * @help
 * ================================================================================
 * SETUP:
 * Make sure each screen in the 'img/system' folder is named 'Loading#.png' where #
 * is a number starting/going up from 1.
 * 
 * There should also be a base one called just 'Loading.png' 
 *
 * ================================================================================
 * SCRIPT CALL:
 * To change a tile's region ID, use the function "$gameMap.setTileId(x, y, r)"
 * where x and y are the tile, and r is the new region #
 * Leaving r empty will turn the region ID into 0
 *
 * ================================================================================
 * TERMS OF USE
 * Free for any commercial or non-commercial project!
 * Just credit Hikitsune-Red 火狐 in your project
 */
 
(function() {
	
	var _Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function()
	{
		_Game_System_initialize.call(this);
		this.initREDRegions();
	};
	
	Game_System.prototype.initREDRegions = function()
	{
		this._REDRegions = {};
	};
	
	Game_System.prototype.REDRegions = function()
	{
		if (this._REDRegions === undefined) this.initREDRegions();
		return this._REDRegions;
	};
	
	Game_System.prototype.getREDRegion = function(mapId, x, y, z)
	{
		if (this._REDRegions === undefined) this.initREDRegions();
		var width = $dataMap.width;
		var height = $dataMap.height;
		return this._REDRegions[mapId, (z * height + y) * width + x];
	};
	
	Game_System.prototype.isREDRegion = function(mapId, x, y, z)
	{
		if (this._REDRegions === undefined) this.initREDRegions();
		var width = $dataMap.width;
		var height = $dataMap.height;
		return this._REDRegions[mapId, (z * height + y) * width + x] !== undefined;
	};
	
	Game_System.prototype.setREDRegion = function(mapId, x, y, z, regId)
	{
		console.log('Setting region id of Map:' + mapId + ' x:' + x + ' Y:' + y + ' to REG:' + regId);
		var width = $dataMap.width;
		var height = $dataMap.height;
		this._REDRegions[mapId, (z * height + y) * width + x] = (regId || 0);
	};
	
	Game_Map.prototype.setTileId = function(x, y, regId) 
	{
		$gameSystem.setREDRegion($gameMap._mapId, x, y, 5, regId);
	};
	
	var _Game_Map_tileId = Game_Map.prototype.tileId;
	Game_Map.prototype.tileId = function(x, y, z)
	{
		if ($gameSystem.isREDRegion($gameMap._mapId, x, y, z))
		{
			var width = $dataMap.width;
			var height = $dataMap.height;
			return $gameSystem.getREDRegion($gameMap._mapId, x, y, z);
		} else {
			return _Game_Map_tileId.call(this, x, y, z);
		}
	};
	
}) ();