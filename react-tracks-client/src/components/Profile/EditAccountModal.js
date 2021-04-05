import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const EditAccountModal = ({user}) => {
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data); // @todo: create onSubmit Fn

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

    return (
      <div>
        {console.log('modal user', user)}
        <button onClick={openModal}>Edit Account</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
              {/* use defaultValue attribute if necessary, i.e. defaultValue="test" */}
              <div style={{'display': 'flex', 'flexDirection': 'column'}}>
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" name="username" {...register("username", { required: true })} />
                  {errors.username && <span>This field is required</span>}
              </div>
              <div style={{'display': 'flex', 'flexDirection': 'column'}}>
                  <label htmlFor="password">Password:</label>
                  <input type="text" id="password" name="password" {...register("password", { required: true })} />
                  {errors.password && <span>This field is required</span>}
              </div>
              <div style={{'display': 'flex', 'flexDirection': 'column'}}>
                  <label htmlFor="email">Email:</label>
                  <input id="email" name="email" {...register("email", { required: true })} />
                  {errors.email && <span>This field is required</span>}
              </div>
              <input type="hidden" value={user.id}/>
            <input type="submit" />
            <button onClick={closeModal}>close</button>
          </form>
        </Modal>
      </div>
    );
}

export default EditAccountModal