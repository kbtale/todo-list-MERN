import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    energyLevel: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    category: {
        type: String,
        enum: ['deep-work', 'life', 'quick-fix', 'learning', 'health'],
        default: 'life'
    },
    rejectionCount: {
        type: Number,
        default: 0
    },
    lastSuggested: {
        type: Date
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Task', taskSchema)