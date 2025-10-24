import { PORT } from "./config/env.js"
import app from "./app.js"

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
