# QuarkFX
Simple animation library for fun ;)

Modern vanilla JS animation library focusing on chain methods and transforms. Built with Web Animation API, zero dependencies.

## Features
- 🚀 Lightweight (~4kb minified)
- 🔗 Chainable methods
- 🎯 Simple API
- 🎨 CSS transforms & easings support
- ⚡ Built on Web Animation API
- 0️⃣ Zero dependencies

## Installation

[![npm version](https://badge.fury.io/js/quarkfx.svg)](https://www.npmjs.com/package/quarkfx)

```bash
npm install quarkfx
```

You can also check out the package on [npm](https://www.npmjs.com/package/quarkfx)

### Import Methods

#### NPM Module Import
```javascript
// Standard import
import quark from 'quarkfx';

// Direct ESM import
import quark from 'quarkfx/dist/index.esm.js';
```

#### CDN Import
Via unpkg:
```javascript
import quark from 'https://unpkg.com/quarkfx';
// or specific version
import quark from 'https://unpkg.com/quarkfx@1.0.0/dist/index.esm.js';
```

Via jsDelivr:
```javascript
import quark from 'https://cdn.jsdelivr.net/npm/quarkfx';
// or specific version
import quark from 'https://cdn.jsdelivr.net/npm/quarkfx@1.0.0/dist/index.esm.js';
```

#### HTML Module Import
```html
<script type="module">
  import quark from 'https://unpkg.com/quarkfx';
  
  // Usage
  quark.fromTo('#target', 1000, {x: 0}, {x: 100});
</script>
```

## Quick Start

```javascript
import quark from 'quarkfx';

// Basic animation
quark.fromTo('#target', 1000, 
  { x: 0 }, 
  { x: 100 }
);

// Chain animations
quark.fromTo('#element', 2000, 
  { x: 0, rotation: 0 }, 
  { x: 500, rotation: 360 }
).to('#element2', 1000, 
  { y: 200 }
);
```

## API Reference

### fromTo(selector, duration, fromProps, toProps, options)
Animate from initial to final state

```javascript
quark.fromTo('#target', 1000, 
  { x: 0, rotation: 0 }, 
  { x: 100, rotation: 360 },
  { 
    easing: 'ease-in-out',
    onComplete: (target) => console.log('Done!')
  }
);
```

### to(selector, duration, toProps, options)
Animate to final state from current position

```javascript
quark.to('#target', 1000, 
  { x: 200, y: 100 },
  { easing: 'ease-out' }
);
```

### reverse()
Reverse the previous animation

```javascript
quark.fromTo('#target', 1000, 
  { x: 0 }, 
  { x: 100 }
).reverse();
```

### Available Properties

#### Transform Properties
- `x`: translateX in pixels
- `y`: translateY in pixels
- `rotation`: rotate in degrees
- `scale`: scale transform

#### CSS Properties
All standard CSS properties are supported, including:
- `opacity`: value from 0 to 1
- `backgroundColor`: any valid CSS color
- `width`: size in px, %, em, etc.
- `height`: size in px, %, em, etc.
- `margin`: spacing values
- `padding`: spacing values
- `border`: border properties
- `borderRadius`: radius values
- `color`: text color
- `fontSize`: font size values
- Et plus encore...

### Options
```javascript
{
  easing: string,       // Animation timing function
  onComplete: function, // Callback when animation completes
  fill: string         // 'none' | 'forwards' | 'backwards' | 'both'
}
```

### Easing Functions
- `linear`
- `ease`
- `ease-in`
- `ease-out`
- `ease-in-out`
- `cubic-bezier(n,n,n,n)`
- `steps(n, start|end)`
- `step-start`
- `step-end`

## Examples

### Basic Movement
```javascript
quark.fromTo('#box', 1000,
  { x: 0 },
  { x: 300 }
);
```

### Complex Animation Chain
```javascript
quark.fromTo('#element', 2000,
  { x: 0, rotation: 0 },
  { x: 500, rotation: 360 },
  { easing: 'ease-in-out' }
).to('#element', 1000,
  { y: 200, scale: 1.5 },
  { easing: 'ease-out' }
).reverse();
```

### Multiple Elements
```javascript
quark.fromTo('.items', 1000,
  { y: 0, scale: 1 },
  { y: 100, scale: 1.2 },
  { 
    easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)',
    onComplete: (target) => console.log(`${target.id} animation complete`)
  }
);
```

### Live Demo
Check out this live example that demonstrates various QuarkFX features:

[![Edit QuarkFX Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codepen.io/artkabis/pen/mybMRLY)

```html
<!-- HTML -->
<div class="container">
  <div id="target1" class="box">Target 1</div>
  <div id="target2" class="box">Target 2</div>
</div>
```

```javascript
// JavaScript
quark.fromTo('#target2', 5000,
  { x: 0, rotation: 0 },
  { x: 1300, rotation: 360 },
  { 
    easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)',
    onComplete: () => console.log('Animation 2 terminée')
  }
).to('#target1', 5000,
  { x: 0, rotation: 360 },
  { 
    easing: 'ease-in-out',
    onComplete: () => console.log('Animation 1 terminée')
  }
);
```

### Sequence with Callbacks
```javascript
quark.fromTo('#first', 1000,
  { x: 0 },
  { x: 200 },
  {
    onComplete: (target) => {
      console.log('First animation done');
    }
  }
).to('#second', 1000,
  { x: 200 },
  {
    onComplete: (target) => {
      console.log('Second animation done');
    }
  }
);
```

## Browser Support
- Chrome 61+
- Firefox 63+
- Safari 13.1+
- Edge 79+

## License
MIT