import axios from "axios";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import Resume from "../models/resume.model.js";
import User from "../models/user.model.js";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

// ---------------------- DOWNLOAD RESUME ----------------------
export const downloadResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, status: 404, message: "Resume not found" });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(resume.html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${
        resume.title || "resume"
      }.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error("Download Resume Error:", err);
    res
      .status(500)
      .json({
        success: false,
        status: 500,
        message: "Failed to download resume",
      });
  }
};

// ---------------------- CLEAN GEMINI RESPONSE ----------------------
const cleanGeminiHTML = (raw) => {
  return raw
    .replace(/```json|```/g, "")

    .replace(/```html|```/g, "")
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\")
    .replace(/></g, ">\n<")
    .trim();
};

// // ---------------------- GENERATE RESUME FROM PARAGRAPH ----------------------
export const GenerateResume = async (req, res) => {
  const { data: userParagraph } = req.body;

  if (!userParagraph || typeof userParagraph !== "string") {
    return res.status(400).json({ error: "A valid paragraph is required" });
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

  const ai = new GoogleGenAI({ apiKey: process.env.Gemini_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: finalPrompt,
    });

    if (!response || !response.text) {
      return res.status(500).json({ error: "Invalid AI response" });
    }

    const cleanedResume = cleanGeminiHTML(response.text);
    res.json({ resume: cleanedResume });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "Failed to generate resume from paragraph" });
  }
};

// ---------------------- GET USER RESUMES ----------------------
export const getUserResumes = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("resumes");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
 


    res.status(200).json({ success: true, resumes: user.resumes });
  } catch (err) {
    console.error("Get Resumes Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch resumes" });
  }
};


// export const getUserResumes = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId).populate({
//       path: "resumes",
//       options: { sort: { createdAt: -1 }, limit: 1 }, // Sort by latest and limit to 1
//     });

//     if (!user)
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });

//     const latestResume = user.resumes[0];

//     if (!latestResume)
//       return res
//         .status(404)
//         .json({ success: false, message: "No resume found for user" });

//     res.status(200).json({ success: true, resume: latestResume });
//   } catch (err) {
//     console.error("Get Resumes Error:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch resumes" });
//   }
// };

export const saveResume = async (req, res) => {
  try {
    const { userId, resumeHTML, title } = req.body;
    console.log("Received Data:", req.body);

    // Validation: Ensure both userId and resumeHtml are provided
    if (!userId || !resumeHTML) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Missing required fields (userId or resumeHtml)",
        data: null,
      });
    }

    // Find user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    // 1. Save the resume in the Resume collection
    const newResume = new Resume({
      user: userId,
      html: resumeHTML.trim(),
      title: title || "Untitled Resume",
    });
    await newResume.save();
    user.resumes.push(newResume._id);
    await user.save(); // Save the user after updating resumes

    // 2. Extract structured data using Gemini AI
    const GEMINI_API_KEY = process.env.Gemini_API_KEY;
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // Prepare the prompt to extract structured data from HTML
    const finalPrompt = `
      You are a data extraction AI. The following is an HTML resume. Extract and return ONLY the following fields from it:

      - firstName
      - lastName
      - education (as an array if multiple entries)
      - skills (as an array)
      - contact (email or phone)
      - experience (as an array of roles or companies)

      Return the result in strict JSON format. Do NOT include explanation or extra text.

      HTML Resume:
      ${resumeHTML}
    `;

    // Call the Gemini AI API to extract the structured data
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: finalPrompt,
    });

    let extractedJson;
    try {
      const rawResume = aiResponse.text;
      const cleanedResume = cleanGeminiHTML(rawResume);
      console.log("clean rewsume", cleanedResume);

      extractedJson = JSON.parse(cleanedResume);

      console.log("extreacted json", extractedJson);
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Error parsing structured resume data",
        data: parseError.message,
      });
    }

    // 3. Update the user profile with the extracted data
    user.FirstName = extractedJson.firstName || user.FirstName;
    user.LastName = extractedJson.lastName || user.LastName;
    user.Skills = Array.isArray(extractedJson.skills)
      ? extractedJson.skills
      : [];
    user.Education = Array.isArray(extractedJson.education)
      ? extractedJson.education
      : [];
    user.Experience = Array.isArray(extractedJson.experience)
      ? extractedJson.experience
      : [];
    user.Phone = extractedJson.contact || user.contact;

    await user.save(); // Save the user with the updated data

    // 4. Final response with the saved resume and extracted fields
    res.status(201).json({
      success: true,
      status: 201,
      message: "Resume saved and user profile updated",
      data: {
        resumeId: newResume._id,
        userId: user._id,
        extractedFields: extractedJson,
      },
    });
  } catch (err) {
    console.error("Save Resume Error:", err);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to save resume",
      data: err.message,
    });
  }
};
