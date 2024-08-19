const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Utility function to read users from file
const readUsersFromFile = () => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

// Utility function to write users to file
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, userType, administration, city } = req.body;
  const users = readUsersFromFile();

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    userType,
    administration,
    city
  };

  users.push(newUser);
  writeUsersToFile(users);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', async (req, res) => {
  console.log('Login request received with body:', req.body);

  const { email, password } = req.body;
  console.log('Parsed email and password:', { email, password });

  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ message: 'Missing email or password' });
  }

  const users = readUsersFromFile();
  console.log('Users read from file:', users);

  const user = users.find(user => user.email === email);
  console.log('User found:', user);
  if (!user) {
    console.log('User not found');
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('Password valid:', isPasswordValid);
  if (!isPasswordValid) {
    console.log('Invalid password');
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  console.log('Login successful:', { user });
  res.status(200).json({ user: { name: user.name, email: user.email, userType: user.userType, administration: user.administration, city: user.city } });
});

module.exports = router;
