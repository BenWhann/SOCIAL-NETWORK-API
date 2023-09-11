const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    const userDocuments = await User.insertMany(users);

    await Promise.all(thoughts.map(async (thought) => {
        const user = userDocuments[Math.floor(Math.random() * userDocuments.length)]
        const thoughtDocument = await Thought.create({
            ...thought,
            reactions: thought.reactions.map((reaction) => ({
                ...reaction,
                username: userDocuments[Math.floor(Math.random() * userDocuments.length)].username
            })),
            username: user.username
        });
        await user.updateOne({$addToSet: {thoughts: thoughtDocument._id}})
    }))

    console.info('Seeding complete');
    process.exit(0);
});