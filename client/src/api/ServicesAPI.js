import {useState,useEffect} from 'react' 
import axios from 'axios'


function ServicesAPI(){
    const [services, setServices] = useState([])
    const [callback, setCallback] = useState(false) 
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
   
    useEffect(() => {
        const getServices = async () => {
            const res = await axios.get(`/api/services?limit=${page*9}&${category}&title[regex]=${search}`)
            setServices(res.data.services)
            setResult(res.data.result)
        }
        getServices()
    }, [callback, category, search, page])
    

    return {
        services: [services, setServices],
        callback: [callback, setCallback],
        category: [category, setCategory],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }

}
export default ServicesAPI