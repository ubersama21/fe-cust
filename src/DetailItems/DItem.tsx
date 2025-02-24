import React, { useEffect, useState } from 'react'
import './ditem.css'
import { Nxdt } from '../APS/QRX'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../Re/Store'
import { getItem, gItemId } from '../Re/ItemsR/itemsReducers'
import { useParams } from 'react-router-dom'
import { Button, Carousel } from 'react-bootstrap'
import { getRecipe, getRP } from '../APS/RX'
import Items from '../Cont/Items'
import { Tester } from '../netlify/functions/hello'
import Recipes from '../Cont/Recipes'
import LoadItems from '../Cont/LoadItems'
function DItem() {
    const dispatch = useDispatch<AppDispatch>()
    const [dx,setDx] = useState([])
    const [dxD,setDxD] = useState([])
    const [isLoad,setIsLoad] = useState(true)
    const {itemsD,items} = useSelector((state:any)=> state.items)
    const {d}:any = useParams()
   
    const ge = async () => {  
        setDxD([])
        setIsLoad(true)
        const xz = await Nxdt(d);  // Ambil nilai dari Nxdt
        const z = Number(xz);  // Ubah menjadi number
        if (isNaN(z)) {  
          return;
        }
      
        try {
          const res = await dispatch(gItemId({z}));
          if (res.payload.brng) {
          
            const nmbrng = res.payload.brng.nama
            const dxs =  await getRecipe(`Resep 3 Masakan berbahan dari ${nmbrng} dalam bentuk json bahan=array,namaResep=string,langkah=array,porsi=string
              ,tingkatKesulitan=string,waktuMasak=string,deskripsi=string,porsi=string `)
            if (typeof dxs === 'string') {
              const lxs:any = []
              const cleanedData = dxs.replace(/```json|```/g, '').trim();
              try {
                 
                  const sxz = JSON.parse(cleanedData);
                  console.log('Parsed JSON:', sxz);
                  lxs.push(sxz)
                  setDxD(sxz)  
              } catch (parseError) {
                setDxD([])
                 
              }
          } else {
              console.log('The response is not a string, it is:', dxs);  
          }
           
           
           console.log('iam runnn')
          }
        } catch (error) {
        
        }
      };
      
      const getIt = async () => {
        await ge();  
        await getRec();  
        
      };
      
      const getRec = async () => {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        try {
          const res = await dispatch(getItem({ pageN: randomNumber, perPage: 10 }));
          if (res.payload) {
            setDx(res.payload.brng);  
          }
       setIsLoad(false)
        } catch (error) {
          setIsLoad(false)        ;
        }
      };
      
      useEffect(() => {
        getIt();  
      }, [d]);
      const array = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
  return (
    <div className='det'>
        {
            itemsD
             && (
                <div className='det-cont' key={itemsD.nama}>
                  <div className='cont-img'>
                    <Carousel className='car-container' slide={true}>
                  
                    {itemsD.gambar.map((data:any,i:number)=>{
                      return(
                        <Carousel.Item key={data.nama + i.toString()}>
                          <img
                            className=" img-brng"
                            src={data.url}
                            alt={data.nama}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;  // Cast to HTMLImageElement
                              target.src = '/icons/logowe.png'; // Fallback image
                            }}
                          />
                        </Carousel.Item>
                        
                      )
                    })}
                 
                    
                  </Carousel>
                  </div>
              
                  <div className='item-d'>
                    <h1>{itemsD.nama}</h1>
                    <p>Harga: <span className='harga-brng'>{getRP(itemsD?.harga) || 'belum ada'}</span></p>
                    <p>Status: <span className={`status ${itemsD.status === 'Habis'? 'habis':'ada'}`}>{itemsD.status}</span> </p>
                    <p>Jumlah : {itemsD.satuan_jml} {itemsD.type_jml}</p>
                    <p>Berat : {itemsD.satuan_berat} {itemsD.type_brt}</p>
                    <p>Deskripsi: </p>
                    <div className='cont-desk'>
                      <p>{itemsD.deskripsi}</p>
                    </div>
                    <Button className='btn-add-krj'
                    disabled={itemsD.status==='Habis'}
                    >+ Keranjang</Button>
                  </div>
                </div>
              )
        }
        {isLoad &&
        <div className='load-cont'>
          <h6>Cari Resep</h6>
        <div className="loader-rec">
          <div className="inner_loader"></div>
        </div>
        </div>
        }
       
        {
          dxD.length >0 && 
          <div className='recipe-sec'>
            <div>
              <h3>Resep Masakan</h3>
            </div>
            <div className='recipe-cont'>
              { dxD.map((data:any,i:any)=>{
                return(
                  <Recipes dsx={data}/>
                )
              })}
            
            </div>
          </div>
        }
       
        <div className='items-rec-cont'>
            <h3 className='tag-rec'>Rekomendasi</h3>
            <div className='items-cont-rec'>
               { isLoad &&
                    array.map((_d,i)=>{
                        return(
                        <LoadItems key={'load_'+i} />
                        )
                    })
                    }
                {
                    dx && dx.map((data:any,i:number)=>{
                        return(
                            <Items dx={data}/>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default DItem