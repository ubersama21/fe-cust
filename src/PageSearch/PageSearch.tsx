import React, { useEffect, useState } from 'react'
import './pagesearch.css'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { getItByName } from '../APS/RX'
import Items from '../Cont/Items'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../Re/Store'
import { getItem } from '../Re/ItemsR/itemsReducers'
import {  Dxdt, NxSRt } from '../APS/QRX'
import boximg from '/icons/box.png'
import LoadItems from '../Cont/LoadItems'
import { toast } from 'react-toastify'
function PageSearch() {
  const {itx} = useParams()
  const [searchItm,setSearchItm] = useState([])
  const dispatch = useDispatch<AppDispatch>()
  const [isLoad,setIsLoad] = useState<Boolean>(false)
  const [dx,setDx] = useState([])
  const [serx,setSerx] = useState<string>()
  const getD = async()=>{
    setIsLoad(true)
    try {
        
        const xs = await NxSRt(itx?itx:'')
        const x = await getItByName(xs)
        setSearchItm(x.data.brng)
    } catch (error) {
      
        setSearchItm([])
        setIsLoad(false)
    }

    
    
  }


  const getRec = async()=>{
      const randomNumber = Math.floor(Math.random() * 3) + 1;
            try {
              const res = await dispatch(getItem({ pageN: randomNumber, perPage: 10 }));
              if (res.payload) {
                setDx(res.payload.brng);  
              }
            setIsLoad(false)
            } catch (error) {
               setIsLoad(false)
            }
  }
  useEffect(()=>{
   getD()
   getRec()
  },[itx])
  const nav  = useNavigate()
   const goToSearch = async(x:string)=>{
      if(serx?.length==0){
        return toast.warning('Harap isi kolom pencarian',{
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
        })
      }
      const xz = await Dxdt(x)
      setSerx('')
    
      nav(`/search/${xz}`);
    
    }
  const array = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
  return (
    <div className='search-sec'>
         <div className='search-pg'>
             <input className='items-ms' type='text' max={60} min={1} value={serx} defaultValue={''} placeholder='Nama Barang'
             onChange={(e:any)=>setSerx(e.target.value)}
             />
             <Button className='search-btn-ms' onClick={(e)=>goToSearch(serx?serx:'')} >Cari</Button>
         </div>
         {/* <div className='head-search'>
            <h3 className='he-cari'>Cari: <span className='nm-brg'>{xxx} </span></h3>
         </div> */}
         <div>
            <div className='head-hasil'>
                <h5 className='h-hasil'>Hasil Pencarian</h5>
            </div>
            {
                isLoad&&
                <div className='items-cont-rec'>
                    {
                array.map((_d,i)=>{
                    return(
                      <LoadItems key={'load_'+i} />
                    )
                  })
                }
                  </div>
            }
            {searchItm.length === 0 &&
                <div className="empty-items">
                   <img src={'/icons/box.png'}
                     alt="item-box"
                     className='itm-x'
                       onError={()=>{}}
                        />
                    <h1>Barang Tidak Ditemukan</h1>
                      </div>
            }
            <div className='cards-cont search'>
                {searchItm&&searchItm.map((data:any,i:number)=>{
                    return (
                        <Items key={data.nama+"_search"} dx={data}/>
                    )
                })}
            </div>
            <div className='items-rec-cont'>
            <h3 className='tag-rec'>Rekomendasi</h3>
            <div className='items-cont-rec'>
                {
                    isLoad&&
                    <div className='items-cont-rec'>
                        {
                    array.map((_d,i)=>{
                        return(
                        <LoadItems key={'load_'+i} />
                        )
                    })
                    }
                    </div>
                }
                    {!isLoad &&
                    dx && dx.map((data:any,i:number)=>{
                        return(
                            <Items key={data.nama+"_rec"} dx={data}/>
                        )
                    })
                }
            </div>
        </div>
         </div>
    </div>
  )
}

export default PageSearch