const dns = require('dns')

const reachable = (email) => {
	return new Promise((resolve, reject) => {
		const emailParts = email.split('@')

		if (emailParts.length != 2) {
			reject({ name: 'BadInputError' })
			return
		}

		dns.resolveMx(emailParts[1], (err, mx) => {
			if (err) {
				reject({ name: 'BadInputError' })
				return
			}

			mx && mx.length > 0
				? resolve(mx)
				: reject({ name: 'BadInputError' })
		})
	})
}

module.exports = reachable
