import contactDAO from "../dao/dao.contact.js";


class ContactRepository {

    async saveContact(contactData) {
        return await contactDAO.createContact(contactData);
    }

    async findAllContacts() {
        return await contactDAO.getAllContacts();
    }

    async findContactById(id) {
        return await contactDAO.getContactById(id);
    }
}
const contacRepository = new ContactRepository()
export default contacRepository