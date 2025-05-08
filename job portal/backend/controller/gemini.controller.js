
import axios from 'axios';
import dotenv from 'dotenv';
import puppeteer from "puppeteer";
import User from "../models/user.model.js";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

export const downloadResume = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user || !user.resumeHtml) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(user.resumeHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("Download Resume Error:", err);
    res.status(500).json({ success: false, message: "Failed to download resume" });
  }
};



export const saveResume = async (req, res) => {
  try {
    const { userId, resumeHtml } = req.body;

    if (!userId || !resumeHtml) {
      return res.status(400).json({ success: false, message: "userId and resumeHtml are required." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.resumeHtml = resumeHtml;
    await user.save();

    res.status(200).json({ success: true, message: "Resume saved successfully" });
  } catch (err) {
    console.error("Save Resume Error:", err);
    res.status(500).json({ success: false, message: "Failed to save resume" });
  }
};



const cleanGeminiHTML = (raw) => {
  return raw
    .replace(/```html|```/g, '')      
    .replace(/\\n/g, '\n')             
    .replace(/\\"/g, '"')              
    .replace(/\\'/g, "'")              
    .replace(/\\\\/g, '\\')           
    .replace(/></g, '>\n<')            
    .trim();
};

export const GenerateResume = async (req, res) => {
  const GEMINI_API_KEY = process.env.Gemini_API_KEY;
  const { data: userParagraph } = req.body;

  if (!userParagraph || typeof userParagraph !== 'string') {
    return res.status(400).json({ error: 'A valid paragraph is required' });
  }

  const finalPrompt = `
The following is a paragraph containing a user's personal and professional details. Analyze the paragraph, extract relevant structured information such as full name, email, phone, location, experience, education, skills, projects, and certifications.

Then, based on the extracted information, generate a professional resume in clean HTML with inline CSS. The resume should be well-structured, visually appealing, and only include sections for which data is provided.

- Use a modern, minimal style. The resume should have:
  - A header with the user's name and contact details.
  - A professional summary (if applicable) placed after the location, based on the user's skills and experience, highlighting key strengths.
  - Sections must appear in this order:
    1. Professional Summary
    2. Work Experience (each role described briefly in 1–2 lines)
    3. Education
    4. Projects
    5. Skills (as bullet points)
    6. Certifications
  - Do not include placeholders or dummy data for missing fields.
  - Output only the final HTML code with inline CSS.

Here is the paragraph to analyze:
"""       

${userParagraph}
"""`;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  try {
 

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: finalPrompt,
    });
    console.log(response.text);

    const rawResume = response.text;
    const cleanedResume = cleanGeminiHTML(rawResume);

    res.json({ resume: cleanedResume });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    if (error.response) console.error('Gemini Response:', error.response.data);
    res.status(500).json({ error: 'Failed to generate resume from paragraph' });
  }
};
