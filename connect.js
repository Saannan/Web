const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/ai/vai', require('./api/vai'))
app.use('/api/dl/aio', require('./api/aio'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})