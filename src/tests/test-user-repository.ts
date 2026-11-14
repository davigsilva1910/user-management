import {UserRepository} from '../repositories/user.repository'

const consulta = new UserRepository()

async function testar() {

    const deleteUser = await consulta.deleteRegister(4)
    console.log(deleteUser)
}

testar()