$("#add_user").submit(function (e) {
  alert("Data inserted succesfully");
});

$("#update_user").submit(function (e) {
  e.preventDefault();

  var unidexed_Array = $(this).serializeArray();
  var data = {};

  $.map(unidexed_Array, function (n, i) {
    data[n["name"]] = n["value"];
  });
  console.log(data);

  var request = {
    url: `http://localhost:5000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("Data successfully updated");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function() {
   var id = $(this).attr("data-id");
   var request = {
      url: `http://localhost:5000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you want to delete this data ?")) {
      $.ajax(request).done(function (response) {
         alert("Data successfully deleted");
       });
    }
  })
}
