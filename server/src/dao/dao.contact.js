import ContactModel from './models/contacto.model.js';


class ContactDAO {
    async createContact(data) {
        return await ContactModel.create(data);
    }

    async getAllContacts() {
        return await ContactModel.find();
    }

    async getContactById(id) {
        return await ContactModel.findById(id);
    }
}
const contactDAO = new ContactDAO()
export default contactDAO