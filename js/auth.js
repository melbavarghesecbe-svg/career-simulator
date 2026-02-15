const AUTH_STORAGE_KEY = "userProfile";

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.style.display = "none");
  document.getElementById(pageId).style.display = "block";
}

function switchAuthMode(mode) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");

  if (mode === "signup") {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
  } else {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
  }
}

function handleSignUp(event) {
  event.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const ageValue = document.getElementById("signupAge").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (!name || !email || !password) {
    alert("Please complete all required fields.");
    return;
  }

  const age = Number(ageValue);
  if (Number.isNaN(age) || age < 13) {
    alert("Please enter a valid age 13 or above.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match.");
    return;
  }

  const profile = { name, email, age, password };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
  localStorage.setItem("userName", name);

  resetOnboardingState();
  showPage("page2");
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!stored) {
    alert("No account found. Please create one first.");
    return;
  }

  try {
    const profile = JSON.parse(stored);
    if (profile.email !== email || profile.password !== password) {
      alert("Incorrect email or password.");
      return;
    }
    localStorage.setItem("userName", profile.name || "User");
    resetOnboardingState();
    showPage("page2");
  } catch (err) {
    console.error("Failed to parse stored profile", err);
    alert("We encountered an issue loading your profile. Please sign up again.");
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

function nextPage(current) {
  if (current === 2) {
    if (typeof collectProfile === "function") {
      const ok = collectProfile();
      if (!ok) {
        return;
      }
    }
  }
  if(current === 3 && selectedInterests.length === 0){
    alert("Select at least one interest");
    return;
  }
  if(current === 4 && !skill){
    alert("Select your skill");
    return;
  }
  showPage(`page${current + 1}`);
}

function prevPage(current){
  showPage(`page${current - 1}`);
}

function restartSimulator() {
  selectedInterests = [];
  skill = "";
  resetSelections();
  document.getElementById("loginForm").reset();
  document.getElementById("signupForm").reset();
  switchAuthMode("login");
  showPage("page1");
}

function resetSelections() {
  const interestLabel = document.getElementById("chosenInterest");
  const skillLabel = document.getElementById("chosenSkill");
  if (interestLabel) {
    interestLabel.innerText = "Selected: None";
  }
  if (skillLabel) {
    skillLabel.innerText = "Selected: None";
  }
  document.querySelectorAll(".interest-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".skill-btn").forEach(btn => btn.classList.remove("active"));
}

function resetOnboardingState() {
  resetSelections();
  selectedInterests = [];
  skill = "";
  if (typeof resetProfile === "function") {
    resetProfile();
  }
}
