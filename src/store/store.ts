import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import listReducer from "./listSlice"

export const store = configureStore({
  reducer: {
    list: listReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
