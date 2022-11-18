import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { createToDo, deleteMultipleToDo, deleteToDo, getToDoList, updateToDo } from "../api"
import { Filter, filterCompleted, ToDo } from "../models"
import { RootState } from "./store"

interface ListState {
  todos?: Array<ToDo>
  error?: string
  filter: Filter
}

const initialState: ListState = {
  todos: [],
  error: undefined,
  filter: "ALL",
}

export const getToDoListAction = createAsyncThunk("todo/getList", (_, thunkApi) => {
  return getToDoList(thunkApi.signal)
})

export const addToDoAction = createAsyncThunk("todo/add", (todo: ToDo) => {
  return createToDo(todo)
})

export const deleteToDoAction = createAsyncThunk("todo/delete", (todo: ToDo) => {
  return deleteToDo(todo)
})

export const deleteCompletedToDoAction = createAsyncThunk("todo/deleteCompleted", (_, thunkApi) => {
  const state = thunkApi.getState() as RootState
  return deleteMultipleToDo(filterCompleted(state.list.todos ?? []))
})

export const toggleCompleteAction = createAsyncThunk("todo/toggleComplete", (todo: ToDo) => {
  const updated = { ...todo }
  updated.completed = !updated.completed
  updated.completed_at = updated.completed ? new Date() : undefined
  return updateToDo(updated)
})

export const listSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addRemoteEvent: (state, action: PayloadAction<ToDo>) => {
      if (!state.todos?.find((item) => item.id === action.payload.id)) state.todos?.push(action.payload)
    },
    updateRemoteEvent: (state, action: PayloadAction<ToDo>) => {
      const index = state.todos?.findIndex((item) => item.id === action.payload.id) ?? -1
      if (index === -1 || !state.todos) return
      state.todos[index] = action.payload
    },
    deleteRemoteEvent: (state, action: PayloadAction<ToDo>) => {
      const index = state.todos?.findIndex((item) => item.id === action.payload.id) ?? -1
      if (index === -1 || !state.todos) return
      state.todos?.splice(index, 1)
    },
    filter: (state, action: PayloadAction<Filter>) => {
      return { ...state, filter: action.payload }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getToDoListAction.pending, (state) => {
        return { ...state, todos: undefined, error: undefined }
      })
      .addCase(getToDoListAction.fulfilled, (state, action) => {
        return { ...state, todos: action.payload }
      })
      .addCase(getToDoListAction.rejected, (state, action) => {
        if (action.meta.aborted) return state
        return { ...state, todos: undefined, error: action.error.message }
      })
      // Create To Do
      .addCase(addToDoAction.pending, (state, action) => ({
        ...state,
        todos: [...(state.todos ?? []), { ...action.meta.arg, requestId: action.meta.requestId }],
        error: undefined,
      }))
      .addCase(addToDoAction.fulfilled, (state, action) => {
        const index = state.todos?.findIndex((todo) => todo.id === action.meta.arg.id) ?? -1

        if (!state.todos) return { ...state, todos: [action.payload] }

        if (index === -1) return state

        state.todos[index].requestId = undefined
      })
      .addCase(addToDoAction.rejected, (state, action) => {
        const index = state.todos?.findIndex((todo) => todo.requestId === action.meta.requestId) ?? -1

        if (index === -1) return state

        state.todos = [
          ...(state.todos?.slice(0, index) ?? []),
          ...(state.todos?.slice(index + 1, state.todos.length) ?? []),
        ]
      })
      // Delete ToDo
      .addCase(deleteToDoAction.pending, (state, action) => {
        const todo = action.meta.arg
        const index = state.todos?.findIndex((item) => item.id === todo.id) ?? -1
        if (!state.todos) return state
        state.todos[index].requestId = action.meta.requestId
      })
      .addCase(deleteToDoAction.fulfilled, (state, action) => {
        const index = state.todos?.findIndex((item) => item.requestId === action.meta.requestId) ?? -1
        if (index === -1) return state

        state.todos?.splice(index, 1)
      })
      .addCase(deleteToDoAction.rejected, (state, action) => {
        const index = state.todos?.findIndex((item) => item.requestId === action.meta.requestId) ?? -1
        if (index === -1 || !state.todos) return state
        state.todos[index].requestId = undefined
      })
      // Delete all completed to do
      .addCase(deleteCompletedToDoAction.pending, (state, action) => {
        filterCompleted(state.todos ?? []).forEach((todo) => {
          todo.requestId = action.meta.requestId
        })
      })
      .addCase(deleteCompletedToDoAction.fulfilled, (state, action) => {
        state.todos = state.todos?.filter((todo) => todo.requestId !== action.meta.requestId)
      })
      .addCase(deleteCompletedToDoAction.rejected, (state, action) => {
        state.todos?.forEach((todo) => {
          if (todo.requestId === action.meta.requestId) todo.requestId = undefined
        })
      })
      // toggle complete state
      .addCase(toggleCompleteAction.pending, (state, action) => {
        const index = state.todos?.findIndex((item) => item.id === action.meta.arg.id) ?? -1
        if (index === -1 || !state.todos) return state
        state.todos[index].requestId = action.meta.requestId
      })
      .addCase(toggleCompleteAction.fulfilled, (state, action) => {
        const index = state.todos?.findIndex((item) => item.requestId === action.meta.requestId) ?? -1
        if (index === -1 || !state.todos) return state
        state.todos[index] = action.payload
      })
      .addCase(toggleCompleteAction.rejected, (state, action) => {
        const index = state.todos?.findIndex((item) => item.requestId === action.meta.requestId) ?? -1
        if (index === -1 || !state.todos) return state
        state.todos[index].requestId = undefined
      })
  },
})

export default listSlice.reducer

export const { filter, addRemoteEvent, updateRemoteEvent, deleteRemoteEvent } = listSlice.actions
