import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IAnime } from "../../types/IAnime";

export const fetchArticles = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IAnime[]>('https://jsonplaceholder.typicode.com/photos?_limit=10')
            return response.data;
        }  catch(e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить статьи')
        }        
    }
)