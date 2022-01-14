import React from 'react'
import BtnRender from './BtnRender'


function ServiceItem({service, isAdmin, deleteService, handleCheck}){

    
    return(
        <div className="service_card">
            {
                isAdmin && <input type="checkbox" checked={service.checked}
                onChange={() => handleCheck(service._id)}/>
            }
            <img src={service.images.url} alt=""/>
            <div className="service_box">
                <h2 title={service.title}>{service.title}</h2>
                <span>Rs. {service.price}</span>
                
                

            </div>
          
        
        <BtnRender service={service} deleteService={deleteService}/>
        
           
        </div>
    )
}
export default ServiceItem