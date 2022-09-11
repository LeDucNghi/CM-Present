import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Images } from "utils/images";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { onImageChange } from "../profileThunk";
import { selectImage } from "../profileSlice";
import { useEffect } from "react";

export const Avatar = ({ data, setFieldValue }) => {
  const dispatch = useDispatch();
  const image = useSelector(selectImage);

  useEffect(() => {
    if (image) setFieldValue("image", image);
  }, [image]);

  return (
    <>
      <div className="avatar">
        {image ? (
          <img className="preview_img" src={image} alt="preview_image" />
        ) : (
          <img
            src={data && data.image ? data.image : Images.DEFAULTUSER}
            alt="user_avt"
          />
        )}
      </div>
      <label className="avatar_change_icon">
        <FontAwesomeIcon
          className="icon"
          icon={faCamera}
          size="3x"
          style={{ color: "#464646" }}
        />
        <input
          onChange={(e) => dispatch(onImageChange(e))}
          name="file_avt"
          type="file"
        />
      </label>
    </>
  );
};
