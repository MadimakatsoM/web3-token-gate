const connectBtn = document.getElementById("connectBtn");
const demoBtn = document.getElementById("demoBtn");
const usernameInput = document.getElementById("username");
const statusBox = document.getElementById("statusBox");

// Simulated list of wallet addresses that hold the required Community NFT/Token
const VERIFIED_PASS_HOLDERS = [
  "0x71c7656ec7ab88b098defb751b7401b5f6d8976f",
  "0xdemo1234567890abcdef1234567890abcdef1234"
];

function showStatus(message, isGranted) {
  statusBox.style.display = "block";
  statusBox.className = `status ${isGranted ? "granted" : "denied"}`;
  statusBox.innerHTML = message;
}

function verifyAccess(walletAddress) {
  const username = usernameInput.value.trim();
  if (!username) {
    showStatus("Please enter a username first.", false);
    return;
  }

  const normalizedAddress = walletAddress.toLowerCase();
  const hasPass = VERIFIED_PASS_HOLDERS.includes(normalizedAddress);

  if (hasPass) {
    showStatus(
      `<strong>Access Granted!</strong><br>Welcome, <b>${username}</b>.<br>Wallet: <code>${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}</code><br><br>You now have access to the exclusive Community Arena.`,
      true
    );
  } else {
    showStatus(
      `<strong>Access Denied</strong><br>Hi ${username}, wallet <code>${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}</code> does not hold the required Community Pass NFT.`,
      false
    );
  }
}

// 1. Real MetaMask Connection
connectBtn.addEventListener("click", async () => {
  if (typeof window.ethereum === "undefined") {
    showStatus("MetaMask is not installed. Use the <b>Demo Wallet</b> button below to test.", false);
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    verifyAccess(accounts[0]);
  } catch (err) {
    showStatus("Wallet connection was cancelled.", false);
  }
});

// 2. Demo Wallet Connection (for easy testing)
demoBtn.addEventListener("click", () => {
  const demoAddress = "0xDemo1234567890abcdef1234567890abcdef1234";
  verifyAccess(demoAddress);
});