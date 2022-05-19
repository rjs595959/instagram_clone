import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
    id: string;
    pw: string;
}

const initialState: LoginState = {
    id: '',
    pw: '',
};

interface IChangeInputPayload {
    key: 'id' | 'pw';
    value: string;
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeInput: (state, action: PayloadAction<IChangeInputPayload>) => {
            state[action.payload.key] = action.payload.value;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeInput } = loginSlice.actions;

export default loginSlice.reducer;
