import { addSite } from '../actions/site';
import { getSiteSettings } from '../utils';

// Save site on hash request if it does not exist yet
export const saveOnHash = store => next => action => {
  const currentSite = store.getState().currentSite;
  const sites = store.getState().siteSettings;
  if (action.type === 'REQUEST_PASS' && !sites.has(currentSite)) {
    const site = getSiteSettings(store.getState());
    action = addSite(
      currentSite,
      site.profile,
      site.tag,
      site.length,
      site.type,
      site.enabled
    );
  }
  return next(action);
};
