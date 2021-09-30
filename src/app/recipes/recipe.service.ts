import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {

   selectedRecipe = new EventEmitter<Recipe>();

   private recipes: Recipe[] =[
        new Recipe('Test Recipe', 'description',
        'https://hips.hearstapps.com/delish/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg'),
        new Recipe('Test 2 Recipe', 'description 2',
        'https://hips.hearstapps.com/delish/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg')
    ];

    getRecipes() {
       return this.recipes.slice();
    }
}