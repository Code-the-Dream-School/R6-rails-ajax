function handle_ajax(event) {
  console.log("DOM fully loaded and parsed");
  const authHeader = localStorage.getItem("authHeader");
  const resultsDiv = document.getElementById("results-div");
  const restOpsDiv = document.getElementById("rest-ops");
  const listMembersButton = document.getElementById("list-members");
  const firstName = document.getElementById("member-firstName");
  const lastName = document.getElementById("member-lastName");
  const createMemberButton = document.getElementById("create-member");
  const memberID = document.getElementById("member-id");
  const firstName1 = document.getElementById("member-firstName1");
  const lastName1 = document.getElementById("member-lastName1");
  const updateMemberButton = document.getElementById("update-member");
  const factsID = document.getElementById("facts-id");
  const memberFacts = document.getElementById("member-facts");
  const memberLikes = document.getElementById("member-likes");
  const createMemberFacts = document.getElementById("create-member-facts");
  const updateMemberID = document.getElementById("update-facts-id");
  const factID = document.getElementById("fact-id");
  const updateMemberFact = document.getElementById("update-member-fact");
  const updateMemberLike = document.getElementById("update-member-likes");
  const updateMemberFacts = document.getElementById("update-member-facts");
  const listID = document.getElementById("list-id");
  const listFacts = document.getElementById("list-member-facts");
  const deleteMemberID = document.getElementById("delete-member-id");
  const deleteFactID = document.getElementById("delete-fact-id");
  const deleteFact = document.getElementById("delete-fact");
  const deleteID = document.getElementById("delete-id");
  const deleteMemberButton = document.getElementById("delete-member");
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
      }).then(() => {
        resultsDiv.innerHTML = "Delete Successful!";
      });
    } else if (event.target === listFacts) {
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
        fact_text: memberFacts.value,
        likes: memberLikes.value,
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
    } else if (event.target === updateMemberFacts) {
      let dataObject = {
        fact_text: updateMemberFact.value,
        likes: updateMemberLike.value,
      };
      fetch(`${members_path}/${updateMemberID.value}/facts/${factID.value}`, {
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
    } else if (event.target === deleteFact) {
      fetch(
        `${members_path}/${deleteMemberID.value}/facts/${deleteFactID.value}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            authorization: authHeader,
          },
        }
      ).then(() => {
        resultsDiv.innerHTML = "Delete Successful!";
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", handle_ajax(event));
