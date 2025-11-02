class UserResponseDTO {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.role = user.role;
    this.avatarUrl = user.avatarUrl;
    this.bio = user.bio;
    this.contactNumber = user.contactNumber;
    this.isVerified = user.isVerified;
    this.profileCompleted = user.profileCompleted;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.lastLoginAt = user.lastLoginAt;
    this.followers= user.followers,
    this.following = user.following
  }
}

module.exports = UserResponseDTO;
