const handlePing = (req, res) => {
    res.status(200).json({
        "message": "pong",
    });
}

export default {
    handlePing,
};
