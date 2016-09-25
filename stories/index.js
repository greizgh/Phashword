import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Popup from '../src/components/popup.jsx';
import '../css/popup.css';

storiesOf('Popup', module)
  .add('Empty state', () => (
    <Popup onSettings={action('settings')} onClose={action('close')} dispatch={action('dispatch')} />
  ));
