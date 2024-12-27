class QuarkFX {
    constructor() {
      this.animations = new Map();
      this.queue = [];
      this.currentAnimation = null;
    }
  
    fromTo(selector, duration = 1000, fromProps, toProps, options = {}) {
      const animation = { 
        selector, 
        duration, 
        fromProps, 
        toProps, 
        options,
        type: 'fromTo'
      };
      
      if (!this.currentAnimation) {
        this._runAnimation(animation);
      } else {
        this.queue.push(animation);
      }
  
      return this;
    }
  
    to(selector, duration = 1000, toProps, options = {}) {
      const animation = { 
        selector, 
        duration, 
        toProps, 
        options,
        type: 'to'
      };
      
      this.queue.push(animation);
      return this;
    }
  
    async _runAnimation(animation) {
      this.currentAnimation = animation;
      const elements = typeof animation.selector === 'string' 
        ? document.querySelectorAll(animation.selector)
        : [animation.selector];
  
      const promises = [];
  
      elements.forEach(element => {
        let keyframes;
        
        if (animation.type === 'fromTo') {
          keyframes = this._createKeyframes(animation.fromProps, animation.toProps);
        } else { // type 'to'
          const computedStyle = window.getComputedStyle(element);
          const currentTransform = computedStyle.transform;
          const fromProps = this._getCurrentProperties(element, animation.toProps, currentTransform);
          keyframes = this._createKeyframes(fromProps, animation.toProps);
        }
        
        const timing = {
          duration: animation.duration,
          easing: animation.options.easing || 'ease',
          fill: animation.options.fill || 'forwards'
        };
  
        const anim = element.animate(keyframes, timing);
        this.animations.set(element, anim);
  
        const promise = new Promise(resolve => {
          anim.onfinish = () => {
            if (animation.options.onComplete) {
              animation.options.onComplete(element);
            }
            resolve();
          };
        });
        
        promises.push(promise);
      });
  
      await Promise.all(promises);
      this.currentAnimation = null;
      if (this.queue.length > 0) {
        const nextAnimation = this.queue.shift();
        await this._runAnimation(nextAnimation);
      }
    }
  
    _getCurrentProperties(element, toProps, currentTransform) {
      const fromProps = {};
      const transformProps = ['x', 'y', 'rotation', 'scale'];
      
      // Get current transform values
      const matrix = new DOMMatrix(currentTransform);
      if ('x' in toProps) fromProps.x = matrix.e;
      if ('y' in toProps) fromProps.y = matrix.f;
      if ('rotation' in toProps) {
        const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
        fromProps.rotation = angle;
      }
      if ('scale' in toProps) {
        fromProps.scale = Math.hypot(matrix.a, matrix.b);
      }
  
      // Get other current properties
      Object.keys(toProps).forEach(prop => {
        if (!transformProps.includes(prop)) {
          fromProps[prop] = getComputedStyle(element)[prop];
        }
      });
  
      return fromProps;
    }
  
    _createKeyframes(fromProps, toProps) {
      const transformProps = ['x', 'y', 'rotation', 'scale'];
      const keyframes = [];
      
      const startFrame = {};
      const startTransforms = {};
      for (const [prop, value] of Object.entries(fromProps)) {
        if (transformProps.includes(prop)) {
          startTransforms[prop] = value;
        } else {
          startFrame[prop] = value;
        }
      }
      if (Object.keys(startTransforms).length) {
        startFrame.transform = this._combineTransforms(startTransforms);
      }
      keyframes.push(startFrame);
  
      const endFrame = {};
      const endTransforms = {};
      for (const [prop, value] of Object.entries(toProps)) {
        if (transformProps.includes(prop)) {
          endTransforms[prop] = value;
        } else {
          endFrame[prop] = value;
        }
      }
      if (Object.keys(endTransforms).length) {
        endFrame.transform = this._combineTransforms(endTransforms);
      }
      keyframes.push(endFrame);
  
      return keyframes;
    }
  
    _combineTransforms(props) {
      const transforms = [];
      
      if ('x' in props) {
        transforms.push(`translateX(${typeof props.x === 'number' ? props.x + 'px' : props.x})`);
      }
      if ('y' in props) {
        transforms.push(`translateY(${typeof props.y === 'number' ? props.y + 'px' : props.y})`);
      }
      if ('rotation' in props) {
        transforms.push(`rotate(${typeof props.rotation === 'number' ? props.rotation + 'deg' : props.rotation})`);
      }
      if ('scale' in props) {
        transforms.push(`scale(${props.scale})`);
      }
      
      return transforms.join(' ');
    }
  
    play(selector) {
      this._getAnimations(selector).forEach(anim => anim.play());
      return this;
    }
  
    pause(selector) {
      this._getAnimations(selector).forEach(anim => anim.pause());
      return this;
    }
  
    reverse() {
      if (this.currentAnimation) {
        const reverseAnimation = {
          selector: this.currentAnimation.selector,
          duration: this.currentAnimation.duration,
          fromProps: this.currentAnimation.toProps,
          toProps: this.currentAnimation.fromProps,
          options: {
            ...this.currentAnimation.options,
            easing: this.currentAnimation.options.easing
          },
          type: 'fromTo'
        };
        this.queue.push(reverseAnimation);
      }
      return this;
    }
  
    // Pour les cas où on veut inverser une animation spécifique
    reverseAnimation(selector) {
      this._getAnimations(selector).forEach(anim => anim.reverse());
      return this;
    }
  
    _getAnimations(selector) {
      if (!selector) {
        return Array.from(this.animations.values());
      }
      
      const elements = typeof selector === 'string'
        ? document.querySelectorAll(selector)
        : [selector];
        
      return Array.from(elements).map(el => this.animations.get(el)).filter(Boolean);
    }
  }
  
  const anim = new QuarkFX();
  export default QuarkFX;
  