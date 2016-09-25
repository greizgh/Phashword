import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Popup from '../src/components/popup.jsx';
import '../css/popup.css';

storiesOf('Popup', module)
  .add('Empty state', () => (
    <Popup
      onSettings={action('settings')}
      onClose={action('close')}
      onReady={action('ready')}
      onToggleState={action('toggle state')}
      onProfileChange={action('change profile')}
      onPassword={action('password')}
      onTagChange={action('change tag')}
      onTypeChange={action('change type')}
      onLengthChange={action('change type')}
    />
  ));
