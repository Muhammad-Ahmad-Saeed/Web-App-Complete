$(function () {
    var but = document.getElementById("Get");
    var but2 = document.getElementById("add");
    var but6 = document.getElementById("Save");
    but.addEventListener("click", fetchData);
    but2.addEventListener("click", postData);
    $("#mtable2").on("click", "#Delete", deleteData);
    $("#mtable2").on("click", "#Edit", showModal);
    but6.addEventListener("click", putData);
    //but4.addEventListener('click', deleteData);
  });
  const Url = "http://localhost:3000/api/movies/";
  
  async function fetchData() {
    const response = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
    const tab = document.getElementById("mtable2");
    tab.innerHTML = " ";
    for (let i = 0; i < data.length; i++) {
      var res = data[i];
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
      const td5 = document.createElement("td");
      const td6 = document.createElement("td");
      let but3 = document.createElement("button");
      but3.innerHTML = "EDIT";
      but3.setAttribute("id", "Edit");
      but3.setAttribute("type", "button");
      but3.setAttribute("data-bs-toggle", "modal");
      but3.setAttribute("data-bs-target", "#exampleModal");
      but3.classList.add("button-54");
      var but4 = document.createElement("button");
      but4.innerHTML = "REMOVE";
      but4.setAttribute("id", "Delete");
      but4.classList.add("button-54");
      tr.setAttribute("data_id", res._id);
      tr.setAttribute("id", "row");
  
      td.classList.add("data1");
      td2.classList.add("data1");
      td3.classList.add("data1");
      td4.classList.add("data1");
      td5.classList.add("data1");
      // td6.classList.add("data2");
  
      if (res.Title) {
        td.textContent = res.Title;
      } else {
        td.textContent = "N/A";
      }
      tr.appendChild(td);
      tab.appendChild(tr);
  
      if (res.Duration) {
        td2.textContent = res.Duration;
      } else {
        td2.textContent = "N/A";
      }
      tr.appendChild(td2);
      tab.appendChild(tr);
  
      if (res.Cast) {
        td3.textContent = res.Cast;
      } else {
        td3.textContent = "N/A";
      }
      tr.appendChild(td3);
      tab.appendChild(tr);

    }
  }
  
  async function postData() {
    let title = document.getElementById("Title").value;
    let duration = document.getElementById("Duration").value;
    let cast = document.getElementById("Cast").value;
    
    let response = await fetch(Url, {
      method: "POST",
      body: JSON.stringify({
        Title: Title,
        Duration: Duration,
        Cast: [Cast]
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
    fetchData();
  }
  
  async function deleteData() {
    var but5 = $(this);
    var parent = but5.closest("#row");
    var id = parent.attr("data_id");
  
    const response = await fetch(Url + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    fetchData();
  }
  
  async function showModal() {
    var but5 = $(this);
    var parent = but5.closest("#row");
    var id = parent.attr("data_id");
  
    const response = await fetch(Url + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
    document.getElementById("Title").value = data.Title;
    document.getElementById("Duration").value = data.Duration;
    document.getElementById("Cast").value = data.Cast;
  }
  
  async function putData() {
    var Title = document.getElementById("Title1").value;
    var Duration = document.getElementById("Duration1").value;
    var Cast = document.getElementById("Cast1").value;
    
  
    let response = await fetch(Url + id1, {
      method: "PUT",
      body: JSON.stringify({
        Title: Title,
        Duration: Duration,
        Cast: [Cast],
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
    fetchData();
  }