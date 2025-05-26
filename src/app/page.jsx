"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
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
    <div className="container mx-auto  px-6 py-8">
      <div className="flex gap-6 flex-col items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <Image
            src="/resolve.webp"
            alt="ELVXK TOOL RESOLVER"
            width={100}
            height={100}
          />
          <h1 className="text-2xl font-bold">RESOLVER PREVIEW</h1>
          <h1 className="">Skip DNS to preview to an IP</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="host">Host</Label>
              <Input
                type="text"
                placeholder="sandri.my.id"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="ip">IP</Label>
              <Input
                type="text"
                placeholder="103.163.138.33"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit">{loading ? "Loading..." : "Preview"}</Button>
        </form>

        {resLink && (
          <div className="w-full max-w-[100vw] h-[80vh] shadow-lg border rounded-xl overflow-hidden">
            {resLink && (
              <iframe
                src={resLink}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
