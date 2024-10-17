"use client";
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

function Reader({ onScan }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // Referencia para el canvas
  const [qrCodeData, setQrCodeData] = useState(null);

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            sharpness: 90,
            width: { ideal: 720 }, // Ejemplo: 1280x720 es una resolución HD
            height: { ideal: 720 },
            torch: false,
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const setupCanvas = () => {
          if (videoRef.current) {
            // Creamos el canvas solo una vez
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth * 0.5; // Ajustamos el tamaño
            canvas.height = videoRef.current.videoHeight * 0.5;
            canvasRef.current = canvas; // Guardamos la referencia
          }
        };

        const scanQRCode = () => {
          if (
            videoRef.current &&
            videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
          ) {
            if (!canvasRef.current) {
              setupCanvas(); // Solo inicializamos el canvas si no existe
            }

            const context = canvasRef.current.getContext("2d");
            context.drawImage(
              videoRef.current,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            const imageData = context.getImageData(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            const code = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );
            if (code) {
              if (navigator.vibrate) {
                navigator.vibrate(100); // Vibrar durante 100 milisegundos
              }
              setQrCodeData(code.data);
              onScan(code.data);
            }
          }
        };

        const intervalId = setInterval(scanQRCode, 250); // Escaneo más rápido

        return () => {
          clearInterval(intervalId);
          if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject
              .getTracks()
              .forEach((track) => track.stop());
          }
        };
      } catch (err) {
        console.error("Error al acceder a la camara:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onScan]);

  return (
    <div>
      <video
        ref={videoRef}
        className="w-2/3 mx-auto border-2 border-white rounded-lg"
        autoPlay
      />

      {/* Cuadro de margen seguro */}
      <div
        style={{
          position: "absolute",
          top: "33.7%",
          left: "50%",
          width: "40%",
          height: "35%",
          transform: "translate(-50%, -50%)",
          border: "4px dashed red", // Borde para indicar el margen seguro
          borderRadius: "10px", // Esquinas redondeadas
          boxSizing: "border-box",
        }}
      ></div>
      <p className="text-center p-2 text-sm">
        {qrCodeData ? `Informacion: ${qrCodeData}` : "Esperando codigo QR..."}
      </p>
    </div>
  );
}

export default Reader;
