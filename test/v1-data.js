export const data = {
  preferences: {
    toggleKey: 'Esc',
    defaultState: true,
  },
  profiles: [
    {
      name: 'Default',
      password_length: '12',
      password_type: '1',
      private_key: 'test priv key',
      hash_type: 3,
      color: '#edab2f',
    },
    {
      name: 'Alpha',
      password_length: 12,
      password_type: '2',
      private_key: 'test priv key',
      hash_type: 3,
      color: '#e3538f',
    },
  ],
  siteSettings: {
    mozilla: {
      profile_index: '0',
      tag: 'mozilla',
      status: true,
      password_length: 12,
      password_type: '1',
    },
    firefox: {
      profile_index: '0',
      tag: 'firefox',
      status: true,
      password_length: 12,
      password_type: '1',
    },
    google: {
      profile_index: '0',
      tag: 'google',
      status: false,
      password_length: 12,
      password_type: '1',
    },
    alpha: {
      profile_index: '1',
      tag: 'alpha',
      status: true,
      password_length: 12,
      password_type: '2',
    },
    num: {
      profile_index: '0',
      tag: 'test',
      status: true,
      password_length: '8',
      password_type: '3',
    },
    incomplete: {
      profile_index: '0',
      tag: 'test',
      status: true,
    },
  },
};

export const empty = {
  preferences: {
    toggleKey: 'Esc',
    defaultState: true,
  },
  profiles: undefined,
  siteSettings: undefined,
};
