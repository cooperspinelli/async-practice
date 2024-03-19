"use strict";

const $btnContainer = $(".btn-container");
const $cardContainer = $(".card-container");
const $drawCardBtn = $("<button>Draw Card</button>");

async function getNewDeckId() {
  const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle`);
  const responseData = await response.json();
  return responseData.deck_id;
}

async function getCardImage(deckId) {
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
  const responseData = await response.json();
  if (responseData.remaining == 0) {
    $btnContainer.empty();
  }
  return responseData.cards[0].image;
}

async function drawCard(deckId) {
  const cardImage = await getCardImage(deckId);
  const $cardImageElement = $(`<img src="${cardImage}">`);
  $cardContainer.append($cardImageElement);
}

async function onLoad() {
  const deckId = await getNewDeckId();
  $btnContainer.append($drawCardBtn);
  $drawCardBtn.on("click", () => drawCard(deckId));
}

$(window).on("load", onLoad);
