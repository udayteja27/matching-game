import React from "react";
function Icons() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="position-absolute bottom-0 start-0 w-0 h-0"
    >
      <symbol id="icon_arrow" fill="currentColor" viewBox="0 0 149 118">
        <g filter="url(#filter0_d_0_361)">
          <path
            d="M79.8145 52.9833L124.958 46.4722C128.575 45.9505 131.814 48.7562 131.814 52.4107V64.6866C131.814 68.2956 128.651 71.0879 125.07 70.6403L79.8145 64.9833V52.9833Z"
            fill="url(#paint0_linear_0_361)"
          />
          <path
            d="M80.2213 72.0077C80.4364 82.2699 69.4617 88.9167 60.4668 83.972L36.1806 70.6211C27.1857 65.6763 26.9167 52.8485 35.6965 47.5311L59.4018 33.174C68.1816 27.8566 79.4252 34.0375 79.6404 44.2998L80.2213 72.0077Z"
            fill="url(#paint1_linear_0_361)"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_0_361"
            x="12.4705"
            y="18.426"
            width="136.144"
            height="88.0154"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="8.4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_0_361"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_0_361"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_0_361"
            x1="106"
            y1="105.5"
            x2="104.814"
            y2="48.9833"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#6BBB01" stop-opacity="0.45" />
            <stop offset="1" stop-color="white" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_0_361"
            x1="59.0005"
            y1="165"
            x2="70.9539"
            y2="37.6027"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="0.54" stop-color="#CCFC91" stop-opacity="0.25" />
            <stop offset="0.98" stop-color="white" />
          </linearGradient>
        </defs>
      </symbol>
    </svg>
  );
}
export default Icons;
