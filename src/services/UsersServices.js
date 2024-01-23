import { UserMongo } from "../dao/UserMongo.js";

class UsersService {
    constructor(dao){
        this.dao = new dao();
    }

    async login(email, password){
        return await this.dao.login(email, password);
    }

    async register(first_name, last_name, email, age, password){
        return await this.dao.register(first_name, last_name, email, age, password);
    }

    async findUserById(id){
        return await this.dao.findUserById(id);
    }

    async updatePassword(email, newPassword){
        return await this.dao.updatePassword(email, newPassword);
    }

    async uploadProfile(id, file){
        return await this.dao.uploadProfile(id, file);
    }

    async uploadDocuments(id, files){
        return await this.dao.uploadDocuments(id, files);
    }

    async premium(id){
        return await this.dao.premium(id);
    }

    async deleteDocument(id, filename){
        return await this.dao.deleteDocument(id, filename);
    }

    async getAllUsers(){
        return await this.dao.getAllUsers();
    }

    async deleteUsers(){
        return await this.dao.deleteUsers();
    }

    async changeRole(id, newRole){
        return await this.dao.changeRole(id, newRole);
    }

    async deleteUser(id){
        return await this.dao.deleteUser(id);
    }

}

export const usersService = new UsersService(UserMongo);