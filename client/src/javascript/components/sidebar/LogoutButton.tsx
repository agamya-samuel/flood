import {FC} from 'react';
import {useIntl} from 'react-intl';

import AuthActions from '@client/actions/AuthActions';
import ConfigStore from '@client/stores/ConfigStore';
import {Logout} from '@client/ui/icons';

import Tooltip from '../general/Tooltip';

const LogoutButton: FC = () => {
  const intl = useIntl();

  if (ConfigStore.authMethod === 'none') {
    return null;
  }

  return (
    <Tooltip
      content={intl.formatMessage({
        id: 'sidebar.button.log.out',
      })}
      onClick={() =>
        AuthActions.logout().then(() => {
          window.location.reload();
        })
      }
      position="bottom"
      wrapperClassName="sidebar__action sidebar__action--last
          sidebar__icon-button sidebar__icon-button--interactive
          tooltip__wrapper">
      <Logout />
    </Tooltip>
  );
};

export default LogoutButton;
