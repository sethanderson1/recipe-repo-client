import React from 'react'

export default React.createContext({
  categories: [],
  recipes: [],
  currentCategoryId: 'all',
  onChangeCurrCategoryId: () => { },
  onAddCategory: () => {},
  handleGetRecipes: () => {}
})
