/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */


const nextnode = require('next-nodecms');
const User = nextnode.list('User');
const Role = nextnode.list('Role');
 
module.exports = async(done) => {
    const adminRole = new Role.model({
    	name: 'Super Administrator',
    });
    await adminRole.save();

    const adminAccount = new User.model({
		name: 'Administrator',
		role: adminRole._id,
		email: 'admin@4d.com.hk',
		password: '12345678',
		isAdmin: true
	});
    await adminAccount.save();
	done();
};