const SUCCESS_MESSAGES = {
    USER_REGISTERED: "User registered successfully.",
    USER_EXIST:"Email already exists",
    LOGIN_SUCCESS: "Login successful.",
    PRODUCT_ADDED: "Product added successfully.",
    ORDER_PLACED: "Order placed successfully.",
};

const ERROR_MESSAGES = {
    USER_NOT_FOUND: "User not found.",
    INVALID_CREDENTIALS: "Invalid credentials.",
    PRODUCT_NOT_FOUND: "Product not found.",
    UNAUTHORIZED: "Unauthorized access.",
    ERROR:"Error registering user"
};

module.exports = { SUCCESS_MESSAGES, ERROR_MESSAGES };
