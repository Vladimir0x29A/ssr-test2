const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const server = require('express')();
const {createBundleRenderer} = require('vue-server-renderer');

const template = fs.readFileSync(resolve('./index.template.html'), 'utf-8');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(require('../dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template,
  clientManifest,
});

server.get('*', (req, res) => {
  const context = {
    url: req.url,
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal server error');
      }
    } else {
      res.end(html);
    }
  });
});

server.listen(8082);
