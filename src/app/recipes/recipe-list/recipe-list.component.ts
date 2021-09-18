import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] =[
    new Recipe('Test Recipe', 'description',
    'https://hips.hearstapps.com/delish/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg'),
    new Recipe('Test 2 Recipe', 'description 2',
    'https://hips.hearstapps.com/delish/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
