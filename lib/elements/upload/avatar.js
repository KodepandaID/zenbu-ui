import React, { useEffect, useRef, useState } from "react";
import cx from "clsx";
import PropTypes from "prop-types";
import axios from "axios";

import Icon from "../icon/icon";
import Progress from "../progress/progress";

import { Width } from "../../utils/size";
import { Palletes, Color, Contrast } from "../../utils/color";
import { BorderSize, BorderType } from "../../utils/border";
import { RoundedSize } from "../../utils/rounded";

const Avatar = ({ id, name, width, disabled, defaultImage, progress, maxSize, content, hoverContent, rounded, circle,
  color, colorContrast, textColor, textColorContrast, progressColor, progressColorContrast, progressBgColor, progressBgColorContrast,
  border, borderColor, borderColorContrast, borderSize, borderStyle,
  errorMessage, errorMaxSize, uploadUrl, method, fileList,
  mx, my, mb, ml, mr, mt }) => {
  const node = useRef();

  if (circle) rounded = "full";
  if (circle && typeof width !== "number") width = 15;

  const [files, setFiles] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const [showHoverContent, setShowHoverContent] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressStatus, setProgressStatus] = useState("uncompleted");

  const wrapperClasses = cx(
    "relative",
    `w-${width} h-${width}`,
    "flex",
    "flex-wrap",
    "items-center",
    "justify-center",
    Color("bg", color, colorContrast),
    border && `${BorderType[borderStyle]} ${BorderSize[borderSize]} ${Color("border", borderColor, borderColorContrast)}}`,
    rounded !== "none" && RoundedSize[rounded],
    disabled && `opacity-25`,
    "cursor-pointer",
    "overflow-hidden",
    (mx !== undefined && mx >= 0) && `mx-${mx}`,
    (mx !== undefined && mx < 0) && `-mx${mx}`,
    (my !== undefined && my >= 0) && `my-${my}`,
    (my !== undefined && my < 0) && `-my${my}`,
    (mb !== undefined && mb >= 0) && `mb-${mb}`,
    (mb !== undefined && mb < 0) && `-mb${mb}`,
    (ml !== undefined && ml >= 0) && `ml-${ml}`,
    (ml !== undefined && ml < 0) && `-ml${ml}`,
    (mr !== undefined && mr >= 0) && `mr-${mr}`,
    (mr !== undefined && mr < 0) && `-mr${mr}`,
    (mt !== undefined && mt >= 0) && `mt-${mt}`,
    (mt !== undefined && mt < 0) && `-mt${mt}`,
  )

  const uploadFile = (f) => {
    if (f.error === undefined) {
      setShowProgress(true)

      let data = new FormData();
      data.append("file", f);

      axios.request({
        method: method, 
        url: uploadUrl, 
        data: data, 
        onUploadProgress: (p) => {
          const percentComplete = Math.round((100 * p.loaded) / p.total);
          setProgressPercent(percentComplete)
        }
      })
      .then (() => setProgressStatus("completed"))
      .catch(() => setProgressStatus("failed"))
    }
  }

  const validateMaxSize = (f) => {
    setFiles(null)
    setProgressPercent(0)
    setProgressStatus("uncompleted")
    node.current.value = null;

    let obj = f;
    if (maxSize !== undefined) {
      if ((f.size / 1000) > maxSize) {
        obj.error = true;
        obj.errorCause = "maxSize";
        setFiles(obj)
      } else setFiles(f)
    } else setFiles(f)

    if (uploadUrl !== undefined) uploadFile(f)
    if (fileList !== undefined) fileList(obj)
  }

  useEffect(() => {
    if (progressStatus === "completed" || progressStatus === "failed") {
      setInterval(() => setShowProgress(false), 5000)
    }
  }, [progressStatus])

  return(
    <div className={wrapperClasses} onClick={() => node.current.click()} 
    onMouseEnter={() => setShowHoverContent(true)}
    onMouseLeave={() => setShowHoverContent(false)}>
      {(defaultImage !== undefined && files === null) && (<img className={`w-${width} h-${width} object-cover`} src={defaultImage} />)}
      {files !== null && (
        <div className="w-full h-full flex flex-wrap items-center justify-center">
          {(progress && showProgress) && (
            <>
              <span className="absolute top-1/2">
                <Progress 
                width={20}
                percentage={progressPercent}
                color={progressStatus === "failed" ? "red" : progressColor} colorContrast={progressColorContrast}
                bgColor={progressBgColor} bgColorContrast={progressBgColorContrast} />
              </span>
              <div className="w-full h-full bg-black opacity-40 absolute top-0"></div>
            </>
          )}
          <img className={`w-${width} h-${width} object-cover`} src={`${URL.createObjectURL(files)}`} />
          {(progressStatus === "failed" && !showProgress) && (
            <div className="flex flex-col items-center justify-center">
              <Icon icon="exclamation" color="red" colorContrast={700} size="md" />
              <p className="text-xs text-red-700">{files.error === true ? errorMaxSize : errorMessage}</p>
            </div>
          )}
        </div>
      )}

      {(showHoverContent && hoverContent !== undefined && !showProgress) && (
        <div className="w-full h-full absolute top-0">
          <div className="w-full h-full bg-black opacity-40 absolute top-0 transition duration-700 ease-in-out"></div>
          <div className="w-full h-full relative">{hoverContent}</div>
        </div>
      )}
      <input id={id} name={name} ref={node} type="file" accept="image/*" className="hidden" onChange={(e) => {
        validateMaxSize(e.currentTarget.files[0])
      }} />
      {content === undefined ? (
        <div className="flex flex-col">
          {files === null && (
            <>
              <Icon icon="camera" color={textColor} colorContrast={textColorContrast} size="lg" />
            </>
          )}
        </div>
      ) : (content) }
    </div>
  )
}

Avatar.propTypes = {
  width: PropTypes.oneOf(Width),
  circle: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  defaultImage: PropTypes.string,
  color: PropTypes.oneOf(Palletes),
  colorContrast: PropTypes.oneOf(Contrast),
  textColor: PropTypes.oneOf(Palletes),
  textColorContrast: PropTypes.oneOf(Contrast),
  progressColor: PropTypes.oneOf(Palletes),
  progressColorContrast: PropTypes.oneOf(Contrast),
  progressBgColor: PropTypes.oneOf(Palletes),
  progressBgColorContrast: PropTypes.oneOf(Contrast),
  content: PropTypes.node,
  hoverContent: PropTypes.node,
  border: PropTypes.bool,
  borderColor: PropTypes.oneOf(Palletes),
  borderColorContrast: PropTypes.oneOf(Contrast),
  borderSize: PropTypes.oneOf(Object.keys(BorderSize)),
  borderStyle: PropTypes.oneOf(Object.keys(BorderType)),
  rounded: PropTypes.oneOf(Object.keys(RoundedSize)),
  method: PropTypes.oneOf(["post", "put"]),
  uploadUrl: PropTypes.string,
  fileList: PropTypes.func,
  progress: PropTypes.bool,
  disabled: PropTypes.bool,
  maxSize: PropTypes.number,
  errorMaxSize: PropTypes.string,
  errorMessage: PropTypes.string,
  mx: PropTypes.number,
  my: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
}

Avatar.defaultProps = {
  width: 32,
  circle: false,
  color: "gray",
  colorContrast: 100,
  textColor: "gray",
  textColorContrast: 700,
  disabled: false,
  progress: true,
  progressColor: "blue",
  progressColorContrast: 600,
  progressBgColor: "blue",
  progressBgColorContrast: 100,
  border: false,
  errorMessage: "Upload failed",
  errorMaxSize: "The file size is too large.",
  listRounded: "none",
  rounded: "none",
  border: false,
  borderColor: "gray",
  borderColorContrast: 700,
  borderSize: "sm",
  borderStyle: "solid",
  method: "post",
}

export default Avatar;