import { Request, Response } from "express";
import { db } from "./firebase"; // Adjust the import path if needed
const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Root endpoint to test if the server is running
app.get("/", (req: Request, res: Response) => {
  res.send({ data: "Hello, TypeScript Express!" });
  res.status(200);
});

// Firestore endpoint to fetch and display all data from "meditations" collection
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    // Fetch the "meditations" collection
    const meditationsRef = db.collection("meditations");
    const snapshot = await meditationsRef.get();

    // Check if there are any documents
    if (snapshot.empty) {
      return res.status(404).send({ message: "No data found in the collection" });
    }

    // Format the documents into a JSON response
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).send({ message: "Data retrieved successfully", data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ message: "Error fetching data"});
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

