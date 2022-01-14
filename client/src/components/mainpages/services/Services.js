import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ServiceItem from '../utils/serviceItem/ServiceItem'
import axios from 'axios'
import Filter from './Filter'
import LoadMore from './LoadMore'

function Services(){
    const state = useContext(GlobalState)
    const [services, setServices] = state.servicesAPI.services
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.servicesAPI.callback
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        services.forEach(service => {
            if(service._id === id) service.checked = !service.checked
        })
        setServices([...services])
    }
    
    const deleteService = async(id, public_id)=>{
        console.log({id, public_id})
        try {
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteService = axios.delete(`/api/services/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteService
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }

    }

    const checkAll = ()=>{
        services.forEach(service =>{
            service.checked = !isCheck
        })
        setServices([...services])
        setIsCheck(!isCheck)
    }
    const deleteAll = ()=>{
        services.forEach(service =>{
            if(services.checked) deleteService(services._id, service.images.public_id)
        })
    }
    return(
        <>
        <Filter/>
        
        {
            isAdmin &&
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete All</button>
            </div>
        }
        <div className="services">
            {
                services.map(service => {
                    return <ServiceItem key={service._id} service={service} 
                    isAdmin={isAdmin} deleteService={deleteService} handleCheck={handleCheck}/>
                })
            }
           
        </div>
      <LoadMore/>
        </>
    )
}
export default Services