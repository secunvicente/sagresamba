(function(){
var R=matchMedia('(prefers-reduced-motion: reduce)').matches;
var SVG='<svg viewBox="0 0 120 175" aria-hidden="true">'+
'<g class="leg ll"><path d="M50 132 L46 164" stroke="#1f1712" stroke-width="7" stroke-linecap="round"/><ellipse cx="43" cy="166" rx="9" ry="5" fill="#1f1712"/></g>'+
'<g class="leg lr"><path d="M70 132 L74 164" stroke="#1f1712" stroke-width="7" stroke-linecap="round"/><ellipse cx="77" cy="166" rx="9" ry="5" fill="#1f1712"/></g>'+
'<path d="M36 100 Q60 90 84 100 L86 136 Q60 142 34 136 Z" fill="#d92f2a" stroke="#1f1712" stroke-width="3"/>'+
'<path d="M44 100 L56 136 M76 100 L64 136" stroke="#1f1712" stroke-width="3"/>'+
'<image class="head" href="cara-mascota.svg?v=4" x="26" y="-4" width="68" height="99"/>'+'<g class="drum"><path d="M36 108 L84 108 L84 134 Q60 140 36 134 Z" fill="#f5c400" stroke="#1f1712" stroke-width="3"/>'+
'<path d="M36 110 L48 132 L60 110 L72 132 L84 110" fill="none" stroke="#1f9a4b" stroke-width="2.5"/>'+
'<ellipse cx="60" cy="108" rx="24" ry="6" fill="#f4efe6" stroke="#1f1712" stroke-width="3"/></g>'+
'<g class="arm al"><path d="M38 104 Q28 112 42 104" stroke="#d92f2a" stroke-width="0"/><path d="M37 103 L30 96" stroke="#efc09e" stroke-width="6" stroke-linecap="round"/><path d="M30 96 L52 104" stroke="#7a4a22" stroke-width="3" stroke-linecap="round"/></g>'+
'<g class="arm ar"><path d="M83 103 L90 96" stroke="#efc09e" stroke-width="6" stroke-linecap="round"/><path d="M90 96 L68 104" stroke="#7a4a22" stroke-width="3" stroke-linecap="round"/></g>'+
'</svg>';
var roles=[['walk','#ritmes','bottom'],['peek','#ritmes .grid','right'],['drum','.hero','br'],['sit','#coros h2','title'],['peek','.tip','left'],['walk2','#coros','bottom']];
var n=innerWidth<600?3:roles.length;
roles.slice(0,n).forEach(function(r,i){
 var host=document.querySelector(r[1]);if(!host)return;
 if(getComputedStyle(host).position==='static')host.style.position='relative';
 var m=document.createElement('div');m.className='mascota m-'+r[0]+' at-'+r[2];m.innerHTML=SVG;
 m.style.setProperty('--d',(i*0.13)+'s');host.appendChild(m);
});
if(R)document.documentElement.classList.add('m-still');
})();
