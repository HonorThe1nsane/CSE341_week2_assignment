module.exports = (mongoose) => {
    const Person = mongoose.model(
        'person',
        mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                email: String,
                favoriteColor: String,
                birthday: String,
            },
            { timestamps: true }
        )
    );
    return Person;
};