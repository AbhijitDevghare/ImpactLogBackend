'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      // 🧩 Add OTP fields
      queryInterface.addColumn('users', 'otp', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'otpExpires', {
        type: Sequelize.DATE,
        allowNull: true,
      }),

      // 🔐 Add reset password fields
      queryInterface.addColumn('users', 'resetPasswordToken', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'resetPasswordExpires', {
        type: Sequelize.DATE,
        allowNull: true,
      }),

      // 🖼️ Update avatarUrl with default value if not already set
      queryInterface.changeColumn('users', 'avatarUrl', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:
          'https://res.cloudinary.com/dorfg8nqt/image/upload/v1756380305/ImpactLogProfile/Profile/default_profile_qptrer.jpg',
        validate: { isUrl: true },
      }),

      // (Optional) store Cloudinary public_id if you want
      queryInterface.addColumn('users', 'avatarPublicId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('users', 'otp'),
      queryInterface.removeColumn('users', 'otpExpires'),
      queryInterface.removeColumn('users', 'resetPasswordToken'),
      queryInterface.removeColumn('users', 'resetPasswordExpires'),
      queryInterface.removeColumn('users', 'avatarPublicId'),

      // revert avatarUrl to nullable (old state)
      queryInterface.changeColumn('users', 'avatarUrl', {
        type: Sequelize.STRING,
        allowNull: true,
        validate: { isUrl: true },
      }),
    ]);
  },
};
