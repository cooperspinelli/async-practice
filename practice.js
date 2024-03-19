"use strict";

const BASE_API_URL = "http://numbersapi.com/";


/** Makes request to number trivia api and logs trivia */
async function showNumberTrivia(favNum) {
  const resp = await fetch(`${BASE_API_URL}${favNum}?json`);
  const respData = await resp.json();
  console.log(`ShowNumberTrivia: ${respData.text}`);
}

/** Makes multiple requests to number trivia api and logs the first response */
async function showNumberRace(numsForTrivia) {
  const requests = numsForTrivia.map(num => fetch(`${BASE_API_URL}${num}?json`));
  const winner = await Promise.race(requests);
  const winnerData = await winner.json();
  console.log(`ShowNumberRace: ${winnerData.text}`);
}

/** Makes multiple requests to number trivia api logs allthe responses */
async function showNumberAll(numsForTrivia) {
  const requests = numsForTrivia.map(num => fetch(`${BASE_API_URL}${num}?json`));
  const all = await Promise.allSettled(requests);

  const fulfilled = [];
  const rejected = [];

  for (let response of all) {
    if (response.value.ok) {
      const responseData = await response.value.json();
      fulfilled.push(responseData.text);
    } else {
      rejected.push(`Request failed: ${response.value.status}`);
    }
  }

  console.log(`ShowNumberAll fulfilled: ${fulfilled}`);
  console.log(`ShowNumberAll rejected: ${rejected}`);
}

/** Calls all three functions in order, waiting for each to resolve
 * before calling the next */
async function main() {
  await showNumberTrivia(5);
  await showNumberRace([1, 2, 3, 4]);
  await showNumberAll([1, 2, 3, "WRONG"]);
}

async function getNewDeckId() {
  const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle`);
  const responseData = await response.json();
  return responseData.deck_id;
}

async function drawACard(deck_id) {
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
  const responseData = await response.json();
  return responseData.cards[0].image;
}