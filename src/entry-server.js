import {createApp} from './app';

const isDev = process.env.NODE_ENV !== 'production';

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now();

    const {app, router, store} = createApp();

    if (app.$meta) {
      context.meta = app.$meta();
    }

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        return reject({code: 404});
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component && Component.asyncData) {
          console.log('--- component has asyncData');

          return Component.asyncData({
            store,
            route: router.currentRoute
          });
        }
      })).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);
        // console.log('*** caseLinks', store.state.cases.caseLinks.length);

        /*if (store.state.isErrorPage) {
          console.log('*** isErrorPage', store.state.isErrorPage);
          reject({code: 404});
        }*/

        context.state = store.state;
        resolve(app);
      }).catch(reject);
    }, reject);

    /*router.onError(() => {
      return reject({code: 404});
    });*/
  });
};
