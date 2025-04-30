#!/bin/bash

# Print welcome message
echo "Setting up Patient Portal project..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "Dependencies installed successfully!"
    echo ""
    echo "To run the project, you can use the following commands:"
    echo "1. Development mode: npm run dev"
    echo "2. Production build: npm run build"
    echo "3. Start production server: npm run start"
    echo ""
    echo "The development server will be available at http://localhost:3000"
else
    echo "Error: Failed to install dependencies. Please check your npm installation."
    exit 1
fi 