import { ethers } from 'ethers';

import moodContractAbi from './abi.json';

const MoodContractAddress = import.meta.env.VITE_MOOD_CONTRACT_ADDRESS;
const MoodContractABI = moodContractAbi;

let MoodContract = undefined;
let signer = undefined;

const provider = new ethers.BrowserProvider(window.ethereum, 'sepolia');

provider.send('eth_requestAccounts', []).then(async () => {
  await provider.listAccounts().then(async accounts => {
    signer = await provider.getSigner(accounts[0].address);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  });
});

async function getMood() {
  const mood = await MoodContract.getMood();
  document.getElementById('showMood').innerText = `Your Mood: ${mood}`;
  console.log(mood);
}

async function setMood() {
  const mood = document.getElementById('mood').value;
  await MoodContract.setMood(mood);
}

document.getElementById('getMoodBtn').addEventListener('click', getMood);
document.getElementById('setMoodBtn').addEventListener('click', setMood);
