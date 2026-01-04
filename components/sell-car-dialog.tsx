"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DollarSign, Loader2, TrendingUp } from "lucide-react";
import { markAsSold } from "@/actions/vehicle-actions";

export function SellCarDialog({ vehicleId }: { vehicleId: string }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            vehicleId,
            soldPrice: parseFloat(formData.get("soldPrice") as string),
            soldDate: new Date(formData.get("soldDate") as string),
        };

        const result = await markAsSold(data);

        if (result.success) {
            setOpen(false);
            router.refresh();
        } else {
            setError(result.message);
        }

        setLoading(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 flex-1 sm:flex-none gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="sm:inline">Sell</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] mx-4">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-emerald-600" />
                            Record Sale
                        </DialogTitle>
                        <DialogDescription>
                            Enter the sale details to mark this vehicle as sold.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="soldPrice">Sale Price (LKR)</Label>
                            <Input
                                id="soldPrice"
                                name="soldPrice"
                                type="number"
                                step="0.01"
                                placeholder="3,500,000"
                                className="text-lg font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="soldDate">Sale Date</Label>
                            <Input
                                id="soldDate"
                                name="soldDate"
                                type="date"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-500 bg-red-500/10 p-2 rounded">{error}</p>
                        )}
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading} className="flex-1 sm:flex-none">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 flex-1 sm:flex-none">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Confirm Sale
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
