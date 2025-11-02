// src/dto/UserSignupDTO.js

class UserSignupDTO {
  constructor({ email, password, confirmPassword, name, username, role, contactNumber, bio }) {
    this.email = email?.toLowerCase().trim();
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.name = name?.trim();
    this.username = username?.trim();
    this.role = role?.toUpperCase() || "USER"; // default role
    this.contactNumber = contactNumber?.trim();
    this.bio = bio?.trim();
  }

  validate() {
    const errors = [];

    // Name validation: 2-100 chars
    if (!this.name || this.name.length < 2 || this.name.length > 100) {
      errors.push("Name must be between 2 and 100 characters.");
    }

    // Username validation: optional, 3-50 alphanumeric/_ chars
    if (this.username && !/^[a-zA-Z0-9_]{3,50}$/.test(this.username)) {
      errors.push("Username must be 3-50 characters, letters, numbers, or underscores only.");
    }

    // Email validation
    if (!this.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
      errors.push("A valid email is required.");
    }

    // Password validation: at least 6 chars
    if (!this.password || this.password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    // Confirm password validation
    if (this.password !== this.confirmPassword) {
      errors.push("Password and confirm password do not match.");
    }

    // Role validation
    const validRoles = ["USER", "NGO", "GOVERNMENT", "ADMIN"];
    if (!validRoles.includes(this.role)) {
      errors.push(`Role must be one of: ${validRoles.join(", ")}.`);
    }

    // Contact number validation: optional, digits, +, -, space, ()
    if (this.contactNumber && !/^[0-9+\-\s()]{10,20}$/.test(this.contactNumber)) {
      errors.push("Contact number must be 10-20 characters and valid.");
    }

   
    // Bio validation: optional, max 500 chars
    if (this.bio && this.bio.length > 500) {
      errors.push("Bio cannot exceed 500 characters.");
    }

    return errors;
  }
}

module.exports = UserSignupDTO;
