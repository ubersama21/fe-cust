import React, { useEffect, useState } from 'react'
import './carts.css'
import { getCarts } from './Cart'
import CartItem from './CartItem'
import { getRP } from '../APS/RX'
import { Button } from 'react-bootstrap'

interface Total {
    nama:string;
    jml:number;
    subtotal:number;
}
type Totals = Total[]
function Carts() {
    const [carts,setCarts] = useState<any>([])
    const [selected,setSelected] = useState([])
    const [total,setTotal] = useState<Totals>([])
    
    const getCart = async()=>{
        try {
            const xs = await getCarts()
            setCarts(xs)

        } catch (error) {
            setCarts([])
        }
    }

    useEffect(()=>{
        getCart()
    },[])
    const kirimPesan = async()=>{
        const pesan = await total.map(data=>`${data.nama}  ${data.jml} ${getRP(data.subtotal)}`).join('\n')
        const totalhrg = await getRP(total.reduce((acc: number, item: any) => acc + item.subtotal, 0))
        const headPesan = `Permisi Saya ingin Memesan:\n`+pesan + `\nTotal: ${totalhrg}`+`\n\nTerima Kasih`
        console.log(headPesan)
    }
  
  return (
    <div className='cart-sec'>
        <h3 className='head-cart-tag'>Keranjang</h3>
        <div className='carts-cont'>
           {
            carts && carts.map((data:any,i:number)=>{
                return(
                    <CartItem key={'cart_shop'+data.nama} keyss={data.nama+"cart_s"} dx={data} setSelected={setSelected} selected={selected}
                     setTotal={setTotal}
                    />
                )
            })
           }
        </div>
        <div  className='cont-total-hrg'>
            {total.length===0&&
             <div>
                <h6>Silahkan pilih item yang ingin dipesan </h6>
             </div>
            }
            {total.length>0 && (
                    <div className='cont-total-hrg1'>
                        <h5>Total</h5>
                        {total.map((data: any, i: number) => {
                        return (
                            <div key={'substotal'+i.toString()} className='cont-cart'>
                             <p  className='cart-subtotal'>
                            Subtotal {data.nama} : 
                            </p>
                            <span className='sub-hrga'>{getRP(data.subtotal)}</span> 
                            </div>
                            
                        );
                        })}
                        {/* Menampilkan total keseluruhan */}
                        <p className='cart-total'>Total Keseluruhan: { getRP(total.reduce((acc: number, item: any) => acc + item.subtotal, 0))}</p>
                        <Button className='btn-psn' 
                         onClick={(e)=>{kirimPesan()}}
                        >Ajukan Pemesanan</Button>
                    </div>
                    )}
         
        </div>
    </div>
  )
}

export default Carts