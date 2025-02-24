import React from 'react'

export const addCarts= async(x:any)=>{
    let xz = []
    const check = await checkItems(x.id)
    if(check) return {message:"Item Sudah terdaftar dikeranjang"}
    try {
        const ds = localStorage.getItem('cart')
        if(ds){
            const xss = JSON.parse(ds)
            xz.push(...xss)
        }
        xz.push(x)
        const add = JSON.stringify(xz)
        localStorage.removeItem('cart')
        const dx =  localStorage.setItem('cart',add)
        return {message:"Item Berhasil Ditambahkan kekeranjang",type:'success'}
    } catch (error) {
        return {message:"Gagal Memasukan item kekeranjang",type:'fail'}
    }
}

const checkItems = async(xs:number)=>{
    console.log(xs,'dsadas')
    let ls =[]
    try {
        const x = localStorage.getItem('cart')
        if(x){
            const xz = JSON.parse(x)
            ls.push(...xz)
        }
       if(ls.length>0){
        console.log('ls',ls)
        const xzs = ls.filter((data:any)=>data.id === xs)
        console.log(xzs,'ubn')
        if(xzs.length>0) return true
       }
       return false
    } catch (error) {
      return false
    }
}

export const getCarts = async()=>{
    let ds = []
    try {
        const cart =  localStorage.getItem('cart')
        if(cart){
            const xz = await JSON.parse(cart)
            ds.push(...xz)
        }
    return ds
    } catch (error) {
        return {message:"Gagal Mendapatkan Item",type:'fail'}
    }
}

export const delCart = async(x:number)=>{
    let sd = []
    try {
        const del =  localStorage.getItem('cart')
        if(del){
            const xz = await JSON.parse(del)
            if(xz){
                const x = await xz.filter((data:any)=>data.id !== x)
                sd.push(xz)
                const xs =  JSON.stringify(sd)
                localStorage.removeItem('cart')
                const zx =  localStorage.setItem('cart',xs)
            }
          
        }
        return {message:"Berhasil Menghapus Item dari keranjang",type:'success'}
       
    } catch (error) {
        return {message:"Gagal Menghapus Item dari keranjang",type:'fail'}
    }
}