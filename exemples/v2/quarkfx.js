class QuarkFX {
    constructor() {
        this.animations = new Map();
        this.queue = [];
        this.currentAnimation = null;
        this.defaultEasing = {
            linear: 'linear',
            easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
            easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
            elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            bounce: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
            easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        };
    }
  
    fromTo(selector, duration = 1000, fromProps, toProps, options = {}) {
      return new Promise((resolve) => {
        const animation = { 
          selector, 
          duration, 
          fromProps: this._parseProperties(fromProps),
          toProps: this._parseProperties(toProps),
          options: {
            easing: options.easing || 'easeOutQuad',
            delay: options.delay || 0,
            endDelay: options.endDelay || 0,
            iterations: options.iterations || 1,
            direction: options.direction || 'normal',
            ...options,
            onComplete: (element) => {
              if(options.onComplete) options.onComplete(element);
              resolve();
            }
          },
          type: 'fromTo'
        };
        
        if (!this.currentAnimation) {
          this._runAnimation(animation);
        } else {
          this.queue.push(animation);
        }
      });
    }
  
    to(selector, duration = 1000, toProps, options = {}) {
      return new Promise((resolve) => {
        const animation = { 
          selector, 
          duration, 
          toProps: this._parseProperties(toProps),
          options: {
            easing: options.easing || 'easeOutQuad',
            delay: options.delay || 0,
            endDelay: options.endDelay || 0,
            iterations: options.iterations || 1,
            direction: options.direction || 'normal',
            ...options,
            onComplete: (element) => {
              if(options.onComplete) options.onComplete(element);
              resolve();
            }
          },
          type: 'to'
        };
        
        if (!this.currentAnimation) {
          this._runAnimation(animation);
        } else {
          this.queue.push(animation);
        }
      });
    }
  
    _parseProperties(props) {
      const parsed = {};
      for (let [key, value] of Object.entries(props)) {
        if (typeof value === 'string') {
          const unit = value.match(/[%px]+$/);
          if (unit) {
            parsed[key] = {
              value: parseFloat(value),
              unit: unit[0]
            };
          } else {
            parsed[key] = { value: value, unit: '' };
          }
        } else {
          parsed[key] = { value: value, unit: key === 'scale' ? '' : 'px' };
        }
      }
      return parsed;
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
        } else {
          const currentProps = this._getCurrentProperties(element, animation.toProps);
          keyframes = this._createKeyframes(currentProps, animation.toProps);
        }
        
        const timing = {
          duration: animation.duration,
          easing: this._getEasing(animation.options.easing),
          delay: animation.options.delay,
          endDelay: animation.options.endDelay,
          fill: animation.options.fill || 'forwards',
          iterations: animation.options.iterations,
          direction: animation.options.direction
        };
  
        try {
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
        } catch (error) {
          console.error('Animation error:', error);
        }
      });
  
      try {
        await Promise.all(promises);
        this.currentAnimation = null;
        if (this.queue.length > 0) {
          const nextAnimation = this.queue.shift();
          await this._runAnimation(nextAnimation);
        }
      } catch (error) {
        console.error('Animation sequence error:', error);
        this.currentAnimation = null;
      }
    }
  
    _getEasing(easing) {
        const easingMap = {
            linear: 'linear',
            easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
            easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
            elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            bounce: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
            easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        };
    
        if (typeof easing === 'function') {
            return 'ease-out';
        }
        if (easingMap[easing]) {
            return easingMap[easing];
        }
        if (easing.startsWith('cubic-bezier')) {
            return easing;
        }
        return 'ease';
    }
  
    _getCurrentProperties(element, toProps) {
      const computedStyle = window.getComputedStyle(element);
      const currentProps = {};
  
      for (let prop in toProps) {
        if (prop === 'x' || prop === 'y') {
          const transform = new DOMMatrix(computedStyle.transform);
          currentProps.x = { value: transform.e || 0, unit: 'px' };
          currentProps.y = { value: transform.f || 0, unit: 'px' };
        } else {
          let value = computedStyle[prop];
          const unit = value?.match(/[%px]+$/) || ['px'];
          currentProps[prop] = {
            value: parseFloat(value) || 0,
            unit: unit[0]
          };
        }
      }
      return currentProps;
    }
  
    _createKeyframes(fromProps, toProps) {
      const transformProps = ['x', 'y', 'rotation', 'scale'];
      const frames = [
        this._createFrame(fromProps, transformProps),
        this._createFrame(toProps, transformProps)
      ];
      return frames;
    }
  
    _createFrame(props, transformProps) {
      const frame = {};
      const transforms = [];
  
      for (let [prop, data] of Object.entries(props)) {
        if (transformProps.includes(prop)) {
          switch(prop) {
            case 'x':
              transforms.push(`translateX(${data.value}${data.unit})`);
              break;
            case 'y':
              transforms.push(`translateY(${data.value}${data.unit})`);
              break;
            case 'rotation':
              transforms.push(`rotate(${data.value}deg)`);
              break;
            case 'scale':
              transforms.push(`scale(${data.value})`);
              break;
          }
        } else {
          frame[prop] = `${data.value}${data.unit}`;
        }
      }
  
      if (transforms.length) {
        frame.transform = transforms.join(' ');
      }
  
      return frame;
    }
  
    stagger(selector, duration, props, staggerTime = 50, options = {}) {
      const elements = document.querySelectorAll(selector);
      const promises = Array.from(elements).map((el, i) => {
        return this.to(el, duration, props, {
          ...options,
          delay: (options.delay || 0) + (i * staggerTime)
        });
      });
      return Promise.all(promises);
    }
  
    async sequence(animations) {
      for (const [selector, duration, props, options] of animations) {
        await this.to(selector, duration, props, options);
      }
      return this;
    }
  
    async parallel(animations) {
      const promises = animations.map(([selector, duration, props, options]) => 
        this.to(selector, duration, props, options)
      );
      await Promise.all(promises);
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
            direction: this.currentAnimation.options.direction === 'reverse' ? 'normal' : 'reverse'
          },
          type: 'fromTo'
        };
        this.queue.push(reverseAnimation);
      }
      return this;
    }
  
    play(selector) {
      this._getAnimations(selector).forEach(anim => anim.play());
      return this;
    }
  
    pause(selector) {
      this._getAnimations(selector).forEach(anim => anim.pause());
      return this;
    }
  
    finish(selector) {
      this._getAnimations(selector).forEach(anim => anim.finish());
      return this;
    }
  
    loop(selector, duration, props, options = {}) {
      return this.to(selector, duration, props, {
        ...options,
        iterations: Infinity,
        direction: options.direction || 'alternate'
      });
    }
  
    _getAnimations(selector) {
      if (!selector) return Array.from(this.animations.values());
      const elements = typeof selector === 'string'
        ? document.querySelectorAll(selector)
        : [selector];
      return Array.from(elements).map(el => this.animations.get(el)).filter(Boolean);
    }
  }
  
  const quark = new QuarkFX();
  export default quark;