import quark from 'https://cdn.jsdelivr.net/npm/quarkfx@1.0.0/dist/index.esm.js';


const anim1 = new quark();
const anim2 = new quark();
//export default anim;

anim1.fromTo('#target1', 5000,
  { x: 0, y:0, rotation: 0, opacity: 1 },
  { x: 1300, y: 300, rotation: 360, opacity:0.4 },
  { 
    easing: 'ease-in-out',
    onComplete: () => console.log('Animation 1 terminée')
  }
).reverse();

anim2.fromTo('#target2', 5000,
  { x: 0, rotation: 0, scale:1, opacity:1 },
  { x: 1300, rotation: 360, scale:0.2, opacity:0 },
  { 
    easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)',
    onComplete: () => console.log('Animation 2 terminée')
  }
).fromTo('#target2', 5000,
  { x: 1300, rotation: 0, scale:0.2, opacity: 0},
  { x: 0, rotation: 360, scale:1, opacity:1 },{ 
    easing: 'ease-in-out',
    onComplete: () => console.log('Animation 3 terminée')
  });