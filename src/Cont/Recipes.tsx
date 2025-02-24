import React from 'react'
import './recipe.css'
function Recipes({dsx}:any) {
  return (
    <>
    {
      dsx &&
      <div className='recipes' key={dsx.namaResep}>
      <div>
          <h5 className='head-rec'>{dsx.namaResep}</h5>
      </div>
      <div>
          <p className='head'>Bahan :</p>
          <ul>
            {dsx.bahan.map((data:any,i:any)=>{
              return(
                <li>{dsx.bahan[i]}</li>
              )
            })}
          </ul>
          <p className='head'>Deskripsi: <span className='span-desk'>{dsx.deskripsi}</span></p>
          <div className='cont-rec-1'>
            <p className='head3'>Porsi : <span className='sp-rec'>± {dsx.porsi}/Orang</span></p>
            <p className='head3'>Tingkat Kesulitan : <span className='sp-rec'>± {dsx.tingkatKesulitan}</span> </p>
            <p  className='head3'>Waktu :<span className='sp-rec'>± {dsx.waktuMasak}</span> </p>
          </div>
    
          <p className='head'>Langkah Memasak :</p>
          <ul>
            {dsx.langkah.map((data:any,i:number)=>{
              return(
                <li>{dsx.langkah[i]}</li>
              )
            })}
          </ul>
      </div>
  </div>

    }
   </>
  )
}

export default Recipes