define(function () {
  var div = document.createElement("div");
  var element = document.body.appendChild(div);

  element.setAttribute("style", "position: relative");
  element.style.width = "500px";
  element.style.height = "500px";

  return element;
});
