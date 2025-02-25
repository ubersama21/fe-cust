import React, { useEffect, useState } from 'react'
import './cartitem.css'
import { getRP } from '../APS/RX';
import { delCart } from './Cart';
import { toast } from 'react-toastify';
function CartItem({dx,selected,setSelected,setTotal,keyss,act1}:any) {
    const [values, setValues] = useState(1); // Mengatur nilai awal input

    // Fungsi untuk menangani perubahan nilai input
    const handleChange = (event:any) => {
      if(event.target.value > dx.satuan_jml){
      
       return setValues(dx.satuan_jml)
      }
    
      setValues(event.target.value);
    };
    const handleCheckboxChange = (event:any) => {

        const { value, checked } = event.target;
        
     
        setSelected((prevState:any) => {
          if (checked) {
        
         
            return [...prevState, value];
          } else {
           
            return prevState.filter((option:any) => option !== value);
          }
        });
       setTotal((prev:any)=>{
        if(checked){
            return [...prev,{nama:dx.nama,subtotal:Number(values*dx.harga),jml:values}]
        }else{
            return prev.filter((option:any)=>option.nama !== value)
        }
       })
  
      };
      useEffect(() => {
        setTotal((prev:any) => {
          return prev.map((item:any) =>
            item.nama === dx.nama
              ? { ...item, subtotal: values * dx.harga,jml:values } 
              : item
          );
        });
      }, [values]);

      const hanlderDel = async(x:string)=>{
        try {
          const res = await delCart(x)
          setTotal((prev:any) => {
            return prev.filter((item:any) =>
              item.nama !==x
            );
          });
          toast.success(res.message.toString(),{
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          })
          act1()
      
        } catch (error:any) {
          toast.error(error.message.toString(),{
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          })
        }
      }
  return (
    <div key={keyss} className='cart'>
       
        <div className='img-cart'>
           <img className='img-cart-img' src={dx?.gambar[0].url}/>
        </div>
        
        <div className='cart-dis'>
            <h3 className='head-cart-nama'>{dx.nama}</h3>
            <p className='p-cart'>Jumlah : <input type='number' min={"1"} max={"5"} value={values} 
            onChange={handleChange}
            /> Max : {dx.satuan_jml}
            </p>
            <p className='p-cart'>SubTotal :  {getRP(values * dx.harga)}</p>
            <button onClick={(e)=>{hanlderDel(dx.nama)}} className='btn-delete'>Hapus </button>
        </div>
        <label className='checkbox-container'>
            <input id='inpt-checklist' type='checkbox' checked={selected.includes(dx.nama)} value={dx.nama} onChange={(e)=>{handleCheckboxChange(e)}}/>
            <span className='checkmark' />
        </label>

    </div>
  )
}

export default CartItem