# MindEase – Mental Wellness Support Chatbot

## Project Overview

MindEase is a responsive, browser-based mental wellness support chatbot
prototype. It demonstrates how a simple digital interface can encourage
self-reflection and introduce basic wellness activities.

This project is intended for educational demonstration as part of a
student software development project.

## Objectives

- Create an accessible and responsive wellness website.
- Provide a simple daily mood check-in.
- Demonstrate a predefined supportive chatbot.
- Introduce guided breathing and grounding exercises.
- Allow users to write journal and gratitude entries.
- Demonstrate browser-based storage using localStorage.

## Features

1. Mood check-in with supportive suggestions.
2. Scripted chatbot responses based on message keywords.
3. Guided breathing exercise.
4. 5–4–3–2–1 grounding activity.
5. Gratitude entry.
6. Journal with recent entries.
7. Responsive design for desktop and mobile.
8. Basic crisis-related message guidance.

## Technology Stack

- HTML5
- CSS3
- JavaScript
- Browser localStorage
- GitHub Pages for optional static hosting

## Project Structure

mindease-wellbeing-chatbot/
|
|-- index.html
|-- style.css
|-- script.js
|-- README.md

## How to Run Locally

1. Download or clone this repository.
2. Keep all four files in the same folder.
3. Open index.html in a modern web browser.
4. Try the mood check-in, chatbot, breathing activity, and journal.

You can also open the folder in Visual Studio Code and use the
Live Server extension to preview the website.

## How the Chatbot Works

The current prototype uses predefined JavaScript responses and keyword
matching. It does not connect to a live AI model, external API, or
mental health database.

To implement a genuine AI-powered chatbot, a suitable AI service would
need to be integrated through a secure backend. Secret API keys should
never be placed in public browser-side JavaScript.

## Data Storage

Journal entries are stored using the browser's localStorage feature.
They are not uploaded to a server by this prototype.

The entries remain in the current browser profile unless they are
cleared or the browser's stored site data is removed. This is not
encrypted or suitable for storing highly sensitive information.

## Safety and Limitations

MindEase is an educational prototype, not a medical device, diagnostic
tool, therapist, or emergency service.

Its responses are scripted and may not understand a person's situation.
The project must not be relied on for diagnosis or crisis intervention.

Users who are in immediate danger should contact local emergency
services or seek appropriate professional assistance.

## Future Enhancements

- Integration with a genuine AI model through a secure backend.
- Optional account authentication.
- Encrypted server-side data storage, with informed consent.
- Multilingual user interface.
- Accessibility and usability testing.
- Evaluation of chatbot response quality and safety.
- Links to verified, region-appropriate support services.

## Deployment

This static website can be hosted using GitHub Pages.

1. Create a GitHub repository named mindease-wellbeing-chatbot.
2. Upload index.html, style.css, script.js, and README.md.
3. Open the repository's Settings.
4. Select Pages.
5. Under Build and deployment, select Deploy from a branch.
6. Choose the main branch and the root folder.
7. Save and wait for deployment to finish.

GitHub will show the published website address in the Pages settings.
The website is not live until the deployment completes successfully.

## Author

Shreya Singhal Project – MindEase Mental Wellness Support Chatbot