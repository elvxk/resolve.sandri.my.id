"use client";
import { useState } from "react";

export default function Home() {
  const url_hit = "https://api.aldino.dev/api/preview-proxy";

  const [host, setHost] = useState("");
  const [ip, setIp] = useState("");
  const [resLink, setResLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ host, ip }),
    };

    try {
      const response = await fetch(url_hit, requestOptions);
      const data = await response.json();
      setResLink(data.preview_url);
      console.log(data.preview_url);
    } catch (error) {
      console.error("Error fetching preview URL:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="text-2xl font-semibold text-center mb-6">RESOLVER</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8"
      >
        <input
          type="text"
          placeholder="Host (contoh: word.sandri.my.id)"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
          required
        />
        <input
          type="text"
          placeholder="IP (contoh: 103.163.138.33)"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {loading ? "Loading..." : "Preview"}
        </button>
      </form>

      {resLink && (
        <div className="flex justify-center">
          <div className="w-full max-w-[100vw] h-[80vh] shadow-lg border rounded-xl overflow-hidden">
            <iframe
              src={resLink}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
