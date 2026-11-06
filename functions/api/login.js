if (!username || !password) {
  return Response.json(
    { error: "Username and password required" },
    { status: 400 }
  );
}

const user = await env.DB.prepare(
  "SELECT id, username, password_hash, role FROM users WHERE username = ?"
)
  .bind(username)
  .first();

if (!user || user.password_hash !== password) {
  return Response.json(
    { error: "Invalid username or password" },
    { status: 401 }
  );
}

return Response.json({
  success: true,
  user: {
    id: user.id,
    username: user.username,
    role: user.role
  }
});
