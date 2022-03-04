import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';
import * as ShoppingListActions from '../store/shopping-list.action'
import * as fromShoppingList from '../store/shopping-list.reducer'


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode = false;
  editedItem!: Ingredient;
  @ViewChild('f', {static: false}) slForm!: NgForm;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateDate => {
      if(stateDate.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateDate.editedIngredient;
        this.slForm.setValue({
          name:this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      /* this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient); */
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      /* this.shoppingListService.addIngredient(newIngredient); */
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    /* this.shoppingListService.deleteIngredient(this.editedItemIndex); */
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
   
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
