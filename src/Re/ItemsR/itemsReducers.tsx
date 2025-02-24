import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  getItByName, getItems, getItemsId,} from '../../APS/RX'





export const getItem = createAsyncThunk(
    'items/get',
    async(x:{pageN:number,perPage:number},thunkAPI)=>{
      
    
        const {pageN,perPage} : { pageN: number,perPage:number }  = x
        
        try {
       
                const r = await getItems(pageN,perPage)
                return await r.data
        } catch (error:any) {
      
            if (error.response &&  error.response.data.message) {
             
                return thunkAPI.rejectWithValue(error.response.data.message); 
              }
           
            return thunkAPI.rejectWithValue(`${error.message}`); 
        }
    }
)

export const gItemId = createAsyncThunk(
  'items/id',
  async(x:any,thunkAPI)=>{
    const xz =Number(x)
    try {
      const r = await getItemsId(x)
      return r.data
    } catch (error:any) {
      if (error.response &&  error.response.data.message) {
             
        return thunkAPI.rejectWithValue(error.response.data.message); 
      }
   
    return thunkAPI.rejectWithValue(`${error.message}`)
    }
    
  }
)


export const getIbyName = createAsyncThunk(
  'item/name',
  async(x,thunkAPI)=>{
    try {
      const xz = await getItByName(x)
      return await xz.data
    } catch (error:any) {
      if (error.response &&  error.response.data.message) {
             
        return thunkAPI.rejectWithValue(error.response.data.message); 
      }
   
    return thunkAPI.rejectWithValue(`${error.message}`)
    }
  }
)
interface StateItems {
    loadingItems: boolean;
    messageItems: { type: string; msg: string } | null;
    error: string | null;
    items: any[] | null;
    itemsSearch: any[] | null;
    page: number| null;
    nextPage: number | null;
    totalPage: number | null;
    totalItems: number | null;
    itemsD: any[] | null;
    perPage: number; // Pastikan penulisan konsisten
    itemSearchts: any[] | null; // Pastikan ini ada di tipe StateItems
  }

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
      loadingItems: false,
      messageItems: null,
      error:null,
      items: null,
      itemsSearch:null,
      page:1,
      nextPage:null,
      totalPage:null,
      totalItems:null,
      itemsD:null,
      perPage:10,
    } as StateItems,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
            state.loadingItems = true;
          },
        setPerPage: (state, action) => {
            state.perPage = action.payload; 
          },
    },
    extraReducers: (builder) => {
      builder
        
        .addCase(getItem.pending, (state) => {
            state.loadingItems = true;
            state.messageItems = null;
            state.items = null;
            state.itemsSearch = null;
            state.nextPage = null;
          })
          .addCase(getItem.fulfilled, (state, action) => {
               state.items = action.payload.brng
               state.itemsSearch = null;
               state.loadingItems = false;
            //    state.itemsD = null;
               state.nextPage = action.payload.nextPage;
              //  state.totalPage = action.payload.totalPages;
              //  state.totalItems = action.payload.totalItems;
              //  state.messageItems = {type:'successlogin',msg:action.payload.data.messageItems}
          })
          .addCase(getItem.rejected, (state, action) => {
               if(typeof action.payload === 'string'){
                state.messageItems = {type:'failget',msg:action.payload}
               }
          
               state.loadingItems = false;
               state.items= null;
               state.itemsSearch = null;
          })
          .addCase(gItemId.pending, (state) => {
            state.loadingItems = true;
            state.messageItems = null;
            // state.items= null;
           
          })
          .addCase(gItemId.fulfilled, (state, action) => {
          
               state.loadingItems = false;
               state.itemsD = action.payload.brng;
            //    state.items = null;
              //  state.nextPage = action.payload.next;
              //  state.totalPage = action.payload.totalPages;
              //  state.totalItems = action.payload.totalItems;
              //  state.messageItems = {type:'successlogin',msg:action.payload.data.messageItems}
          })
          .addCase(gItemId.rejected, (state, action) => {
             
               if(typeof action.payload === 'string'){
                state.messageItems = {type:'failget',msg:action.payload}
               }
               state.loadingItems = false;
               state.items= null;
               state.itemsSearch = null;
          })
          
          .addCase(getIbyName.pending, (state) => {
            state.loadingItems = true;
            state.messageItems = null;
            state.items = null;
            state.itemsSearch = null;
            state.nextPage = null;
           
          })
          .addCase(getIbyName.fulfilled, (state, action) => {
               state.nextPage = null;
               state.loadingItems = false;
               state.items = null;
               state.itemsSearch = action.payload.brng
               
          })
          .addCase(getIbyName.rejected, (state, action) => {
         
               state.messageItems = {type:'failitemname',msg:"Maaf barang tidak ditemukan !!"}
               state.loadingItems = false;
               state.items= null;
               state.itemsSearch = null;
          })
          
     
    },
  });
  export const { setPage,setPerPage  } = itemsSlice.actions;
  export default itemsSlice.reducer