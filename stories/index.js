import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Popup from '../src/components/popup.jsx';
import QuickState from '../src/components/popup/quicksettings.jsx';
import '../css/popup.css';

storiesOf('popup', module)
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

const profile = {
  id: '1234567898',
  name: 'Default',
  default: true,
  color: '#c32c32',
  length: 12,
  type: 3,
  privateKey: 'private',
};

storiesOf('popup.quickstate', module)
  .add('Site disabled', () =>
    <QuickState
      currentProfile={0}
      profiles={[profile]}
      enabled={false}
      onToggle={action('toggle state')}
      onProfileChange={action('profile change')}
    />
  )
  .add('Site enabled', () =>
    <QuickState
      currentProfile={0}
      profiles={[profile]}
      enabled={true}
      onToggle={action('toggle state')}
      onProfileChange={action('profile change')}
    />
  );
