class User{
    constructor(id, firstName, lastName, email, role,password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.password = password;
        this.favouriteItmes = [];
    }
    addToFavourite(Parfume) {
        return {
            userId: this.id,
            parfumeId: Parfume.id
        }
        
    }
    changePassword(newPassword) {
        this.password = newPassword;
    }
    updateName(newName) {
        this.firstName = newName;
    }

    
}