import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack, Placeholder  } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';

const HISTORY_ROOT_URL = "https://dog.ceo/api/breeds/image/random";

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();
  const getHistoryHook = async () => {
    const response = await axios.get(HISTORY_ROOT_URL);
    const data = response.data;
    return data.message;
  }

  const onPersikClick = async (e) => {
    const message = await getHistoryHook();
    bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url : message,
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
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={(e) => onPersikClick(e)}>
            Покажите случайную собаку, пожалуйста!
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
