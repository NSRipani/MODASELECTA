import ContactDTO from '../dto/contactDto.js';
import { contactSchema } from '../middleware/contact/contact.validation.js';
import contacRepository from '../repository/contacRepository.js';

class ContactService {

    async handleNewContact(data) {
        
        const { error } = contactSchema.validate(data);
        if (error) throw new Error(error.details[0].message);
        
        // Acá podrías enviar email, limpiar datos, etc.
        const createContact = await contacRepository.saveContact(data);
        if (!createContact) throw new Error ("No contact create")
        return ContactDTO.fromEntity(createContact)
    }

    async listContacts() {
        const allContact = await contacRepository.findAllContacts();
        if (!allContact) throw new Error ("No contacts found")
        return allContact.map(contact => ContactDTO.fromEntity(contact))
    }

    async getContact(id) {
        const contactId = await contacRepository.findContactById(id);
        if (!contactId) throw new Error("Contact not found");

        return ContactDTO.fromEntity(contactId);
    }
}
const contactService = new ContactService()
export default contactService