/**
 * Player Service
 */
class PlayerService extends PlayerData
{
    constructor()
    {
        this.player = NULL;
    }

    setPlayer(player)
    {
        this.player = player;
    }

    getPlayer()
    {
        return this.player;
    }

    getPlayerInventory()
    {
        return this.player.inventory;
    }

    getPlayerLocation()
    {
        return this.player.room;
    }

    getPlayerMoves()
    {
        return this.player.moves;
    }

}