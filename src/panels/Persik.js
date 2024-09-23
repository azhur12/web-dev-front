import { useState, useEffect } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import PersikImage from '../assets/persik.png';
import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';

const HISTORY_ROOT_URL = "https://dog.ceo/api/breeds/image/random";

export const Persik = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [ url, setUrl ] = useState(null);
  const getHistoryHook = async () => {
    const response = await axios.get(HISTORY_ROOT_URL);
    const data = response.data;
    setUrl(data.message);
  }

  const onPersikClick = async (e) => {
    await getHistoryHook();
    console.log('url: ', url);
    bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url : url,
      attachment: {
        text: 'book',
        type: 'photo',
        owner_id: 743784474,
        id: 12345678
      }})
      .then((data) => {
        if (data.code_data) {
          // Редактор историй открыт
          console.log(data);
        }})
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={(e) => onPersikClick(e)} />}>
        Persik
      </PanelHeader>
      <Placeholder>
        <img width={230} src={PersikImage} alt="Persik The Cat" />
      </Placeholder>
    </Panel>
  );
};

Persik.propTypes = {
  id: PropTypes.string.isRequired,
};
