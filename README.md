HyperLine
=========

**HyperLine is a status line plugin for [HyperTerm](https://hyperterm.org/)**. It shows you useful system information such as free memory, uptime and CPU usage. It's designed to be unobtrusive and will match the look of the theme you're currently running.

![GIF DEMO](https://cloud.githubusercontent.com/assets/6755555/18163794/6737759e-7045-11e6-9117-41f7f343d43e.gif)

## Install

To install, edit `~/.hyperterm.js` and add `"hyperline"` to `plugins`:

```
plugins: [                                                                                               
  "hyperline",                                                                                           
],   
```

## Contributing

Feel free to contribute to HyperLine by [requesting a feature](https://github.com/NickTikhonov/hyperterm-hyperline/issues/new), [submitting a bug](https://github.com/NickTikhonov/hyperterm-hyperline/issues/new) or contributing code.

To set up the project for development:

1. Clone this repository into `~/.hyperterm_plugins/local/`
2. Run `npm install` within the project directory
3. Run `npm run build` to build the plugin **OR** `npm run dev` to build the plugin and watch for file changes.
4. Add the name of the directory to `localPlugins` in `~/.hyperterm.js`.
5. Reload terminal window

## License

MIT
