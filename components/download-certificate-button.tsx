"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Download, Loader2, FileCheck } from "lucide-react";
import { CertificatePDF } from "./CertificatePDF";

interface VehicleData {
    make: string;
    model: string;
    year: number;
    regNumber: string;
    vin?: string | null;
    expenses: { description: string; date: string }[];
}

export function DownloadCertificateButton({ vehicle, companyName }: { vehicle: VehicleData, companyName: string }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleDownload() {
        setLoading(true);
        try {
            const blob = await pdf(<CertificatePDF vehicle={vehicle} companyName={companyName} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `certificate-${vehicle.regNumber}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
        }
        setLoading(false);
    }

    return (
        <Button
            variant="outline"
            onClick={handleDownload}
            disabled={loading}
            className="flex-1 sm:flex-none gap-2"
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : success ? (
                <FileCheck className="h-4 w-4 text-emerald-500" />
            ) : (
                <Download className="h-4 w-4" />
            )}
            <span className="sm:inline">{success ? "Downloaded!" : "Certificate"}</span>
        </Button>
    );
}
