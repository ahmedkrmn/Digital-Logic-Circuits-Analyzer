// Handle image card
function setCardCircuit(image) {
  document.getElementById("circuit_card_title").style.display = "none";
  document.getElementById("circuit_card_text").style.display = "none";
  document.getElementById("circuit_card_link1").style.display = "none";
  document.getElementById("circuit_card_link2").style.display = "none";
  document.getElementById("card_image").src = image;
}

// Handle truth table
async function handleTruthTable(formData) {
  // Delete old table
  const oldTable = document.getElementById("truth-table");
  oldTable.parentNode.removeChild(oldTable);

  // Create new table tags
  const newTable = document.createElement("table");
  newTable.id = "truth-table";
  newTable.className = "table table-bordered";
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Show loading spinner
  document.querySelector(".loader").style.display = "block";

  try {
    // First letter of the inputs
    let letter = "A".charCodeAt(0);

    // Create headers row
    let tr = document.createElement("tr");

    // Fetch response from API
    const res = await axios.post(window.config.API, formData);

    // Loop on log2(size) to create the table headers
    for (let index = 0; index < Math.log2(res.data.data.length); index++) {
      let th = document.createElement("th");
      th.innerText = String.fromCharCode(letter++);
      tr.appendChild(th);
    }

    // Add output (Z) header
    let th = document.createElement("th");
    th.innerText = "Z";
    tr.appendChild(th);

    // Append row to table header
    thead.appendChild(tr);

    // Loop on data
    for (let i = 0; i < res.data.data.length; i++) {
      // Create a row for each entry
      let tr = document.createElement("tr");

      // Loop on the array of the ith entry and create a td for each
      for (let j = 0; j < res.data.data[i][0].length; j++) {
        let td = document.createElement("td");
        td.innerText = res.data.data[i][0][j];
        tr.appendChild(td);
      }
      let td = document.createElement("td");
      td.innerText = res.data.data[i][1];
      tr.appendChild(td);

      // Append row to table body
      tbody.appendChild(tr);
    }
  } catch (error) {
    console.log(error);
  }
  // Remove loader
  document.querySelector(".loader").style.display = "none";

  // Append thead and tbody to table
  newTable.appendChild(thead);
  newTable.appendChild(tbody);

  // Append table to its container
  document.getElementById("truth-table-container").appendChild(newTable);
}

// Handle Upload Form
// Submit form when uploading the image file
document.getElementById("image_file").onchange = function () {
  const form = document.getElementById("upload_form");
  const formData = new FormData(form);

  setCardCircuit(URL.createObjectURL(formData.get("image_file")));

  formData.append("type", "upload");
  handleTruthTable(formData);
  setTimeout(() => {
    window.location.hash = "";
    window.location.hash = "analyze";
  }, 500);
  // remove the file do that if its selected again, it's re-uploaded (better UX)
  this.value = "";
};

// Handle Link Form
(function () {
  const linkForm = document.getElementById("link_form");
  linkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(linkForm);
    const circuit_id = formData.get("link").split("/").slice(-1)[0];

    // Add cors proxy because the api has cors protection
    const api_endpoint =
      "https://cors-anywhere.herokuapp.com/https://api.circuit-diagram.org/document/store/render/" +
      circuit_id +
      ".png";
    fetch(api_endpoint)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        setCardCircuit(URL.createObjectURL(blob));
        window.location.hash = "";
        window.location.hash = "analyze";

        const formData = new FormData();
        formData.append("image_file", blob);
        formData.append("type", "online");

        handleTruthTable(formData);
      })
      .catch((err) => console.log(err));
  });
})();

// Open circuit drag and drop when clicking on the button
function openCircuitWindow() {
  const iframe = document.querySelector("#circuit-diagram");
  iframe.requestFullscreen();
}
