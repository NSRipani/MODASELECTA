class ContactDTO {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.email = data.email;
        this.message = data.message;
        this.date = data.date;
        this.updatedAt = data.updatedAt;
    }

    static fromEntity(contact) {
        return new ContactDTO(contact);
    }
}
export default ContactDTO

