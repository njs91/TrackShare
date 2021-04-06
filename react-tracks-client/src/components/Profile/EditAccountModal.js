import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useForm, Controller } from "react-hook-form";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($userId: Int!, $email: String, $password: String, $username: String) {
      updateUser(userId: $userId, email: $email, password: $password, username: $username) {
        user {
          id
          email
          password
          username
        }
      }
  }
`;

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
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
  const [password, setPassword] = useState(user.password);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const submitFn = async (event, updateUser) => {
    console.log('submit fn');
    console.log('username', username);
    console.log('password', password);
    console.log('email', email);
    console.log('user.id', user.id);
    event.preventDefault();
    // @todo: finish onSubmit Fn
    updateUser({
      variables: {
        email: email,
        password: password,
        userId: user.id,
        username: username
      }
    });
  };

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
        <Mutation
          mutation={UPDATE_USER_MUTATION}
          onCompleted={data => {
            console.log('completed', { data });
          }}
        >
          {(updateUser, { loading, error }) => {
            // if (error) return <Error error={error} />;
            {/* @todo: replace this crappy syntax */}
            {/* @todo: needs serious refactoring */}
            return (
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Account</h2>
                  {/*<form onSubmit={handleSubmit(submitFn)}>*/}
                  <form onSubmit={(event) => submitFn(event, updateUser)}>
                      {/* use defaultValue attribute if necessary, i.e. defaultValue="test" */}
                      {/*<div style={{'display': 'flex', 'flexDirection': 'column'}}>
                          <label htmlFor="username">Username:</label>
                          <input onChange={event => {
                            console.log('should change username', username)
                            setUsername(event.target.value)
                          }} value={username} type="text" id="username" name="username" {...register("username", { required: true })} />
                          {errors.username && <span>This field is required</span>}
                      </div>*/}
                      it works >
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <input
                            onChange={event => {
                            console.log('should change username', username)
                            setUsername(event.target.value)
                          }}
                            value={username}
                          />
                        )}
                        name="username"
                        defaultValue={username}
                      />
                      ^ it works
                      <div style={{'display': 'flex', 'flexDirection': 'column'}}>
                          <label htmlFor="password">Password:</label>
                          <input onChange={event => setPassword(event.target.value)} value={password} type="text" id="password" name="password" {...register("password", { required: true })} />
                          {errors.password && <span>This field is required</span>}
                      </div>
                      <div style={{'display': 'flex', 'flexDirection': 'column'}}>
                          <label htmlFor="email">Email:</label>
                          <input onChange={event => setEmail(event.target.value)} value={email} id="email" name="email" {...register("email", { required: true })} />
                          {errors.email && <span>This field is required</span>}
                      </div>
                      <input type="hidden" value={user.id}/>
                    <input type="submit" />
                    <button onClick={closeModal}>close</button>
                  </form>
                </Modal>
            );
          }}
        </Mutation>

      </div>
    );
}

export default EditAccountModal