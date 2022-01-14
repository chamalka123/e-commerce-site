import React, {useContext}from 'react'
import {GlobalState} from '../../../GlobalState'

function LoadMore(){
    const state = useContext(GlobalState)
    const [page, setPage]= state.servicesAPI.page
    const [result, setResult]= state.servicesAPI.result
    return(
        <div className="load_more">
            {
                result < page * 6 ? ""
                : <button onClick={()=> setPage(page+1)}>Load More</button>
            }

        </div>
    )
}

export default LoadMore