import { useState } from 'react';

import { Calendar } from 'react-big-calendar';

import { Navbar, CalendarEvent, CalendarModal } from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const events = [{
  title: 'Cumpleaños del Jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: new Date(),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Manu'
  }
}]

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  // const { events } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || "week");

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style };
  }

  const onDoubleClick = (event) => {
    console.log(event)
    openDateModal();
  };

  const onSelect = (event) => {
    console.log({ click: event })
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />

    </>
  )
}
