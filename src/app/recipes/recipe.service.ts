import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppinglist.service";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action'
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';


@Injectable()
export class RecipeService {

   recipeChanged = new Subject<Recipe[]>()

   private recipes: Recipe[] =[
      /*   new Recipe('Test Recipe',
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
                  ]), */
    ];

    constructor(private shoppingListService: ShoppingListService,
                  private store: Store<fromShoppingList.AppState>) {}

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
       return this.recipes.slice();
    }

    getRecipe(id: number) {
       return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      /* this.shoppingListService.addIngredients(ingredient); */
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
       this.recipes.splice(index, 1);
       this.recipeChanged.next(this.recipes.slice());
    }
}