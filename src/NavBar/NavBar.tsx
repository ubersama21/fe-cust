import React, { useEffect, useState } from 'react'
import './navbars.css';
import { Button } from 'react-bootstrap';
import { Dxdt } from '../APS/QRX';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function NavBar() {
  const secNav = [
    '/home',
    '/cart',
    '/about'
  ]
  const loc = useLocation()
  const [serx,setserx] = useState<string>()
  const [actives,setActives] = useState<number>(0)
  const navs = useNavigate()
  const ChangeAct = (index:number) => {
    setActives(index);
    navs(secNav[index])
  };
  useEffect(() => {
    const activeIndex = secNav.indexOf(loc.pathname);
    setActives(activeIndex);
  }, [loc]); 
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
    setserx('')
    navs(`/search/${xz}`);
  
  }
  return (
    <div className='nav-sec'>
        <div className='nav-cont'>
            <div className={`home-nav ${actives == 0?'active-m':""}`}
             onClick={(e)=>ChangeAct(0)}>
              <img className={`img-home`} src='/icons/x.png' />
            </div>
            <div className={`logo-cont ${actives == 1?'active-m':""}`}
             onClick={(e)=>ChangeAct(1)}>
                <img className='img-cart' src='/icons/cart.png'/>
            </div>
            <div className={`logo-cont ${actives == 2?'active-m':""}`}
             onClick={(e)=>ChangeAct(2)}>
                <img className='img-cart' src='/icons/user.png'/>
            </div>
        </div>
        <div className='nav-cont1'>
            <div className='img-cont-logo'>
                <img className='logo-home' src='/icons/logowe.png'/>
            </div>
            <div className='navigate-cont'>
                <h5 className={`${actives == 0?'active':''}`}
                 onClick={(e)=>ChangeAct(0)}
                >Home</h5>
                <h5 className={`${actives == 1?'active':''}`}
                 onClick={(e)=>ChangeAct(1)}
                >Keranjang</h5>
                <h5 className={`${actives ==2?'active':''}`}
                 onClick={(e)=>ChangeAct(2)}
                >Tentang Kami</h5>
            </div>
            <div className='input-nav'>
              <input className='items-s' type='text' max={60} min={1} 
              defaultValue={serx} value={serx} onChange={(e:any)=>setserx(e.target.value)}
              placeholder='Nama Barang'
              />
              <Button className='search-btn' 
               onClick={(e)=>{goToSearch(serx?serx:'')}}
              >Cari</Button>
            </div>

        </div>
    </div>
  )
}

export default NavBar