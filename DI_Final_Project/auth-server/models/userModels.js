const {db} = require('../config/db.js');
const bcrypt = require('bcrypt');

module.exports = {
    createUser: async (userInfo) => {
        const { password, email } = userInfo;

        const trx = await db.transaction()

        try {
            /** hash the password */
            const hashPassword = await bcrypt.hash(password + '',10);
            const [user] = await trx('authusers').insert(
                {email, password: hashPassword},
                ['email','id']
            );

            await trx.commit();
        } catch (error) {
            await trx.rollback()
            console.log(error);
            throw error       
        }
    },
    getUserByEmail: async(email = '') => {
        try {
            const user = await db('authusers')
            .select('id','email','password')
            .where({email})
            .first();

            return user;
        } catch (error) {
            throw error
        }
    },
    loginUser: async (req,res) => {
        const { email, password } = req.body;

        try {
            const user = await userModel.getUserByEmail(email);

            if(!user){
                return res.status(404).json({message: 'user not found...'})
            }

            const passwordMatch = await bcrypt.compare(password+'', user.password);

            if(!passwordMatch) {
                return res.status(401).json({message: 'Authentication failed'})
            }

            res.json({
                message:'Login successfully',
                user: {userid: user.id, email: user.email},
                accessToken: '123'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'internal server error'});
        }
    },
    getUsers: async () => {
        try {
            return await db('authusers').select('id','email','password')
        } catch (error) {
            throw error
        }
    }
};