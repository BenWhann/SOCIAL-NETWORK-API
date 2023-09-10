const users = [
    {
        username: 'user 1',
        email: 'user1@email.com'
    },
    {
        username: 'user 2',
        email: 'user2@email.com'
    },
    {
        username: 'user 3',
        email: 'user3@email.com'
    }
];

const thoughts = [
    {
        thoughtText: 'thought 1', 
        reactions: [
            {
                reactionBody: 'reaction 1',
            }
        ]
    },
    {
        thoughtText: 'thought 2', 
        reactions: [
            {
                reactionBody: 'reaction 2',
            }
        ]
    },
    {
        thoughtText: 'thought 3', 
        reactions: [
            {
                reactionBody: 'reaction 3',
            }
        ]
    }
];

module.exports = { users, thoughts };



