import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({service, deleteService}){
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addHistory = state.userAPI.addHistory

    return(
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                <Link id="btn_book" to="#!" 
                onClick={() => deleteService(service._id, service.images.pulic_id)}>
                DELETE
            </Link>
            <Link id="btn_view" to={`/edit_service/${service._id}`}>
                EDIT
            </Link>
            </>
            :<>
            <Link id="btn_book" to="#!" onClick={() => addHistory(service)}>
                ADD favourites
            </Link>
            <Link id="btn_view" to={`/detail/${service._id}`}>
                VIEW
            </Link>
            </>
            }
            
        </div>
    )
}
export default BtnRender