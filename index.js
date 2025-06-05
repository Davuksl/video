const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 3000
const videoDir = path.join(__dirname, 'vd')

app.get('/video.mp4', (req, res) => {
  const files = fs.readdirSync(videoDir).filter(f => f.endsWith('.mp4'))
  if (!files.length) return res.status(404).send('No videos found')
  const file = files[Math.floor(Math.random() * files.length)]
  const filePath = path.join(videoDir, file)
  const stat = fs.statSync(filePath)

  res.setHeader('Content-Type', 'video/mp4')
  res.setHeader('Content-Length', stat.size)
  res.setHeader('Last-Modified', new Date().toUTCString())
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Content-Disposition', 'inline; filename="video.mp4"')

  const stream = fs.createReadStream(filePath)
  stream.pipe(res)
})

app.listen(port)