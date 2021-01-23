import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserState } from '../recoil/atom';

const HomeView = () => {
  const user = useRecoilValue(UserState);
  const history = useHistory();

  const onClickHandler = async () => {
    try {
      await axios.get('/logoutUser')
      history.push('/login');
    } catch (e) {
      console.log('some error occurred while logging out the user')
    }
  }

  return (
    <div>
      <p>home screen</p>
      {user.name}
      {user.email}
      {user.id}
      <button onClick={onClickHandler}>logout</button>
    </div>
  );
};

export default HomeView;
