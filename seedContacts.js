const mongodb = require('./data/database'); // Asegúrate de la ruta correcta

const contactsData = [
  {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
  },
  {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      favoriteColor: 'Green',
      birthday: '1985-02-14'
  },
  {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      favoriteColor: 'Red',
      birthday: '1992-03-10'
  },
  {
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
      favoriteColor: 'Yellow',
      birthday: '1988-04-25'
  }
  // Agrega más contactos según sea necesario
];

    // Agrega más contactos según sea necesario

const seedContacts = async () => {
    try {
        // Inicializa la base de datos
        await new Promise((resolve, reject) => {
            mongodb.initDb((err, db) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(db);
                }
            });
        });

        const db = mongodb.getDatabase(); // Obtén la instancia de la base de datos
        const result = await db.collection('contacts').insertMany(contactsData);
        console.log(`${result.insertedCount} contacts were inserted.`);
    } catch (err) {
        console.error('Error seeding contacts:', err);
    }
};

seedContacts();
