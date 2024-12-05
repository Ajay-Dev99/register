const mongoose = require('mongoose')

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        courses: [
            {
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: "courses",
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = new mongoose.model('carts', cartSchema)