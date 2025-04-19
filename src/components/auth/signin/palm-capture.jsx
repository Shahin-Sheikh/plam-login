import React, { useEffect } from "react";

export default function PalmCaptureComponent() {
  useEffect(() => {
    const container = document.getElementById("palmcapture-container");

    const palmCapture = new window.PalmCapture({
      container: container,
      sidedness: "left", // or 'left' or null
      enrollment: true, // or false
      onStart: function () {
        console.log("Palm capture started");
      },
      onModel: async function (model) {
        console.log("Palm model captured:", model);
        //await matchPalmId(model);
      },
      onError: function (error) {
        console.error("Error:", error);
        alert("An error occurred: " + error.message);
      },
      onGesture: function () {
        console.log("Gesture detected");
      },
    });
    palmCapture.start();
  }, []);

  // Elements
  const loadingDiv = document.getElementById("loading");
  const matchOrEnrollDiv = document.getElementById("match-or-enroll");
  const matchStepDiv = document.getElementById("match-step");
  const enrollLeftStepDiv = document.getElementById("enroll-left-step");
  const enrollRightStepDiv = document.getElementById("enroll-right-step");
  const unsupportedCameraDiv = document.getElementById("unsupported-camera");
  const canvas = document.getElementById("tokencanvas");

  let palmCapture;
  let pollingTimer;

  async function matchPalmId(result) {
    const res = await fetch("/Account/PalmIdMatch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flowId: flowId,
        leftPalmId: await this.toBase64(result),
      }),
    });

    if (res.status === 200) {
      palmCapture.stop();
      $("#final-message").show();
      $("#cam-supported").hide();
    }
  }

  async function toBase64(array) {
    const base64url = await new Promise((r) => {
      const reader = new FileReader();
      reader.onload = () => r(reader.result);
      reader.readAsDataURL(new Blob([array]));
    });
    return base64url.slice(base64url.indexOf(",") + 1);
  }

  // function that will periodically palm id scan session status
  async function pollPalmIdStatus() {
    const res = await fetch("/Account/PalmIdScanStatus?flowid=" + flowId);

    if (res.status === 200) {
      const data = await res.json();
      if (data == 2) {
        clearInterval(pollingTimer);
        location.href = `${location.origin}/Account/Login?flowId=${flowId}`;
      }
    } else {
      console.error("Error fetching palm ID status:", res.statusText);
    }
  }

  return (
    <>
      <div>Hello</div>

      <div id="palmauth">
        <div id="cam-supported">
          <h2 id="scan-instruction"></h2>
          <div className="palmcapture">
            <div className="preview">
              <video
                id="camvideo"
                autoPlay
                muted
                playsInline
                className="overlay"
              ></video>
              <canvas width="300" height="400" className="overlay"></canvas>
              <div className="overlay waiting" id="overlay"></div>
              <div className="hint" id="hint-container">
                <p id="hint-text"></p>
              </div>
            </div>
            <div className="guide">
              <svg
                width="58"
                height="62"
                viewBox="0 0 58 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.6702 60.6099C47.3112 61.0669 46.6958 61.4947 45.9601 61.4462C45.4289 61.4114 27.8648 60.2239 27.329 60.1739C25.7944 60.037 24.9221 59.4083 24.4893 58.6121C23.829 57.4019 15.3798 45.6641 1.47054 39.778C-0.0173384 39.1513 2.81842 33.6779 7.14882 35.2559C10.1163 36.3373 18.0063 41.655 19.4356 40.9866C20.5395 40.4699 22.6528 35.8109 22.327 26.2192L21.6683 6.93512C21.6716 6.07697 22.0073 5.25348 22.6049 4.63763C23.2025 4.02178 24.0155 3.6615 24.8732 3.63249C25.7309 3.60347 26.5664 3.90798 27.2043 4.48203C27.8422 5.05609 28.2327 5.85502 28.294 6.71099L28.8711 23.5396C28.925 25.1809 29.437 25.9824 30.3181 25.9656C31.1027 25.9542 31.4132 25.5471 31.5032 24.0022L31.9524 3.80086C31.9616 3.36588 32.0564 2.93698 32.2314 2.53867C32.4065 2.14036 32.6583 1.78046 32.9725 1.47955C33.2868 1.17863 33.6572 0.9426 34.0627 0.784951C34.4682 0.627301 34.9008 0.551124 35.3358 0.560774C35.7715 0.568306 36.2014 0.662027 36.6007 0.836532C37 1.01104 37.3608 1.26287 37.6623 1.57751C37.9638 1.89215 38.2 2.26337 38.3573 2.66975C38.5146 3.07613 38.5899 3.50964 38.5789 3.94527L38.1531 23.1551C38.1184 24.8452 38.3743 25.8303 39.3658 25.7795C39.961 25.7498 40.2133 24.9464 40.3271 24.2075L42.199 6.40634C42.2332 5.96434 42.3556 5.53368 42.559 5.13981C42.7625 4.74593 43.0428 4.39684 43.3835 4.11315C43.7242 3.82946 44.1182 3.61693 44.5424 3.48813C44.9666 3.35933 45.4123 3.31687 45.8532 3.36325C46.2941 3.40963 46.7212 3.54392 47.1093 3.75817C47.4974 3.97243 47.8386 4.26231 48.1128 4.61068C48.387 4.95905 48.5885 5.35884 48.7055 5.78643C48.8226 6.21402 48.8527 6.66073 48.7942 7.10017L47.0724 23.5066C46.8159 25.9166 47.0297 26.8965 47.9829 26.9972C48.9539 27.1045 49.1795 26.3556 49.2779 25.7056L51.3808 11.8502C51.5363 11.0934 51.9762 10.4251 52.61 9.98326C53.2438 9.54138 54.023 9.35961 54.7868 9.47545C55.5507 9.59128 56.2409 9.99589 56.7152 10.6058C57.1895 11.2157 57.4115 11.9844 57.3356 12.7532L55.0431 27.8335L55.045 27.8375L55.0439 27.8405L53.6677 36.883C53.4582 38.6074 53.3362 40.2589 53.3502 41.9262C53.4464 51.7214 48.8512 59.0841 47.6702 60.6099Z"
                  stroke="currentColor"
                />
              </svg>
              Center your hand in the framed area and hold it for a second.
            </div>
          </div>
        </div>

        <div
          className="site-error"
          id="cam-unsupported"
          style={{ display: "none" }}
        >
          <div className="qrcode">
            <canvas id="tokencanvas" width="200" height="200"></canvas>
          </div>
          <h1>Your device is not supported</h1>
          <p className="alert alert-danger">
            Please scan the QR code with your mobile phone and continue on it.
          </p>
        </div>

        <div id="final-message" style={{ display: "none" }}>
          <p className="alert alert-success">
            Palm ID matched successfully! you can close this window.
          </p>
        </div>
      </div>
    </>
  );
}
