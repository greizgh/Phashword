import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import faker from 'faker';
import Popup from '../src/components/popup.jsx';
import QuickState from '../src/components/popup/quicksettings.jsx';
import SiteItem from '../src/components/admin/siteItem.jsx';
import SiteAdmin from '../src/components/admin/siteAdmin.jsx';
import Settings from '../src/components/admin/settings.jsx';
import ProfileItem from '../src/components/admin/profileItem.jsx';

storiesOf('popup', module)
  .add('Empty state', () => (
    <Popup
      dispatch={action('dispatch')}
      onSettings={action('settings')}
      onClose={action('close')}
      onPassword={action('password')}
    />
  ));

const profile = {
  id: 'uuid',
  name: 'Default',
  default: true,
  color: '#c32c32',
  length: 12,
  type: 3,
  key: 'private',
};

storiesOf('popup.quickstate', module)
  .add('Site disabled', () =>
    <QuickState
      currentProfile={'uuid'}
      profiles={[profile]}
      enabled={false}
      onToggle={action('toggle state')}
      onProfileChange={action('profile change')}
    />
  )
  .add('Site enabled', () =>
    <QuickState
      currentProfile={'uuid'}
      profiles={[profile]}
      enabled
      onToggle={action('toggle state')}
      onProfileChange={action('profile change')}
    />
  );

const site = {
  id: 'mozilla',
  profile: 'uuid',
  tag: 'custom',
  length: 12,
};
storiesOf('admin.siteItem', module)
  .add('default', () => <SiteItem site={site} onDelete={action('delete site')} />);

const sites = [
  site,
];

for (let i = 0; i < 10; i++) {
  sites.push({
    id: faker.internet.domainWord(),
    profile: 'uuid',
    tag: faker.lorem.word(),
    length: 12,
  });
}

storiesOf('admin.sites', module)
  .add('default', () => <SiteAdmin sites={sites} onDelete={action('delete site')} />);

storiesOf('admin.profileItem', module)
  .add('default', () =>
    <ProfileItem
      dispatch={action('dispatch')}
      profile={profile}
    />
  );

storiesOf('admin.settings', module)
  .add('default', () =>
    <Settings
      onSiteDelete={action('delete site')}
      onProfileDelete={action('delete profile')}
      sites={sites}
      profiles={[profile]}
    />
  );
