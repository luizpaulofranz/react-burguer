/* 
The reducers files are the responsibles for update the state.
BUUUUT, they should do it WITHOUT ASYNC CODE, so, HERE we only 
set the app state, nothing more, with SYN codes, the ASYNC operations, like server hitings
must be runned by an action, and their return (SYNC data) are then passed here =/
*/
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    // the ingredients and its quantities
    ingredients: null,
    // base burger price 
    totalPrice: 5,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.75,
    cheese: 1,
    meat: 2.5,
    bacon: 1.5
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
                    [action.ingredientName]: state.ingredients[action.ingredientName] +1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            let newPrice = state.totalPrice;
            if (newPrice > 0) {
                newPrice -= INGREDIENT_PRICES[action.ingredientName]
            }
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] -1
                },
                totalPrice: newPrice
            };
        case actionTypes.RESET_INGREDIENT:
            const ings = {...initialState.ingredients};
            return {
                ...initialState,
                ingredients: ings
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILD:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;