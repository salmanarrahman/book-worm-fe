/* eslint-disable @typescript-eslint/no-non-null-assertion */
import auth from '@/lib/Firebase';
import app from '@/lib/Firebase';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface IUserState {
    user: {
        email: string | null
    },
    isLoading: boolean,
    isError: boolean,
    error : string | null
    
}

 interface ILogin{ 
    email : string,
    password : string
}

const initialState : IUserState = {
    user : {
        email: null
    },
    isLoading : false,
    isError : false,
    error : null
}

export const createUser = createAsyncThunk(
    'user/createUser',
    async ({email,password} : ILogin) => {
        const data = await createUserWithEmailAndPassword(auth,email,password)
        return data.user.email
    }
)
export const loginUser = createAsyncThunk(
    'user/login',
    async ({email,password} : ILogin) => {
        const data = await signInWithEmailAndPassword(auth,email,password)
        return data.user.email
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser : (state,action: PayloadAction<string | null>) => {
            state.user.email = action.payload
        },
        setLoading: (state,action: PayloadAction<boolean>) =>{
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        }).addCase(createUser.fulfilled,(state,action)=>{

            state.user.email = action.payload;
            state.isLoading = false;           

        }).addCase(createUser.rejected,(state,action)=>{

            state.user.email = null;
            state.isLoading = false
            state.isError = true;
            state.error = action.error.message!;


        }).addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        }).addCase(loginUser.fulfilled,(state,action)=>{

            state.user.email = action.payload;
            state.isLoading = false;           

        }).addCase(loginUser.rejected,(state,action)=>{

            state.user.email = null;
            state.isLoading = false
            state.isError = true;
            state.error = action.error.message!;


        })
    }
})

export const {setUser,setLoading} = userSlice.actions

export default userSlice.reducer;
