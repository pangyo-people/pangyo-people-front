import React,{useState} from 'react'
import '../css/Modal.css';
import Modal from 'react-modal/lib/components/Modal';

const ModalPage = (props) => {
    let [modal, setModal] = useState(props);
    return (
        <Modal isOpen={modal}>
        <button
          onClick={() => {
            setModal(false);
          }}
        >
          Close
        </button>
      </Modal>
    )
}

export default ModalPage