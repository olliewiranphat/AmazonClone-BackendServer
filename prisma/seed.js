const { category, seller } = require("../models");

///// Product Data
module.exports.products = [
    {
        productImageURL: "https://example.com/images/laptop.jpg",
        productName: "UltraThin Laptop X1",
        description: "Powerful and lightweight laptop with a 14-inch display, Intel i7 processor, and 16GB RAM.",
        categoryName: "Electronics",
        stockQuantity: 25,
        price: 1299.99
    },
    {
        productImageURL: "https://example.com/images/smartphone.jpg",
        productName: "Smartphone Pro Max 5G",
        description: "6.7-inch OLED display, 128GB storage, and a triple-lens camera for stunning photography.",
        categoryName: "Electronics",
        stockQuantity: 50,
        price: 999.99
    },
    {
        productImageURL: "https://example.com/images/headphones.jpg",
        productName: "Wireless Noise-Canceling Headphones",
        description: "Experience immersive sound with active noise cancellation and 30-hour battery life.",
        categoryName: "Accessories",
        stockQuantity: 40,
        price: 199.99
    },
    {
        productImageURL: "https://example.com/images/fitnesswatch.jpg",
        productName: "Smart Fitness Watch",
        description: "Track your health with heart rate monitoring, sleep tracking, and GPS capabilities.",
        categoryName: "Wearables",
        stockQuantity: 60,
        price: 149.99
    },
    {
        productImageURL: "https://example.com/images/gamingmouse.jpg",
        productName: "RGB Gaming Mouse",
        description: "Ergonomic design with customizable RGB lighting and adjustable DPI for precision control.",
        categoryName: "Gaming",
        stockQuantity: 35,
        price: 79.99
    },
    {
        productImageURL: "https://example.com/images/backpack.jpg",
        productName: "Anti-Theft Laptop Backpack",
        description: "Water-resistant, USB charging port, and multiple compartments for ultimate convenience.",
        categoryName: "Bags",
        stockQuantity: 45,
        price: 59.99
    },
    {
        productImageURL: "https://example.com/images/bluetoothspeaker.jpg",
        productName: "Portable Bluetooth Speaker",
        description: "Compact and powerful sound with deep bass, 12-hour battery life, and water resistance.",
        categoryName: "Audio",
        stockQuantity: 55,
        price: 89.99
    },
    {
        productImageURL: "https://example.com/images/mechanicalkeyboard.jpg",
        productName: "Mechanical Gaming Keyboard",
        description: "RGB backlighting, customizable keys, and durable switches for the ultimate gaming experience.",
        categoryName: "Gaming",
        stockQuantity: 30,
        price: 129.99
    },
    {
        productImageURL: "https://example.com/images/externalssd.jpg",
        productName: "1TB External SSD",
        description: "Ultra-fast read/write speeds, shock-resistant design, and USB-C connectivity.",
        categoryName: "Storage",
        stockQuantity: 20,
        price: 149.99
    },
    {
        productImageURL: "https://example.com/images/airfryer.jpg",
        productName: "Digital Air Fryer",
        description: "Cook healthier meals with little to no oil, featuring adjustable temperature and presets.",
        categoryName: "Kitchen",
        stockQuantity: 40,
        price: 109.99
    }
];

