const mongoose = require('mongoose');
const User = require('./models/User');
const Query = require('./models/Query');  

const mongoURI = 'mongodb+srv://ruth:chinnu77@issue-tracker.r6ey9mn.mongodb.net/?retryWrites=true&w=majority&appName=Issue-tracker';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected for seeding');

        // Seeding users 
        const users = [
            { username: 'admin', password: 'password' },
            { username: 'user1', password: 'password1' },
            { username: 'ruthesha', password: 'chinnu' },
            { username: 'greeshma', password: 'greeshma' },
            
        ];

        // Seeding queries 
        const queries = [
            {
                date: new Date().toLocaleString(),
                name: 'Ruthesha Ankeshwar ',
                department: 'Mechanical',
                type: 'technical',
                media: '',
                description: 'Computer not working',
                status: 'open'
            },
            {
                date: new Date().toLocaleString(),
                name: 'Greeshma pasala',
                department: 'Mechanical',
                type: 'administrative',
                media: '',
                description: 'Leave application issue',
                status: 'open'
            }
        ];

        User.insertMany(users)
            .then(() => {
                console.log('Users seeded');
            })
            .catch(err => {
                console.error('Error seeding users:', err);
            });

        Query.insertMany(queries)
            .then(() => {
                console.log('Queries seeded');
                mongoose.connection.close();
            })
            .catch(err => {
                console.error('Error seeding queries:', err);
                mongoose.connection.close();
            });

    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
