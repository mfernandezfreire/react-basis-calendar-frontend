import { useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import es from 'date-fns/locale/es';
import DatePicker, { registerLocale } from "react-datepicker";

import { useUiStore } from '../../hooks';

import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Manuel',
        notes: 'Fernandez',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';
        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid';
    }, [formValues.title, formSubmitted])

    const onInputChange = (event) => {
        console.log(event);
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    const onDateChange = (event, changing) => {
        setFormValues((prevState) => ({
            ...prevState,
            [changing]: event
        }))
    }

    const onCloseModal = () => {
        closeDateModal();
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const { start, end, title } = formValues;

        const difference = differenceInSeconds(end, start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas introducidas', 'error');
            return;
        }

        if (title.length <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas introducidas', 'error');
            return;
        }

    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event) => onDateChange(event, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect={true}
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChange(event, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect={true}
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
