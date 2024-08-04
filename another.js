
document.addEventListener("DOMContentLoaded", () => {
    // Function to populate the table with data from local storage
    function updateTable() {
      // Select the table element
      const table = document.querySelector(".entered");
  
      // Clear existing table rows (excluding header)
      table
        .querySelectorAll("tr:not(:first-child)")
        .forEach((row) => row.remove());
  
      // Retrieve and parse all student data from local storage
      const AllData = JSON.parse(localStorage.getItem("studentsArray")) || [];
  
      console.log("All data-----", AllData);
  
      // Iterate over each student in AllData
      AllData.forEach((student) => {
        // Create a new row
        const newRow = document.createElement("tr");
        newRow.classList.add("tr");
  
        // Create table data cells
        const sName = document.createElement("td");
        const sId = document.createElement("td");
        const sEmail = document.createElement("td");
        const sContactNo = document.createElement("td");
  
        // Set the inner HTML of the cells
        sName.innerHTML = student.name;
        sId.innerHTML = student.id;
        sEmail.innerHTML = student.email;
        sContactNo.innerHTML = student.contact;
  
        // Append cells to the new row
        newRow.appendChild(sName);
        newRow.appendChild(sId);
        newRow.appendChild(sEmail);
        newRow.appendChild(sContactNo);
  
        // Create and append Edit button
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.classList.add("edit");
        newRow.appendChild(editButton);
  
        // Create and append Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("delete");
        newRow.appendChild(deleteButton);
  
        // Append the new row to the table
        table.appendChild(newRow);
  
        // Add event listeners for Edit and Delete buttons
        deleteButton.addEventListener("click", () => {
          deleteFunction(student.id, newRow);
        });
  
        editButton.addEventListener("click", () => {
          editFunction(student);
        });
      });
    }
  
    // Function to handle delete action
    function deleteFunction(studentId, row) {
      // Retrieve the existing student data
      let studentsArray = JSON.parse(localStorage.getItem("studentsArray")) || [];
  
      // Filter out the student to be deleted
      studentsArray = studentsArray.filter((student) => student.id !== studentId);
  
      // Save the updated array back to local storage
      localStorage.setItem("studentsArray", JSON.stringify(studentsArray));
  
      // Remove the row from the table
      row.remove();
    }
  
    // Function to handle edit action
    function editFunction(student) {
      // Populate input fields with the selected student's data
      infoName.value = student.name;
      infoId.value = student.id;
      infoEmail.value = student.email;
      infoContactNo.value = student.contact;
      // Optionally remove the student from local storage if needed
      // This can be part of the "edit" functionality based on how you want to handle it
    }
  
    // Initialize the table on page load
    updateTable();
  
    // Adding student info on button click
    const infoName = document.querySelector(".inputname");
    const infoId = document.querySelector(".inputid");
    const infoEmail = document.querySelector(".inputemail");
    const infoContactNo = document.querySelector(".inputcontactno");
  
    document.querySelector(".add-btn").addEventListener("click", () => {
      // Check if input fields are empty
      if (
        infoName.value === "" ||
        infoId.value === "" ||
        infoEmail.value === "" ||
        infoContactNo.value === ""
      ) {
        console.log("Please fill all the fields");
        return;
      }

      //input values validation
      if (!/^[A-Za-z\s]+$/.test(infoName.value)){
        alert("!Name should contain only letters and spaces");
        return;
      }

      if (!/^\d+$/.test(infoId.value)){
        alert("!ID should contain only numbers");
      }

      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(infoEmail.value)){
        alert("!Please enter a valid email address");
        return;
      }

      if (!/^\d{10}$/.test(infoContactNo.value)){
        alert("!Contact should contain 10 digit numbers");
        return;
      }
  
      // Create a student info object
      const studentInfo = {
        name: infoName.value,
        id: infoId.value,
        email: infoEmail.value,
        contact: infoContactNo.value,
      };
  
      console.log("studentInfo", studentInfo);
  
      // Retrieve existing student data from local storage or initialize an empty array
      let studentsArray = JSON.parse(localStorage.getItem("studentsArray")) || [];
  
      // Add the new student to the array
      studentsArray.push(studentInfo);
  
      // Save the updated array back to local storage
      localStorage.setItem("studentsArray", JSON.stringify(studentsArray));
  
      // Call a function to update the table
      updateTable();
  
      // Clear input fields
      infoName.value = "";
      infoId.value = "";
      infoEmail.value = "";
      infoContactNo.value = "";
    });
  });
  