import axios from 'axios'
import { GoogleGenerativeAI } from '@google/generative-ai'


const URLAPI = process.env.REACT_APP_API || 'http://localhost:4544/'
export const getItems = async(page:number,perPage:number)=>{
    try {
        const d = await axios.get(`${URLAPI}brg/vp/${page}/${perPage}`,
            {
                headers:    {
                    "Content-Type":"application-json"
                },
                withCredentials:true    
            }
        )
        return d
    } catch (error) {
        throw error
    }
}


export const getItemsId = async(x:any)=>{
    const {z}:any = x
     try {
         const xz = await axios.get(`${URLAPI}brg/vi/${z}`,
             {
                 headers:    {
                     "Content-Type":"application-json"
                 },
                 withCredentials:true    
             }
         )
         return xz
     } catch (error) {
         throw error
     }
 }
 export const getRP = (x:number)=>{
    return new Intl.NumberFormat('id-ID',{
        style:'currency',
        currency:'IDR',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0   
    }).format(x)
    
  }
 export const getItByName = async(x:any)=>{
  
    try {
        const xz = await axios.get(`${URLAPI}brg/vn/${x}`,{
            headers:
                {
                   "Content-Type":"application/json"
                },
            withCredentials:true    
        })
        return xz
    } catch (error) {
        throw error
    }
}
const xAPI:string = process.env.REACT_APP_KEYS ||""
const genAI = new GoogleGenerativeAI(xAPI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const getRecipe = async(x:string)=>{
  try {
    const result = await model.generateContent(x);
  

    return result.response.text()
  } catch (error) {
    throw error
  }
}




const prompt = "Explain how AI works";


