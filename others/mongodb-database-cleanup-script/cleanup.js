require("dotenv").config();
const mongoose = require('mongoose');

async function cleanDatabases() {
    const databasesToClean = process.env.DATABASES_TO_CLEAN?.split(",");

    for (const database of databasesToClean) {
        try {
            const connection = await mongoose.connect(process.env.MONGO_URI.replace("/?", `/${database}?`));

            const collections = await mongoose.connection.db.listCollections().toArray();

            console.log(`Processing ${collections.length} collections in ${database}`);

            for (const collection of collections) {
                try {
                    await mongoose.connection.db.dropCollection(collection.name);

                    console.log(`Dropped Collection: ${collection.name}`);
                } catch (error) {
                    console.error(`Failed to drop collection ${collection.name}:`, error.message);
                }
            }
        } catch (error) {
            console.error(`Error processing database ${database}:`, error.message);
        } finally {
            try {
                await mongoose.disconnect();
            } catch (error) {
                console.error(`Error disconnecting from ${database}:`, error.message);
            }
        }
    }

    console.log("CLEANUP DONE");
}

if (!process.env.DATABASES_TO_CLEAN || process.env.DATABASES_TO_CLEAN === "") {
    console.log("Missing or empty DATABASES_TO_CLEAN env variable");
    return;
}

cleanDatabases();