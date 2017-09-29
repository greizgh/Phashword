import { Map } from 'immutable';

// Serialize state before saving
// In particular, convert immutable types to JS structures
export function serializeState(state) {
  return {
    settings: state.settings,
    profiles: state.profiles.toObject(),
    siteSettings: state.siteSettings.toObject(),
  };
}

// Deserialize stored data
// Convert plain objects to immutable data structures
export function deserializeState(state) {
  if (state) {
    const ret = {
      settings: state.settings,
      profiles: Map(state.profiles),
      siteSettings: Map(state.siteSettings),
    };
    return ret;
  }
  // Let the reducers handle default state generation
  return undefined;
}
