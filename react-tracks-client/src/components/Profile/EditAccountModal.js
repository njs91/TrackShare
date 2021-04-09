import React, { useState } from 'react';
import Modal from 'react-modal';
import { Controller, useForm } from "react-hook-form";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { useHistory } from 'react-router-dom';

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
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const EditAccountModal = ({user}) => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const {control, register} = useForm();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const history = useHistory();
  const submitFn = async (event, updateUser) => {
    event.preventDefault();
    updateUser({
      variables: {
        email: email,
        password: password,
        userId: user.id,
        username: username
      }
    });
    localStorage.removeItem("authToken");
    history.push("/");
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      {console.log('modal user', user)}
      <button onClick={openModal}>Edit Account</button>
      <Mutation
        mutation={UPDATE_USER_MUTATION}
        onCompleted={data => {
          console.log('completed', {data});
        }}
      >
        {(updateUser, {loading, error}) => {
          // if (error) return <Error error={error} />;
          return (
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Account</h2>
              <form onSubmit={(event) => submitFn(event, updateUser)}
                    style={{"display": "flex", "flexDirection": "column"}}>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (<>
                    <label htmlFor="username">Username</label>
                    <input
                      name="username"
                      id="username"
                      required
                      onChange={event => {
                        setUsername(event.target.value)
                      }}
                      value={username}
                    />
                  </>)}
                  name="username"
                  defaultValue={username}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (<>
                    <label htmlFor="password">Password</label>
                    <input
                      {...register("password", {required: true})}
                      name="password"
                      id="password"
                      type="text"
                      required
                      onChange={event => {
                        setPassword(event.target.value)
                      }}
                      value={password}
                    />
                  </>)}
                  name="password"
                  defaultValue={password}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (<>
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      id="email"
                      type="text"
                      required
                      onChange={event => {
                        setEmail(event.target.value)
                      }}
                      value={email}
                    />
                  </>)}
                  name="email"
                  defaultValue={email}
                />
                <input type="hidden" value={user.id}/>
                <input type="submit"/>
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