/**
 * Item Service
 */
class ItemService extends ItemData
{
    constructor()
    {
        this.items = [];
    }

    storeItems(item)
    {
        this.items.push(item);
    }


    getAllItems()
    {
        return this.items;
    }

}