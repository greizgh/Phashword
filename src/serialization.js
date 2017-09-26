import { Map } from 'immutable';

// Serialize state before saving
// In particular, convert immutable types to JS structures
export function serializeState(state) {
  return {
    ...state,
    profiles: state.profiles.toJS(),
    siteSettings: state.siteSettings.toJS(),
  };
}

// Deserialize stored data
// Convert plain objects to immutable data structures
export function deserializeState(data) {
  if (data.state) {
    const ret = {
      ...data.state,
      profiles: Map(data.state.profiles),
      siteSettings: Map(data.state.siteSettings),
    };
    return ret;
  }
  // Let the reducers handle default state generation
  return undefined;
}
