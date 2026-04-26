export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        console.log("Validation Error:", error.errors.map(e => e.message));
        res.status(400).json({ message: error.errors.map(error => error.message) })
    }
}