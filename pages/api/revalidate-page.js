export default async function handler(req, res) {
  try {
    if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    const body = req.body;
    if (!body) {
      res.status(400).send("Bad request no body");
      return;
    }

    const pathToRevalidate = body.path
    await res.revalidate(`${pathToRevalidate}`)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}