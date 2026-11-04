export async function onRequestGet({ env }) {
  if (!env.DB) return Response.json({error:"Database not configured"}, {status:503});
  const { results } = await env.DB.prepare(
    "SELECT id,type,class_no,subject,chapter,title,body,questions_json FROM resources ORDER BY created_at DESC"
  ).all();
  return Response.json(results.map(x => ({...x, questions: x.questions_json ? JSON.parse(x.questions_json) : []})), {
    headers: {"Cache-Control":"public, max-age=60"}
  });
}
export async function onRequestPost({ request, env }) {
  const auth = await isAdmin(request, env);
  if (!auth) return Response.json({error:"Unauthorized"}, {status:401});
  if (!env.DB) return Response.json({error:"Database not configured"}, {status:503});
  let d;
  try { d = await request.json(); } catch { return Response.json({error:"Invalid JSON"}, {status:400}); }
  if (!["note","qa","mcq"].includes(d.type) || !Number.isInteger(d.class_no) || d.class_no < 6 || d.class_no > 10 ||
      !d.subject || !d.chapter || !d.title || (d.type !== "mcq" && !d.body) ||
      (d.type === "mcq" && (!Array.isArray(d.questions) || !d.questions.length))) {
    return Response.json({error:"Missing or invalid fields"}, {status:400});
  }
  const id = crypto.randomUUID();
  await env.DB.prepare(`INSERT INTO resources (id,type,class_no,subject,chapter,title,body,questions_json)
    VALUES (?,?,?,?,?,?,?,?)`).bind(id,d.type,d.class_no,String(d.subject).slice(0,100),String(d.chapter).slice(0,180),
    String(d.title).slice(0,220),String(d.body||"").slice(0,30000),d.type==="mcq"?JSON.stringify(d.questions).slice(0,15000):null).run();
  return Response.json({ok:true,id},{status:201});
}
export async function onRequestDelete({ request, env, params }) {
  if (!await isAdmin(request, env)) return Response.json({error:"Unauthorized"},{status:401});
  if (!env.DB) return Response.json({error:"Database not configured"},{status:503});
  await env.DB.prepare("DELETE FROM resources WHERE id=?").bind(params.id).run();
  return Response.json({ok:true});
}
async function isAdmin(request,env){
  if(!env.ADMIN_PASSWORD || !env.SESSION_SECRET) return false;
  const cookie=request.headers.get("Cookie")||"";
  const token=cookie.split(";").map(x=>x.trim()).find(x=>x.startsWith("aarohan_session="))?.slice(16);
  if(!token)return false;
  const [payload,sig]=token.split(".");
  if(!payload||!sig)return false;
  const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(env.SESSION_SECRET),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  const mac=await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(payload));
  const expected=btoa(String.fromCharCode(...new Uint8Array(mac))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
  if(sig!==expected)return false;
  try{const data=JSON.parse(atob(payload.replace(/-/g,"+").replace(/_/g,"/")));return data.exp>Date.now()}catch{return false}
}