module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('card', {
        cardName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cmc: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        cardType: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        rarity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        text: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    })
    return Card;
}
