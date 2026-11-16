'use strict';
const form=document.querySelector('#unlock'),password=document.querySelector('#password'),error=document.querySelector('#error'),openButton=document.querySelector('#open'),music=document.querySelector('#music');
const bytes=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
async function fetchFile(path,type){const response=await fetch(path);if(!response.ok)throw new Error('Unable to load letter');return response[type]();}
function animatePoems(){
 document.querySelectorAll('.poem-link').forEach(link=>{
  const poem=document.getElementById(link.getAttribute('aria-controls')),verse=poem.querySelector('.verse'),full=verse.textContent;let started=false;
  link.addEventListener('click',event=>{
   event.preventDefault();if(started)return;started=true;poem.hidden=false;link.setAttribute('aria-expanded','true');
   if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   verse.setAttribute('aria-label',full);verse.setAttribute('role','img');
   const walker=document.createTreeWalker(verse,NodeFilter.SHOW_TEXT),runs=[];let node;
   while((node=walker.nextNode()))runs.push({node,characters:Array.from(node.textContent)});
   runs.forEach(run=>{run.node.textContent='';});let runIndex=0,index=0;
   function type(){
    while(runIndex<runs.length && index>=runs[runIndex].characters.length){runIndex++;index=0;}
    if(runIndex>=runs.length)return;
    const run=runs[runIndex],character=run.characters[index++];run.node.textContent+=character;
    setTimeout(type,/[,;:.!?\n]/.test(character)?150:36);
   }
   type();
  });
 });
}
form.addEventListener('submit',async event=>{
 event.preventDefault();openButton.disabled=true;error.textContent='Opening…';let key,payload,plain;
 try{
  if(!window.crypto?.subtle)throw new Error('HTTPS is required to unlock this letter.');
  payload=await fetchFile('letter.json','json');
  const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password.value),'PBKDF2',false,['deriveKey']);
  key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:bytes(payload.salt),iterations:600000,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['decrypt']);
  plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(payload.iv)},key,bytes(payload.data));
 }catch(err){error.textContent=err.name==='OperationError'?'Incorrect password.':'The letter couldn’t be opened. Check your connection and use HTTPS, then try again.';openButton.disabled=false;password.focus();return;}
 document.querySelector('#letter').innerHTML=new TextDecoder().decode(plain);password.value='';document.querySelector('#gate').hidden=true;document.querySelector('#content').hidden=false;animatePoems();
 // Decrypt the photograph only after the letter has been unlocked.
 fetchFile('photo.enc','arrayBuffer').then(data=>crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(payload.imageIv)},key,data)).then(photo=>{
  const url=URL.createObjectURL(new Blob([photo],{type:'image/jpeg'}));document.querySelector('#hotel-photo').src=url;window.addEventListener('pagehide',()=>URL.revokeObjectURL(url),{once:true});
 }).catch(()=>{document.querySelector('#hotel-photo').alt='The hotel photograph could not load. Please reload to try again.';});
 const play=document.querySelector('#play'),status=document.querySelector('#audio-status');
 play.addEventListener('click',()=>music.play().then(()=>{play.hidden=true;status.textContent='';}).catch(()=>{status.textContent='Use the audio controls to start playback.';}));
 status.textContent='Loading music…';
 try{
  const encrypted=await fetchFile('audio.enc','arrayBuffer');const audio=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(payload.audioIv)},key,encrypted);
  const url=URL.createObjectURL(new Blob([audio],{type:'audio/mpeg'}));music.src=url;window.addEventListener('pagehide',()=>URL.revokeObjectURL(url),{once:true});status.textContent='';
  await music.play();
 }catch{status.textContent=music.src?'Press play to start the music.':'Music could not load. Reload the page to try again.';play.hidden=!music.src;}
});
