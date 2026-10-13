(()=>{const track=document.getElementById('space-track');if(!track)return;const slides=[...track.querySelectorAll('.space-slide')],dialog=document.getElementById('space-viewer'),image=document.getElementById('viewer-image'),caption=document.getElementById('viewer-caption');let current=0,opener=null,oldOverflow='';const reduce=matchMedia('(prefers-reduced-motion: reduce)');function nearest(){return slides.reduce((best,s,i)=>Math.abs(s.offsetLeft-slides[0].offsetLeft-track.scrollLeft)<Math.abs(slides[best].offsetLeft-slides[0].offsetLeft-track.scrollLeft)?i:best,0)}function move(d){const n=(nearest()+d+slides.length)%slides.length;track.scrollTo({left:slides[n].offsetLeft-slides[0].offsetLeft,behavior:reduce.matches?'instant':'smooth'})}track.addEventListener('keydown',e=>{if(e.target===track&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});function show(n){current=(n+slides.length)%slides.length;const source=slides[current].querySelector('img');image.src=source.src;image.alt=source.alt;caption.textContent=source.alt}track.addEventListener('click',e=>{const b=e.target.closest('[data-photo]');if(!b||!track.contains(b))return;show(Number(b.dataset.photo));opener=b;oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal()});dialog.querySelector('.viewer-close').onclick=()=>dialog.close();dialog.querySelector('.viewer-prev').onclick=()=>show(current-1);dialog.querySelector('.viewer-next').onclick=()=>show(current+1);dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();show(current+(e.key==='ArrowRight'?1:-1))}});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;if(opener)opener.focus()});

// Duplicate the strip so the final photo flows directly into the first.
const copies=slides.map(slide=>{const copy=slide.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.querySelectorAll('button').forEach(b=>b.tabIndex=-1);copy.querySelector('img').loading='eager';track.append(copy);return copy});
let touching=false,lastTime=null,position=track.scrollLeft;
let pixelsPerSecond=38;
function cycleWidth(){return copies[0].offsetLeft-slides[0].offsetLeft}
function animate(time){
  const elapsed=lastTime===null?0:Math.min(time-lastTime,64);lastTime=time;
  if(!touching&&!document.hidden&&!dialog.open&&!reduce.matches){
    const width=cycleWidth();
    if(width>0){
      const visible=slides.reduce((current,slide)=>slide.offsetLeft-slides[0].offsetLeft<=position?slide:current,slides[0]);
      const targetSpeed=visible.classList.contains('space-landscape')?38:58;
      pixelsPerSecond+=(targetSpeed-pixelsPerSecond)*Math.min(elapsed/500,1);
      position=(position+pixelsPerSecond*elapsed/1000)%width;track.scrollLeft=position;
    }
  }else{position=track.scrollLeft}
  requestAnimationFrame(animate);
}
track.addEventListener('pointerdown',()=>{touching=true},{passive:true});
function release(){touching=false;position=track.scrollLeft;lastTime=null}
window.addEventListener('pointerup',release,{passive:true});
window.addEventListener('pointercancel',release,{passive:true});
track.addEventListener('wheel',()=>{position=track.scrollLeft},{passive:true});
track.addEventListener('keydown',()=>{position=track.scrollLeft});
document.addEventListener('visibilitychange',()=>{lastTime=null});
dialog.addEventListener('close',()=>{position=track.scrollLeft;lastTime=null});
requestAnimationFrame(animate);
})();
