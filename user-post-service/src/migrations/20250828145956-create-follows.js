'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('follows', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      followerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',   // name of the users table
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      followingId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      }
    });

    // Unique constraint to prevent duplicate follows
    await queryInterface.addConstraint('follows', {
      fields: ['followerId', 'followingId'],
      type: 'unique',
      name: 'unique_follower_following'
    });

    // Indexes for faster queries
    await queryInterface.addIndex('follows', ['followerId'], { name: 'idx_follower' });
    await queryInterface.addIndex('follows', ['followingId'], { name: 'idx_following' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('follows');
  }
};
