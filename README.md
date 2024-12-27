# QuarkFX v2 Beta
Simple animation library for fun ;)

A modern, lightweight animation library built on the Web Animation API. Zero dependencies, chainable methods, and powerful features in just ~4kb.

[![npm version](https://badge.fury.io/js/quarkfx.svg)](https://www.npmjs.com/package/quarkfx)

## Installation

```bash
# Install beta version
npm install quarkfx@beta
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

## Core Features

### Animation Methods

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
Animate to final state
```javascript
quark.to('#target', 1000, 
  { x: 200, y: 100 },
  { easing: 'ease-out' }
);
```

### Control Methods

#### play(selector)
```javascript
quark.play('#target');
```

#### pause(selector)
```javascript
quark.pause('#target');
```

#### finish(selector)
```javascript
quark.finish('#target');
```

#### reverse()
```javascript
quark.reverse('#target');
```

### Advanced Animations

#### stagger(selector, duration, props, staggerTime, options)
Create cascading animations
```javascript
quark.stagger('.items', 1000, 
  { y: 100, rotation: 360 }, 
  50,  // delay between elements
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
  { iterations: Infinity }
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
  backgroundColor: string,
  borderRadius: string,
  boxShadow: string,
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

## Browser Support
- Chrome 61+
- Firefox 63+
- Safari 13.1+
- Edge 79+

## License
MIT

## Contributing
Feel free to submit PRs or create issues on [GitHub](https://github.com/yourusername/quarkfx).

See the [live demo](https://codepen.io/artkabis/pen/mybMRLY) for more examples.