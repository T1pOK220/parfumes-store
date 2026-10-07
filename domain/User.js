class User {
    constructor(firstName, lastName, email, password, id, role = "user") {
        this.id = id ?? null;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.password = password;
        this.favouriteItmes = [];
    }
    addToFavourite({Parfume}) {
            this.favouriteItmes.push({   userId: this.id,
            parfumeId: Parfume.id})
    }
    changePassword(oldPassword, newPassword) {
        if(oldPassword==this.password)
        this.password = newPassword;
    }
    updateName(newName) {
        this.firstName = newName;
    }
    updateLastName(newLastName) {
        this.lastName = newLastName;
    }
    profile() {
        const { id, password, ...rest } = this;
        return rest;
    }
}
export default User;