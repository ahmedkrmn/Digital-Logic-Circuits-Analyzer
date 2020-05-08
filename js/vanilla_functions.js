// Handle image card
function setCardCircuit(image) {
  document.getElementById('circuit_card_title').style.display = 'none';
  document.getElementById('circuit_card_text').style.display = 'none';
  document.getElementById('circuit_card_link1').style.display = 'none';
  document.getElementById('circuit_card_link2').style.display = 'none';
  document.getElementById('card_image').src = image;
}

// Handle truth table
async function handleTruthTable(formData) {
  for (let index = 0; index <= 3; index++) {
    loading = 'Loading';
    document.getElementById(`z${index}`).innerHTML =
      '<span style="color: grey"><i>Loading</i></span>';
  }
  try {
    console.log(window.config.API);
    const res = await axios.post(window.config.API, formData);
    for (let index = 0; index < res.data.data.length; index++) {
      document.getElementById(`x${index}`).innerText = res.data.data[index].x;
      document.getElementById(`y${index}`).innerText = res.data.data[index].y;
      document.getElementById(`z${index}`).innerText = res.data.data[index].z;
    }
  } catch (error) {
    console.log(error);
  }
}

// Handle Upload Form
// Submit form when uploading the image file
document.getElementById('image_file').onchange = function () {
  const form = document.getElementById('upload_form');
  const formData = new FormData(form);

  setCardCircuit(URL.createObjectURL(formData.get('image_file')));

  formData.append('type', 'upload');
  handleTruthTable(formData);
  setTimeout(() => {
    window.location.hash = '';
    window.location.hash = 'analyze';
  }, 500);
  // remove the file do that if its selected again, it's re-uploaded (better UX)
  this.value = '';
};

// Handle Link Form
(function () {
  const linkForm = document.getElementById('link_form');
  linkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(linkForm);
    const circuit_id = formData.get('link').split('/').slice(-1)[0];

    // Add cors proxy because the api has cors protection
    const api_endpoint =
      'https://cors-anywhere.herokuapp.com/https://api.circuit-diagram.org/document/store/render/' +
      circuit_id +
      '.png';
    fetch(api_endpoint)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        setCardCircuit(URL.createObjectURL(blob));
        window.location.hash = '';
        window.location.hash = 'analyze';

        const formData = new FormData();
        formData.append('image_file', blob);
        formData.append('type', 'online');

        handleTruthTable(formData);
      })
      .catch((err) => console.log(err));
  });
})();

// Open circuit drag and drop when clicking on the button
function openCircuitWindow() {
  const iframe = document.querySelector('#circuit-diagram');
  iframe.requestFullscreen();
}
