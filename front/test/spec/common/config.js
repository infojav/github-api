define([], function() {
  return {
    ENTER_KEY: 13,
    API_SERVER: 'https://api.github.com',
    REQUEST_OPTIONS: {
      repos: {
        data: {
          'per_page': 100
        },
      }
    }
  };
});
