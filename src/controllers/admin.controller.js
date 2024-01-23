import { usersService } from "../services/UsersServices.js";

const getUsers = async (req, res) => {
    const users = await usersService.getAllUsers();
    return res.render("users", {users});
}

const changeRole = async (req, res) => {
    const { id } = req.params;
    const { newRole } = req.body;
    try{
        await usersService.changeRole(id, newRole);
        return res.json({
            success: true,
            message: 'Role changed successfully!'
        });
    }catch(error){
        res.status(404).json({error: error.message});
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try{
        await usersService.deleteUser(id);
        return res.json({
            success: true,
            message: 'User deleted!'
        });
    }catch(error){
        res.status(404).json({error: error.message});
    }
}


export {
    getUsers,
    changeRole,
    deleteUser
};