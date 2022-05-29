import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";


let mongoServer

exports.dbConnect = async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri();
    await mongoose.connect(uri,  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

};

exports.dbDisconnect = async () => {
    if (mongoServer) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    }

};

exports.dropCollections = async () => {
    if (mongoServer) {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany({});
        }
    }
};