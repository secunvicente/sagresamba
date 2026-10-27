(function(){
var R=matchMedia('(prefers-reduced-motion: reduce)').matches;
var SVG='<div class="m-in"><svg viewBox="0 0 120 175" aria-hidden="true">'+
'<g class="leg ll"><path d="M50 132 L46 164" stroke="#1f1712" stroke-width="7" stroke-linecap="round"/><ellipse cx="43" cy="166" rx="9" ry="5" fill="#1f1712"/></g>'+
'<g class="leg lr"><path d="M70 132 L74 164" stroke="#1f1712" stroke-width="7" stroke-linecap="round"/><ellipse cx="77" cy="166" rx="9" ry="5" fill="#1f1712"/></g>'+
'<path d="M36 100 Q60 90 84 100 L86 136 Q60 142 34 136 Z" fill="#d92f2a" stroke="#1f1712" stroke-width="3"/>'+
'<path d="M44 100 L56 136 M76 100 L64 136" stroke="#1f1712" stroke-width="3"/>'+
'<image class="head" href="cara-mascota.svg?v=4" x="26" y="-4" width="68" height="99"/>'+'<g class="drum"><path d="M36 108 L84 108 L84 134 Q60 140 36 134 Z" fill="#f5c400" stroke="#1f1712" stroke-width="3"/>'+
'<path d="M36 110 L48 132 L60 110 L72 132 L84 110" fill="none" stroke="#1f9a4b" stroke-width="2.5"/>'+
'<ellipse cx="60" cy="108" rx="24" ry="6" fill="#f4efe6" stroke="#1f1712" stroke-width="3"/></g>'+
'<g class="arm al"><path d="M38 104 Q28 112 42 104" stroke="#d92f2a" stroke-width="0"/><path d="M37 103 L30 96" stroke="#efc09e" stroke-width="6" stroke-linecap="round"/><path d="M30 96 L52 104" stroke="#7a4a22" stroke-width="3" stroke-linecap="round"/></g>'+
'<g class="arm ar"><path d="M83 103 L90 96" stroke="#efc09e" stroke-width="6" stroke-linecap="round"/><path d="M90 96 L68 104" stroke="#7a4a22" stroke-width="3" stroke-linecap="round"/></g>'+
'<g class="sleepy"><path d="M43.3 32.6 L55.5 32.6 L55.5 39.6 Q49.4 41.6 43.3 39.6 Z" fill="#eebc9a"/><path d="M43.3 39.6 Q49.4 41.6 55.5 39.6" fill="none" stroke="#1f1712" stroke-width="1.4" stroke-linecap="round"/>'+
'<path d="M65.3 34.8 L77.9 34.8 L77.9 40.4 Q71.6 41.9 65.3 40.4 Z" fill="#e2a888"/><path d="M65.3 40.4 Q71.6 41.9 77.9 40.4" fill="none" stroke="#1f1712" stroke-width="1.4" stroke-linecap="round"/>'+
'<g class="cig"><rect x="60" y="63.6" width="15" height="3" rx="1" fill="#fbf7f2" stroke="#1f1712" stroke-width=".9"/><rect x="60" y="63.6" width="4.5" height="3" fill="#d9a35b" stroke="#1f1712" stroke-width=".9"/><rect x="75" y="63.6" width="2.6" height="3" fill="#ff6a1f"/></g>'+
'<circle class="puff p1" cx="79" cy="61" r="4.5" fill="#f1eee9"/><circle class="puff p2" cx="79" cy="61" r="4.5" fill="#ffffff"/><circle class="puff p3" cx="79" cy="61" r="4.5" fill="#d9d5cf"/></g>'+
'<path class="hit" d="M60 -2 C80 -2 89 18 89 46 C89 70 85 88 87 100 L89 140 L82 172 L38 172 L31 140 L33 100 C35 88 31 70 31 46 C31 18 40 -2 60 -2 Z" fill="transparent"/>'+
'</svg><div class="zzz"><i>z</i><i>z</i><i>Z</i></div></div>';
var mob=innerWidth<600;
// anclados a elementos
var roles=mob?[['drum','.hero','br'],['sit','#coros h2','title']]:[['drum','.hero','br'],['peek','#ritmes .grid','right'],['sit','#coros h2','title'],['peek','.tip','left']];
roles.forEach(function(r,i){
 var host=document.querySelector(r[1]);if(!host)return;
 if(getComputedStyle(host).position==='static')host.style.position='relative';
 var m=document.createElement('div');m.className='mascota m-'+r[0]+' at-'+r[2];m.innerHTML=SVG;
 m.style.setProperty('--d',(i*0.17)+'s');host.appendChild(m);
});
// capa a lo largo de toda la página: [tipo, top %, duración s, retraso s]
var free=mob?[['walk',22,20,-3],['edgeL',40,6,-1],['walk2',55,24,-11],['edgeR',72,7,-4],['walk',88,18,-8]]
 :[['walk',18,24,-2],['edgeR',28,6,-1],['walk2',38,30,-14],['edgeL',47,7,-3],['walk',58,26,-9],['edgeR',68,6.5,-2],['walk2',78,22,-6],['edgeL',88,8,-5]];
document.body.style.position='relative';
var L=document.createElement('div');L.className='m-layer';document.body.appendChild(L);
free.forEach(function(f,i){
 var m=document.createElement('div');m.className='mascota m-'+f[0]+(f[0].indexOf('walk')===0?' at-lane':'');
 m.innerHTML=SVG;m.style.top=f[1]+'%';
 m.style.animationDuration=f[2]+'s';m.style.animationDelay=f[3]+'s';
 m.style.setProperty('--d',(-(i*0.11+0.05))+'s');L.appendChild(m);
});
if(R)document.documentElement.classList.add('m-still');
// --- reacciones al tocar ---
var COL=['#f5c400','#1f9a4b','#d92f2a'],WORDS=['¡BOOM!','¡POP!','¡PAM!'];
function rnd(a,b){return a+Math.random()*(b-a)}
function done(m,ms,fn){setTimeout(function(){if(fn)fn();m.classList.remove('m-busy','m-run','m-fuma');m.style.animationPlayState='';delete m.dataset.busy},ms)}
function explota(m,inn){
 var b=document.createElement('div');b.className='m-burst';
 var fl=document.createElement('span');fl.className='m-flash';b.appendChild(fl);
 if(!R){fl.animate([{transform:'translate(-50%,-50%) scale(.2)',opacity:1},{transform:'translate(-50%,-50%) scale(2.6)',opacity:0}],{duration:450,easing:'ease-out',fill:'forwards'});
  for(var i=0;i<26;i++){var p=document.createElement('span');p.className='m-bit'+(i%3?'':' rd');p.style.background=COL[i%3];b.appendChild(p);
   var a=Math.random()*6.283,d=rnd(45,110);
   p.animate([{transform:'translate(-50%,-50%) rotate(0)',opacity:1},{opacity:1,offset:.6},{transform:'translate(calc(-50% + '+(Math.cos(a)*d)+'px),calc(-50% + '+(Math.sin(a)*d+30)+'px)) rotate('+rnd(-540,540)+'deg)',opacity:0}],{duration:rnd(700,1100),easing:'cubic-bezier(.15,.7,.3,1)',fill:'forwards'})}}
 var w=document.createElement('b');w.className='m-word';w.textContent=WORDS[Math.random()*3|0];b.appendChild(w);
 w.animate(R?[{opacity:1},{opacity:1,offset:.7},{opacity:0}]:[{transform:'translate(-50%,-50%) scale(.2) rotate(-12deg)',opacity:1},{transform:'translate(-50%,-50%) scale(1.35) rotate(-8deg)',opacity:1,offset:.25},{transform:'translate(-50%,-60%) scale(1) rotate(-8deg)',opacity:1,offset:.7},{transform:'translate(-50%,-80%) scale(1) rotate(-8deg)',opacity:0}],{duration:1100,fill:'forwards'});
 m.appendChild(b);setTimeout(function(){b.remove()},1300);
 inn.animate(R?[{opacity:1},{opacity:0}]:[{transform:'none',opacity:1},{transform:'scale(1.3)',opacity:1,offset:.4},{transform:'scale(0)',opacity:0}],{duration:R?200:260,easing:'ease-in',fill:'forwards'});
 var back=rnd(4000,6000);
 setTimeout(function(){inn.animate([{transform:R?'none':'scale(.5)',opacity:0},{transform:'none',opacity:1}],{duration:600,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'forwards'})},back);
 done(m,back+650);
}
function corre(m,inn,x){
 var r=m.getBoundingClientRect(),dir=x<r.left+r.width/2?1:-1,dist=innerWidth+r.width+40;
 if(R){inn.animate([{opacity:1},{opacity:0}],{duration:250,fill:'forwards'});setTimeout(function(){inn.animate([{opacity:0},{opacity:1}],{duration:400,fill:'forwards'})},5000);done(m,5450);return}
 m.classList.add('m-run');
 inn.animate([{transform:'none'},{transform:'translate('+(-dir*6)+'px,-10px) rotate('+(-dir*6)+'deg)',offset:.15},{transform:'translateX('+(dir*dist)+'px) rotate('+(dir*12)+'deg)'}],{duration:1400,easing:'ease-in',fill:'forwards'});
 setTimeout(function(){inn.animate([{transform:'translateX('+(dir*dist)+'px) rotate('+(-dir*8)+'deg)'},{transform:'none'}],{duration:1300,easing:'ease-out',fill:'forwards'})},5000);
 done(m,6400);
}
function fuma(m,inn){
 m.classList.add('m-fuma');var t=rnd(5000,6000);
 inn.animate([{transform:'none'},{transform:R?'none':'translateY(16%) rotate(-6deg)'}],{duration:R?1:500,easing:'ease-out',fill:'forwards'});
 setTimeout(function(){inn.animate([{transform:R?'none':'translateY(16%) rotate(-6deg)'},{transform:'none'}],{duration:R?1:400,easing:'ease-out',fill:'forwards'})},t);
 done(m,t+420);
}
var KINDS=[explota,corre,fuma];
function react(m,x,k){
 if(m.dataset.busy)return;m.dataset.busy='1';m.classList.add('m-busy');m.style.animationPlayState='paused';
 var inn=m.querySelector('.m-in');inn.getAnimations().forEach(function(a){a.cancel()});(k!=null?KINDS[k]:KINDS[Math.random()*3|0])(m,inn,x);
}
document.addEventListener('pointerdown',function(e){
 var h=e.target.closest&&e.target.closest('.mascota .hit');if(!h)return;
 e.preventDefault();react(h.closest('.mascota'),e.clientX);
});
})();
