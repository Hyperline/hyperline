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

## Configuration

Hyperline shows a collection of information plugins which can be fully configured.
By default, all available plugins are displayed in pre-defined colors.
You can change which plugins are displayed by editing `.hyperterm.js`. Start
out with the default config (below), and customize Hyperline to your liking.

* The `color` string is used to specify the color of the line itself.
* The `plugins` array determines which plugins are rendered, and in which order.
  * Each plugin configuration has an `options` object.
    * This can be used to change the color of the each plugin.
    * Some plugins allow you to choose multiple colors.
    * Some plugins allow you to change the update interval, where relevant. 
  * You can omit the options object to stick with the default options for each plugin.
* Check out the list of available colors in the [HyperTerm source code](https://github.com/zeit/hyperterm/blob/master/lib/utils/colors.js).

```
module.exports = {
  ...
  config: {
    ...
    hyperline: {
      color: 'black',
      plugins: [
        {
          name: 'hostname',
          options: {
            color: 'lightBlue'
          }
        },
        {
          name: 'memory',
          options: {
            color: 'white',
            updateIntervalMs: 1000
          }
        },
        {
          name: 'uptime',
          options: {
            color: 'lightYellow',
            updateIntervalMs: 60000
          }
        },
        {
          name: 'cpu',
          options: {
            colors: {
              high: 'lightRed',
              moderate: 'lightYellow',
              low: 'lightGreen'
            },
            updateIntervalMs: 500
          }
        },
        {
          name: 'network',
          options: {
            color: 'lightCyan',
            updateIntervalMs: 1000
          },
        },
        {
          name: 'battery',
          options: {
            colors: {
              fine: 'lightGreen',
              critical: 'lightRed'
            }
          }
        }
      ]
    }
    ...
  }
  ...
}
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
