import React, { useEffect, useState } from "react";

const webpUrl = "https://jadenmeister1337.s3.ap-northeast-2.amazonaws.com/uploads/IMG_9300_1749376996373.webp";
const jpegUrl = "https://jadenmeister1337.s3.ap-northeast-2.amazonaws.com/uploads/1748699086646_IMG_9300.jpeg";

export default function ImageComparison() {
  const [webpLoadTime, setWebpLoadTime] = useState(null);
  const [jpegLoadTime, setJpegLoadTime] = useState(null);
  const [webpSize, setWebpSize] = useState(null);
  const [jpegSize, setJpegSize] = useState(null);

  // 이미지 로딩 시간 측정
  useEffect(() => {
    const measureLoadTime = (url, setTime) => {
      const start = performance.now();
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setTime(performance.now() - start);
      };
    };

    measureLoadTime(webpUrl, setWebpLoadTime);
    measureLoadTime(jpegUrl, setJpegLoadTime);
  }, []);

  // 파일 크기 측정
  useEffect(() => {
    const fetchSize = async (url, setter) => {
      const res = await fetch(url, { method: "HEAD" });
      const size = res.headers.get("content-length");
      setter(Number(size));
    };

    fetchSize(webpUrl, setWebpSize);
    fetchSize(jpegUrl, setJpegSize);
  }, []);

  const formatBytes = (bytes) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    return `${kb.toFixed(2)} KB`;
  };

  return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">📸 이미지 형식 비교</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="font-semibold">WebP</p>
            <img src={webpUrl} alt="WebP Sample" className="w-full h-auto border rounded" />
            <p>로딩 시간: {webpLoadTime?.toFixed(2)}ms</p>
            <p>파일 크기: {formatBytes(webpSize)}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">JPEG</p>
            <img src={jpegUrl} alt="JPEG Sample" className="w-full h-auto border rounded" />
            <p>로딩 시간: {jpegLoadTime?.toFixed(2)}ms</p>
            <p>파일 크기: {formatBytes(jpegSize)}</p>
          </div>
        </div>
      </div>
  );
}