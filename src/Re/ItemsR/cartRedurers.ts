import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { json } from "body-parser";
import { stat } from "fs";

interface StateCartItems {
    loadingCartsItems: boolean;
    messageCartsItems: { type: string; msg: string } | null;
    error: string | null;
    itemsCart: any[] | null;

  }
 const addCartItems = createAsyncThunk(
    'cart/add',async(x:any,thunkAPI)=>{
      try {
        const xz = JSON.stringify(x)
        localStorage.setItem('itemsCart',xz)
        return xz
      } catch (error) {
        return thunkAPI.rejectWithValue(error)
      }
    }
 )
  const cartItemsSlice =createSlice({
    name: 'items',
    initialState: {
      loadingCartsItems: false,
      messageCartsItems: null,
      error:null,
      itemsCart: null,
    } as StateCartItems,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        
        .addCase(addCartItems.pending, (state) => {
             state.loadingCartsItems = true
          })
        .addCase(addCartItems.fulfilled,(state,action)=>{
            state.loadingCartsItems = false;
            console.log(action.payload)
        })
        .addCase(addCartItems.rejected,(state,action)=>{
            state.loadingCartsItems = false;
            console.log(action.payload)
        })
        }
    })

export default cartItemsSlice.reducer