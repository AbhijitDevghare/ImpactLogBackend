// src/dto/UserLoginDTO.js

class UserLoginDTO {
  constructor({ email, username, password }) {
    this.email = email?.toLowerCase().trim() || null;
    this.username = username?.trim() || null;
    this.password = password;
  }

  validate() {
    const errors = [];

    // Either email or username must be provided
    if (!this.email && !this.username) {
      errors.push("Either email or username is required.");
    }

    // If email is provided, validate format
    if (this.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
      errors.push("Invalid email format.");
    }

    // If username is provided, validate format (3-50 chars, alphanumeric/_)
    if (this.username && !/^[a-zA-Z0-9_]{3,50}$/.test(this.username)) {
      errors.push("Username must be 3-50 characters, letters, numbers, or underscores only.");
    }

    // Password validation: must exist and at least 6 chars
    if (!this.password || this.password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    return errors;
  }
}

module.exports = UserLoginDTO;
