import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients!: Observable<{ingredients: Ingredient[]}>;
  private igChangeSub!: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList: {ingredients: Ingredient[] }}> ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    /* this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    ); */
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index);
  }

  ngOnDestroy() {
    /* this.igChangeSub.unsubscribe(); */
  }

}
