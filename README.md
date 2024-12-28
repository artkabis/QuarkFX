# QuarkFX v2
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

### NPM (Latest beta)
```bash
# Install beta version (recommended for v2)
npm install quarkfx@2.0.0-beta.1

# Or install latest stable (v1)
npm install quarkfx
```

### Import Methods

#### NPM Module Import
```javascript
// ESM import (recommended)
import quark from 'quarkfx';

// Direct ESM import
import quark from 'quarkfx/dist/v2/quarkfx.esm.js';

// CommonJS
const quark = require('quarkfx');
```

#### CDN Import
Via unpkg:
```javascript
// Latest beta (v2)
import quark from 'https://unpkg.com/quarkfx@2.0.0-beta.1/dist/v2/quarkfx.esm.js';

// Latest stable (v1)
import quark from 'https://unpkg.com/quarkfx@1.0.0/dist/quarkfx.esm.js';
```

Via jsDelivr:
```javascript
// Latest beta (v2)
import quark from 'https://cdn.jsdelivr.net/npm/quarkfx@2.0.0-beta.1/dist/v2/quarkfx.esm.js';

// Latest stable (v1)
import quark from 'https://cdn.jsdelivr.net/npm/quarkfx@1.0.0/dist/quarkfx.esm.js';
```

#### HTML Module Import
```html
<script type="module">
  // Latest beta (v2)
  import quark from 'https://unpkg.com/quarkfx@2.0.0-beta.1/dist/v2/quarkfx.esm.js';
  
  // Example usage
  quark.fromTo('#target', 1000, 
    { x: 0, rotation: 0 }, 
    { x: 100, rotation: 360 }
  );
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

### Core Methods

#### fromTo(selector, duration, fromProps, toProps, options)
Animate from initial to final state
```javascript
quark.fromTo('#target', 1000, 
  { x: 0, rotation: 0 }, 
  { x: 100, rotation: 360 },
  { 
    easing: 'elastic',
    onComplete: (target) => console.log('Done!')
  }
);
```

#### to(selector, duration, toProps, options)
Animate to final state from current position
```javascript
quark.to('#target', 1000, 
  { x: 200, y: 100 },
  { easing: 'ease-out' }
);
```

### Animation Control Methods

#### play(selector)
Resume paused animation
```javascript
quark.play('#target');
```

#### pause(selector)
Pause current animation
```javascript
quark.pause('#target');
```

#### finish(selector)
Complete current animation immediately
```javascript
quark.finish('#target');
```

#### reverse()
Reverse the previous animation
```javascript
quark.fromTo('#target', 1000, 
  { x: 0 }, 
  { x: 100 }
).reverse();
```

### Complex Animations

#### stagger(selector, duration, props, staggerTime, options)
Create cascading animations
```javascript
quark.stagger('.items', 1000, 
  { 
    y: 100, 
    rotation: 360 
  }, 
  50, // delay between each
  { easing: 'easeOutBack' }
);
```

#### sequence(animations)
Run animations in sequence
```javascript
quark.sequence([
  ['#elem1', 1000, { x: 100 }],
  ['#elem2', 1000, { y: 100 }],
  ['#elem3', 1000, { scale: 1.5 }]
]);
```

#### parallel(animations)
Run animations simultaneously
```javascript
quark.parallel([
  ['#elem1', 1000, { x: 100 }],
  ['#elem2', 1000, { y: 100 }]
]);
```

#### loop(selector, duration, props, options)
Create infinite animations
```javascript
quark.loop('#target', 1000, 
  { rotation: 360 },
  { 
    easing: 'linear',
    iterations: Infinity 
  }
);
```

## Properties & Options

### Animatable Properties
```javascript
{
  // Transform properties
  x: number,          // translateX in pixels
  y: number,          // translateY in pixels
  rotation: number,   // rotate in degrees
  scale: number,      // scale transform

  // CSS properties
  opacity: number,
  backgroundColor: string,
  borderRadius: string,
  boxShadow: string,
  width: string,
  height: string,
  // ... any valid CSS property
}
```

### Animation Options
```javascript
{
  easing: string,       // Animation timing function
  delay: number,        // Start delay in ms
  endDelay: number,     // End delay in ms
  iterations: number,   // Number of iterations
  direction: string,    // 'normal' | 'reverse' | 'alternate'
  fill: string,        // 'none' | 'forwards' | 'backwards' | 'both'
  onComplete: function  // Callback when animation completes
}
```

### Available Easings
- `linear`
- `easeInQuad`
- `easeOutQuad`
- `easeInOutQuad`
- `elastic`
- `bounce`
- `easeOutBack`

## Examples

### Complex Animation Chain
```javascript
quark.fromTo('#element', 1000, 
  { x: 0, scale: 1 }, 
  { x: 200, scale: 1.5 },
  { easing: 'easeOutQuad' }
)
.to('#element', 500, 
  { y: -100, rotation: 180 },
  { easing: 'elastic' }
)
.sequence([
  ['#elem1', 300, { opacity: 0 }],
  ['#elem2', 300, { opacity: 0 }]
])
.reverse();
```

### Stagger with Complex Properties
```javascript
quark.stagger('.grid-items', 1000,
  {
    y: -50,
    rotation: 180,
    backgroundColor: '#9b59b6',
    scale: 1.2,
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
  },
  50,
  { easing: 'easeOutBack' }
);
```

## Live Demos
- [QuarkFX v2 Demo](https://codepen.io/artkabis/pen/raBzwXd)
- [QuarkFX v1 Demo](https://codepen.io/artkabis/pen/mybMRLY)

## Browser Support
- Chrome 61+
- Firefox 63+
- Safari 13.1+
- Edge 79+

## Documentation
For detailed documentation and advanced examples, visit our [GitHub repository](https://github.com/artkabis/quarkfx).

## License
MIT

## Author
Created by Gregory Nicolle (Artkabis)
