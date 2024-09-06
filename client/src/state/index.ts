import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InitialStateTypes {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
}

/* represents initial state */
const initialState: InitialStateTypes = {
    isSidebarCollapsed: false, 
    isDarkMode: false,
}

/* slice stores the data; slices are parts of the data stored */
export const globalSlice = createSlice({
    name: 'global',
    initialState,
    /* update redux store state */
    reducers: {
        /* these functions change the global store state */
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
        setIsDarkMode:(state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
    },
});

/* exporting the above state changing functions */
export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;

export default globalSlice.reducer;