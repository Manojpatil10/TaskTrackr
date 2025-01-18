import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const myReducer = createSlice({
  name : "myData",
  initialState : {data:[]},
  reducers:{
    addData(state,action){
      state.data = action.payload;
    }
  }
});

const store = configureStore({reducer:myReducer.reducer});
export default store;
export const actions = myReducer.actions;

export const getData=()=>{
   return (dispatcher)=>{
     const output=()=>{
      axios.get('https://67122e854eca2acdb5f77a1f.mockapi.io/UserData')
      .then((success) => {
         dispatcher(actions.addData(success.data));
      })
      .catch((error) => {
        dispatcher(actions.addData(error)); 
      });
     }
     output();
   }
}



