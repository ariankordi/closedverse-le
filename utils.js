const bcrypt = require('bcrypt'),
	sha256 = require('sha256'),
	base64 = require('base64-js');

module.exports = {
	// Verify bcrypt_sha256 hashes from Django
	bcrypt_sha256: {
		// These functions all have to be awaited
		verify: function(password, hash) {
			// Encoded password that is checked
			var encoded_password = base64.fromByteArray(sha256(password, {asBytes: true}));
			// Make the Python hash compatible with this
			var decoded_python_hash = hash.replace('$bcrypt-sha256$2b,', '$2a$');
			var split_hash = decoded_python_hash.split('$');
			// This is a bit confusing but works
			decoded_python_hash = split_hash[0] + '$' + split_hash[1] + '$' + split_hash[2] + '$' + split_hash[3] + split_hash[4]
			
			// Done, it's now compatible, so we can return the compare
			return bcrypt.compare(encoded_password, decoded_python_hash);
		},
		hash: async function(password) {
			// Rounds is 13
			var rounds = 13;
			// Encode password, just like if we were checking
			var encoded_password = base64.fromByteArray(sha256(password, {asBytes: true}));
			// Make the bcrypt hash
			var hash = await bcrypt.hash(encoded_password, rounds);
			// First, put a dollar sign where it's supposed to go (22 characters into AFTER the third one)
			var split_hash = hash.split('$');
			hash = split_hash[0] + '$' + split_hash[1] + '$' + split_hash[2] + '$' + split_hash[3].slice(0, 22) + '$' + split_hash[3].slice(22);
			
			// Now make the rounds format compatible and such
			hash = hash.replace('$2a$', '$bcrypt-sha256$2b,');
			return hash;
		}
	}
}