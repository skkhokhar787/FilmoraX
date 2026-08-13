import React, { useState } from 'react'
import { FilterContext } from '../utils/AppContext'

function FilterProvider({children}) {
    const [selectedGenre, setSelectedGenre] = useState("all");


  return (
    <FilterContext.Provider value={{selectedGenre, setSelectedGenre}}>
        {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider