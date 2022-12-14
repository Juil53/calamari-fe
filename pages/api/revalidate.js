export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({ error: 'invalid method' })
    }

    const body = req.body;
    if (!body) {
      res.status(400).send("Bad request no body");
      return;
    }

    const slugToRevalidate = body.id;
    if (slugToRevalidate) {
      await res.revalidate(`/configuration/flow/${slugToRevalidate}`)
      return res.json({ revalidated: true })
    }
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}