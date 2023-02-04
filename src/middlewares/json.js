
export async function json(req, res) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    const buffersHandled = Buffer.concat(buffers).toString();
    req.body = JSON.parse(buffersHandled)
  } catch (err) {
    req.body = null;
  }

  res.setHeader('Content-Type', 'application/json')
}