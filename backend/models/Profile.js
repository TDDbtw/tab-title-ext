const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Profile = sequelize.define('Profile', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    follower_count: {
        type: DataTypes.STRING, // Keeping as string to handle "500+ connections" or "10k followers" formats easily initially
        allowNull: true
    },
    connection_count: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Profile;
