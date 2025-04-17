import { useState, useEffect, useRef } from "react";

export function PalmScan({ onScanComplete }) {
  const [scanStatus, setScanStatus] = useState("scanning"); // scanning, noMatch, perfect, redirecting
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start camera on component mount
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Use rear camera if available
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setScanStatus("noMatch");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Simulate scanning progress and API call
  useEffect(() => {
    if (scanStatus === "scanning") {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            verifyPalmScan();
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(timer);
    }
  }, [scanStatus]);

  // Capture frame and send to PalmID API for verification
  const verifyPalmScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");

    try {
      // PalmID API call (requires API key and setup - placeholder endpoint)
      const response = await fetch(
        "https://api.redrockbiometrics.com/palmid/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_PALMID_API_KEY", // Replace with your PalmID API key
          },
          body: JSON.stringify({
            image: imageData,
            format: "jpeg",
          }),
        }
      );

      const result = await response.json();

      // PalmID API returns a user ID if matched, or an error if not found
      if (result.userId) {
        setScanStatus("perfect");
      } else {
        setScanStatus("noMatch");
      }
    } catch (err) {
      console.error("PalmID API error:", err);
      setScanStatus("noMatch");
    }
  };

  const handleButtonClick = (status) => {
    setScanStatus(status);
    if (status === "redirecting") {
      setTimeout(() => {
        onScanComplete();
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="relative w-80 h-[30rem] bg-gray-800 rounded-2xl overflow-hidden">
        {/* Video feed */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          playsInline
        />

        {/* Hidden canvas for capturing frames */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Palm outline overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          {scanStatus === "scanning" && (
            <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-pulse"></div>
          )}
          {scanStatus === "noMatch" && (
            <div className="text-red-500 font-bold text-lg">No Match</div>
          )}
          {scanStatus === "perfect" && (
            <div className="w-16 h-16 border-4 border-green-500 rounded-full"></div>
          )}
          {scanStatus === "redirecting" && (
            <div className="text-green-500 font-bold text-lg">
              Redirecting...
            </div>
          )}
        </div>

        {/* Status-dependent overlay */}
        {scanStatus === "redirecting" && (
          <div className="absolute inset-0 bg-green-500 opacity-50 rounded-2xl"></div>
        )}

        {/* Status button/message */}
        <div className="absolute bottom-24 w-full flex justify-center">
          {scanStatus === "scanning" && (
            <div className="w-32 h-12 flex items-center justify-center">
              <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          {scanStatus === "noMatch" && (
            <button
              className="w-32 h-12 bg-red-500 rounded-full text-white font-semibold"
              onClick={() => {
                setProgress(0);
                setScanStatus("scanning");
              }}
            >
              No match
            </button>
          )}
          {scanStatus === "perfect" && (
            <button
              className="w-32 h-12 bg-green-500 rounded-full text-white font-semibold"
              onClick={() => handleButtonClick("redirecting")}
            >
              Perfect
            </button>
          )}
          {scanStatus === "redirecting" && (
            <div className="w-32 h-12 flex items-center justify-center rounded-full border-2 border-white text-white font-semibold">
              Redirecting...
            </div>
          )}
        </div>
      </div>

      {/* Instruction text */}
      <p className="mt-4 text-lg">
        {scanStatus === "redirecting" ? "Redirecting..." : "Scan your palm"}
      </p>
    </div>
  );
}
