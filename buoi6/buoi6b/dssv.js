lst = [];
curItem = null;

$(function () {
  getStudents();
});



function getStudents() {
  fetch("http://localhost:3000/students")
    .then(res => { return res.json(); })
    .then(data => {
      lst = [];
      let i = 1;
      data.forEach(sv => {
        sv.STT = i++;
        lst.push(sv);
      });
      if (lst.length > 0) {
        $("#tbodySV").html("");
        $("#svTemplate").tmpl(lst).appendTo("#tbodySV");
      }
      else {
        str = "<caption>No DATA FOUND</caption>"
        $("#tbodySV").html(str);
      }
    })
    .catch(err => {
      str = "<caption>ERROR .....</caption>"
      $("#tbodySV").html(str);
    })

  // let students = [];
  // fetch("http://localhost:3000/students")
  //   .then(res => res.json())
  //   .then(data => {
  //     lst = data;
  //     if (lst.length > 0) {
  //       let tbody = $("#tbodySV");
  //       tbody.empty();
  //       lst.forEach((dssv, i) => {
  //         let row = $("<tr></tr>");
  //         row.append($(`<td>${i + 1}</td>`));
  //         row.append($(`<td>${dssv.codeStudent}</td>`));
  //         row.append($(`<td>${dssv.name}</td>`));
  //         row.append($(`<td>${dssv.class}</td>`));
  //         row.append($(`<td>${dssv.gender}</td>`));
  //         row.append($(`<td>${dssv.birthday}</td>`));
  //         row.append($(`<td>
  //                         <button class="btn-sm btn-info" onclick="openModal(${dssv.codeStudent}, ${i})">Edit</button>
  //                         <button class="btn-sm btn-danger" onclick="deleteStudent(${dssv.codeStudent})">Delete</button>
  //                       </td>`));

  //         tbody.append(row);
  //       });
  //     } else {
  //       $("#tbodySV").html("<caption>No data found!</caption>");
  //     }
  //   })
  //   .catch(err => {
  //     $("#tbodySV").html("<caption>Error fetching data!</caption>");
  //     console.error(err);
  //   });
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
          document.querySelector("#txtCodeEdit").value = student.MaSV;
          document.querySelector("#txtNameEdit").value = student.HoTen;
          document.querySelector("#txtClassEdit").value = student.Lop;
          document.querySelector("#dateEdit").value = student.NgaySinh;

          if (student.GioiTinh === "Nam") {
            document.querySelector('#male').checked = true;
          }
          if (student.GioiTinh === "Nữ") {
            document.querySelector('#female').checked = true;
          }

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
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function addStudent() {

  gt = $('input[name="gender"]:checked').val();
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/students",
    data: {
      "MaSV": $("#txtCodeAdd").val(),
      "HoTen": $("#txtNameAdd").val(),
      "Lop": $("#txtClassAdd").val(),
      "GioiTinh": gt,
      "NgaySinh": $("#dateAdd").val(),
    }
  })
    .done(function (res) {
      if (res.success) alert(res.msg);
      else alert(res.msg);
    }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });

}


function updateStudent() {
  var gt = $('input[name="genderEdit"]:checked').val();
  var data = {
    "MaSV": $("#txtCodeEdit").val(),
    "HoTen": $("#txtNameEdit").val(),
    "Lop": $("#txtClassEdit").val(),
    "GioiTinh": gt,
    "NgaySinh": $("#dateEdit").val(),
  };
  var studentCode = $("#txtCodeEdit").val();
  console.log(studentCode);
  $.ajax({
    method: "PUT",
    url: "http://localhost:3000/students/" + studentCode,
    data: data
  })
    .done(function (res) {
      if (res.success) alert(res.msg);
      else alert("Update student success");
    }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });

}

function deleteStudent(mssv) {
  console.log(mssv);
  const confirmDelete = confirm("Are you sure you want to delete this student?");
  if (confirmDelete) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:3000/students/' + mssv);
    xhr.send();
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        // Refresh the page or update the student list
      }
    }
  }
}




