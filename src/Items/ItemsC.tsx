import React, { useEffect, useState } from 'react'
import './itemsc.css'
import { useDispatch, useSelector } from 'react-redux'
import { getItem } from '../Re/ItemsR/itemsReducers'
import { AppDispatch } from '../Re/Store'
import Items from '../Cont/Items'
import LoadItems from '../Cont/LoadItems'
import { Button } from 'react-bootstrap'
function ItemsC() {
    const dispatch = useDispatch<AppDispatch>()
    const [items,setItems] = useState([])
    const {loadingItems,nextPage} = useSelector((state:any)=>state.items)
    useEffect(()=>{
      getFitems()
    },[])
    const getFitems = async()=>{
        const d = dispatch(getItem({pageN:1,perPage:10}))
        .then((res:any)=>{
            // console.log(res,'ini')
            setItems(res.payload.brng)
        })
    }

    const nextItems = async()=>{
        try {
          const d = dispatch(getItem({pageN:nextPage,perPage:10}))
        .then((res:any)=>{
            // console.log(res,'ini')
            setItems(res.payload.brng)
            window.scrollTo(0,0)
        })
        } catch (error) {
          
        }
    }
    const array = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
  return (
    <div className='items-sec'>
           <div className='cards-cont'>
            {
                items && items.map((data:any)=>{
                    return(
                        <Items dx = {data} key={'home_'+data.nama} />
                    )
                })
            }
            {loadingItems&&
             array.map((_d,i)=>{
                return(
                  <LoadItems key={'load_'+i} />
                )
              })
            }
             <Button className='btn-next'
             
             onClick={(e)=>nextItems()}
             >{'>> Selanjutnya'}</Button>
           </div>
          
    </div>
  )
}

export default ItemsC