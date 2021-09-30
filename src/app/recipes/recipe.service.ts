import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

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

    getRecipes() {
       return this.recipes.slice();
    }
}