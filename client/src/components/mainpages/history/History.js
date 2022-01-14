import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'



function History(){
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        const getTotal =()=>{
            const total = history.reduce((prev, item)=>{
                return prev + (item.price *item.quantity)
            },0)
            setTotal(total)

        }
        getTotal()


    },[history])

const addToHistory = async(history)=>{
    await axios.patch('/user/addhistory', {history},{
        headers: {Authorization: token}
    })
}

    const increment = (id)=>{
        history.forEach(item=>{
            if(item._id === id) {
                item.quantity +=1
            }
        })
        setHistory([...history])
        addToHistory(history)
    }

    
    const decrement = (id)=>{
        history.forEach(item=>{
            if(item._id === id) {
                item.quantity ===1 ? item.quantity=1 : item.quantity -= 1
            }
        })
        setHistory([...history])
        addToHistory(history)
    }


    const removeService = id=>{
        if(window.confirm("Do you want to remove?")){
            history.forEach((item, index)=>{
                if(item._id === id){
                    history.splice(index, 1)
                }
            })
            setHistory([...history])
            addToHistory(history)
        }
    }
        if(history.length === 0)
        return <h2 style={{textAlign:"center", fontSize:"5rem"}}>Empty</h2>

  return(
      <div>
          {
              history.map(service => (
                <div className="detail history"
                key={service._id}>
                <img src={service.images.url} alt="" />
                <div className="box-detail">
                         <h2>{service.title}</h2>

                 <h3>Rs {service.price * service.quantity}</h3>
                 <h4>{service.duration}</h4>
                 <p>{service.content}</p>
                <div className="amount">
                    <button onClick={()=>decrement(service._id)}> - </button>
                    <span>{service.quantity}</span>
                    <button onClick={()=>increment(service._id)}> + </button>
                </div>
               <div className="delete" onClick={() => removeService(service._id)}>
                   X
                   </div>
                </div>
             </div>
     
              ))
          }
          <div className="total">
              <h3>Total: Rs {total}</h3>
              <Link to="#!">Payment</Link>
          </div>
      </div>
  )
    
}
export default History