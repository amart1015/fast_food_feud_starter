import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import Header from "./components/Header/Header";
import Instructions from "./components/Instructions/Instructions";
import Chip from "./components/Chip/Chip";
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel";
import { createDataSet } from "./data/dataset"
import "./App.css"
import { useState } from "react";
import { nutritionFacts } from "./constants";

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {
  const [category, setCategory] = React.useState(null);
  const [restaurant, setRestaurant] = React.useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(null);
  let instructionStat=null;
  let currentMenuItems= data.filter((d) => {
    return d.food_category == category && d.restaurant == restaurant;
  });
  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((categories, idx) =>(
            <Chip
              key={idx}
              label={categories}
              isActive={categories == category ? true : false}
              onClick={()=> {
                setCategory(categories);
                setSelectedMenuItem(null);
              }}
            />
          ))}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        <Header 
        title={appInfo.title}
        tagline={appInfo.tagline}
        description={appInfo.description}
        />
        

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {restaurants.map((restaurants, idx) =>(
              <Chip
              key={idx}
              label={restaurants}
              isActive={restaurants == restaurant ? true : false}
              onClick={()=> {
                setRestaurant(restaurants);
                setSelectedMenuItem(null);
              }}
            />
            ))}
          </div>
        </div>
        
        {(
          (!category && !restaurant && !selectedMenuItem && <Instructions instructions={appInfo.instructions.start}/>)
          ||
          (category && !restaurant && !selectedMenuItem && <Instructions instructions={appInfo.instructions.onlyCategory}/>)
          ||
          (!category && restaurant && !selectedMenuItem && <Instructions instructions={appInfo.instructions.onlyRestaurant}/>)
          ||
          (category && restaurant && !selectedMenuItem && <Instructions instructions={appInfo.instructions.noSelectedItem}/>)
          ||
          (category && restaurant && selectedMenuItem && <Instructions instructions={appInfo.instructions.allSelected}/>)
          )}

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((currentMenuItems, idx) =>(
            <Chip
              key={idx}
              label={currentMenuItems.item_name}
              isActive={currentMenuItems == selectedMenuItem ? true : false}
              onClick={()=> {
                setSelectedMenuItem(currentMenuItems);
              }}
            />
            ))}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {selectedMenuItem ? <NutritionalLabel item={selectedMenuItem}/>:null}
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
