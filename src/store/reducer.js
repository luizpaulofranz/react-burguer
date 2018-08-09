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
        case actionTypes.ADD_INGREDIENT:
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
        default:
            return state;
    }
};

export default reducer;