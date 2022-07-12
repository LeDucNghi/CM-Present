import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Images } from "constants/images";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export const Avatar = ({ setFieldValue }) => {
  const [image, setImage] = useState(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = URL.createObjectURL(e.target.files[0]);
      console.log(
        "🚀 ~ file: account.jsx ~ line 49 ~ onImageChange ~ img",
        img
      );
      setImage(img);
      setFieldValue("image", e.target.files[0]);
    }
  };
  return (
    <>
      <div className="avatar">
        {image ? (
          <img className="preview_img" src={image} alt="preview_image" />
        ) : (
          <img src={Images.DEFAULTUSER} alt="user_avt" />
        )}
      </div>
      <label className="avatar_change_icon">
        <FontAwesomeIcon
          className="icon"
          icon={faCamera}
          size="3x"
          style={{ color: "#464646" }}
        />
        <input onChange={onImageChange} name="file_avt" type="file" />
      </label>
    </>
  );
};
