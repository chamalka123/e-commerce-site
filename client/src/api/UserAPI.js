import  {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token){
    const[isLogged, setIsLogged] = useState(false)
    const[isAdmin, setIsAdmin] = useState(false)
    const [history, setHistory] = useState([])

    useEffect(()=>{
        if(token){
            const getUser = async ()=>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    res.data.role === 1? setIsAdmin(true):setIsAdmin(false)
                    setHistory(res.data.history)
                 
                    
                } catch (err) {
                    alert(err.response.data.msg);
                }
            }
            getUser()
        }
    },[token])


    const addHistory = async (service) =>{
        if(!isLogged) return alert("Login to continue")

        const check = history.every(item=>{
            return item._id !== service._id
        })
    
        if(check){
            setHistory([...history, {...service, quantity: 1}])

            await axios.patch('/user/addhistory',{history:[...history, {...service, quantity: 1}]},{
                headers: {Athorization: token}
            })
        }else{
            alert("Service has been added to cart.")
        }
    }
    return{
        isLogged:[isLogged, setIsLogged],
        isAdmin:[isAdmin, setIsAdmin],
        history:[history, setHistory],
        addHistory: addHistory
    }
    
}
export default UserAPI