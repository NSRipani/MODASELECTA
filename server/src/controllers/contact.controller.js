import contactService from "../service/contacService.js";
import logger from "../utils/logger.js";

class ContactController {
    createContact = async (req, res, next) => {
        try {
            const saved = await contactService.handleNewContact(req.body);
            if (!saved)  {
                logger.warn('Error saving new contact');
                res.status(400).json({ error: error.message });
            }
            logger.info('New contact message saved successfully');
            res.status(201).json({ message: 'Mensaje recibido con éxito', saved });
        } catch (error) {
            logger.error('Error creating new contact');
            next(error)
        }
    };
    
    getContacts = async (req, res, next) => {
        try {
            const contacts = await contactService.listContacts();
            if (!contacts) {
                logger.warn('No contacts found');
                res.status(500).json({ error: error.message });
            }
            logger.info('Contacts retrieved successfully');
            res.status(200).json(contacts);
        } catch (error) {
            logger.error('Error retrieving contacts');
            next(error)
        }
    };
    async readIdContact(req, res, next) {
        try {
            const { id } = req.params
            const response = await contactService.getContact(id);
            if (response) {
                logger.info(`Contact with ID ${id} retrieved successfully`);
                return res.status(200).json({ message: "Contact READ", response });
            }
            logger.warn(`No contact found with ID ${id}`);
            return res.status(404).json({ message: "Contact NOT FOUND" });
        } catch (error) {
            logger.error('Error retrieving contact by ID');
            return next(error);
        }
    }
}
const contactController = new ContactController()
export default contactController
