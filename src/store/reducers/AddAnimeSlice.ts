import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnime } from "../../types/IAnime";


const apiHost = process.env.REACT_APP_API_HOST;

interface AddAnimeState extends Partial<IAnime> {
    update: boolean;
}

const initialState: AddAnimeState = {
    genres: [],
    update: false
};

export const AddAnimeSlice = createSlice({
    name: 'addAnime',
    initialState,
    reducers: {
        addGenre: (state, action: PayloadAction<string>) => {
            state.genres?.push(action.payload);
        },
        deleteGenre: (state, action: PayloadAction<string>) => {
            state.genres = state.genres?.filter(item => item !== action.payload);
        },
        setAddAnime: (state, action: PayloadAction<Partial<IAnime>>) => {
            const data = action.payload;

            if (data.id !== undefined) {
                state.update = true;
                state.id = data.id;
                state.poster = `http://${apiHost}${data.poster}`;

                let newImages: string[] = [];
                data.images?.map(img => {
                    newImages.push(`http://${apiHost}${img}`);
                });
                state.images = newImages;
            };                

            state.title = data.title;
            state.originTitle = data.originTitle;
            state.director = data.director;

            if (typeof data.releaseDate === 'string') {
                const date = new Date(data.releaseDate.split('.').reverse().join('.')+' 04:00:00');
                state.releaseDate = Math.floor(date.getTime() / 1000);
            } else {
                state.releaseDate = data.releaseDate;
            }

            state.description = data.description;
            state.genres = data.genres;           
        },
        setAnimeId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        }, 
        setAddAnimeImgs: (state, action: PayloadAction<{poster?: string, arts?: string[]}>) => {
            state.poster = action.payload.poster;
            state.images = action.payload.arts;
        },       
        cleanAddAnime: () => initialState,
    }
});

export const { addGenre, deleteGenre, setAddAnime, setAnimeId, setAddAnimeImgs, cleanAddAnime } = AddAnimeSlice.actions;
export default AddAnimeSlice.reducer;