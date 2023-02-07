function handle_ajax(event) {
  console.log("DOM fully loaded and parsed");
  const authHeader = localStorage.getItem("authHeader");
  const resultsDiv = document.getElementById("results-div");
  const restOpsDiv = document.getElementById("rest-ops");
  const listMembersButton = document.getElementById("list-members");
  const createMemberButton = document.getElementById("create-member");
  const firstName = document.getElementById("member-firstName");
  const lastName = document.getElementById("member-lastName");
  const updateMemberButton = document.getElementById("update-member");
  const deleteMemberButton = document.getElementById("delete-member");
  const listMemberButton = document.getElementById("list-member");
  const memberID = document.getElementById("member-id");
  const deleteID = document.getElementById("delete-id");
  const listID = document.getElementById("list-id");
  const firstName1 = document.getElementById("member-firstName1");
  const lastName1 = document.getElementById("member-lastName1");
  const createMemberFacts = document.getElementById("create-member-facts");
  const factsID = document.getElementById("facts-id");
  const memberLikes = document.getElementById("member-likes");
  const memberFacts = document.getElementById("member-facts");
  const members_path = "http://localhost:3001/api/v1/members";

  restOpsDiv.addEventListener("click", (event) => {
    if (event.target === listMembersButton) {
      fetch(members_path, {
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            resultsDiv.innerHTML = "";
            response.json().then((data) => {
              for (let i = 0; i < data.length; i++) {
                let parag = document.createElement("P");
                parag.textContent = JSON.stringify(data[i]);
                resultsDiv.appendChild(parag);
              }
            });
          } else {
            alert(`Return code ${response.status} ${response.statusText}`);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else if (event.target === createMemberButton) {
      var dataObject = {
        first_name: firstName.value,
        last_name: lastName.value,
      };
      fetch(members_path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
        body: JSON.stringify(dataObject),
      }).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === updateMemberButton) {
      var dataObject = {
        first_name: firstName1.value,
        last_name: lastName1.value,
      };
      fetch(`${members_path}/${memberID.value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
        body: JSON.stringify(dataObject),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === deleteMemberButton) {
      fetch(`${members_path}/${deleteID.value}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
        // body: JSON.stringify(dataObject),
      }).then(() => {
        resultsDiv.innerHTML = "Delete Successful!";
      });
    } else if (event.target === listMemberButton) {
      fetch(`${members_path}/${listID.value}/facts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            resultsDiv.innerHTML = "";
            response.json().then((data) => {
              if (data.length > 0) {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                  let parag = document.createElement("P");
                  parag.textContent = JSON.stringify(data[i]);
                  resultsDiv.appendChild(parag);
                }
              } else {
                resultsDiv.innerHTML = "This user has no facts listed.";
              }
            });
          } else {
            alert(`Return code ${response.status} ${response.statusText}`);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else if (event.target === createMemberFacts) {
      var dataObject = {
        memberFacts: memberFacts.value,
        memberLikes: memberLikes.value,
      };
      fetch(`${members_path}/${factsID.value}/facts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
        body: JSON.stringify(dataObject),
      }).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        }
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", handle_ajax(event));
