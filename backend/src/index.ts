import express from "express";
import cookieParser from "cookie-parser";            // Middleware to parse cookies from requests
import cors from "cors";                             // Middleware to enable Cross-Origin Resource Sharing
import jwt, { JwtPayload } from "jsonwebtoken";      // JWT functions and types for authentication
import path from "path";                             // Utilities for file and directory paths

const JWT_SECRET = "test123";                        // Secret key for signing JWT tokens

const app = express();
app.use(cookieParser());                             // Parse cookies in incoming requests
app.use(express.json());                             // Parse JSON request bodies
app.use(cors({                                       // Enable CORS for cross-origin requests
    credentials: true,                               // Allow credentials (cookies, headers)
    origin: "http://localhost:5173"                  // Allow requests from this origin only
}));

app.post("/signin", (req, res) => {                  // POST endpoint for user sign-in
    const email = req.body.email;
    const password = req.body.password;
    // do db validations, fetch id of user from db    // (Placeholder) Validate user and fetch user ID
    const token = jwt.sign({                         // Create JWT token with user ID
        id: 1                                        // Hardcoded user ID (for demo)
    }, JWT_SECRET);                                  // Sign token with secret
    res.cookie("token", token);                      // Set token as cookie in response
    res.send("Logged in!");                          // Respond with login success message
});

app.get("/user", (req, res) => {                     // GET endpoint to fetch user info
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload; // Verify and decode JWT token
    // Get email of the user from the database        // (Placeholder) Fetch user email from DB
    res.send({                                       // Respond with user info
        userId: decoded.id                           // Send user ID from decoded token
    })
});

app.post("/logout", (req, res) => {                  // POST endpoint for user logout
    res.cookie("token", "ads");                      // Overwrite token cookie to log out
    res.json({                                       // Respond with JSON
        message: "Logged out!"                       // Logout success message
    })
});

app.get("/", (req, res) => {                         // GET endpoint for root path
    res.sendFile(path.join(__dirname, "../src/index.html")) // Send index.html file as response
})

app.listen(3000);


