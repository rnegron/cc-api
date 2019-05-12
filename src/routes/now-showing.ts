// eslint-disable-next-line
const fakeNowShowing = require('../../test/data/now-showing.json');

const nowShowingRoute = {
  method: 'GET',
  path: '/now-showing',
  handler: function() {
    return process.env.NODE_ENV === 'development' ? fakeNowShowing : {};
  },
};

export default nowShowingRoute;
