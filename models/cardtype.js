module.exports = (sequelize, DataTypes) => {
    const Cardtype = sequelize.define('cardtype', {
        type: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    })
    return Cardtype;
}