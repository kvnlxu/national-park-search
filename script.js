
const apiKey = 'qz3hlMZMU5EwSmj3RWyQhZx5Oc4B5Ojv94IzsCiW';

function displayResults(responseJson, maxResults){
    let data = responseJson.data;
    $('#results-list').empty();
    for (let i = 0; i < data.length; i++){
        $('#results-list').append(
            `<li>
              <h3>
                <a href="${data[i].url}">
                  ${data[i].fullName}
                </a>
              </h3>
              <p>${data[i].description}</p>
            </li>`
        );
    }
    $('#results').removeClass('hidden');
}

function getParks(stateCode, maxResults){
    let url = `https://developer.nps.gov/api/v1/parks?${stateCode}&limit=${maxResults}&api_key=${apiKey}`;

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function parametizeStateCode(stateCode){
  let resultArray = [];
  const stateList = stateCode.split(" ");
  for(let i = 0; i < stateList.length; i++){
    if (stateList[i]) resultArray.push(`stateCode=${stateList[i]}`);
  }
  return resultArray.join('&');
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      let stateCode = $('#js-state-code').val();
      let maxResults = $('#js-max-results').val();
      stateCode = parametizeStateCode(stateCode);
      maxResults--;
      getParks(stateCode, maxResults);
    });
  }

$(watchForm);