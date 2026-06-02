export async function getDashboard(req, res) {
  return res.json({ message: "Panel de administrador", user: req.user });
}