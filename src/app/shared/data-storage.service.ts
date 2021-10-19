import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.authService.user.pipe(take(1), exhaustMap( user => {
          return this.http.put('https://recipebook-68bc9-default-rtdb.firebaseio.com/recipes.json?auth=' + user?.token, recipes)
        }))
        .subscribe( response => {
          console.log(response);
        });
    }

    fetchRecipes() {
      return this.authService.user.pipe(take(1), exhaustMap( user => {
        return this.http.get<Recipe[]>("https://recipebook-68bc9-default-rtdb.firebaseio.com/recipes.json?auth=" + user?.token)
      }), 
      map( recipes => {
        return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        })
      }), 
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));
    }
}