function/api/login.js
export async function onRequestPost({request,env}){ if(!env.ADMIN_PASSWORD||!env.SESSION_SECRET) return Response.json({error:"Admin secrets not configured"},{status:503});
let d; try{d=await request.json()} catch{return Response.json({error:"Bad request"},{status:400})}
if(typeof d.password!=="string"||d.password!==env.ADMIN_PASSWORD) return Response.json({error:"Invalid password"},{status:401});
const payload=btoa(JSON.stringify({ exp:Date.now()+86060*1000 })).replace(/+/g,"-").replace(///g,"_").replace(/=+$/,"");
const key=await crypto.subtle.importKey( "raw",new TextEncoder().encode(env.SESSION_SECRET), {name:"HMAC",hash:"SHA-256"},false,["sign"] );
const mac=await crypto.subtle.sign( "HMAC",key,new TextEncoder().encode(payload) );
const sig=btoa(String.fromCharCode(...new Uint8Array(mac))) .replace(/+/g,"-").replace(///g,"_").replace(/=+$/,"");
return Response.json({ok:true},{ headers:{ "Set-Cookie":aarohan_session=${payload}.${sig}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800 } }); }
