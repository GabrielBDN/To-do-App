import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import fr from 'date-fns/locale/fr';
import Modal from 'react-modal';
import '../styles/Calendar.css';


const locales = { fr };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarComponent = ({ events, setEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

 
  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

 
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };


  const handleEdit = () => {
    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === selectedEvent.id ? selectedEvent : evt
      )
    );
    closeModal();
  };

 
  const handleDelete = () => {
    setEvents((prevEvents) => prevEvents.filter((evt) => evt.id !== selectedEvent.id));
    closeModal();
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="calendar"
        onSelectEvent={openModal}
      />

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        contentLabel="Modifier ou Supprimer une tâche"
      >
        <h2 className="modal-title">Détails de la tâche</h2>
        {selectedEvent && (
          <>
            <label className="modal-label">
              Titre :
              <input
                type="text"
                value={selectedEvent.title}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, title: e.target.value })
                }
                className="modal-input"
              />
            </label>
            <label className="modal-label">
              Date et heure de début :
              <input
                type="datetime-local"
                value={formatDateForInput(selectedEvent.start)}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    start: new Date(e.target.value),
                  })
                }
                className="modal-input"
              />
            </label>
            <label className="modal-label">
              Date et heure de fin :
              <input
                type="datetime-local"
                value={formatDateForInput(selectedEvent.end)}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    end: new Date(e.target.value),
                  })
                }
                className="modal-input"
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleEdit} className="button edit-button">
                Modifier
              </button>
              <button onClick={handleDelete} className="button delete-button">
                Supprimer
              </button>
              <button onClick={closeModal} className="button cancel-button">
                Annuler
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};


const formatDateForInput = (date) => {
  return new Date(date).toISOString().slice(0, 16);
};

export default CalendarComponent;
