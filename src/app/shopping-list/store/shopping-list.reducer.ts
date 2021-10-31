import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";


export interface ShoppingListState{
    ingredients: Ingredient[];
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
      ]
};

export function shoppingListReducer(state: ShoppingListState = initialState,
                                    action: ShoppingListActions.ShoppingListActions): ShoppingListState {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };

        default: return state;
    }
}