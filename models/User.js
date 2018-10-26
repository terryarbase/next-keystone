const nextnode = require('next-nodecms');
const moment = require('moment');
const Types = nextnode.Field.Types;
const {
    crmLockMax,
    crmLockMin,
} = require(`${global.__base}/config`);
/**
 * User Model
 * ==========
 */
const User = new nextnode.List('User', {
    track: true,
    history: true,
    searchFields: 'name, email',
    defaultColumns: 'name, role, isAdmin',
});

// format should be 'DD-MMM-YYYY h:mm a'
User.add(
    {
        name: { type: Types.Text, required: true, index: true, label: 'Login Name' },
        role: { type: Types.Relationship, ref: 'Role', initial: true},
        email: {
            type: Types.Email,
            initial: true,
            required: true,
            index: true
        },
        lastLoginAt: { type: Types.Datetime },
        password: { type: Types.Password, initial: true, required: true },
        incorrectPassword: {type: Types.Number, default: 0, note: 'Please reset to 0 count if you want to unlock the user manually.' }, // if 5, update lockedAt 
        lockedAt: { type: Types.Datetime, noedit: true }, // After 24 hours, auto unlock (reset incorrectCount and lockedAt)
    },
    'Permissions',
    {
        isAdmin: { type: Boolean, label: 'Can access Keystone', default: false, index: true, initial: true }
    }
);

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function isAdmin() {
    return this.isAdmin;
});

User.schema.pre('save', function(next) {
    const UserModel = User.model;
    (async () => {
        try{
            const oldUser = await UserModel.findOne({ email: this.email });
            // console.log('Old', oldUser);
            // console.log('New', this);
            const maxCount = crmLockMax || 5;
            // have not lock
            if (oldUser) {
                if (this.incorrectPassword >= maxCount && this.isAdmin) {
                    console.log('>>>>> Lock It:', this.incorrectPassword);
                    this.isAdmin = false;
                    this.lockedAt = moment().toDate();
                // loacked before
                } else if (!this.isAdmin && this.lockedAt) {
                    const now = moment();
                    const lockedTime = crmLockMin || 5;
                    const unLockTime = moment(this.lockedAt).add(lockedTime, 'minutes');
                    console.log('>>>>> Locked diff:', unLockTime.toString(), now.toString());
                    // unlock the account
                    if (now.isSameOrAfter(unLockTime)) {
                        console.log('>>>>> Unlocked:', this.email);
                        this.lockedAt = null;
                        this.isAdmin = true;
                        this.incorrectPassword = 0;
                    }
                // unlock isAdmin manually
                } else if (!oldUser.isAdmin && this.isAdmin) {
                    console.log('>>>>> Unlocked manually:', this.email);
                    this.lockedAt = null;
                    this.incorrectPassword = 0;
                // lock isAdmin manually
                } else if (oldUser.isAdmin && !this.isAdmin) {
                    console.log('>>>>> Locked manually:', this.email);
                    this.lockedAt = moment().toDate();
                }
            }
            next();
        } catch (err) {
            next(new Error(err));
        }
        
    })();
    
});

/**
 * Registration
 */
User.register();

module.exports = User;
