![Logo](https://github.com/sebheron/storybook-addon-keys/assets/6990718/d6eb84f7-edd3-4019-818c-2c56aeebf359)

# Storybook Addon Keys
Display keyboard presses in Storybook.
![Demo](https://github.com/sebheron/storybook-addon-keys/assets/6990718/9f1bc55c-9573-4ae9-9f61-2f65ea3e754d)

### Installation
```bash
npm i storybook-addon-keys --save
```

### Setup
Load the addon into Storybook like so:
```javascript
// .storybook/main.(js|ts)
module.exports = {
  addons: ['storybook-addon-keys'],
};
```

### Configuration
Different parameters are available for use in configuring the way keys appear.

| Parameter | Description | Options | Default |
| --------- | ----------- | ------- | ------- |
| `theme`     | The visual theme used when displaying the keys | `light`, `dark`, `false` (uses Storybook theme) | `false`  |
| `position` | Where to display the keys | `top-right`, `top-left`, `bottom-right`, `bottom-left`| `top-right` |
| `size` | The size of the keys | `small`, `medium`, `large` | `medium` |
| `duration` | The length of time in milliseconds to display the keys for | `number` | `800` |
| `keyMap` | The mapping of the keys to their displayed value | [Configuring key map](#configuring-key-map) | [Default key map](#default-key-map) |

#### Modifying Parameters
You can modify the parameters using the 'keys' property.
```javascript
// .storybook/preview.(js|ts)
import { KeysConfig } from 'storybook-addon-keys';

const preview: Preview = {
    parameters: {
        keys: <KeysConfig>{
            theme: 'dark',
            position: 'bottom-right',
            size: 'large',
            duration: 1000,
            keyMap: false,
        },
    }
}
```

See [Storybook Parameters](https://storybook.js.org/docs/react/writing-stories/parameters) for a more detailed explanation on how to use parameters.

#### Configuring Key Map
Keys are mapped from [KeyboardEvent.Key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) to their display value. It can be useful to configure this setting if your app has hot keys you want to label.

For example if I wanted to map the key 'Enter' to 'Accept' I can supply the following.

```javascript
keys: {
  ...
  keyMap: {
    'Enter': 'Accept',
  }
}
```

Any changes to key maps will override the default mapping, see below on how to maintain the original key maps while adding in your own. If 'false' is supplied as a key map then the keys will display as they're recieved in the event.

#### Default Key Map
The default key map is as follows. If you want to use this map alongside your own mapped keys then copy it into your Storybook parameters and append your own keys.
```javascript
keys: {
  ...
  keyMap: {
    ' ': 'Space',
    'Enter': ' ↵ ',
    'ArrowUp': ' ↑ ',
    'ArrowDown': ' ↓ ',
    'ArrowLeft': ' ← ',
    'ArrowRight': ' → ',
    'Escape': 'Esc',
    'Backspace': ' ⌫ ',
    'Tab': ' ⇥ ',
    'Shift': ' ⇧ ',
    'Control': 'Ctrl',
    'Meta': ' ⊞ ',
  }
}
```

### Usage
Toggle the keys with the tool button provided. Assuming you haven't overriden the theme, the addon will automatically use your preferred Storybook theme.
