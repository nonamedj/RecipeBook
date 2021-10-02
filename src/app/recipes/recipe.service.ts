import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppinglist.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
   selectedRecipe = new EventEmitter<Recipe>();

   private recipes: Recipe[] =[
        new Recipe('Test Recipe',
                   'description',
                   'https://hips.hearstapps.com/delish/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg',
                   [
                      new Ingredient('Meat', 2),
                      new Ingredient('Potato', 10)
                   ]),

        new Recipe('Test 2 Recipe',
                   'description 2',
                   'https://hips.hearstapps.com/delish/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg',
                  [
                     new Ingredient('Meat', 2),
                     new Ingredient('Salad', 30)
                  ]),
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
       return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredient: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredient);
    }
}