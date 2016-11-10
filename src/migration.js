import { Map } from 'immutable';
import uuid from 'uuid';

// Keep track of converted profiles
let profileIds = new Map();

function migrateSettings(data) {
  let toggle = data.preferences.toggleKey;
  if (toggle === 'Esc') {
    toggle = 'Escape';
  }
  return {
    defaultState: data.preferences.defaultState,
    toggleKey: toggle,
  };
}

function migrateProfiles(data) {
  let defaultProfile = true;
  let profiles = new Map();
  let index = 0;
  data.profiles.forEach((profile) => {
    const id = uuid.v4();
    profiles = profiles.set(id, {
      default: defaultProfile,
      name: profile.name,
      color: profile.color,
      length: profile.password_length,
      type: profile.password_type,
      key: profile.private_key,
    });
    defaultProfile = false;
    profileIds = profileIds.set(index, id);
    index++;
  });
  return profiles;
}

function migrateSites(data) {
  const oldSites = new Map(data.siteSettings);
  let sites = new Map();
  oldSites.forEach((site, key) => {
    const profile = data.profiles[site.profile_index];
    if (!site.password_length) {
      site.password_length = profile.password_length;
    }
    if (!site.password_type) {
      site.password_type = profile.password_type;
    }
    sites = sites.set(key, {
      tag: site.tag,
      length: parseInt(site.password_length, 10),
      type: parseInt(site.password_type, 10),
      enabled: site.status,
      profile: profileIds.get(parseInt(site.profile_index, 10)),
    });
  });
  return sites;
}

/**
 * This function takes the old data (from v1) and returns a state
 */
export default function migrateData(data) {
  if (!data.profiles || !data.siteSettings) {
    // No data to migrate
    return {};
  }

  return {
    settings: migrateSettings(data),
    profiles: migrateProfiles(data),
    siteSettings: migrateSites(data),
  };
}
