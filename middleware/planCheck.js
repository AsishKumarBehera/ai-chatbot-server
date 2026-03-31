function requirePro(req, res, next) {
  if (req.user?.plan !== 'pro') {
    return res.status(403).json({ error: 'Pro plan required', upgrade: true });
  }
  next();
}

module.exports = requirePro;