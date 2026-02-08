export default async function handler(req, res) {
  const files = {
    "app.apk": "https://server1.com/files/myassistant.apk",
    "update.apk": "https://server2.com/files/update.apk"
  };

  const { file } = req.query;

  if (!files[file]) {
    return res.status(404).send("Not found");
  }

  const response = await fetch(files[file]);

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="${file}"`);

  response.body.pipe(res);
}
