
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const plans = [
  {
    id: 1,
    name: 'Free',
    price: 0,
    description: 'For getting started',
  },
  {
    id: 2,
    name: 'Basic',
    price: 499,
    description: 'For small businesses',
  },
  {
    id: 3,
    name: 'Premium',
    price: 999,
    description: 'For growing businesses',
  },
]

app.get('/', (req, res) => {
  res.send('B2B SaaS Backend is running!')
})

app.get('/api/plans', (req, res) => {
  res.json(plans)
})

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
