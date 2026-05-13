// ==========================================
// HOW TO CHANGE PRODUCT IMAGES & DETAILS:
// ==========================================
// 1. To display a custom image for any item, update its `img` property below.
//    Place your custom image files into the `public/images/` folder.
//    Example: if you add `public/images/cool-tee.jpg`, change `img: '/images/no-smoking.png'` to `img: '/images/cool-tee.jpg'`.
// 2. To change the brand tag or schematic text layout, edit the `vis` objects or update `name` / `price`.
// ==========================================

export const P = [
  { id:1,name:'NO SMOKING',price:1490,bg:'#F5F0DC',stock:'in',color:'Cream',oos:[],
    img:'/images/no-smoking.png', category:'OVERSIZED' },
  { id:2,name:'EXCLUSIVE 1',price:1990,bg:'#0A0A0A',stock:'low',color:'Black',oos:['XL'],
    img:'/images/no-smoking.png', category:'NEW DROPS' },
  { id:3,name:'AT THE TOP',price:1090,bg:'#2D2D2D',stock:'low',color:'Charcoal',oos:[],
    img:'/images/no-smoking.png', category:'CROP TOPS' },
  { id:4,name:'WATER ON THE ROCKS',price:1190,bg:'#1A3A8A',stock:'low',color:'Royal Blue',oos:['XS','S','M','L','2XL'],
    img:'/images/no-smoking.png', category:'OVERSIZED' },
  { id:5,name:'FRAGILE',price:590,bg:'#8B1A1A',stock:'low',color:'Red',oos:[],fit:'Crop Fit',
    img:'/images/no-smoking.png', category:'BABY TEES' },
  { id:6,name:'ABSOLUT',price:1490,bg:'#D4E8A0',stock:'in',color:'Lime',oos:[],
    img:'/images/no-smoking.png', category:'POLOS' },
  { id:7,name:'NEON NIGHT',price:1690,bg:'#D1FAE5',stock:'in',color:'Mint',oos:[],
    img:'/images/no-smoking.png', category:'CROP TOPS' },
  { id:8,name:'CYBER PUNK',price:2190,bg:'#FCE7F3',stock:'low',color:'Pink',oos:[],
    img:'/images/no-smoking.png', category:'BABY TEES' },
  { id:9,name:'STREET KINGS',price:1290,bg:'#FEF3C7',stock:'in',color:'Yellow',oos:[],
    img:'/images/no-smoking.png', category:'OVERSIZED' },
  { id:10,name:'VINTAGE WASH',price:1790,bg:'#E0E7FF',stock:'low',color:'Blue',oos:[],
    img:'/images/no-smoking.png', category:'POLOS' },
  { id:11,name:'GRAFFITI TEE',price:1490,bg:'#FEE2E2',stock:'in',color:'Red',oos:[],
    img:'/images/no-smoking.png', category:'NEW DROPS' },
  { id:12,name:'ACID TRIP',price:1990,bg:'#F3E8FF',stock:'in',color:'Purple',oos:[],
    img:'/images/no-smoking.png', category:'CROP TOPS' },
];

export const SZ = ['XS','S','M','L','XL','2XL'];

export const MQ = 'BEST PRICE GUARANTEE  ›  ';

export const navItems = ['NEW DROPS','CROP TOPS','BABY TEES','OVERSIZED','POLOS','SHOP ALL'];

export const qsBars = [
  ['Fabric quality','9.2',92],
  ['Print durability (10 washes)','8.8',88],
  ['Colour retention','9.0',90],
  ['Stitching strength','9.4',94],
  ['True to size accuracy','8.5',85]
];

export const washItems = [
  ['🌡','Cold wash only < 30°C'],
  ['❌','Do not tumble dry'],
  ['☀','Dry in shade, avoid direct sun'],
  ['🚫','Do not bleach'],
  ['✔','Turn inside out before wash'],
  ['🔥','Iron on low, avoid print area'],
  ['✖','No dry cleaning'],
  ['💙','Wash with similar colours only']
];
