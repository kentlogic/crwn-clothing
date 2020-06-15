import { createSelector } from 'reselect'


const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollection = (collectionUrlParam) =>
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
        )
    
//convert object into an array
export const selectCollectionsPreview = createSelector(
    [selectCollections],
    collections => Object.key(collections).map(key => collections[key])
)