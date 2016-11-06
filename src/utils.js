import tld from 'tldjs';

/*
 take a url and return the corresponding site tag.
 (a) split the url into parts. Discard everything except the address.
 e.g. http://www.google.com:80/mail -> www.google.com
 (b) If the address looks like an ip address or dot free hostname, then
 return it. It can be used as the site tag.
 e.g. 192.168.1.1 -> 192.168.1.1
 localhost -> localhost
 (c) Any address which does not meet (b)'s criteria is probably a domain.
 Use the tldjs library (http://github.com/oncletom/tldjs) to:
 * Cut off the registrar controled part at the end of the domain
 * Cut off any subdomains off the beginning of the domain
 e.g. google.com -> google
 google.co.uk -> google
 mail.google.co.uk -> google
 calendar.google.co.uk -> google
 This is an important step because, (using google as an example):
 The passwords used at google.com, google.co.uk, google mail,
 and google calendar, all need to be the same.
 (d) If the URL is formatted in any other way, fall back to the default
 empty site tag
 */
export function url2tag(url) {
  const splitAtFirstDot = /(^[^.]+)\..*$/;
  const splitUrl = /^(https?:\/\/)(.+@)?([^:#\/]+)(:\d{2,5})?(\/.*)?$/;
  // 1 = protocol, 2 = auth, 3 = address, 4 = port, 5 = path
  // split_url is stolen from http://github.com/oncletom/tldjs
  const isIpv4 = /^\d{1,3}(\.\d{1,3}){3}$/;
  const isDotFreeHostname = /^[^.]+$/;

  try {
    // if url badly formed, this will throw a type error, handled at (d)
    const address = splitUrl.exec(url)[3];                          // a
    if (isIpv4.test(address) || isDotFreeHostname.test(address)) {
      return address;                                               // b
    } else {
      // this shouldn't throw an error.
      // but just in case it does, handle it at (d)
      return splitAtFirstDot.exec(tld.getDomain(address))[1];       // c
    }
  } catch (e) {
    return '';                                                      // d
  }
}


export function getSiteSettings(state, site = state.currentSite) {
  const defaultProfile = state.profiles.findEntry((profile) => profile.default);
  const defaultValues = {
    enabled: state.settings.defaultState,
    tag: site,
    length: defaultProfile[1].length,
    type: defaultProfile[1].type,
    profile: defaultProfile[0],
  };
  return state.siteSettings.get(site, defaultValues);
}

// Extract popup data from global state
export function getPopupState(state) {
  const currentSiteSettings = getSiteSettings(state);
  return {
    selectedProfile: currentSiteSettings.profile,
    profiles: state.profiles.map((value, key) => ({ ...value, id: key })).toArray(),
    siteId: state.currentSite,
    enabled: currentSiteSettings.enabled,
    tag: currentSiteSettings.tag,
    length: currentSiteSettings.length,
    type: currentSiteSettings.type,
  };
}

export function getSettingsState(state) {
  return {
    profiles: state.profiles.map((value, key) => ({ ...value, id: key })).toArray(),
    sites: state.siteSettings.map((value, key) => ({ ...value, id: key })).toArray(),
  };
}

export function getWorkerState(state, url) {
  const site = getSiteSettings(state, url2tag(url));
  const profile = state.profiles.get(site.profile);
  return {
    ...site,
    color: profile.color,
    name: profile.name,
    toggleKey: state.settings.toggleKey,
  };
}
