// Navigation for multi-page logout
function logout(){
  localStorage.removeItem('loggedInUser');
  alert("Logged out successfully.");
  window.location.href = "index.html";
}

// Users and Votes in localStorage
let users = JSON.parse(localStorage.getItem('users') || '{}');
let votes = JSON.parse(localStorage.getItem('votes') || '{"BJP":0,"Congress":0,"Shiv Sena":0,"AITC":0,"INC":0}');
let votedUsers = JSON.parse(localStorage.getItem('votedUsers') || '{}');

// Registration
const registerForm = document.getElementById('registerForm');
if(registerForm){
  registerForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name=document.getElementById('regName').value.trim();
    const age=parseInt(document.getElementById('regAge').value);
    const pass=document.getElementById('regPassword').value;
    const notice=document.getElementById('regNotice');
    if(age<18){ notice.textContent="You must be 18+ to register."; return;}
    if(users[name]){ notice.textContent="User already exists."; return;}
    users[name]={age,password:pass};
    localStorage.setItem('users',JSON.stringify(users));
    notice.style.color="green";
    notice.textContent="Registration successful! Please login now.";
    window.location.href = "login.html";
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name=document.getElementById('loginName').value.trim();
    const pass=document.getElementById('loginPassword').value;
    const notice=document.getElementById('loginNotice');
    if(users[name] && users[name].password===pass){
      localStorage.setItem('loggedInUser',name);
      notice.style.color="green";
      notice.textContent="Login successful!";
      window.location.href = "vote.html";
    } else {
      notice.style.color="red";
      notice.textContent="Invalid username or password.";
    }
  });
}

// Update Results
function updateResults(){
  const countBJP=document.getElementById("count-bjp");
  const countCON=document.getElementById("count-congress");
  const countSHIV=document.getElementById("count-shiv");
  const countAITC=document.getElementById("count-aitc");
  const countINC=document.getElementById("count-inc");

  if(countBJP) countBJP.textContent=votes.BJP;
  if(countCON) countCON.textContent=votes.Congress;
  if(countSHIV) countSHIV.textContent=votes["Shiv Sena"];
  if(countAITC) countAITC.textContent=votes.AITC;
  if(countINC) countINC.textContent=votes.INC;

  localStorage.setItem('votes',JSON.stringify(votes));
}
updateResults();

// Cast Vote
const castBtn = document.getElementById('castBtn');
if(castBtn){
  castBtn.addEventListener('click', ()=>{
    const user=localStorage.getItem('loggedInUser');
    const notice=document.getElementById('voteNotice');
    if(!user){ alert("Please login first."); return;}
    if(votedUsers[user]){ notice.textContent="You have already voted!"; notice.style.color="red"; return;}
    const choice=document.querySelector('input[name="candidate"]:checked');
    if(!choice){ notice.textContent="Please select a party."; notice.style.color="red"; return;}
    votes[choice.value]++;
    votedUsers[user]=true;
    localStorage.setItem('votedUsers',JSON.stringify(votedUsers));
    notice.textContent="Your vote for "+choice.value+" has been recorded.";
    notice.style.color="green";
    updateResults();
  });
}
