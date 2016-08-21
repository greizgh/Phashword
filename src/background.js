import { store, dispatcher } from './store';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.type) {
      case 'OPEN_SETTINGS':
        console.log('open settings');
        break;
      case 'POPUP_READY':
        dispatcher.onNext(request);
        break;
    }
  }
);

store.subscribe((state) => {
  console.log(state);
  chrome.runtime.sendMessage({
    type: '@STATE',
    state,
  });
});
