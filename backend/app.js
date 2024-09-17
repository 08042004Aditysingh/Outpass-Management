// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Leave = require('./leave.js')
const Outpass = require('./outpass.js')
const WardenL = require('./wardenl.js')
const JointDirectorL = require('./jointdirectorl.js')
const HodL = require('./hodl.js')
const HodOp = require('./hodop.js')
const WardenOp = require('./wardenop.js')
const JointDirectorOp = require('./jointdirectorop.js')
const postmark = require('postmark');
const Login = require('./login.js');
const CouncellorL = require('./councellor.js');
const CouncellorOp = require('./councellorop.js');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
}));

mongoose.connect('mongodb+srv://aditya:aditya@restro-dine-tech.js3ftyl.mongodb.net/outpass-leave', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//POST routes
const client = new postmark.ServerClient('176392c2-4cbd-48e6-a76f-5796faa8257c');



app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email.endsWith('@aitpune.edu.in')) {
    return res.status(400).json({ message: 'Invalid email domain' });
  }

  try {
    await Login.create({ email, password });
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.get('/login', async (req, res) => {
  const data = await Login.find();
  res.json(data)
})

// Route to send an email
app.post('/send-email', (req, res) => {
  const { recipientEmail, subject, messageBody } = req.body;

  // Sending an email using Postmark
  client.sendEmail({
    From: 'adityasingh_22183@aitpune.edu.in',
    To: recipientEmail,
    Subject: subject,
    TextBody: messageBody,
  }, (err, result) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).json({ message: 'Error sending email' });
    }

    console.log('Email sent successfully:', result);
    return res.status(200).json({ message: 'Email sent successfully' });
  });
});

app.post('/councellorl',async(req,res)=>{
  await CouncellorL.create(req.body)
  .then((user)=>{res.status(200).json(user)})
  .catch((err)=>{res.status(400).json(err)})
})

app.post('/councellorop',async(req,res)=>{
  await CouncellorOp.create(req.body)
  .then((user)=>{res.status(200).json(user)})
  .catch((err)=>{res.status(400).json(err)})
})

app.post('/leave',async(req,res)=>{

  await Leave.create(req.body)
  .then((user)=>{res.status(200).json(user)})
  .catch((err)=>{res.status(400).json(err)})

 
})

app.post('/outpass',async(req,res)=>{
  await Outpass.create(req.body)
  .then((user)=>{res.status(200).json(user)})
  .catch((err)=>{res.status(400).json(err)})
  
  
})

app.post('/hodl', async (req, res) => {
  await HodL.create(req.body)
  .then((user)=>{res.status(200).json(user)})
  .catch((err)=>{res.status(400).json(err)})
  
});

app.post('/hodop', async (req, res) => {
  await HodOp.create(req.body)
  .then((user)=>{res.status(200).json(user)})
  .catch((err)=>{res.status(400).json(err)})
  
});

app.post('/wardenl', async (req, res) => {
  await WardenL.create(req.body)
  .then((user)=>{res.status(200).json(user)})
  .catch((err)=>{res.status(400).json(err)})
  
});


app.post('/wardenop', async (req, res) => {
  await WardenOp.create(req.body)
  .then((user)=>{res.status(200).json(user)})
  .catch((err)=>{res.status(400).json(err)})
  
});

app.post('/jointdirectorl', async (req, res) => {
  await JointDirectorL.create(req.body)
  .then((user)=>{res.status(200).json(user)})
  .catch((err)=>{res.status(400).json(err)})
  
});

app.post('/jointdirectorop', async (req, res) => {
  await JointDirectorOp.create(req.body)
  .then((user)=>{res.status(200).json(user)})
  .catch((err)=>{res.status(400).json(err)})
 
});


//GET routes
app.get('/outpass',async(req,res)=>{
  try {
    const outpassData = await Outpass.find();
    res.json(outpassData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving outpass data' });
  }

});

app.get('/leave', async (req, res) => {
  try {
    const leaveData = await Leave.find();
    res.json(leaveData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving leave data' });
  }
});

app.get('/councellorl', async (req, res) => {
  try {
    const leaveData = await CouncellorL.find();
    res.json(leaveData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving leave data' });
  }
})

app.get('/councellorop', async (req, res) => {
  try {
    const outpass = await CouncellorOp.find();
    res.json(outpass);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving leave data' });
  }
})

app.get('/hodl', async (req, res) => {
  try {
    const hodData = await HodL.find();
    res.json(hodData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hod data' });
  }
});

app.get('/hodop', async (req, res) => {
  try {
    const hodData = await HodOp.find();
    res.json(hodData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hod data' });
  }
});
app.get('/wardenl', async (req, res) => {
  try {
    const hodData = await WardenL.find();
    res.json(hodData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hod data' });
  }
});
app.get('/wardenop', async (req, res) => {
  try {
    const hodData = await WardenOp.find();
    res.json(hodData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hod data' });
  }
});
app.get('/jointdirectorl', async (req, res) => {
  try {
    const hodData = await JointDirectorL.find();
    res.json(hodData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hod data' });
  }
});
app.get('/jointdirectorop', async (req, res) => {
  try {
    const hodData = await JointDirectorOp.find();
    res.json(hodData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hod data' });
  }
});

//PUT requests

app.put('/leave/:id',async(req,res)=>{
  const {id} = req.params;
 const updated= await Leave.findByIdAndUpdate(id,req.body)
 if(!updated){
    res.status(400).json({message:'error updating'})
    console.log('error updating')
 }
  
}
)
app.put('/outpass/:id',async(req,res)=>{
  const {id} = req.params;
 const updated= await Outpass.findByIdAndUpdate(id,req.body)
 if(!updated){
    res.status(400).json({message:'error updating'})
    console.log('error updating')
 }
  
}
)
//DELETE requests

app.delete('/jointdirectorop/:id',async(req,res)=>{
  const {id} = req.params;
  await JointDirectorOp.findByIdAndDelete(id);
  console.log(req.body)
}
)

app.delete('/jointdirectorl/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Attempt to delete the entry with the given ID
    const deletedEntry = await JointDirectorL.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Respond to the client with a success message
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/jointdirectorop/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Attempt to delete the entry with the given ID
    const deletedEntry = await JointDirectorOp.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Respond to the client with a success message
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/jointdirectorl/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Attempt to delete the entry with the given ID
    const deletedEntry = await JointDirectorL.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Respond to the client with a success message
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/wardenl/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Attempt to delete the entry with the given ID
    const deletedEntry = await WardenL.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Respond to the client with a success message
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/wardenop/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Attempt to delete the entry with the given ID
    const deletedEntry = await WardenOp.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Respond to the client with a success message
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/hodl/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Attempt to delete the entry with the given ID
    const deletedEntry = await HodL.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Respond to the client with a success message
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/hodop/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Attempt to delete the entry with the given ID
    const deletedEntry = await HodOp.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Respond to the client with a success message
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/councellorl/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Attempt to delete the entry with the given ID
    const deletedEntry = await CouncellorL.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Respond to the client with a success message
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

app.delete('/councellorop/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Attempt to delete the entry with the given ID
    const deletedEntry = await CouncellorOp.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Respond to the client with a success message
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

// Start the server


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


    //mongodb+srv://aditya:aditya@restro-dine-tech.js3ftyl.mongodb.net/
    