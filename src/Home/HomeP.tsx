import React, { useState } from 'react'
import './homep.css';
import { Button } from 'react-bootstrap';
import ItemsC from '../Items/ItemsC';
import { toast } from 'react-toastify';
import { Dxdt } from '../APS/QRX';
import { useNavigate } from 'react-router-dom';
function HomeP() {
   const [serx,setSerx] = useState<string>()
   const nav = useNavigate()
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
      
         nav(`/search/${xz}`);
         setSerx('')
       }
  return (
    <div className='home-sec'>
        <div className='iklan-cont'>
         <div className='img-logo-iklan'>
            <img className='img-iklan' src='/icons/logowe.png' />
         </div>
         <div className='iklan-tag'>
            <div className='iklan-x'>
                <h3 className='tag-iklan '>Kesegarannya Terjamin !!</h3>
                <h3 className='tag-iklan'>Sayur Segar, Memasak Jadi Lebih Semangat !!</h3>
                <h3 className='tag-iklan'>Harga Lebih Murah !!</h3>
                <h3 className='tag-iklan'>Jadi Mau Masak Apa Hari Ini ??</h3>
                <h3 className='tag-iklan'>Dapatkan Bahan Terbaik Hanya Disini !!</h3>
            </div>
         </div>
        </div>
          <div className='search-m'>
             <input className='items-ms' type='text' max={60} min={1} 
              placeholder='Nama Barang' value={serx} onChange={(e)=>setSerx(e.target.value)}
             />
             <Button className='search-btn-ms'
              onClick={(e)=>goToSearch(serx?serx:"")}
             >Cari</Button>
         </div>
         <div>
            <ItemsC/>
         </div>
    </div>
  )
}

export default HomeP