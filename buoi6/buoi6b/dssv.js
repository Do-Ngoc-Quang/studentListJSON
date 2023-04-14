lst = [];
curItem = null;

$(function () {
    getStudents();
});



function getStudents() {
    // fetch("http://localhost:3000/students")
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         lst = [];
    //         data.forEach((dssv, i) => {
    //             dssv.STT = i + 1;
    //             lst.push(dssv);
    //         });

    //         if (lst.length > 0) {
    //             $("#tbodySV").html("");
    //             $("#dssvTemplate").tmpl(lst).appendTo("#tbodySV");
    //         }
    //         else {
    //             let str = "<caption>No data fond!</caption>";
    //             $("#tbodySV").html(str);
    //         }
    //     })
    //     .catch(err => {
    //         let str = "<caption>Error ...</caption>";
    //         $("#tbodySV").html(str);
    //     });

    let students = [];
    fetch("http://localhost:3000/students")
        .then(res => res.json())
        .then(data => {
            lst = data;
            if (lst.length > 0) {
                let tbody = $("#tbodySV");
                tbody.empty();
                lst.forEach((dssv, i) => {
                    let row = $("<tr></tr>");
                    row.append($(`<td>${i + 1}</td>`));
                    row.append($(`<td>${dssv.codeStudent}</td>`));
                    row.append($(`<td>${dssv.name}</td>`));
                    row.append($(`<td>${dssv.class}</td>`));
                    row.append($(`<td>${dssv.gender}</td>`));
                    row.append($(`<td>${dssv.birthday}</td>`));
                    row.append($(`<td>

                                    <button class="btn-sm btn-info" onclick="openModal(${dssv.codeStudent}, ${i})">Edit</button>
                                    <button class="btn-sm btn-danger" onclick="deleteStudent(${dssv.codeStudent}, ${i})">Delete</button>

                                </td>`));
                    tbody.append(row);
                });
            } else {
                $("#tbodySV").html("<caption>No data found!</caption>");
            }
        })
        .catch(err => {
            $("#tbodySV").html("<caption>Error fetching data!</caption>");
            console.error(err);
        });
}

function openModal(mssv, index) {
  fetch('http://localhost:3000/students')
  .then(response => response.json())
  .then(students => {
    console.log(students); // This will log the array of students to the console

    // Use forEach() to iterate over each student in the array
    students.forEach((student, i) => {
      if (i === index) {
        console.log(student);
        document.querySelector("#currentID").value = index;
        document.querySelector("#txtCode").value = student.codeStudent;
        document.querySelector("#txtName").value = student.name;
        document.querySelector("#txtClass").value = student.class;
        document.querySelector("#date").value = student.birthday;

        let genderRadios = document.getElementsByName("gender");
        genderRadios.forEach(radio => {
          if (radio.value === student.gender && student.gender=="Nam") {
            radio.checked = true;
          }
          if (radio.value === student.gender && student.gender=="Nữ") {
            radio.checked = true;
          }
        });

        // Show the modal
        $('#modalEdit').modal('show');
      }
    });
  })
  .catch(error => {
    console.error();
    // Handle the error here
  });

  // Get the modal
  var modal = document.getElementById("modalEdit");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


}



function deleteStudent(mssv, index) {
  
  // $.ajax({
  //   url: `http://localhost:3000/students/${mssv}`,
  //   type: 'DELETE',
  //   success: function(result) {
  //     console.log(result);
  //     // Handle the successful deletion of the student here
  //   },
  //   error: function(xhr, status, error) {
  //     console.error(error);
  //     // Handle any errors that occurred during the deletion here
  //   }
  // });
}


  