import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { AdminLayout, useGlobalAutoThank } from "@/components/layout/Layouts";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, ShieldAlert } from "lucide-react";
import { useAddPunch, addPunch as addPunchApi } from "@workspace/api-client-react";
import { toast } from "sonner";

export default function ScanQRCode() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [sendThankYou, setSendThankYou] = useGlobalAutoThank();
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const { mutate: addPunch } = useAddPunch();

  useEffect(() => {
    const initScanner = async () => {
      try {
        const scanner = new Html5Qrcode("reader");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
          },
          (decodedText) => {
            // Success callback
            if (scannerRef.current && scannerRef.current.isScanning) {
              scannerRef.current.stop().catch(console.error);
            }
            setScanning(false);
            setProcessing(true);
            
            // Automatically add a punch
            addPunchApi(decodedText, { thankYou: sendThankYou ? "true" : "false" })
            .then((updatedUser) => {
              toast.success(`Punch added! ${updatedUser.name} now has ${updatedUser.punchCount} punches.`);
              setLocation(`/admin/users/${decodedText}`);
            })
            .catch((err: any) => {
              console.error("Failed to add punch:", err);
              toast.error(err.data?.error || "Failed to add punch automatically.");
              // Still redirect so admin can see what's wrong
              setLocation(`/admin/users/${decodedText}`);
            });
          },
          (errorMessage) => {
            // Parse errors (ignored usually as it scans continuously)
          }
        );
      } catch (err) {
        console.error("Error starting scanner:", err);
        setError("Could not access the camera. Please make sure camera permissions are granted.");
      }
    };

    if (scanning) {
      initScanner();
    }

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [scanning, setLocation]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900" data-display="serif">
              Scan Customer Card
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Point the camera at the customer's QR code to pull up their profile.
            </p>
          </div>
          <Button variant="outline" className="rounded-full" onClick={() => setLocation("/admin")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>

        <div className="overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="p-6 md:p-8">
            {error ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600">
                  <ShieldAlert className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">Camera Access Denied</h3>
                <p className="mt-2 max-w-md text-sm text-slate-500">{error}</p>
                <Button className="mt-6 rounded-full" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <div id="reader" className="w-full"></div>
                  {processing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                      <p className="text-lg font-medium text-slate-900">Adding punch...</p>
                    </div>
                  )}
                  {!scanning && !processing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                      <p className="text-lg font-medium text-slate-900">Redirecting...</p>
                    </div>
                  )}
                  {scanning && (
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                      <div className="flex items-center gap-1.5">
                        <Camera className="h-3.5 w-3.5" />
                        Scanning...
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <input
                    type="checkbox"
                    id="thankYouScanner"
                    checked={sendThankYou}
                    onChange={(e) => setSendThankYou(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-600"
                  />
                  <label htmlFor="thankYouScanner" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                    Send automated "Thank You" message in 5 mins 💌
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
