import * as actionTypes from './actions';

const initialState = {
    // the ingredients and its quantities
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    // base burger price 
    totalPrice: 5
}

// always returns a new object, so we never mutate data
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    // here we override the passed ingredient
                    // these brakets mean "override this property"
                    [action.ingredientName]: state[action.ingredientName] +1
                }
            };
        case actionTypes.ADD_INGREDIENT:
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state[action.ingredientName] -1
            }
        };
        default:
            return state;
    }
};

export default reducer;