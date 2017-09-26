import { Map } from 'immutable';
import { PASSWORD_TYPES } from './src/constants.js';

// This file contains fixture data used in tests

export const state = {
  settings: {
    defaultState: false,
    toggleKey: 'Esc',
  },
  currentSite: 'localhost',
  profiles: new Map({
    uuid: {
      type: PASSWORD_TYPES.NUMERIC,
      length: 8,
      default: true,
      color: '#f0f0f0',
      name: 'Default',
    },
    uuid2: {
      type: PASSWORD_TYPES.SPECIAL,
      length: 12,
      default: false,
      color: '#abcdef',
      name: 'FOSS',
    },
  }),
  siteSettings: new Map({
    mozilla: {
      enabled: true,
      type: PASSWORD_TYPES.SPECIAL,
      length: 12,
      tag: 'special',
      profile: 'uuid2',
    },
  }),
};
