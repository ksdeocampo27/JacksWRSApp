const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env.prod' });
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

const customerRoutes = require('./routes/customers');
const salesRoutes = require('./routes/sales');
const inventoryRoutes = require('./routes/inventory');
const expensesRoutes = require('./routes/expenses');

//database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(`✅ Connected to MongoDB Atlas [${process.env.ENVIRONMENT} environment]`);
})
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/expenses', expensesRoutes);

/* TEST CUSTOMER
const testCustomer = new Customer({
  name: "Juan Dela Cruz",
  phone: "09171234567",
  address: "San Juan, Batangas",
  birthday: new Date("1995-05-15"),
  remarks: "Frequent customer"
});

testCustomer.save()
  .then(doc => console.log("✅ Test customer saved:", doc))
  .catch(err => console.error("❌ Error saving test customer:", err));

//-- TEST SALES --
const testSale = new Sales({
    customerId: '687630de752ce52e5425090d',
    product: 'Slim Refill',
    type: 'Walk-in',
    quantity: 1,
    unitPrice: 25,
    totalAmount: 25,
    paymentMethod: 'Cash',
    status: 'Paid',
    remarks: 'First sale test'
  });

  testSale.save()
  .then(doc => console.log("✅ Test sale saved:", doc))
  .catch(err => console.error("❌ Error saving test sale:", err));
 

  //-- TEST Inventory --
  const testInventory = new Inventory({
    name: 'S001-TEST',
    status: 'Stock In',
    dateOfPurchase: new Date('2024-10-27'),
    remarks: 'TEST Stock',
    records: [
        {
            salesId: '68765cb660f0abefe0f80ea3',
            date: new Date('2025-07-15'),
            customerName: 'Juan Dela Cruz'
        }
    ]

  });

  testInventory.save()
  .then(doc => console.log("✅ Test inventory saved:", doc))
  .catch(err => console.error("❌ Error saving inventory sale:", err));


  const testExpense = new Expenses({
    date: new Date('2025-07-09'),
    description: 'Test Purchase - Slim Containers',
    category: 'Supplies',
    type: 'Inventory Purchase',
    store: 'Water Supply Co.',
    quantity: 10,
    unit: 'pcs',
    unitPrice: 150,
    amount: 1500
  });
 
  testExpense.save()
    .then(doc => console.log("✅ Test expense saved:", doc))
    .catch(err => console.error("❌ Error saving expense:", err));
  
  */

// Sample API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend API is working!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});

// Create customer
app.post('/api/customers', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});