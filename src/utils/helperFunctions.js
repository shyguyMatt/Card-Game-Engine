export function buildCardList(deckList) {
  let cards = deckList.split('\n')
  let array = []
  cards.forEach(card => {
    let number = card.substring(0, card.indexOf(' '))
    if (number.indexOf('x') !== -1) {
      number = number.substr(0, number.indexOf('x'))
    }
    let name = card.substring(card.indexOf(' ') + 1, card.indexOf('(') - 1)
    let set = card.substring(card.indexOf('(') + 1, card.indexOf(')'))
    let code = card.substr(card.indexOf(')') + 2)

    for (let i = 0; i < number; i++) {
      array.push({
        name: name,
        set: set,
        code: code
      })      
    }
  });

  return(array)
}
export async function scryfallfetch(cardArray) {
  let completedArray = []
  try {
    for (let i = 0; i < cardArray.length; i += 50) {
      let body = {
        identifiers: []
      }
      for (let card = 0; card < 50; card++) {
        if (cardArray[i+card] !== undefined) {
          body.identifiers.push({
            name: cardArray[i+card].name,
            set: cardArray[i+card].set,
            collector_number: cardArray[i+card].code
          })          
        }
      }
      const response = await fetch("https://api.scryfall.com/cards/collection", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })

      let data = await response.json();
      completedArray = [...completedArray, ...data.data]
    }

    return(completedArray)

  } catch (err) {
    console.log(err)
  }
}