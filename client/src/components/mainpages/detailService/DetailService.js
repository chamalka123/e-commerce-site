import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ServiceItem from '../utils/serviceItem/ServiceItem'

function DetailService(){
    const params = useParams()
    const state = useContext(GlobalState)
    const [services] = state.servicesAPI.services
    const addHistory = state.userAPI.addHistory
    const [detailService, setDetailService] = useState([])

    useEffect(()=>{
        
        if(params.id){
            services.forEach(service =>{
                if(service._id ===params.id)setDetailService(service)
            })
        }
    },[params.id, services])
   
    if(detailService.length===0) return null;
    return(
        <>
        <div className="detail">
           <img src={detailService.images.url} alt=""/>
           <div className="box-detail">
            <div className="row">
                    <h2>{detailService.title}</h2>
                    <h6>#id: {detailService.service_id}</h6>
                    
            </div>
            <span>$ {detailService.price}</span>
            <span>* {detailService.duration}</span>
            <p>{detailService.content}</p>
            <p>Appointments: {detailService.appoinmentst}</p>
            <Link to="/history" className="history" onClick={()=> addHistory(detailService)}>Book Now</Link>
           </div>
        </div>

        <div>
            <h2>Related</h2>
            <div className="services">
                {
                    services.map(service=>{
                        return service.category === detailService.category
                        ? <ServiceItem key={service._id} service={service}/> :null
                    })
                }
            </div>
        </div>
        </>
    )
}
export default DetailService