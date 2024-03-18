"use strict";

const BASE_API_URL = "http://numbersapi.com/";

async function showNumbersTrivia() {
  const favNumber = 5;
  const resp = await fetch(`${BASE_API_URL}${favNumber}?json`);
  const respData = await resp.json();
  console.log(respData["text"]);
}

async function showNumberRace() {
  const numsForTrivia = [1, 2, 3, 4];

  const request1 = fetch(`${BASE_API_URL}${numsForTrivia[0]}?json`);
  const request2 = fetch(`${BASE_API_URL}${numsForTrivia[1]}?json`);
  const request3 = fetch(`${BASE_API_URL}${numsForTrivia[2]}?json`);
  const request4 = fetch(`${BASE_API_URL}${numsForTrivia[3]}?json`);

  const winner = await Promise.race([request1, request2, request3, request4]);
  const winnerData = await winner.json();
  console.log(winnerData["text"]);
}

