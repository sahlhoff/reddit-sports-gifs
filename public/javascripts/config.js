requirejs.config({
  deps: ['main'],
  paths: {
    'jquery': 'lib/jquery/dist/jquery'
  },
  shim: {
    'jquery': {
      exports: 'jQuery'
    }
});
