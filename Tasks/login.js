const express = require('express')
const router = express()

// create credentials
const secretAdminCredentials = { password: 'm295' }

// login
router.post('/login', function (request, response) {
  const { email, password } = request.body

  if (email && password === secretAdminCredentials.password) {
    request.session.email = email

    return response.status(200).json({ login: 'you are logged in' })
  }

  return response.status(401).json({ error: 'Wrong password!' })
})

// verification
router.get('/verify', function (req, res) {
  if (req.session.email) {
    return res.status(200).json({ login: 'you are logged in with the email ' + req.session.email })
  }

  return res.status(401).json({ error: 'You are not logged in :(' })
})

// logout
router.delete('/logout', function (req, res) {
  if (req.session.email) {
    req.session.email = null

    return res.status(204).send()
  }
})

module.exports = router
