import React,{useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filter(){
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.servicesAPI.category
    const [search, setSearch] = state.servicesAPI.search

    const handleCategory = e =>{
        setCategory(e.target.value)
        setSearch('')
    }

    return(
        <div className="filter-menu">
        <div className="row">
            <span>Categories :</span>
            <select name="category" value={category} onChange={handleCategory}>
            <option value=''>All Services</option>
            {
                categories.map(category =>(
                    <option value={"category=" + category._id}  key={category._id}>
                        {category.name}
                    </option>
                ))
            }
            </select>
            </div>
            <input type="text" value={search} placeholder="Enter your search" onChange={e => setSearch(e.target.value.toLowerCase())}/>
            
        </div>
    )
}

export default Filter





