"use strict";

// MindEase is a front-end educational prototype.
// Chat responses are predefined. No live AI service is connected.

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

$("#currentYear").textContent = new Date().getFullYear();

// -------------------- MOOD CHECK-IN --------------------

const moodSuggestions = {
  Happy: "Enjoy this moment. What is one thing you would like to remember about today?",
  Calm: "Give yourself permission to enjoy this calm moment without needing to be productive.",
  Okay: "It's okay to have an ordinary day. Choose one small thing that would make today easier.",
  Anxious: "Try slowing down for a moment. Name five things you can see and take a comfortable breath.",
  Sad: "You don't need to force yourself to feel better immediately. Consider reaching out to someone you trust.",
  Overwhelmed: "You don't have to solve everything at once. Choose just one small, manageable next step."
};

$$(".mood-option").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".mood-option").forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");

    const mood = button.dataset.mood;

    $("#moodResult").textContent =
      `You're feeling ${mood.toLowerCase()}. ${moodSuggestions[mood]}`;

    $("#journalMood").value = mood;
  });
});

// -------------------- SUPPORTIVE CHAT DEMO --------------------

const chatMessages = $("#chatMessages");
const chatForm = $("#chatForm");
const chatInput = $("#chatInput");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}-message`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getSupportResponse(input) {
  const text = input.toLowerCase();

  // These responses are educational safeguards, not clinical assessment.
  const crisisPhrases = [
    "kill myself",
    "end my life",
    "suicide",
    "hurt myself",
    "self harm",
    "self-harm",
    "don't want to live",
    "do not want to live"
  ];

  if (crisisPhrases.some((phrase) => text.includes(phrase))) {
    return "I'm sorry you're going through something so painful. This demo cannot provide crisis care, but your safety matters. If you may act on these feelings or are in immediate danger, call India's emergency number 112 or go to the nearest emergency department. If possible, contact someone you trust and ask them to stay with you. You can also check the official Tele-MANAS service at https://telemanas.mohfw.gov.in/.";
  }

  if (/\b(stress|stressed|pressure|exam|deadline|overwhelmed)\b/.test(text)) {
    return "That sounds like a lot to carry. You could pause for a minute, relax your shoulders, and identify just one task to focus on next. What is the smallest manageable step you could take?";
  }

  if (/\b(lonely|alone|isolated|nobody|no one)\b/.test(text)) {
    return "Feeling disconnected can be difficult. You deserve connection and care. Would it feel possible to message someone you trust, even with something simple like, 'Can we talk for a little while?'";
  }

  if (/\b(sad|cry|upset|unhappy|low|down)\b/.test(text)) {
    return "I'm sorry today feels difficult. You don't have to dismiss what you're feeling. Try naming the feeling without judging yourself, and consider doing one gentle thing for yourself.";
  }

  if (/\b(anxious|anxiety|nervous|panic|worried|worry|fear)\b/.test(text)) {
    return "Worry can make the present moment feel intense. If it feels comfortable, place your feet on the floor and notice three things around you. You don't need to solve every uncertainty right now.";
  }

  if (/\b(motivation|unmotivated|lazy|procrastinating|procrastination)\b/.test(text)) {
    return "You don't need to feel fully motivated to begin. Try setting a timer for five minutes and starting with one small action. A small beginning still counts.";
  }

  if (/\b(angry|anger|frustrated|irritated)\b/.test(text)) {
    return "It can help to create a little space before responding to a frustrating situation. If possible, pause and notice what you need right now: rest, clarity, space, or a conversation.";
  }

  if (/\b(tired|exhausted|burnout|sleep)\b/.test(text)) {
    return "It sounds like you may need a little care and rest. If possible, take a short break, drink some water, or step away from your current task. Rest is a valid need.";
  }

  if (/\b(hello|hi|hey|namaste)\b/.test(text)) {
    return "Hello! I'm glad you stopped by. What has been on your mind today?";
  }

  if (/\b(thank|thanks|thank you)\b/.test(text)) {
    return "You're welcome. Remember, this is a space for reflection, and you can take things one step at a time.";
  }

  return "Thank you for sharing that with me. I can't fully understand your situation from a message, but we can take a moment to reflect. What part of this feels most important to you right now?";
}

function sendChatMessage(text) {
  const cleaned = text.trim();

  if (!cleaned) return;

  addMessage(cleaned, "user");
  chatInput.value = "";

  // Small delay makes the prototype conversation feel more natural.
  window.setTimeout(() => {
    addMessage(getSupportResponse(cleaned), "bot");
  }, 350);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendChatMessage(chatInput.value);
});

$$(".prompt-button").forEach((button) => {
  button.addEventListener("click", () => {
    sendChatMessage(button.dataset.prompt);
  });
});

// -------------------- BREATHING EXERCISE --------------------

let breathingActive = false;
let breathingTimeout = null;
let breathingStep = 0;

const breathingPhases = [
  {
    label: "Breathe in",
    status: "Gently breathe in, only as comfortably as you can.",
    className: "inhale",
    duration: 4000
  },
  {
    label: "Breathe out",
    status: "Slowly breathe out. There is no need to force your breath.",
    className: "exhale",
    duration: 6000
  }
];

function runBreathingPhase() {
  if (!breathingActive) return;

  const phase = breathingPhases[breathingStep];

  $("#breathingText").textContent = phase.label;
  $("#breathingStatus").textContent = phase.status;

  $("#breathingCircle").classList.remove("inhale", "exhale");
  $("#breathingCircle").classList.add(phase.className);

  breathingTimeout = window.setTimeout(() => {
    breathingStep = (breathingStep + 1) % breathingPhases.length;
    runBreathingPhase();
  }, phase.duration);
}

$("#breathingButton").addEventListener("click", () => {
  if (breathingActive) {
    breathingActive = false;
    window.clearTimeout(breathingTimeout);

    $("#breathingCircle").classList.remove("inhale", "exhale");
    $("#breathingText").textContent = "Ready?";
    $("#breathingStatus").textContent = "Exercise stopped. Take your time.";
    $("#breathingButton").textContent = "Start breathing";
    return;
  }

  breathingActive = true;
  breathingStep = 0;
  $("#breathingButton").textContent = "Stop exercise";
  runBreathingPhase();
});

// -------------------- GROUNDING ACTIVITY --------------------

$("#groundingButton").addEventListener("click", () => {
  $("#groundingMessage").textContent =
    "Take your time with each step. Notice 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste. You can skip any step that doesn't feel comfortable.";
});

// -------------------- LOCAL JOURNAL --------------------

const JOURNAL_KEY = "mindease_journal_v1";
const GRATITUDE_KEY = "mindease_gratitude_v1";

function readJournal() {
  try {
    const stored = localStorage.getItem(JOURNAL_KEY);
    const entries = stored ? JSON.parse(stored) : [];
    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    return [];
  }
}

function saveJournal(entries) {
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
    return true;
  } catch (error) {
    return false;
  }
}

function displayJournal() {
  const container = $("#journalEntries");
  const entries = readJournal();

  container.replaceChildren();

  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Your saved entries will appear here.";
    container.appendChild(empty);
    return;
  }

  entries.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "journal-entry";

    const date = document.createElement("small");
    date.textContent = `${entry.date} · ${entry.mood}`;

    const content = document.createElement("p");
    content.textContent = entry.text;

    card.append(date, content);
    container.appendChild(card);
  });
}

$("#journalForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const text = $("#journalEntry").value.trim();
  const mood = $("#journalMood").value;

  if (!text) {
    $("#journalMessage").textContent = "Please write a few words before saving.";
    return;
  }

  const entries = readJournal();

  entries.unshift({
    date: new Date().toLocaleString(),
    mood,
    text
  });

  // Keep the most recent 30 entries in this browser.
  const saved = saveJournal(entries.slice(0, 30));

  if (saved) {
    $("#journalEntry").value = "";
    $("#journalMessage").textContent = "Your entry has been saved in this browser.";
    displayJournal();
  } else {
    $("#journalMessage").textContent =
      "Unable to save. Your browser storage may be unavailable or full.";
  }
});

$("#clearJournalButton").addEventListener("click", () => {
  const confirmed = window.confirm(
    "Delete all journal entries saved in this browser? This cannot be undone."
  );

  if (!confirmed) return;

  try {
    localStorage.removeItem(JOURNAL_KEY);
    displayJournal();
    $("#journalMessage").textContent = "Journal entries cleared.";
  } catch (error) {
    $("#journalMessage").textContent = "Unable to clear journal entries.";
  }
});

// -------------------- GRATITUDE --------------------

$("#gratitudeButton").addEventListener("click", () => {
  const gratitude = $("#gratitudeInput").value.trim();

  if (!gratitude) {
    $("#gratitudeMessage").textContent = "Write one small thing first.";
    return;
  }

  const entries = readJournal();

  entries.unshift({
    date: new Date().toLocaleString(),
    mood: "Gratitude",
    text: gratitude
  });

  if (saveJournal(entries.slice(0, 30))) {
    $("#gratitudeInput").value = "";
    $("#gratitudeMessage").textContent = "Saved to your journal.";
    displayJournal();
  } else {
    $("#gratitudeMessage").textContent =
      "Unable to save this entry in your browser.";
  }
});

// Initial page setup
displayJournal();