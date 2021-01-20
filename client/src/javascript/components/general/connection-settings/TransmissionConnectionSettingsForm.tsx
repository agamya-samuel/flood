import {Component, ChangeEvent, MouseEvent} from 'react';
import {FormattedMessage, IntlShape} from 'react-intl';

import {FormGroup, FormRow, Textbox} from '@client/ui';

import type {TransmissionConnectionSettings} from '@shared/schema/ClientConnectionSettings';

export interface TransmissionConnectionSettingsProps {
  intl: IntlShape;
}

export interface TransmissionConnectionSettingsFormData {
  url: string;
  username: string;
  password: string;
}

class TransmissionConnectionSettingsForm extends Component<
  TransmissionConnectionSettingsProps,
  TransmissionConnectionSettingsFormData
> {
  constructor(props: TransmissionConnectionSettingsProps) {
    super(props);

    this.state = {
      url: '',
      username: '',
      password: '',
    };
  }

  getConnectionSettings = (): TransmissionConnectionSettings | null => {
    if (this.state.url == null || this.state.url === '') {
      return null;
    }

    const settings: TransmissionConnectionSettings = {
      client: 'Transmission',
      type: 'rpc',
      version: 1,
      url: this.state.url,
      username: this.state.username || '',
      password: this.state.password || '',
    };

    return settings;
  };

  handleFormChange = (
    event: MouseEvent<HTMLInputElement> | KeyboardEvent | ChangeEvent<HTMLInputElement>,
    field: keyof TransmissionConnectionSettingsFormData,
  ): void => {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement == null) {
      return;
    }

    const {value} = inputElement;

    if (this.state[field] !== value) {
      this.setState((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  render() {
    return (
      <FormRow>
        <FormGroup>
          <FormRow>
            <Textbox
              onChange={(e) => this.handleFormChange(e, 'url')}
              id="url"
              label={<FormattedMessage id="connection.settings.transmission.url" />}
              placeholder={this.props.intl.formatMessage({
                id: 'connection.settings.transmission.url.input.placeholder',
              })}
            />
          </FormRow>
          <FormRow>
            <Textbox
              onChange={(e) => this.handleFormChange(e, 'username')}
              id="transmission-username"
              label={<FormattedMessage id="connection.settings.transmission.username" />}
              placeholder={this.props.intl.formatMessage({
                id: 'connection.settings.transmission.username.input.placeholder',
              })}
              autoComplete="off"
            />
            <Textbox
              onChange={(e) => this.handleFormChange(e, 'password')}
              id="transmission-password"
              label={<FormattedMessage id="connection.settings.transmission.password" />}
              placeholder={this.props.intl.formatMessage({
                id: 'connection.settings.transmission.password.input.placeholder',
              })}
              autoComplete="off"
              type="password"
            />
          </FormRow>
        </FormGroup>
      </FormRow>
    );
  }
}

export default TransmissionConnectionSettingsForm;
