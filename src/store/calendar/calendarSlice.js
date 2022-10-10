import { createSlice } from '@reduxjs/toolkit';

import { addHours } from 'date-fns';


const events = {
  _id: new Date().getTime(),
  title: 'Cumpleaños del Jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Manu'
  }
}


export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [events],
    activeEvents: null
  },
  reducers: {
    increment: (state) => {
      state.counter += 1
    }
  }
});


// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;