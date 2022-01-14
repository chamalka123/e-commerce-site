import React,{useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import { useHistory, useParams } from 'react-router-dom'

const initialState = {
    service_id:'',
    title:'',
    price:0,
    duration:'',
    content:'',
    category:'',
    _id:''

}


function CreateService(){
    const state = useContext(GlobalState)
    const [service, setService] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const history = useHistory()
    const param = useParams()
    const [services] = state.servicesAPI.services
    const[onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.servicesAPI.callback
    
    useEffect(()=>{
        if(param.id){
            setOnEdit(true) 
            services.forEach(service=>{
                if(service._id === param.id) {
                     setService(service)
                    setImages(service.images)
                }
            })
        }else{
            setOnEdit(false)
            setService(initialState)
            setImages(false)
        }
    },[param.id, services])
    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You are not an admin")
            const file=e.target.files[0]
            if(!file)return alert("File not existed")

            if(file.size>1024*1024)//1mb
            return alert ("Size too large")

            if(file.type!=='image/jpeg' && file.type !== 'image/png')//1mb
            return alert ("File format is incorrect")

            let formData= new FormData()
            formData.append('file',file)
            
            const res = await axios.post('/api/upload', formData,{
                headers:{'content-type':'multipart/form-data', Authorization:token}
            })
         
            setImages(res.data)

            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleDestroy = async()=>{
        try{
            if(!isAdmin)return alert("yot are not correct")
          
            await axios.post('/api/destroy', {public_id:images.public_id},{
                headers:{Authorization:token}
            })
          
            setImages(false)
        }
        catch(err){
            alert(err.response.data.msg)
        }
    }
    const handleChangeInput=e=>{
        const{name, value}= e.target
        setService({...service, [name]:value})
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            if(!isAdmin) return alert("you are not correct")
            if(!images)return alert("no images")


           if(onEdit){
            await axios.put(`/api/services/${service._id}`, {...service, images},{
                headers:{Authorization:token}
            })
           }else{
            await axios.post('/api/services', {...service, images},{
                headers:{Authorization:token}
            })
           }
           setCallback(!callback)
            setImages(false)
            history.push("/")
        }catch(err){
            alert(err.response.data.msg)
        }
    }
const styleUpload={
    display: images ? "block":"none"
}
    return(
        <div className="create_service">
            <div className="upload">
            <input type="file" name="file" id="file_up" onChange={handleUpload}/>
            {
               
                <div id="file_img" style={styleUpload}>
                    <img src={images ? images.url:''} alt=""/>
                    <span onClick={handleDestroy}>X</span>
             
                
            </div>
            }
                </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlForm="service_id">SERVICE ID</label>
                    <input type="text" name="service_id" id="service_id" required
                    value={service.service_id} onChange={handleChangeInput} disabled={onEdit}/>
                </div>

                <div className="row">
                    <label htmlForm="title">TITLE</label>
                    <input type="text" name="title" id="title" required
                    value={service.title} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlForm="price">PRICE</label>
                    <input type="number" name="price" id="price" required
                    value={service.price} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlForm="duration">DISCOUNT</label>
                    <textarea type="text" name="duration" id="duration" required
                    value={service.duration} rows="1" onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlForm="content">CONTENT</label>
                    <textarea type="text" name="content" id="content" required
                    value={service.content} rows="7" onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlForm="categories">CATEGORIES: </label>
                    <select name="category" value={service.category} onChange={handleChangeInput}>
                        <option value="">Select a category</option>
                        {
                            categories.map(category =>(
                               <option value={category._id} key={category._id}>
                                   {category.name}
                               </option> 
                            ))
                        }
                    </select>
                </div>
            
            <button type="submit">{onEdit? "Update" : "Create"}</button>
            
            </form>
        </div>
    )
    
}

export default CreateService