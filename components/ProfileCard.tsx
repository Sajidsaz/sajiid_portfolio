"use client";

import { useState } from "react";

function PortraitPlaceholder() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Portrait placeholder"
    >
      <defs>
        <linearGradient id="pcg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfceca" />
          <stop offset="1" stopColor="#b9b8b3" />
        </linearGradient>
        <linearGradient id="pcg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a9994" />
          <stop offset="1" stopColor="#73726e" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#pcg1)" />
      <circle cx="200" cy="160" r="74" fill="url(#pcg2)" />
      <path
        d="M80 400 C80 290 135 250 200 250 C265 250 320 290 320 400 Z"
        fill="url(#pcg2)"
      />
    </svg>
  );
}

export default function ProfileCard() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="profile-card">
      <div className="pc-photo">
        {/* Swap /sajid_dp.jpg for any photo in /public. Falls back to a placeholder if missing. */}
        {imgError ? (
          <PortraitPlaceholder />
        ) : (
          <img
            src="/sajid_dp.PNG"
            alt="Sajidh Ahamed"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="pc-info">
        <div className="pc-name">
          Sajidh Ahamed
          <svg
            className="verified"
            viewBox="0 0 22 22"
            role="img"
            aria-label="Verified"
          >
            <title>Verified</title>
            <path
              fill="#1d9bf0"
              d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.582 11 1.564c-.646.018-1.273.215-1.813.568s-.969.852-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.688.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816z"
            />
            <path
              fill="#fff"
              d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
            />
          </svg>
        </div>
        <div className="pc-role">Full-stack &amp; AI</div>
        <div className="pc-line">
          <span className="nw">Colombo, LK</span>
        </div>
        <div className="pc-social">
          <a href="mailto:sajidhsaz@gmail.com" aria-label="Email">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </a>
          <a
            href="https://github.com/Sajidsaz"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .6a11.4 11.4 0 0 0-3.6 22.2c.6.1.82-.25.82-.55v-1.95c-3.17.69-3.84-1.53-3.84-1.53-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.7 5.39-5.26 5.67.41.36.78 1.07.78 2.15v3.19c0 .31.21.67.82.55A11.4 11.4 0 0 0 12 .6Z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/sajidh-ahamed-ba14aa267"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.2 9.2h3.6V21H3.2V9.2Zm5.9 0h3.45v1.6h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.3 2.4 4.3 5.5V21h-3.6v-5.35c0-1.28-.03-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H9.1V9.2Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
