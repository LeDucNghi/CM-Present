import "./NotFound.scss";

import React from "react";
import { useSelector } from "react-redux";

function Error() {
  const mode = useSelector((state) => state.app.mode);
  const languages = useSelector((state) => state.app.language);

  window.onload = function () {
    var paragraph = document.getElementById("type-in");
    var supparagraph = document.getElementById("type-after");

    var text = paragraph.innerHTML;
    var textafter = supparagraph.innerHTML;

    paragraph.innerHTML = "";
    supparagraph.innerHTML = "";

    for (var i = 0, len = text.length; i < len; i++) {
      (function (i) {
        window.setTimeout(function () {
          paragraph.innerHTML += text[i];
        }, i * 100);
      })(i);
    }
    window.setTimeout(function () {
      paragraph.style.borderRight = "3px solid #222";
      supparagraph.style.borderRight = "3px solid #555";
      for (var i = 0, len = textafter.length; i < len; i++) {
        (function (i) {
          window.setTimeout(function () {
            supparagraph.innerHTML += textafter[i];
          }, i * 100);
        })(i);
      }
    }, text.length * 100 + 200);
  };

  return (
    <div className="notfound">
      <p className="back"></p>
      <p style={{ color: mode === "dark" ? "#fff" : "" }} id="type-in">
        {languages === "VN" ? `Lỗi 404` : `Error 404`}
      </p>
      <p style={{ color: mode === "dark" ? "#fff" : "" }} id="type-after">
        {languages === "VN" ? `Không tìm thấy trang` : `Page not found`}
      </p>
    </div>
  );
}

export default Error;
