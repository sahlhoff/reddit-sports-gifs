requirejs.config({
  deps: ['main'],
  paths: {
    'jquery': 'lib/jquery/dist/jquery',
    'requirejs': 'lib/requirejs/require'
  },
  shim: {
    'jquery': {
      exports: 'jQuery'
    }
  }
});
