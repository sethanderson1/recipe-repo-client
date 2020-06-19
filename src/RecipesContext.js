import React from 'react'

export default React.createContext({
  categories: [],
  recipes: [],
  currentCategoryId: 0,
  onChangeCurrentCategoryId: () => { },
  onAddCategory: () => {},
  handleGetRecipes: () => {}
})
