/*:
 * @plugindesc v1.00 A simple plug-in designed to allow the setting of Region ID's in-game
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

Game_Map.prototype.setTileId = function(x, y, regId) {
    var width = $dataMap.width;
    var height = $dataMap.height;
    $dataMap.data[(5 * height + y) * width + x] = (regId || 0);
};