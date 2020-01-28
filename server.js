const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
const {createBundleRenderer} = require('vue-server-renderer');

const isProd = process.env.NODE_ENV === 'production';

const resolve = file => path.resolve(__dirname, file);

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    basedir: resolve('./dist'),
    runInNewContext: false
  }));
}

let renderer;
let readyPromise;
const templatePath = resolve('./src/index.template.html');

if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8');
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');

  renderer = createRenderer(bundle, {
    template,
    clientManifest,
  });
} else {
  readyPromise = require('./build/setup-dev-server')(
    server,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    }
  );
}

server.use('/dist', serve('./dist', true));

function render(req, res) {
  res.setHeader("Content-Type", "text/html");

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url);
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found');
    } else {
      res.status(500).send('500 | Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err.stack);
    }
  };

  const context = {
    title: 'some title',
    url: req.url,
  };

  renderer.renderToString(context, (err, html) => {
    if (err) return handleError(err);
    res.send(html);
  });
}

server.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res));
});

const port = 8082;

server.listen(port, () => {
  console.log("Server started at port", port);
});
