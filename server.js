const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const port = 8001
app.use(express.static(path.resolve(process.cwd(), 'dist')))
app.get('*', (req, res) => {
  const file = fs.readFileSync(path.resolve(process.cwd(), 'dist', 'index.html'))
  res.send(file.toString())
})
app.listen(port)
console.log('\x1b[32m%s\x1b[0m', `http://localhost:${port}/`)
